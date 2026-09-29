import { CategorySlug, Product } from '@/types/catalogue';
import { categories, products as demoProducts } from './catalogue';

const sheetId = process.env.GOOGLE_SHEET_ID || '1GYvCvlGQi57jlmSPghidTAURSZ7ZWuIJcszMtjtsqro';
const source = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
type GvizCell = { v?: string | number | null; f?: string };
type Gviz = { table: { cols: { label: string }[]; rows: { c: (GvizCell | null)[] }[] } };

const clean = (value: unknown) => String(value ?? '').trim();
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
function categoryFor(value: string): { slug: CategorySlug; name: string } {
  const match = categories.find(c => c.name.toLowerCase() === value.toLowerCase() || c.slug === slugify(value));
  return match ? { slug: match.slug, name: match.name } : { slug: 'downlights', name: value || 'Downlights' };
}
function split(value?: string) { return (value || '').split(/[|,]/).map(s => s.trim()).filter(Boolean); }

/** Reads the public Google Sheet. The site refreshes this cache every 60 seconds. */
export async function getProductsFromSheet(): Promise<Product[]> {
  try {
    const response = await fetch(source, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error('Sheet is unavailable');
    const raw = await response.text();
    const match = raw.match(/setResponse\(([\s\S]*)\);?\s*$/);
    if (!match) throw new Error('Unexpected Sheet response');
    const table = (JSON.parse(match[1]) as Gviz).table;
    const headers = table.cols.map(col => col.label.trim());
    const rows = table.rows.map(row => Object.fromEntries(headers.map((h, i) => [h, clean(row.c[i]?.v ?? row.c[i]?.f)])));
    const mapped = rows.filter(r => r['Product Name'] && (!r.Status || !/draft|inactive|hidden/i.test(r.Status))).map((row, index) => {
      const category = categoryFor(row.Category);
      const name = row['Product Name']; const slug = row['Page URL Slug'] || slugify(name);
      const mainImage = row['Main Image URL'] || undefined;
      return {
        id: `sheet-${slug || index}`, code: row['Product Code'] || `BRX-${String(index + 1).padStart(3, '0')}`,
        name, slug, category: category.slug, categoryName: category.name,
        type: row.Subcategory || category.name, shortDescription: row['Short Description'] || '', description: row['Long Description'] || row['Short Description'] || '',
        mainImage, images: split(row['Additional Image URLs']), featured: /yes|true|featured/i.test(row.Featured || ''),
        application: split(row.Application), tags: split(row['Tags / Keywords']), seoTitle: row['SEO Title'] || undefined, seoDescription: row['SEO Meta Description'] || undefined,
        variants: [{ id: `sheet-variant-${index}`, code: row['Variant Code'] || row['Product Code'] || `BRX-${String(index + 1).padStart(3, '0')}`,
          wattage: row.Wattage || undefined, voltage: row.Voltage || undefined, frequency: row.Frequency || undefined, cct: row.CCT || row['Colour Temperature'] || undefined,
          cri: row.CRI || undefined, lumens: row.Lumens || undefined, beamAngle: row['Beam Angle'] || undefined, ipRating: row['IP Rating'] || undefined,
          finish: row.Color || row.Finish || undefined, material: row.Material || undefined, dimensions: row['Dimensions (LxWxH cm)'] || row.Dimensions || undefined,
          cutout: row['Cutout Size'] || undefined, image: mainImage }]
      } as Product;
    });
    return mapped.length ? mapped : demoProducts;
  } catch (error) {
    console.warn('Using local catalogue fallback:', error);
    return demoProducts;
  }
}

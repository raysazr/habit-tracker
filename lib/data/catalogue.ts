import { Category, Product } from '@/types/catalogue';

export const categories: Category[] = [
  { slug: 'cob-lights', name: 'COB Lights', description: 'Focused illumination for considered interiors.', tone: 'warm' },
  { slug: 'downlights', name: 'Downlights', description: 'Recessed light with a quiet architectural profile.', tone: 'dark' },
  { slug: 'panel-lights', name: 'Panel Lights', description: 'Uniform, efficient light for everyday spaces.', tone: 'light' },
  { slug: 'cylinder-lights', name: 'Cylinder Lights', description: 'Surface-mounted forms with precise output.', tone: 'graphite' },
  { slug: 'track-lights', name: 'Track Lights', description: 'Flexible directional lighting for evolving rooms.', tone: 'black' },
  { slug: 'outdoor-lighting', name: 'Outdoor Lighting', description: 'Durable illumination for exterior architecture.', tone: 'stone' },
];

// Technical fields intentionally remain absent where product-master data is not available.
export const products: Product[] = [
  { id:'p1', code:'BRX-DL-001', name:'Blaze', slug:'blaze-led-downlight', category:'downlights', categoryName:'Downlights', type:'LED Downlight', shortDescription:'A clean recessed luminaire for residential and commercial interiors.', description:'Blaze brings a controlled, architectural wash of light to ceilings where a quiet finish matters.', featured:true, application:['Residential','Commercial','Hospitality'], tags:['recessed','cob','downlight','ceiling'], warranty:'2 Years', variants:[
    {id:'b1',code:'BRX-DL-001-12',wattage:'12W',voltage:'85–380V AC',frequency:'50Hz',cct:'3000K',cri:'>80',beamAngle:'120°',ipRating:'IP20',finish:'White',material:'Aluminium',dimensions:'Ø110 mm',cutout:'Ø95 mm'},
    {id:'b2',code:'BRX-DL-001-18',wattage:'18W',voltage:'85–380V AC',frequency:'50Hz',cct:'4000K',cri:'>80',beamAngle:'120°',ipRating:'IP20',finish:'White',material:'Aluminium',dimensions:'Ø145 mm',cutout:'Ø125 mm'},
    {id:'b3',code:'BRX-DL-001-24',wattage:'24W',voltage:'85–380V AC',frequency:'50Hz',cct:'6500K',cri:'>80',beamAngle:'120°',ipRating:'IP20',finish:'Black',material:'Aluminium',dimensions:'Ø175 mm',cutout:'Ø150 mm'}
  ]},
  { id:'p2',code:'BRX-COB-002',name:'CoupleCOB',slug:'couplecob-led-cob-light',category:'cob-lights',categoryName:'COB Lights',type:'LED COB Light',shortDescription:'Focused twin-beam light for refined interior compositions.',description:'A compact dual-aperture COB fixture that draws attention to surfaces, objects and material detail.',featured:true,application:['Residential','Hospitality','Commercial'],tags:['cob','accent','adjustable'],warranty:'2 Years',variants:[{id:'c1',code:'BRX-COB-002-12',wattage:'12W',cct:'3000K',cri:'>80',beamAngle:'36°',ipRating:'IP20',finish:'White',material:'Aluminium'},{id:'c2',code:'BRX-COB-002-18',wattage:'18W',cct:'4000K',cri:'>80',beamAngle:'36°',ipRating:'IP20',finish:'Black',material:'Aluminium'}]},
  { id:'p3',code:'BRX-CYL-003',name:'Pearl',slug:'pearl-cylinder-light',category:'cylinder-lights',categoryName:'Cylinder Lights',type:'Surface Cylinder',shortDescription:'A composed cylindrical form for surface-mounted applications.',description:'Pearl is designed to give exposed ceilings a measured, purposeful point of light.',featured:true,application:['Residential','Hospitality'],tags:['cylinder','surface','ceiling'],warranty:'2 Years',variants:[{id:'pe1',code:'BRX-CYL-003-12',wattage:'12W',cct:'3000K',cri:'>80',beamAngle:'24°',ipRating:'IP20',finish:'White',material:'Aluminium',dimensions:'Ø75 × 120 mm'},{id:'pe2',code:'BRX-CYL-003-18',wattage:'18W',cct:'4000K',cri:'>80',beamAngle:'24°',ipRating:'IP20',finish:'Black',material:'Aluminium',dimensions:'Ø90 × 150 mm'}]},
  { id:'p4',code:'BRX-TL-004',name:'Magna',slug:'magna-track-light',category:'track-lights',categoryName:'Track Lights',type:'LED Track Light',shortDescription:'Directional track lighting with an emphatic, technical presence.',description:'Magna allows light to move with the space, placing focus exactly where a scheme needs it.',featured:true,application:['Commercial','Hospitality','Residential'],tags:['track','directional','retail'],warranty:'2 Years',variants:[{id:'m1',code:'BRX-TL-004-12',wattage:'12W',cct:'3000K',cri:'>80',beamAngle:'24°',ipRating:'IP20',finish:'Black',material:'Aluminium'},{id:'m2',code:'BRX-TL-004-24',wattage:'24W',cct:'4000K',cri:'>80',beamAngle:'36°',ipRating:'IP20',finish:'Black',material:'Aluminium'}]},
  { id:'p5',code:'BRX-PL-005',name:'Classic Panel',slug:'classic-panel-light',category:'panel-lights',categoryName:'Panel Lights',type:'LED Panel Light',shortDescription:'A quietly integrated panel for broad, even illumination.',description:'Classic Panel offers a clean visual plane and comfortable, consistent light for workplace environments.',featured:true,application:['Commercial','Residential'],tags:['panel','office','ceiling'],warranty:'2 Years',variants:[{id:'cp1',code:'BRX-PL-005-12',wattage:'12W',cct:'3000K',ipRating:'IP20',finish:'White',dimensions:'145 × 145 mm'},{id:'cp2',code:'BRX-PL-005-18',wattage:'18W',cct:'4000K',ipRating:'IP20',finish:'White',dimensions:'225 × 225 mm'}]}
];

export const getProducts = () => products;
export const getProductBySlug = (slug:string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (category:string) => products.filter(p => p.category === category);
export const getProductVariants = (slug:string) => getProductBySlug(slug)?.variants ?? [];
export const getRelatedProducts = (product:Product) => products.filter(p => p.category === product.category && p.id !== product.id).concat(products.filter(p => p.category !== product.category && p.id !== product.id)).slice(0,4);
export function searchProducts(query:string) { const q=query.trim().toLowerCase(); if(!q) return products; return products.filter(p => [p.name,p.code,p.categoryName,p.type,...p.tags,...p.application,...p.variants.flatMap(v=>Object.values(v).filter(Boolean) as string[])].join(' ').toLowerCase().includes(q)); }

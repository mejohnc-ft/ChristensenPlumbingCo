export interface AreaData {
  slug: string;
  name: string;
  state: string;
  zipCodes: string[];
  description: string[];
  geo: { latitude: number; longitude: number };
  commonIssues: string[];
}

export const AREAS: AreaData[] = [
  {
    slug: 'san-diego',
    name: 'San Diego',
    state: 'CA',
    zipCodes: ['92101', '92102', '92103', '92104', '92105', '92106', '92107', '92108', '92110', '92111', '92113', '92114', '92115', '92116', '92117', '92119', '92120', '92122', '92123', '92124', '92126', '92127', '92128', '92129', '92130', '92131'],
    description: [
      'Christensen Plumbing proudly serves the greater San Diego area with professional plumbing services. From downtown condos to suburban homes, we handle every plumbing need with care and expertise.',
      'San Diego\'s mix of historic neighborhoods and modern developments means plumbing systems range from century-old galvanized pipes to modern PEX installations. We have experience with all types and are equipped to handle any challenge.',
    ],
    geo: { latitude: 32.7157, longitude: -117.1611 },
    commonIssues: ['Hard water mineral buildup', 'Aging galvanized pipe replacement', 'Drought-resistant fixture upgrades', 'Slab leaks from shifting soil'],
  },
  {
    slug: 'la-jolla',
    name: 'La Jolla',
    state: 'CA',
    zipCodes: ['92037', '92038', '92039'],
    description: [
      'La Jolla homeowners trust Christensen Plumbing for premium plumbing services that match the quality of their homes. We understand the unique needs of La Jolla\'s luxury properties and coastal residences.',
      'Coastal salt air can accelerate pipe corrosion in La Jolla homes. Our preventive maintenance and repiping services help protect your investment and maintain your property value.',
    ],
    geo: { latitude: 32.8328, longitude: -117.2713 },
    commonIssues: ['Salt air pipe corrosion', 'High-end fixture installation', 'Whole-house water filtration', 'Luxury bathroom renovations'],
  },
  {
    slug: 'mission-valley',
    name: 'Mission Valley',
    state: 'CA',
    zipCodes: ['92108', '92120'],
    description: [
      'Mission Valley is one of San Diego\'s most active areas, and Christensen Plumbing provides fast, reliable service to both residential and commercial properties throughout the valley.',
      'Many Mission Valley condos and apartments have shared plumbing systems that require specialized knowledge. We work with property managers and HOAs to resolve issues efficiently.',
    ],
    geo: { latitude: 32.7682, longitude: -117.1549 },
    commonIssues: ['Condo shared plumbing systems', 'Commercial property plumbing', 'Water heater replacements in tight spaces', 'Drain cleaning for older buildings'],
  },
  {
    slug: 'carlsbad',
    name: 'Carlsbad',
    state: 'CA',
    zipCodes: ['92008', '92009', '92010', '92011'],
    description: [
      'Carlsbad residents count on Christensen Plumbing for all their plumbing needs. From the village area to the newer master-planned communities, we provide prompt, professional service.',
      'Carlsbad\'s hard water is particularly tough on plumbing systems. We offer water softener installation and regular maintenance to extend the life of your pipes and fixtures.',
    ],
    geo: { latitude: 33.1581, longitude: -117.3506 },
    commonIssues: ['Hard water damage prevention', 'Irrigation system connections', 'Newer home warranty plumbing', 'Water softener installation'],
  },
  {
    slug: 'chula-vista',
    name: 'Chula Vista',
    state: 'CA',
    zipCodes: ['91910', '91911', '91913', '91914', '91915'],
    description: [
      'Christensen Plumbing serves Chula Vista with the same commitment to quality that has earned us a 4.9-star rating across San Diego County. From Eastlake to the bayfront, we cover all of Chula Vista.',
      'As San Diego County\'s second-largest city, Chula Vista has a diverse mix of housing from new construction to established neighborhoods. We\'re familiar with the plumbing systems in every part of the city.',
    ],
    geo: { latitude: 32.6401, longitude: -117.0842 },
    commonIssues: ['New construction plumbing issues', 'Main sewer line problems', 'Water pressure issues', 'Tankless water heater installation'],
  },
  {
    slug: 'oceanside',
    name: 'Oceanside',
    state: 'CA',
    zipCodes: ['92054', '92056', '92057', '92058'],
    description: [
      'Oceanside homeowners trust Christensen Plumbing for reliable service and honest pricing. We serve the entire Oceanside area, from the coast to the inland neighborhoods.',
      'Oceanside\'s coastal climate and older housing stock create unique plumbing challenges. We specialize in addressing corrosion, hard water damage, and aging infrastructure.',
    ],
    geo: { latitude: 33.1959, longitude: -117.3795 },
    commonIssues: ['Coastal pipe corrosion', 'Older home repiping', 'Emergency sewer service', 'Beach-area drain issues'],
  },
  {
    slug: 'escondido',
    name: 'Escondido',
    state: 'CA',
    zipCodes: ['92025', '92026', '92027', '92029'],
    description: [
      'Escondido residents rely on Christensen Plumbing for expert plumbing services. Our 30-minute average response time covers the greater Escondido area for emergencies.',
      'Escondido\'s warm inland climate and older established neighborhoods mean many homes benefit from repiping, water heater upgrades, and water pressure improvements.',
    ],
    geo: { latitude: 33.1192, longitude: -117.0864 },
    commonIssues: ['Well water system issues', 'Older home pipe replacement', 'Water heater efficiency upgrades', 'Tree root sewer intrusion'],
  },
  {
    slug: 'el-cajon',
    name: 'El Cajon',
    state: 'CA',
    zipCodes: ['92019', '92020', '92021'],
    description: [
      'El Cajon homeowners trust Christensen Plumbing for professional, affordable plumbing services. We serve all of El Cajon and the surrounding East County communities.',
      'El Cajon\'s hot summers put extra strain on water heaters and plumbing systems. We help homeowners stay comfortable year-round with proper maintenance and efficient upgrades.',
    ],
    geo: { latitude: 32.7948, longitude: -116.9625 },
    commonIssues: ['Heat-related pipe expansion', 'Water heater strain from hard water', 'Older home plumbing upgrades', 'Backflow prevention'],
  },
  {
    slug: 'national-city',
    name: 'National City',
    state: 'CA',
    zipCodes: ['91950'],
    description: [
      'National City residents count on Christensen Plumbing for fast, reliable service. We provide full-service plumbing to homeowners and businesses throughout National City.',
      'Many National City homes were built in the mid-20th century and may still have original galvanized plumbing. We specialize in modern repiping solutions that restore water quality and pressure.',
    ],
    geo: { latitude: 32.6781, longitude: -117.0992 },
    commonIssues: ['Galvanized pipe replacement', 'Sewer line root intrusion', 'Commercial plumbing service', 'Emergency leak repair'],
  },
  {
    slug: 'coronado',
    name: 'Coronado',
    state: 'CA',
    zipCodes: ['92118'],
    description: [
      'Coronado\'s unique island community requires a plumber who understands the area. Christensen Plumbing provides premium service to Coronado homes and businesses.',
      'Coronado\'s salt air environment accelerates pipe corrosion. We offer proactive maintenance programs and corrosion-resistant repiping to protect your coastal property.',
    ],
    geo: { latitude: 32.6859, longitude: -117.1831 },
    commonIssues: ['Salt air accelerated corrosion', 'Historic home plumbing preservation', 'High-end fixture installation', 'Coastal water treatment'],
  },
  {
    slug: 'del-mar',
    name: 'Del Mar',
    state: 'CA',
    zipCodes: ['92014'],
    description: [
      'Del Mar homeowners expect the best, and Christensen Plumbing delivers. We provide meticulous, premium plumbing services to Del Mar\'s coastal community.',
      'Del Mar properties face unique challenges from coastal conditions and high property values. We protect your investment with quality workmanship and premium materials.',
    ],
    geo: { latitude: 32.9595, longitude: -117.2653 },
    commonIssues: ['Luxury property plumbing', 'Coastal pipe protection', 'Whole-house water systems', 'High-end bathroom renovations'],
  },
  {
    slug: 'encinitas',
    name: 'Encinitas',
    state: 'CA',
    zipCodes: ['92023', '92024'],
    description: [
      'Encinitas residents trust Christensen Plumbing for professional, eco-conscious plumbing services. From Leucadia to Cardiff, we serve the entire Encinitas community.',
      'Many Encinitas homeowners are interested in water-efficient plumbing solutions. We install low-flow fixtures, tankless water heaters, and greywater systems to reduce water usage.',
    ],
    geo: { latitude: 33.0369, longitude: -117.2919 },
    commonIssues: ['Water conservation solutions', 'Coastal property plumbing', 'Tankless water heater installation', 'Eco-friendly plumbing upgrades'],
  },
  {
    slug: 'poway',
    name: 'Poway',
    state: 'CA',
    zipCodes: ['92064'],
    description: [
      'Poway homeowners rely on Christensen Plumbing for dependable service and fair pricing. We cover all of Poway, from the rural estates to the suburban neighborhoods.',
      'Poway\'s mix of newer homes and rural properties means diverse plumbing needs. We handle everything from well systems to modern subdivision plumbing.',
    ],
    geo: { latitude: 32.9628, longitude: -117.0359 },
    commonIssues: ['Well water system service', 'Septic-connected plumbing', 'Large property repiping', 'Water pressure optimization'],
  },
  {
    slug: 'santee',
    name: 'Santee',
    state: 'CA',
    zipCodes: ['92071', '92072'],
    description: [
      'Santee homeowners trust Christensen Plumbing for quality workmanship and honest pricing. We serve the entire Santee area with full-service plumbing solutions.',
      'Santee\'s established neighborhoods often benefit from plumbing upgrades. We help homeowners improve water pressure, replace aging pipes, and install energy-efficient water heaters.',
    ],
    geo: { latitude: 32.8384, longitude: -116.9739 },
    commonIssues: ['Aging infrastructure upgrades', 'Water heater efficiency', 'Main line sewer cleaning', 'Bathroom renovation plumbing'],
  },
  {
    slug: 'la-mesa',
    name: 'La Mesa',
    state: 'CA',
    zipCodes: ['91941', '91942', '91943'],
    description: [
      'La Mesa residents count on Christensen Plumbing for friendly, professional plumbing services. We cover all of La Mesa, from the village to Mount Helix.',
      'La Mesa\'s charming older homes often have vintage plumbing that needs expert attention. We specialize in updating these systems while preserving the character of your home.',
    ],
    geo: { latitude: 32.7678, longitude: -117.0231 },
    commonIssues: ['Vintage home plumbing updates', 'Cast iron pipe replacement', 'Leak detection in older homes', 'Kitchen and bath remodel plumbing'],
  },
];

export function getAreaBySlug(slug: string): AreaData | undefined {
  return AREAS.find((a) => a.slug === slug);
}

export function getAreaSlugs(): string[] {
  return AREAS.map((a) => a.slug);
}

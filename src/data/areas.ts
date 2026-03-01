export interface AreaNeighborhoodInfo {
  highlights: string[];
  waterQualityNotes: string;
  infrastructureNotes: string;
  faqs: Array<{ question: string; answer: string }>;
}

export interface AreaTestimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

export interface AreaData {
  slug: string;
  name: string;
  state: string;
  zipCodes: string[];
  description: string[];
  geo: { latitude: number; longitude: number };
  commonIssues: string[];
  neighborhoodInfo?: AreaNeighborhoodInfo;
  testimonial?: AreaTestimonial;
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
    neighborhoodInfo: {
      highlights: [
        '8th largest US city with 1.4M+ residents',
        'Mix of historic Craftsman homes and modern condos downtown',
        'Neighborhoods like North Park, Hillcrest, and Point Loma have homes from the 1920s-1950s',
        "City's infrastructure dates back over 100 years in some areas"
      ],
      waterQualityNotes: 'San Diego imports ~85% of its water from the Colorado River and Northern California. The water is very hard (15-20 grains per gallon), leading to mineral buildup.',
      infrastructureNotes: 'Many central San Diego homes built before 1970 still have original galvanized steel or cast iron drain lines. Downtown condos typically have modern copper or PEX.',
      faqs: [
        {
          question: 'Is repiping worth it for my 1950s San Diego home?',
          answer: 'Yes. Homes from the 1950s typically have galvanized steel pipes that are now 70+ years old. Repiping with modern materials improves water pressure, quality, and prevents costly emergency repairs.'
        },
        {
          question: 'Do I need a water softener in San Diego?',
          answer: "With water hardness at 15-20 grains per gallon, a water softener will significantly extend the life of your plumbing fixtures, appliances, and pipes by preventing mineral scale buildup."
        },
        {
          question: 'Why are slab leaks common in San Diego homes?',
          answer: "San Diego's clay-rich soil expands and contracts with moisture changes, putting stress on pipes embedded in concrete slabs. Older copper pipes are particularly susceptible to developing pinhole leaks."
        }
      ]
    },
    testimonial: {
      quote: 'Bill arrived in 20 minutes on a Saturday night when our kitchen pipe burst. Professional, fair pricing, and cleaned up perfectly.',
      author: 'Sarah M.',
      location: 'San Diego, CA',
      rating: 5
    }
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
    neighborhoodInfo: {
      highlights: [
        'Home values average $2M+ making plumbing protection critical',
        'Coastal bluffs create unique soil conditions affecting underground pipes',
        'The Village and Windansea areas feature homes from the 1940s-1960s',
        'UCSD campus drives apartment and condo demand nearby'
      ],
      waterQualityNotes: "La Jolla's proximity to the ocean means higher chloride levels in soil, which accelerates external pipe corrosion. Indoor water hardness matches San Diego's high levels.",
      infrastructureNotes: 'Many La Jolla homes feature copper supply lines that show pinhole leak patterns after 25-30 years in the coastal environment. Hillside properties often have complex sewer laterals.',
      faqs: [
        {
          question: 'Why do La Jolla homes experience more pipe corrosion?',
          answer: 'The combination of salt-laden coastal air and soil chlorides attacks pipes from the outside, while hard water causes interior corrosion. This dual exposure significantly accelerates pipe deterioration.'
        },
        {
          question: 'What plumbing materials work best in La Jolla?',
          answer: 'For coastal La Jolla properties, we recommend PEX or Type L copper for supply lines, and PVC or ABS for drain lines. These materials resist both internal hard water damage and external salt corrosion.'
        },
        {
          question: 'How often should I inspect my plumbing in a coastal La Jolla home?',
          answer: 'We recommend annual inspections for homes within 1 mile of the ocean. Early detection of corrosion can prevent expensive emergency repairs and water damage in high-value properties.'
        }
      ]
    },
    testimonial: {
      quote: 'Christensen Plumbing repiped our 1958 La Jolla home with minimal wall damage. The attention to detail was remarkable.',
      author: 'David K.',
      location: 'La Jolla, CA',
      rating: 5
    }
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
    neighborhoodInfo: {
      highlights: [
        'Major commercial hub with Fashion Valley and Mission Valley malls',
        'Dense condo and apartment communities along the San Diego River',
        'Rapid development since the 1970s means diverse plumbing ages',
        'Trolley stations bring high foot traffic to commercial properties'
      ],
      waterQualityNotes: "Mission Valley shares San Diego's hard water supply. High-rise buildings may have additional water pressure challenges requiring booster pumps.",
      infrastructureNotes: 'Most Mission Valley condos were built between 1970-2000 with copper supply lines. Many are reaching the age where pinhole leaks and water heater replacements become common.',
      faqs: [
        {
          question: 'Who is responsible for plumbing repairs in my Mission Valley condo?',
          answer: 'Typically, the HOA covers main lines and shared systems, while unit owners are responsible for plumbing within their walls. Always check your CC&Rs, and we can help coordinate with your HOA if needed.'
        },
        {
          question: 'Can you replace a water heater in a Mission Valley condo closet?',
          answer: 'Yes. We specialize in tight-space installations common in Mission Valley condos. Tankless water heaters are often a great solution for cramped utility closets.'
        },
        {
          question: 'Why does my Mission Valley apartment have low water pressure?',
          answer: 'Multi-story buildings often experience pressure drops on upper floors, especially during peak usage. We can assess if the building needs booster pumps or if your unit has clogged fixtures or pipes.'
        }
      ]
    }
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
    neighborhoodInfo: {
      highlights: [
        'Master-planned communities like Bressi Ranch and La Costa feature newer plumbing systems',
        'Carlsbad Desalination Plant supplements local water supply',
        'The Village area has charming older homes from the 1950s-1970s',
        'Legoland and beach tourism drive commercial plumbing demand'
      ],
      waterQualityNotes: 'Carlsbad benefits from the local desalination plant, but blended water still tests at 12-18 grains hardness. Water softeners are recommended for all homes.',
      infrastructureNotes: 'Newer communities (built after 2000) typically have PEX supply lines and ABS drain lines. Older Village-area homes may have galvanized steel requiring replacement.',
      faqs: [
        {
          question: 'Does the Carlsbad desalination plant mean I have soft water?',
          answer: 'No. While desalinated water is blended into the supply, the overall water hardness in Carlsbad is still 12-18 grains per gallon. A water softener will still provide significant benefits.'
        },
        {
          question: 'Do newer Carlsbad homes still need plumbing maintenance?',
          answer: 'Absolutely. Even PEX systems need regular water heater flushing, fixture inspection, and drain maintenance. Hard water will still cause mineral buildup in water heaters and fixtures.'
        },
        {
          question: 'What plumbing permits do I need in Carlsbad?',
          answer: 'Carlsbad requires permits for water heater replacements, repiping, and gas line work. We handle all permitting and inspections as part of our service to ensure code compliance.'
        }
      ]
    },
    testimonial: {
      quote: 'Installed a tankless water heater in our La Costa home. Explained everything clearly and the permit process was handled seamlessly.',
      author: 'Jennifer L.',
      location: 'Carlsbad, CA',
      rating: 5
    }
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
    neighborhoodInfo: {
      highlights: [
        'Second-largest city in San Diego County with 275,000+ residents',
        'Eastlake and Otay Ranch are major newer developments',
        'Western Chula Vista has older established neighborhoods from the 1950s-1970s',
        'Bayfront redevelopment is transforming the waterfront area'
      ],
      waterQualityNotes: "Chula Vista's water comes from the Otay Water District and Sweetwater Authority. Hardness levels are consistently high at 16-22 grains per gallon.",
      infrastructureNotes: 'Eastern Chula Vista homes (built 2000+) have modern PEX plumbing. Western neighborhoods often have original galvanized pipes that benefit from repiping.',
      faqs: [
        {
          question: 'Why is there such a difference between east and west Chula Vista plumbing?',
          answer: 'Eastern Chula Vista (Eastlake, Otay Ranch) was developed after 2000 with modern codes requiring PEX and efficient systems. Western Chula Vista homes from the 1950s-1970s often still have original galvanized or copper pipes.'
        },
        {
          question: 'Should I repipe my western Chula Vista home?',
          answer: 'If your home is 40+ years old and still has original galvanized pipes, repiping will dramatically improve water pressure and quality while preventing costly emergency leaks.'
        },
        {
          question: 'What causes low water pressure in Chula Vista?',
          answer: 'The most common causes are mineral buildup in old galvanized pipes, corroded supply lines, or pressure regulator failure. A full plumbing inspection can identify the specific issue.'
        }
      ]
    }
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
    neighborhoodInfo: {
      highlights: [
        'Largest North County coastal city with 170,000+ residents',
        'Camp Pendleton military families are a significant customer base',
        'Downtown and beach areas have homes from the 1940s-1960s',
        'Inland neighborhoods like Mission Mesa were developed in the 1970s-1980s'
      ],
      waterQualityNotes: "Oceanside's water is supplied by the San Diego County Water Authority. Coastal proximity combined with hard water creates dual corrosion risk on both interior and exterior pipes.",
      infrastructureNotes: 'Beach-area homes often have original copper or galvanized plumbing showing significant corrosion. Inland developments have a mix of copper and early PEX installations.',
      faqs: [
        {
          question: 'How does living near the Oceanside beach affect my plumbing?',
          answer: 'Salt air accelerates external corrosion on pipes, fixtures, and water heaters. Beach-area homes should use corrosion-resistant materials and schedule more frequent inspections.'
        },
        {
          question: 'Do Camp Pendleton military families get special service?',
          answer: 'We proudly serve military families with flexible scheduling and transparent pricing. We understand the unique challenges of military life and work hard to accommodate your needs.'
        },
        {
          question: 'Why do Oceanside sewer lines have more root problems?',
          answer: 'Mature trees in older Oceanside neighborhoods have extensive root systems that seek water sources. Clay sewer pipes from the 1940s-1970s are particularly vulnerable to root intrusion.'
        }
      ]
    }
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
    neighborhoodInfo: {
      highlights: [
        'Inland climate means hotter summers that stress water heaters and outdoor plumbing',
        'Historic downtown district features buildings from the early 1900s',
        'Rural properties in eastern Escondido may have well water systems',
        'Bear Valley and Westside are established residential neighborhoods'
      ],
      waterQualityNotes: "Escondido's water comes from the Escondido-Vista Water District. Some rural properties use well water which can be high in iron and minerals requiring specialized filtration.",
      infrastructureNotes: 'Escondido has a wide range of plumbing ages. Downtown buildings may have 80+ year-old cast iron drains, while suburban homes from the 1970s-1990s typically have copper supply lines.',
      faqs: [
        {
          question: 'Do I need special plumbing for my Escondido well water?',
          answer: 'Well water in Escondido often contains high levels of iron, minerals, or hardness. We recommend whole-house filtration, water softeners, and regular testing to protect your plumbing and fixtures.'
        },
        {
          question: 'Why does the hot Escondido climate affect my plumbing?',
          answer: 'Summer temperatures over 100°F cause pipe expansion, stress water heater components, and increase mineral precipitation from hard water. Regular maintenance is essential in this climate.'
        },
        {
          question: 'Are older Escondido homes worth repiping?',
          answer: 'Homes built before 1980 with original galvanized or early copper plumbing will see dramatic improvements in water quality and pressure from repiping with modern materials.'
        }
      ]
    }
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
    neighborhoodInfo: {
      highlights: [
        'Known as "The Big Box" for its valley location that traps summer heat (often 100°F+)',
        'Fletcher Hills and Rancho San Diego are popular residential areas',
        'Mix of affordable housing and rural properties',
        'Growing downtown revitalization bringing new commercial plumbing needs'
      ],
      waterQualityNotes: "El Cajon's Padre Dam Municipal Water District supplies water testing at 18-22 grains hardness. Summer heat accelerates mineral scale buildup in water heaters.",
      infrastructureNotes: 'Many El Cajon homes built in the 1960s-1980s are reaching the age where galvanized pipe replacement and water heater upgrades provide significant benefits.',
      faqs: [
        {
          question: 'Why do El Cajon water heaters fail more often?',
          answer: 'The combination of extreme summer heat (100°F+) and very hard water (18-22 grains) creates accelerated mineral buildup and component stress. Annual flushing can extend water heater life.'
        },
        {
          question: 'Should I upgrade my 1970s El Cajon home plumbing?',
          answer: 'If your home is 40-50 years old with original galvanized pipes, upgrading to PEX will improve pressure, water quality, and prevent costly emergency leaks. Many El Cajon homes see dramatic improvements.'
        },
        {
          question: 'What is backflow prevention and why do I need it in El Cajon?',
          answer: 'Backflow preventers stop contaminated water from flowing back into the city water supply. El Cajon requires them for irrigation systems, commercial properties, and homes with certain plumbing configurations.'
        }
      ]
    }
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
    neighborhoodInfo: {
      highlights: [
        'One of the oldest cities in San Diego County (incorporated 1887)',
        'Compact city of 60,000 with dense residential neighborhoods',
        'Plaza Bonita mall area is the commercial center',
        'Proximity to the Port of San Diego brings industrial plumbing needs'
      ],
      waterQualityNotes: 'National City receives water from Sweetwater Authority. The aging distribution system means occasional water main breaks that can introduce sediment into home plumbing.',
      infrastructureNotes: 'A significant portion of National City homes were built between 1940-1965 with galvanized steel plumbing. These systems are past their expected lifespan and benefit from modern repiping.',
      faqs: [
        {
          question: 'Why is the water sometimes discolored in National City?',
          answer: 'Occasional water main breaks in the aging city distribution system can stir up sediment. Flushing your taps for a few minutes usually clears it, but persistent issues may indicate corroded pipes in your home.'
        },
        {
          question: 'How old is too old for galvanized pipes?',
          answer: 'Galvanized steel pipes have a 40-60 year lifespan. If your National City home was built before 1980 and still has original pipes, repiping will prevent leaks and restore water quality.'
        },
        {
          question: 'Do you service commercial properties in National City?',
          answer: 'Absolutely. We serve restaurants, retail shops, and industrial properties throughout National City with commercial-grade plumbing solutions and rapid emergency response.'
        }
      ]
    }
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
    neighborhoodInfo: {
      highlights: [
        'Island community connected by the iconic Coronado Bridge',
        'Historic Hotel del Coronado is a landmark since 1888',
        'Strict building codes preserve the community\'s character',
        'Military housing at Naval Air Station North Island creates unique demand'
      ],
      waterQualityNotes: "Coronado's island location means constant salt air exposure that accelerates external pipe and fixture corrosion far faster than inland areas.",
      infrastructureNotes: 'Many Coronado homes are historic (pre-1950) with original brass and galvanized fittings. Strict city codes require careful permitting for any plumbing modifications.',
      faqs: [
        {
          question: 'What permits do I need for plumbing work in Coronado?',
          answer: 'Coronado has strict permitting requirements to preserve historic character. We handle all permit applications and inspections for water heaters, repiping, and fixture installations.'
        },
        {
          question: 'How do I protect plumbing in my historic Coronado home?',
          answer: 'Regular inspections, corrosion-resistant materials, and proactive maintenance are essential. We specialize in updating historic plumbing while preserving architectural integrity.'
        },
        {
          question: 'Does salt air really damage plumbing that much?',
          answer: 'Yes. Coronado\'s constant salt air exposure corrodes external pipes, fixtures, and water heaters 2-3 times faster than inland areas. Stainless steel and PEX materials offer better longevity.'
        }
      ]
    },
    testimonial: {
      quote: 'They understood our 1930s Coronado cottage needed a delicate touch. Beautiful copper repipe that preserved the home\'s character.',
      author: 'Robert H.',
      location: 'Coronado, CA',
      rating: 5
    }
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
    neighborhoodInfo: {
      highlights: [
        'Tiny coastal community of 4,300 residents with very high property values',
        'Del Mar Racetrack and Fairgrounds are regional landmarks',
        'Bluff-top homes face unique erosion and soil movement challenges',
        'Strict environmental regulations affect construction and plumbing work'
      ],
      waterQualityNotes: "Del Mar's coastal bluff location subjects pipes to salt-laden air and soil conditions. Combined with San Diego's hard water, fixtures and pipes experience accelerated wear.",
      infrastructureNotes: 'Del Mar homes range from mid-century originals to multi-million dollar new construction. Even newer homes require corrosion-resistant materials due to the coastal environment.',
      faqs: [
        {
          question: 'Why are plumbing costs higher in Del Mar?',
          answer: 'Del Mar requires specialized materials for coastal corrosion resistance, strict permitting processes, and often complex installations on bluff-top properties. We provide transparent pricing and premium materials appropriate for high-value homes.'
        },
        {
          question: 'What is trenchless sewer repair?',
          answer: 'Trenchless methods repair or replace sewer lines without extensive excavation, protecting your valuable landscaping and hardscaping. Ideal for Del Mar properties where preserving outdoor aesthetics is critical.'
        },
        {
          question: 'How often should I service my Del Mar home plumbing?',
          answer: 'Annual inspections are recommended for coastal Del Mar properties. We check for corrosion, test water quality, inspect fixtures, and identify issues before they become expensive emergencies.'
        }
      ]
    },
    testimonial: {
      quote: 'Replaced our entire sewer lateral with trenchless methods to protect our landscaping. Exceptional work from start to finish.',
      author: 'Patricia W.',
      location: 'Del Mar, CA',
      rating: 5
    }
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
    neighborhoodInfo: {
      highlights: [
        'Five distinct communities: Old Encinitas, New Encinitas, Cardiff-by-the-Sea, Olivenhain, and Leucadia',
        'Strong eco-conscious community prioritizing water efficiency',
        'Swami\'s Beach and the Self-Realization Fellowship are iconic landmarks',
        'Mix of beach cottages and inland family homes'
      ],
      waterQualityNotes: 'Encinitas is served by the Olivenhain Municipal Water District and San Dieguito Water District. Water conservation is a strong community value, driving demand for efficient fixtures.',
      infrastructureNotes: 'Old Encinitas and Leucadia have beach cottages from the 1950s-1970s with aging copper plumbing. Olivenhain features newer homes on larger lots, sometimes with private well connections.',
      faqs: [
        {
          question: 'What are the best water-saving plumbing upgrades for my Encinitas home?',
          answer: 'Tankless water heaters, low-flow toilets and showerheads, greywater systems, and smart leak detection can reduce water usage by 30-50% while maintaining comfort and function.'
        },
        {
          question: 'Can you install a greywater system in Encinitas?',
          answer: 'Yes. We design and install greywater systems that recycle shower and washing machine water for landscape irrigation, aligning with Encinitas\' environmental values and reducing water bills.'
        },
        {
          question: 'Do beach cottages in Leucadia need special plumbing care?',
          answer: 'Absolutely. Older beach cottages face dual challenges of aging pipes and coastal corrosion. We recommend proactive inspections and upgrades with corrosion-resistant materials to prevent failures.'
        }
      ]
    },
    testimonial: {
      quote: 'Installed a greywater system and low-flow fixtures throughout our Cardiff home. Love supporting a plumber who shares our environmental values.',
      author: 'Lisa T.',
      location: 'Encinitas, CA',
      rating: 5
    }
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
    neighborhoodInfo: {
      highlights: [
        'Known as "The City in the Country" with rural and suburban areas',
        'Large lot sizes mean longer sewer laterals and more complex plumbing runs',
        'Some properties still use private well and septic systems',
        'Poway Unified School District makes it popular for families'
      ],
      waterQualityNotes: 'Poway is served by the City of Poway water utility. Some eastern properties use private wells with water that may be high in minerals, requiring whole-house filtration.',
      infrastructureNotes: 'Poway homes range from 1970s ranch-style with copper plumbing to modern construction with PEX. Rural properties often have unique challenges like longer pipe runs and well pump systems.',
      faqs: [
        {
          question: 'Do you service well water systems in Poway?',
          answer: 'Yes. We service well pumps, pressure tanks, filtration systems, and plumbing for private wells. Well water often requires specialized treatment for minerals, hardness, and iron.'
        },
        {
          question: 'What plumbing challenges do large Poway lots create?',
          answer: 'Longer pipe runs from the street to the house mean more potential for leaks and pressure loss. We design systems to maintain optimal pressure and install accessible cleanouts for maintenance.'
        },
        {
          question: 'Can you work on septic-connected plumbing in Poway?',
          answer: 'Absolutely. We understand septic system requirements and design plumbing that protects your septic system. We can also coordinate with septic specialists when needed.'
        }
      ]
    }
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
    neighborhoodInfo: {
      highlights: [
        'Family-friendly East County city with 58,000 residents',
        'Santee Lakes Recreation Preserve is a community centerpiece',
        'Mix of 1970s-1980s established homes and newer developments',
        'Town Center redevelopment is modernizing the community'
      ],
      waterQualityNotes: 'Santee receives water from the Padre Dam Municipal Water District. Water hardness is consistently high, and older homes without softeners show significant scale buildup.',
      infrastructureNotes: 'Most Santee homes were built between 1970-1990 with copper supply lines. These are now 35-55 years old and approaching the age where pinhole leaks and joint failures become more common.',
      faqs: [
        {
          question: 'Why are Santee homes experiencing more plumbing issues now?',
          answer: 'Most Santee homes are 35-55 years old, reaching the age when original copper pipes develop pinhole leaks and water heaters fail. Proactive replacement prevents expensive emergency repairs.'
        },
        {
          question: 'Should I replace my water heater before it fails?',
          answer: 'If your water heater is 8-12 years old, proactive replacement prevents flooding emergencies and allows you to upgrade to more efficient tankless or heat pump models.'
        },
        {
          question: 'What causes pinhole leaks in Santee copper pipes?',
          answer: 'Santee\'s very hard water (18-22 grains) causes internal corrosion in copper pipes over decades. After 35+ years, pinhole leaks become increasingly common. Repiping with PEX prevents this issue.'
        }
      ]
    }
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
    neighborhoodInfo: {
      highlights: [
        '"The Jewel of the Hills" with charming Village walkable downtown',
        'Mount Helix offers panoramic views and larger estate-style homes',
        'Historic homes in the Village date back to the 1920s',
        'Grossmont Center area is the commercial hub'
      ],
      waterQualityNotes: 'La Mesa is served by Helix Water District. Water hardness averages 16-20 grains per gallon, and older homes show significant mineral deposits in pipes and fixtures.',
      infrastructureNotes: "La Mesa's Village area has some of San Diego County's oldest residential plumbing, with homes from the 1920s-1940s. Many still have cast iron drain lines and galvanized supply pipes that benefit from modern repiping.",
      faqs: [
        {
          question: 'How do you update plumbing in historic La Mesa homes?',
          answer: 'We specialize in minimally invasive repiping that preserves walls, flooring, and architectural details. Our team understands the unique challenges of working with plaster walls and vintage construction.'
        },
        {
          question: 'What is cast iron pipe and why does it need replacement?',
          answer: 'Cast iron drain pipes were standard before 1975. After 60-100 years, they corrode, crack, and develop blockages. Modern PVC or ABS drains are lighter, smoother, and last much longer.'
        },
        {
          question: 'Can you help with my La Mesa kitchen or bathroom remodel?',
          answer: 'Absolutely. We work with contractors and homeowners to design and install all plumbing for kitchen and bath remodels, ensuring code compliance and modern efficiency.'
        }
      ]
    }
  },
];

export function getAreaBySlug(slug: string): AreaData | undefined {
  return AREAS.find((a) => a.slug === slug);
}

export function getAreaSlugs(): string[] {
  return AREAS.map((a) => a.slug);
}

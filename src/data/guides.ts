export interface GuideSection {
  heading: string;
  content: string[];
  items?: string[];
}

export interface GuideData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  readTime: string;
  sections: GuideSection[];
  cta: string;
}

export const GUIDES: GuideData[] = [
  {
    slug: 'plumbing-maintenance-checklist',
    title: 'Seasonal Plumbing Maintenance Checklist',
    metaTitle: 'Plumbing Maintenance Checklist for San Diego Homes | Free Guide',
    metaDescription: 'Free seasonal plumbing maintenance checklist for San Diego homeowners. Prevent costly repairs with these quarterly tasks from Christensen Plumbing.',
    heroHeading: 'Seasonal Plumbing Maintenance Checklist',
    heroSubheading: 'Prevent costly repairs with this quarterly checklist tailored for San Diego homes.',
    readTime: '8 min read',
    sections: [
      {
        heading: 'Spring (March - May)',
        content: ['Spring is ideal for inspecting winter wear and preparing your plumbing for increased summer water use.'],
        items: [
          'Check all faucets for drips and leaks — even a small drip wastes 3,000+ gallons per year',
          'Inspect outdoor hose bibs and sprinkler connections for winter damage',
          'Test your water heater pressure relief valve (lift the lever — water should flow freely)',
          'Flush your water heater to remove sediment buildup from winter',
          'Check toilet flappers and fill valves — running toilets waste up to 200 gallons per day',
          'Inspect under all sinks for moisture, mold, or dripping',
          'Clean shower heads by soaking in vinegar to remove mineral buildup',
        ],
      },
      {
        heading: 'Summer (June - August)',
        content: ['San Diego summers increase water demand and stress on your system. Focus on efficiency and outdoor plumbing.'],
        items: [
          'Monitor your water bill for unexpected increases (may indicate a hidden leak)',
          'Check your water meter: turn off all water, check the meter, wait 2 hours, check again',
          'Inspect washing machine hoses for bulging, cracking, or leaks',
          'Clean garbage disposal: run ice cubes and citrus peels through it',
          'Check irrigation system for leaks, broken heads, and proper coverage',
          'Ensure proper drainage around your foundation — standing water causes problems',
          'Consider installing a water softener if you haven\'t already (San Diego water is 15-20 grains hard)',
        ],
      },
      {
        heading: 'Fall (September - November)',
        content: ['Prepare your plumbing for cooler weather and reduced outdoor water use.'],
        items: [
          'Insulate exposed pipes in garages, crawl spaces, and exterior walls',
          'Drain and store garden hoses before cooler weather arrives',
          'Have your water heater professionally inspected (anode rod, thermostat, connections)',
          'Schedule a drain cleaning if you notice slow drains — prevent holiday backups',
          'Check for leaks around windows and doors where pipes penetrate walls',
          'Test all shut-off valves (main valve, toilet valves, sink valves) to ensure they turn freely',
          'Consider a sewer camera inspection if your home is 30+ years old',
        ],
      },
      {
        heading: 'Winter (December - February)',
        content: ['While San Diego winters are mild, there are still important maintenance tasks to prevent problems.'],
        items: [
          'Know where your main water shut-off valve is and test it',
          'Protect outdoor pipes during rare cold snaps (below 35°F) with insulation',
          'Run a pencil-thin stream of water through seldom-used fixtures to prevent trap dry-out',
          'Check water heater temperature setting (120°F is optimal)',
          'Inspect caulking around tubs, showers, and toilets',
          'Avoid pouring grease down drains during holiday cooking season',
          'Schedule any needed repairs before the busy spring season',
        ],
      },
    ],
    cta: 'Need help with any of these maintenance tasks? Call Christensen Plumbing for professional service.',
  },
  {
    slug: 'emergency-plumbing-guide',
    title: 'Emergency Plumbing Guide',
    metaTitle: 'What to Do in a Plumbing Emergency | San Diego Homeowner Guide',
    metaDescription: 'Know exactly what to do when a plumbing emergency strikes. Step-by-step guide for San Diego homeowners from Christensen Plumbing. Available 24/7.',
    heroHeading: 'Emergency Plumbing Guide',
    heroSubheading: 'Know exactly what to do when a plumbing emergency strikes — before the plumber arrives.',
    readTime: '6 min read',
    sections: [
      {
        heading: 'Step 1: Shut Off the Water',
        content: [
          'The single most important thing you can do in any plumbing emergency is stop the water flow. Every second counts — water damage compounds rapidly.',
          'Locate your main water shut-off valve. In most San Diego homes, it\'s near the water meter at the front of the property, or where the main line enters the house. Turn it clockwise to close.',
        ],
        items: [
          'For toilet issues: shut off the valve behind the toilet (turn clockwise)',
          'For sink leaks: shut off the valves under the sink',
          'For unknown leaks: shut off the main valve at the meter',
          'For water heater problems: shut off the cold water inlet valve on top of the unit',
        ],
      },
      {
        heading: 'Step 2: Assess the Situation',
        content: ['Once the water is off, take a moment to understand what you\'re dealing with.'],
        items: [
          'Burst pipe: You\'ll see water spraying or flowing from a wall, ceiling, or under a cabinet',
          'Sewer backup: Sewage coming up through drains or toilets — a health hazard',
          'Water heater failure: Pooling water around the base, rumbling sounds, or no hot water',
          'Gas leak: Smell of rotten eggs — evacuate immediately and call 911 first',
          'Slab leak: Warm spots on the floor, sound of running water with everything off',
        ],
      },
      {
        heading: 'Step 3: Minimize Damage',
        content: ['While waiting for the plumber, take these steps to protect your home.'],
        items: [
          'Move furniture, electronics, and valuables away from the water',
          'Use towels, mops, and buckets to contain standing water',
          'Open cabinet doors to air out under-sink areas',
          'Turn off the water heater to prevent damage to the unit',
          'If water is near electrical outlets, shut off power to that area at the breaker box',
          'Open windows for ventilation if there\'s any sewage or gas smell',
        ],
      },
      {
        heading: 'Step 4: Document Everything',
        content: ['Documentation is critical for insurance claims.'],
        items: [
          'Take photos and videos of all damage before cleanup',
          'Note the time the emergency started and when you shut off water',
          'Keep receipts for any emergency supplies you purchase',
          'Don\'t throw away damaged items until the insurance adjuster has seen them',
        ],
      },
      {
        heading: 'Step 5: Call a Licensed Emergency Plumber',
        content: [
          'Call Christensen Plumbing at (619) 433-2169 for 24/7 emergency service. Our average response time is 30 minutes across San Diego County.',
          'When you call, be ready to describe: what happened, where the water is coming from, whether you\'ve shut off the water, and your address for fastest dispatch.',
        ],
      },
      {
        heading: 'Common Emergencies and Quick Actions',
        content: [
          'Overflowing toilet: Remove the tank lid and push the flapper down to stop water flow. Then shut off the valve behind the toilet.',
          'Burst pipe: Shut off the main water supply immediately. Open faucets to drain remaining water from the pipes.',
          'Clogged main sewer: Stop using all water in the house. Do not flush toilets or run any drains.',
          'No hot water: Check the pilot light (gas) or breaker (electric). If the tank is leaking, shut off the cold water inlet.',
        ],
      },
    ],
    cta: 'Save our number: (619) 433-2169. Christensen Plumbing responds 24/7 with an average 30-minute response time.',
  },
  {
    slug: 'water-heater-buying-guide',
    title: 'Water Heater Buying Guide',
    metaTitle: 'Water Heater Buying Guide: Tank vs Tankless | San Diego',
    metaDescription: 'Complete guide to choosing a water heater for your San Diego home. Compare tank vs tankless, sizing, costs, and energy efficiency. Free guide from Christensen Plumbing.',
    heroHeading: 'Water Heater Buying Guide',
    heroSubheading: 'Everything San Diego homeowners need to know before buying a new water heater.',
    readTime: '10 min read',
    sections: [
      {
        heading: 'Tank vs Tankless: Which Is Right for You?',
        content: [
          'The two main types of water heaters are traditional tank storage and tankless (on-demand) systems. Each has distinct advantages depending on your household size, budget, and usage patterns.',
        ],
      },
      {
        heading: 'Traditional Tank Water Heaters',
        content: [
          'Tank water heaters store 30-80 gallons of pre-heated water, ready when you need it. They\'re the most common type in San Diego homes and the most affordable to purchase and install.',
        ],
        items: [
          'Upfront cost: $1,200 - $2,500 installed',
          'Lifespan: 8-12 years with proper maintenance',
          'Energy: Continuously heats water (standby heat loss)',
          'Best for: Households with predictable, moderate hot water use',
          'San Diego note: Hard water reduces tank life — annual flushing is essential',
        ],
      },
      {
        heading: 'Tankless Water Heaters',
        content: [
          'Tankless units heat water on demand as it flows through the unit. They never run out of hot water and are significantly more energy-efficient.',
        ],
        items: [
          'Upfront cost: $2,500 - $4,500 installed',
          'Lifespan: 15-20 years with proper maintenance',
          'Energy: Only heats water when needed (20-30% more efficient)',
          'Best for: Larger households, high hot water demand, or efficiency-focused homeowners',
          'San Diego note: Gas models require adequate gas line sizing — we verify during the estimate',
        ],
      },
      {
        heading: 'Sizing Your Water Heater',
        content: [
          'Proper sizing is critical. An undersized unit won\'t keep up with demand, while an oversized unit wastes energy.',
        ],
        items: [
          '1-2 people: 30-40 gallon tank or small tankless (6-7 GPM)',
          '2-3 people: 40-50 gallon tank or mid-size tankless (7-8 GPM)',
          '3-4 people: 50-60 gallon tank or standard tankless (8-9 GPM)',
          '5+ people: 60-80 gallon tank or high-capacity tankless (9-11 GPM)',
          'Multiple simultaneous uses (shower + dishwasher) need higher capacity',
        ],
      },
      {
        heading: 'Gas vs Electric',
        content: [
          'In San Diego, natural gas water heaters are more common and typically cheaper to operate due to lower gas rates relative to electricity.',
        ],
        items: [
          'Gas: Lower operating cost, faster recovery rate, requires proper venting',
          'Electric: No venting needed, simpler installation, higher operating cost',
          'Heat pump (hybrid): Most efficient electric option — 2-3x more efficient than standard electric',
          'Solar: San Diego\'s climate is ideal, but high upfront cost and roof requirements limit adoption',
        ],
      },
      {
        heading: 'Cost Comparison',
        content: [
          'Here\'s what San Diego homeowners typically pay for water heater installation, including unit, labor, permits, and disposal of the old unit.',
        ],
        items: [
          'Tank (40-50 gallon gas): $1,200 - $2,000',
          'Tank (50-75 gallon gas): $1,800 - $2,500',
          'Tankless (gas): $2,500 - $4,500',
          'Heat pump hybrid: $2,800 - $4,000',
          'Permits and inspection: Included in our quotes',
        ],
      },
      {
        heading: 'San Diego-Specific Considerations',
        content: [
          'San Diego\'s extremely hard water (15-20 grains per gallon) significantly impacts water heater lifespan and efficiency. Here\'s what to know.',
        ],
        items: [
          'Flush your tank annually to remove sediment (or we can do it for you)',
          'Consider a water softener to extend water heater life by 3-5 years',
          'Tankless units need descaling every 1-2 years in San Diego\'s hard water',
          'Check the anode rod every 2-3 years (sacrificial rod protects the tank from corrosion)',
          'San Diego permits are required for all water heater replacements — we handle the entire process',
        ],
      },
    ],
    cta: 'Need help choosing? Call Christensen Plumbing at (619) 433-2169 for a free water heater consultation.',
  },
];

export function getGuideBySlug(slug: string): GuideData | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

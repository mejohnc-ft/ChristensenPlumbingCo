export interface HowToStep {
  name: string;
  text: string;
}

export interface ServiceHowTo {
  name: string;
  description: string;
  steps: HowToStep[];
}

export interface ServiceData {
  slug: string;
  name: string;
  heroTitle: string;
  shortDescription: string;
  description: string[];
  features: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedServices: string[];
  howTo?: ServiceHowTo;
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'emergency-plumbing',
    name: 'Emergency Plumbing',
    heroTitle: 'Emergency Plumbing in San Diego',
    shortDescription: '24/7 emergency plumbing services with average 30-minute response time across San Diego County.',
    description: [
      'When a plumbing emergency strikes, every minute counts. Christensen Plumbing provides 24/7 emergency plumbing services throughout San Diego County with an average response time of under 30 minutes.',
      'Whether it\'s a burst pipe at 2 AM, a sewer backup on a holiday, or a gas leak on a weekend, Bill Christensen personally responds to every emergency call. No dispatchers, no subcontractors — just a licensed master plumber who arrives fast and gets the job done right.',
      'We never charge extra for nights, weekends, or holidays. You\'ll receive upfront pricing before any work begins, so there are never surprises on your bill.',
    ],
    features: [
      '24/7 availability, 365 days a year',
      'Average 30-minute response time',
      'No extra charges for nights or weekends',
      'Upfront pricing before work begins',
      'Burst pipe repair and water damage prevention',
      'Emergency sewer line clearing',
      'Gas leak detection and repair',
      'Water heater emergency service',
    ],
    faqs: [
      {
        question: 'How fast can you respond to a plumbing emergency in San Diego?',
        answer: 'Our average response time is under 30 minutes across San Diego County. We serve areas from Oceanside to Chula Vista and respond 24/7, including nights, weekends, and holidays.',
      },
      {
        question: 'Do you charge extra for emergency plumbing calls at night?',
        answer: 'No. Christensen Plumbing never charges extra for emergency calls at any hour, including nights, weekends, and holidays. You\'ll receive upfront pricing before any work begins.',
      },
      {
        question: 'What types of plumbing emergencies do you handle?',
        answer: 'We handle all plumbing emergencies including burst pipes, water leaks, sewer backups, water heater failures, gas line issues, flooding, and frozen pipes.',
      },
      {
        question: 'What should I do while waiting for the plumber?',
        answer: 'Turn off the main water supply if you have a water leak. For gas leaks, evacuate immediately and call 911 first. Move valuables away from affected areas and take photos for insurance purposes.',
      },
      {
        question: 'Are you licensed for emergency plumbing work in California?',
        answer: 'Yes. Christensen Plumbing is fully licensed, bonded, and insured in the state of California for all residential and commercial plumbing services, including emergency work.',
      },
    ],
    relatedServices: ['drain-cleaning', 'pipe-repair', 'water-heaters'],
    howTo: {
      name: 'What to Do During a Plumbing Emergency',
      description: 'Steps to minimize damage while waiting for an emergency plumber in San Diego.',
      steps: [
        { name: 'Shut off the water supply', text: 'Locate your main water shut-off valve (usually near the water meter or where the main line enters your home) and turn it clockwise to stop water flow.' },
        { name: 'Turn off the water heater', text: 'If dealing with a major leak, turn off your water heater to prevent damage. For gas heaters, turn the gas valve to the off position.' },
        { name: 'Open drains and spigots', text: 'Open outdoor spigots and any drains to direct remaining water away from the home and relieve pressure in the pipes.' },
        { name: 'Contain the water', text: 'Use towels, buckets, and mops to contain standing water. Move furniture and valuables away from the affected area.' },
        { name: 'Document the damage', text: 'Take photos and videos of all damage for your insurance claim before cleanup begins.' },
        { name: 'Call a licensed emergency plumber', text: 'Contact Christensen Plumbing at (619) 433-2169 for 24/7 emergency service with average 30-minute response time in San Diego County.' },
      ],
    },
  },
  {
    slug: 'drain-cleaning',
    name: 'Drain Cleaning',
    heroTitle: 'Drain Cleaning Services in San Diego',
    shortDescription: 'Professional drain cleaning with hydro jetting, camera inspection, and root removal throughout San Diego County.',
    description: [
      'Slow drains, recurring clogs, and foul odors are signs your drains need professional attention. Christensen Plumbing provides thorough drain cleaning services using the latest technology to restore full flow to your plumbing system.',
      'We use video camera inspection to diagnose the exact cause of your drain problem before recommending a solution. This ensures we address the root cause — not just the symptom — saving you money on repeat service calls.',
      'Our hydro jetting service uses high-pressure water to scour pipe walls clean, removing grease buildup, mineral deposits, and tree roots. It\'s the most effective drain cleaning method available and leaves your pipes virtually like new.',
    ],
    features: [
      'Video camera drain inspection',
      'Hydro jetting for stubborn clogs',
      'Tree root removal',
      'Grease trap cleaning',
      'Main sewer line clearing',
      'Kitchen and bathroom drain service',
      'Preventive drain maintenance',
      'Same-day service available',
    ],
    faqs: [
      {
        question: 'How much does drain cleaning cost in San Diego?',
        answer: 'Drain cleaning costs vary based on the severity of the clog and the method required. Simple clogs start around $150, while hydro jetting for severe blockages may be more. We provide upfront pricing before any work begins.',
      },
      {
        question: 'What is hydro jetting and is it safe for my pipes?',
        answer: 'Hydro jetting uses high-pressure water (up to 4,000 PSI) to clean pipe walls. It\'s safe for most pipe types and is the most effective method for removing grease, scale, and tree roots. We always camera-inspect first to ensure your pipes can handle the pressure.',
      },
      {
        question: 'How often should I have my drains professionally cleaned?',
        answer: 'We recommend professional drain cleaning every 1-2 years for preventive maintenance. If you have older pipes, trees near your sewer line, or frequent clogs, annual cleaning is advisable.',
      },
      {
        question: 'Can you clean the main sewer line?',
        answer: 'Yes. We clean main sewer lines using cable machines and hydro jetting. We also provide camera inspection to identify the cause of backups, whether it\'s tree roots, bellied pipe, or buildup.',
      },
      {
        question: 'What causes recurring drain clogs?',
        answer: 'Common causes include tree root intrusion, grease buildup, mineral scale, corroded pipes, and improper slope in the drain line. A camera inspection can pinpoint the exact cause so we can provide a lasting solution.',
      },
    ],
    relatedServices: ['emergency-plumbing', 'pipe-repair', 'sewer-services'],
    howTo: {
      name: 'How to Prevent Clogged Drains',
      description: 'Simple maintenance steps to keep your drains flowing freely and avoid costly clogs in your San Diego home.',
      steps: [
        { name: 'Use drain screens', text: 'Install mesh drain screens over all shower, tub, and sink drains to catch hair, food particles, and debris before they enter the pipe.' },
        { name: 'Run hot water after use', text: 'After using the kitchen sink, run hot water for 15-30 seconds to help flush grease and soap residue through the pipes.' },
        { name: 'Clean drains monthly', text: 'Pour a half cup of baking soda followed by a half cup of white vinegar down each drain monthly. Let it fizz for 15 minutes, then flush with hot water.' },
        { name: 'Avoid pouring grease down drains', text: 'Never pour cooking oil, grease, or fat down the drain. Let it cool and dispose of it in the trash instead.' },
        { name: 'Schedule professional cleaning', text: 'Have your drains professionally cleaned every 1-2 years to remove buildup that home methods cannot reach. Call Christensen Plumbing at (619) 433-2169.' },
      ],
    },
  },
  {
    slug: 'water-heaters',
    name: 'Water Heater Services',
    heroTitle: 'Water Heater Installation & Repair in San Diego',
    shortDescription: 'Expert water heater installation, repair, and replacement for tank and tankless systems in San Diego County.',
    description: [
      'Whether your water heater is leaking, not producing hot water, or you\'re ready to upgrade to a more efficient system, Christensen Plumbing has you covered. We service all major brands and both tank and tankless systems.',
      'A failing water heater can mean more than just cold showers — it can lead to water damage and higher energy bills. We provide thorough diagnosis to determine whether a repair or replacement makes the most financial sense for your situation.',
      'If you\'re considering a tankless water heater, we\'ll help you choose the right size for your home and handle the complete installation, including any necessary gas line or electrical upgrades.',
    ],
    features: [
      'Tank and tankless water heater installation',
      'Water heater repair for all brands',
      'Energy-efficient upgrade consultations',
      'Anode rod replacement',
      'Sediment flushing and maintenance',
      'Emergency water heater service',
      'Gas and electric water heaters',
      'Permit handling and code compliance',
    ],
    faqs: [
      {
        question: 'How long does a water heater last?',
        answer: 'Traditional tank water heaters typically last 8-12 years, while tankless water heaters can last 15-20 years with proper maintenance. Regular sediment flushing and anode rod replacement can extend the life of your unit.',
      },
      {
        question: 'Should I get a tank or tankless water heater?',
        answer: 'It depends on your household size and hot water usage. Tankless heaters are more energy-efficient and provide endless hot water, but have a higher upfront cost. We\'ll help you evaluate which makes sense for your home and budget.',
      },
      {
        question: 'How much does water heater installation cost in San Diego?',
        answer: 'Installation costs depend on the type and size of unit, and whether any plumbing or gas line modifications are needed. We provide free estimates with upfront pricing. Tank water heater installations typically start around $1,200.',
      },
      {
        question: 'Why is my water heater making strange noises?',
        answer: 'Popping, rumbling, or cracking noises usually indicate sediment buildup at the bottom of the tank. A professional flush can resolve this. If you hear a high-pitched whine, it could indicate a faulty heating element.',
      },
      {
        question: 'Do you handle water heater permits in San Diego?',
        answer: 'Yes. Water heater replacements in San Diego County require a permit. We handle the entire permitting process and ensure your installation meets all local building codes.',
      },
    ],
    relatedServices: ['emergency-plumbing', 'pipe-repair', 'kitchen-plumbing'],
    howTo: {
      name: 'How to Maintain Your Water Heater',
      description: 'Annual maintenance steps to extend the life of your water heater and improve efficiency.',
      steps: [
        { name: 'Check the temperature setting', text: 'Verify your water heater thermostat is set to 120°F (49°C). This prevents scalding and reduces energy costs by up to 10%.' },
        { name: 'Test the pressure relief valve', text: 'Lift the lever on the temperature and pressure (T&P) relief valve. Water should flow freely and stop when released. If it drips or does not flow, the valve needs replacement.' },
        { name: 'Flush sediment from the tank', text: 'Connect a garden hose to the drain valve at the bottom of the tank. Open the valve and let water flow until it runs clear. This removes mineral sediment that reduces efficiency.' },
        { name: 'Inspect the anode rod', text: 'Check the sacrificial anode rod every 2-3 years. If it is less than half an inch thick or coated with calcium, it needs replacement to prevent tank corrosion.' },
        { name: 'Check for leaks', text: 'Inspect all connections, the T&P valve discharge pipe, and the base of the tank for any signs of moisture or corrosion. Address leaks promptly.' },
      ],
    },
  },
  {
    slug: 'pipe-repair',
    name: 'Pipe Repair & Repiping',
    heroTitle: 'Pipe Repair & Repiping Services in San Diego',
    shortDescription: 'Expert pipe repair, leak detection, and whole-house repiping services for San Diego homes.',
    description: [
      'From minor pinhole leaks to complete whole-house repiping, Christensen Plumbing provides expert pipe services throughout San Diego County. We work with copper, PEX, CPVC, and galvanized steel pipes.',
      'Many San Diego homes built before 1970 still have galvanized steel pipes that corrode from the inside, reducing water pressure and contaminating your water. Repiping with modern materials restores full pressure and eliminates rust.',
      'We use minimally invasive techniques whenever possible to reduce wall damage and restoration costs. Every repiping project includes a thorough inspection, clear scope of work, and upfront pricing.',
    ],
    features: [
      'Leak detection and pinhole leak repair',
      'Whole-house repiping (copper or PEX)',
      'Galvanized pipe replacement',
      'Slab leak repair',
      'Water pressure restoration',
      'Pipe insulation',
      'Emergency pipe repair',
      'Minimally invasive techniques',
    ],
    faqs: [
      {
        question: 'How do I know if my house needs repiping?',
        answer: 'Signs include low water pressure, discolored water, frequent leaks, visible pipe corrosion, and your home being over 50 years old with original galvanized pipes. A professional inspection can determine if repiping is needed.',
      },
      {
        question: 'How long does a whole-house repipe take?',
        answer: 'Most whole-house repiping projects take 2-4 days depending on home size and accessibility. We minimize disruption and clean up thoroughly. Water is typically restored the same day we start.',
      },
      {
        question: 'Should I choose copper or PEX for repiping?',
        answer: 'Both are excellent choices. Copper is durable and time-tested but costs more. PEX is flexible, freeze-resistant, and more affordable. We\'ll help you choose based on your budget and specific situation.',
      },
      {
        question: 'What is a slab leak and how is it repaired?',
        answer: 'A slab leak is a leak in the pipes running beneath your home\'s concrete foundation. Repair options include spot repair, rerouting the pipe above ground, or epoxy lining. The best approach depends on the leak\'s location and severity.',
      },
      {
        question: 'How much does repiping a house cost in San Diego?',
        answer: 'Repiping costs depend on home size, number of fixtures, pipe material chosen, and accessibility. Most San Diego homes range from $4,000 to $10,000. We provide free estimates with detailed, upfront pricing.',
      },
    ],
    relatedServices: ['leak-detection', 'emergency-plumbing', 'bathroom-renovation'],
  },
  {
    slug: 'leak-detection',
    name: 'Leak Detection',
    heroTitle: 'Leak Detection Services in San Diego',
    shortDescription: 'Advanced non-invasive leak detection technology to find hidden leaks and protect your San Diego home.',
    description: [
      'Hidden leaks can cause thousands of dollars in water damage before you even notice them. Christensen Plumbing uses advanced electronic leak detection equipment to pinpoint leaks accurately — without tearing up your walls or floors.',
      'Our non-invasive detection methods include acoustic listening devices, thermal imaging, and pressure testing. We can locate leaks behind walls, under concrete slabs, and in underground pipes with precision.',
      'Early leak detection saves you money on water bills, prevents mold growth, and protects your home\'s structural integrity. If you\'ve noticed unexplained increases in your water bill or damp spots, call us for an inspection.',
    ],
    features: [
      'Electronic leak detection equipment',
      'Thermal imaging technology',
      'Acoustic listening devices',
      'Slab leak detection',
      'Underground pipe locating',
      'Non-invasive methods',
      'Pressure testing',
      'Post-repair verification',
    ],
    faqs: [
      {
        question: 'How do you detect leaks without opening walls?',
        answer: 'We use electronic acoustic sensors that amplify the sound of water escaping pipes, thermal cameras that detect temperature differences from moisture, and pressure testing to isolate the leak\'s general area. These methods are highly accurate and non-invasive.',
      },
      {
        question: 'What are signs of a hidden water leak?',
        answer: 'Common signs include unexplained increases in water bills, the sound of running water when no fixtures are on, damp or warm spots on floors, mold or mildew smells, cracks in walls or foundation, and low water pressure.',
      },
      {
        question: 'How much does leak detection cost?',
        answer: 'Leak detection service fees vary based on the complexity of the search. Basic detection starts at a set service fee, which is waived if you hire us for the repair. We always provide upfront pricing.',
      },
      {
        question: 'Can you detect slab leaks?',
        answer: 'Yes. Slab leak detection is one of our specialties. We use a combination of acoustic equipment and pressure testing to locate leaks beneath concrete foundations without unnecessary excavation.',
      },
      {
        question: 'What happens after you find the leak?',
        answer: 'We\'ll explain exactly what we found, show you the location, and provide repair options with upfront pricing. Repair methods depend on the leak\'s location and severity — options include spot repair, rerouting, or epoxy lining.',
      },
    ],
    relatedServices: ['pipe-repair', 'emergency-plumbing', 'sewer-services'],
    howTo: {
      name: 'How to Check for Hidden Water Leaks',
      description: 'Simple steps to detect hidden water leaks in your San Diego home before they cause costly damage.',
      steps: [
        { name: 'Check your water meter', text: 'Turn off all water fixtures and appliances in your home. Check your water meter and note the reading. Wait 2 hours without using water, then check again. If the reading changed, you have a leak.' },
        { name: 'Monitor your water bill', text: 'Compare your current water bill to the same month last year. An unexplained increase of 10% or more may indicate a hidden leak.' },
        { name: 'Inspect visible pipes', text: 'Check under all sinks, around toilets, behind the water heater, and near the washing machine for signs of moisture, dripping, or water stains.' },
        { name: 'Look for wall and ceiling stains', text: 'Check walls and ceilings for discolored patches, bubbling paint, or warping. These often indicate a pipe leak behind the surface.' },
        { name: 'Call a professional', text: 'If you suspect a hidden leak, contact Christensen Plumbing at (619) 433-2169 for non-invasive electronic leak detection that pinpoints leaks without damaging walls or floors.' },
      ],
    },
  },
  {
    slug: 'bathroom-renovation',
    name: 'Bathroom Renovation',
    heroTitle: 'Bathroom Plumbing Renovation in San Diego',
    shortDescription: 'Complete bathroom plumbing renovation and fixture installation for San Diego homes.',
    description: [
      'A bathroom renovation is one of the best investments you can make in your home. Christensen Plumbing handles all the plumbing aspects of your bathroom remodel — from rough-in to finish — with expert craftsmanship.',
      'Whether you\'re updating fixtures, relocating plumbing for a new layout, or gutting the entire bathroom, we ensure everything is installed correctly, up to code, and built to last. We work with homeowners and general contractors alike.',
      'From walk-in showers and freestanding tubs to dual vanities and heated floors, we have the experience to bring your bathroom vision to life. Every project includes proper permits and inspections.',
    ],
    features: [
      'Complete bathroom plumbing rough-in',
      'Fixture installation (sinks, toilets, tubs)',
      'Shower and bathtub plumbing',
      'Pipe relocation for new layouts',
      'Water supply line installation',
      'Drain and vent installation',
      'Permit handling and inspections',
      'Collaboration with general contractors',
    ],
    faqs: [
      {
        question: 'Do you handle the entire bathroom renovation or just plumbing?',
        answer: 'We specialize in the plumbing portion of bathroom renovations — all water supply lines, drains, vents, and fixture connections. We work alongside your general contractor or can recommend trusted partners for tile, electrical, and other trades.',
      },
      {
        question: 'How long does bathroom plumbing renovation take?',
        answer: 'The plumbing portion typically takes 2-5 days depending on the scope. A simple fixture replacement can be done in a day, while a complete plumbing rough-in for a new layout may take up to a week.',
      },
      {
        question: 'Can you relocate plumbing for a new bathroom layout?',
        answer: 'Yes. We regularly relocate water supply lines, drains, and vents to accommodate new bathroom layouts. This includes moving fixtures to new positions, adding new supply lines, and modifying drain routing.',
      },
      {
        question: 'Do bathroom renovations require plumbing permits in San Diego?',
        answer: 'Yes, most bathroom renovations that involve moving or adding plumbing require a permit in San Diego County. We handle the entire permitting process and schedule required inspections.',
      },
      {
        question: 'How much does bathroom renovation plumbing cost?',
        answer: 'Costs depend on the scope of work. Simple fixture replacements start around $500, while a complete plumbing rough-in for a new layout ranges from $2,000 to $5,000. We provide free estimates with detailed pricing.',
      },
    ],
    relatedServices: ['pipe-repair', 'water-heaters', 'kitchen-plumbing'],
  },
  {
    slug: 'kitchen-plumbing',
    name: 'Kitchen Plumbing',
    heroTitle: 'Kitchen Plumbing Services in San Diego',
    shortDescription: 'Expert kitchen plumbing installation, repair, and renovation services for San Diego homes.',
    description: [
      'Your kitchen is the heart of your home, and reliable plumbing is essential to keep it running smoothly. Christensen Plumbing provides complete kitchen plumbing services from faucet installation to complete kitchen remodel plumbing.',
      'Whether you need a garbage disposal replaced, a new dishwasher connected, or a complete kitchen plumbing renovation, we handle it all with precision and care. We work with all fixture brands and styles.',
      'Kitchen plumbing problems like slow drains, leaky faucets, and low water pressure don\'t just cause inconvenience — they waste water and money. Let us diagnose and fix the issue properly the first time.',
    ],
    features: [
      'Kitchen faucet installation and repair',
      'Garbage disposal installation',
      'Dishwasher connection',
      'Kitchen sink replacement',
      'Under-sink plumbing repair',
      'Kitchen drain cleaning',
      'Water filtration system installation',
      'Kitchen remodel plumbing rough-in',
    ],
    faqs: [
      {
        question: 'How much does it cost to replace a kitchen faucet?',
        answer: 'Kitchen faucet replacement typically costs between $150 and $350, depending on the faucet model and any additional modifications needed. If you supply the faucet, the installation labor is less. We provide upfront pricing.',
      },
      {
        question: 'Can you install a garbage disposal?',
        answer: 'Yes. We install all types of garbage disposals, from basic models to heavy-duty commercial-grade units. Installation includes mounting, plumbing connections, and testing. If electrical work is needed, we can coordinate with an electrician.',
      },
      {
        question: 'Why does my kitchen sink drain slowly?',
        answer: 'Slow kitchen drains are usually caused by grease buildup, food debris, or a clog further down the drain line. A professional cleaning with our drain equipment resolves most slow kitchen drains in a single visit.',
      },
      {
        question: 'Do you handle kitchen remodel plumbing?',
        answer: 'Yes. We handle all plumbing aspects of kitchen remodels including moving water supply lines, relocating drains, installing new fixtures, and connecting appliances. We work with homeowners and general contractors.',
      },
      {
        question: 'Can you install a water filtration system under my kitchen sink?',
        answer: 'Yes. We install under-sink water filtration and reverse osmosis systems. We can help you choose the right system for your water quality needs and handle the complete installation including a dedicated faucet.',
      },
    ],
    relatedServices: ['drain-cleaning', 'bathroom-renovation', 'water-heaters'],
  },
  {
    slug: 'sewer-services',
    name: 'Sewer Services',
    heroTitle: 'Sewer Line Services in San Diego',
    shortDescription: 'Complete sewer line inspection, cleaning, repair, and replacement services in San Diego County.',
    description: [
      'Sewer line problems are among the most disruptive and expensive plumbing issues a homeowner can face. Christensen Plumbing provides comprehensive sewer services from inspection and cleaning to repair and replacement.',
      'We begin every sewer service with a camera inspection to accurately diagnose the problem. This eliminates guesswork and ensures we recommend the most cost-effective solution. You\'ll see the video footage and understand exactly what\'s happening in your sewer line.',
      'Whether your sewer line is clogged with tree roots, collapsed from age, or offset at a joint, we have the equipment and expertise to fix it. We offer both traditional excavation and trenchless repair methods to minimize disruption to your yard.',
    ],
    features: [
      'Sewer camera inspection',
      'Sewer line cleaning and root removal',
      'Sewer line repair and replacement',
      'Trenchless sewer repair options',
      'Sewer line locating',
      'Backflow prevention',
      'Sewer odor investigation',
      'Emergency sewer service',
    ],
    faqs: [
      {
        question: 'How do I know if my sewer line is damaged?',
        answer: 'Signs include multiple drain backups, gurgling sounds in drains, foul odors, soggy spots in your yard, and sewage smells near your foundation. A camera inspection can confirm the diagnosis.',
      },
      {
        question: 'What is trenchless sewer repair?',
        answer: 'Trenchless repair methods like pipe lining and pipe bursting allow us to repair or replace your sewer line without excavating your entire yard. A small access point is created, and the repair is done from the inside. This saves time, money, and your landscaping.',
      },
      {
        question: 'How much does sewer line replacement cost in San Diego?',
        answer: 'Sewer line replacement costs depend on length, depth, accessibility, and method. Traditional replacement ranges from $3,000 to $10,000, while trenchless methods may cost more upfront but save on landscape restoration. We provide free estimates.',
      },
      {
        question: 'How often should I have my sewer line inspected?',
        answer: 'We recommend a sewer camera inspection every 2-3 years, or immediately if you notice signs of sewer problems. Older homes with clay or cast iron pipes should be inspected more frequently.',
      },
      {
        question: 'Can tree roots damage my sewer line?',
        answer: 'Yes. Tree roots are one of the most common causes of sewer line damage in San Diego. Roots seek out moisture and can penetrate pipe joints, causing blockages and eventually cracking or collapsing the pipe.',
      },
    ],
    relatedServices: ['drain-cleaning', 'emergency-plumbing', 'leak-detection'],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}

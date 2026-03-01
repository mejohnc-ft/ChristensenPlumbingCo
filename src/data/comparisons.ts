export interface ComparisonPoint {
  category: string;
  christensen: string;
  competitor: string;
  advantage: 'christensen' | 'competitor' | 'neutral';
}

export interface ComparisonData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  intro: string[];
  comparisonPoints: ComparisonPoint[];
  conclusion: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const COMPARISONS: ComparisonData[] = [
  {
    slug: 'big-box-stores',
    title: 'vs Big Box Store Plumbing',
    metaTitle: 'Local Plumber vs Big Box Store Plumbing Services | San Diego',
    metaDescription: 'Compare Christensen Plumbing with big box store plumbing services in San Diego. Learn why a local licensed plumber delivers better results, warranties, and value.',
    heroHeading: 'Local Plumber vs Big Box Store Plumbing',
    heroSubheading: 'Why San Diego homeowners choose a dedicated plumber over big-box installation services.',
    intro: [
      'Big box home improvement stores offer plumbing installation services, but they typically subcontract the work to third-party installers. This creates a gap in accountability that can cost you time, money, and peace of mind.',
      'When you hire Christensen Plumbing, you get a single point of contact who is personally responsible for the quality of work from start to finish.',
    ],
    comparisonPoints: [
      { category: 'Who does the work?', christensen: 'Owner-operator master plumber (Bill Christensen) on every job', competitor: 'Random subcontractor assigned by the store — different person each time', advantage: 'christensen' },
      { category: 'Licensing', christensen: 'Fully licensed, bonded, and insured — you can verify our license', competitor: 'Store is licensed; actual installer credentials vary', advantage: 'christensen' },
      { category: 'Response time', christensen: 'Average 30-minute response for emergencies, same-day for standard', competitor: 'Typically 3-7 day scheduling window', advantage: 'christensen' },
      { category: 'Pricing transparency', christensen: 'Upfront written quote before work begins — no hidden fees', competitor: 'Store price + installation fee, often with add-on charges discovered on-site', advantage: 'christensen' },
      { category: 'Product selection', christensen: 'We recommend the best product for your situation from any manufacturer', competitor: 'Limited to brands the store carries', advantage: 'christensen' },
      { category: 'Warranty', christensen: '1-year workmanship warranty plus manufacturer warranty', competitor: 'Store warranty on product; installation warranty varies by subcontractor', advantage: 'christensen' },
      { category: 'Permits', christensen: 'We pull all required permits and handle inspections', competitor: 'Permit responsibility often unclear between store and installer', advantage: 'christensen' },
      { category: 'Follow-up service', christensen: 'Call us anytime — same plumber who did the install', competitor: 'Must go through store customer service to schedule a return visit', advantage: 'christensen' },
    ],
    conclusion: [
      'Big box stores are great for buying materials, but when it comes to installation, a local licensed plumber delivers better accountability, faster service, and superior workmanship.',
      'At Christensen Plumbing, every job is backed by a real person you can call directly. No subcontractors, no run-around, no surprises.',
    ],
    faqs: [
      { question: 'Is a local plumber more expensive than a big box store installer?', answer: 'Not necessarily. When you factor in the store markup, installation fees, and potential add-on charges, a local plumber is often comparable or less expensive — with significantly better service and accountability.' },
      { question: 'Can I buy my own fixture and have you install it?', answer: 'Absolutely. We install customer-supplied fixtures all the time. We can also help you choose the right product for your needs and often get professional pricing from suppliers.' },
      { question: 'What if something goes wrong after a big box store installation?', answer: 'You will likely need to navigate the store\'s customer service process to get a subcontractor back. With Christensen Plumbing, just call us directly and we\'ll handle it.' },
    ],
  },
  {
    slug: 'handyman-services',
    title: 'vs Handyman Services',
    metaTitle: 'Licensed Plumber vs Handyman for Plumbing Work | San Diego',
    metaDescription: 'Should you hire a handyman or licensed plumber in San Diego? Compare qualifications, liability, and results between Christensen Plumbing and handyman services.',
    heroHeading: 'Licensed Plumber vs Handyman Services',
    heroSubheading: 'Why plumbing work requires a licensed specialist — not a generalist.',
    intro: [
      'Handyman services handle a wide range of home repairs, and some basic plumbing tasks fall within their scope. However, California law restricts what handymen can legally do when it comes to plumbing work.',
      'For anything beyond minor repairs (replacing a faucet or unclogging a drain), you need a licensed plumber. Here\'s why it matters for your home and your wallet.',
    ],
    comparisonPoints: [
      { category: 'Legal authority', christensen: 'Licensed to perform all plumbing work in California', competitor: 'Limited to jobs under $500 by California law (B&P Code 7048)', advantage: 'christensen' },
      { category: 'Training', christensen: 'Master plumber with 20+ years of specialized plumbing training', competitor: 'General skills across many trades — limited plumbing depth', advantage: 'christensen' },
      { category: 'Permits', christensen: 'Can pull plumbing permits required by San Diego building code', competitor: 'Cannot pull plumbing permits — your work may be unpermitted', advantage: 'christensen' },
      { category: 'Insurance', christensen: 'Full commercial liability and workers\' comp insurance', competitor: 'Coverage varies — many handymen have limited or no insurance', advantage: 'christensen' },
      { category: 'Diagnosis ability', christensen: 'Advanced tools: camera inspection, electronic leak detection, pressure testing', competitor: 'Basic visual inspection only', advantage: 'christensen' },
      { category: 'Code compliance', christensen: 'All work meets current California Plumbing Code', competitor: 'May not be aware of current code requirements', advantage: 'christensen' },
      { category: 'Home sale impact', christensen: 'Permitted, inspected work adds value and passes disclosure', competitor: 'Unpermitted work can delay or derail a home sale', advantage: 'christensen' },
      { category: 'Cost for small jobs', christensen: 'Service call fee applies for diagnostic visit', competitor: 'May be slightly cheaper for very minor repairs', advantage: 'competitor' },
    ],
    conclusion: [
      'A handyman can be a good choice for simple home tasks like changing a faucet or tightening a fitting. But for anything involving supply lines, drain systems, water heaters, or gas lines, you need a licensed plumber.',
      'The cost difference is small, but the risk difference is enormous. Improperly done plumbing can cause water damage, mold, and even gas leaks. Protect your home — hire a licensed plumber.',
    ],
    faqs: [
      { question: 'Can a handyman legally do plumbing in California?', answer: 'California law allows handymen to do minor plumbing repairs on jobs totaling under $500. Anything involving permits, water heaters, gas lines, or sewer work requires a licensed plumber (C-36 license).' },
      { question: 'What happens if unpermitted plumbing work causes damage?', answer: 'Your homeowner\'s insurance may deny claims for damage caused by unpermitted or unlicensed work. You may also face code violation fines and be required to redo the work with permits.' },
      { question: 'Is it cheaper to hire a handyman for plumbing?', answer: 'For very simple tasks like replacing a faucet, a handyman may charge less. But for any job requiring permits or specialized knowledge, a licensed plumber prevents costly mistakes that far exceed any initial savings.' },
    ],
  },
  {
    slug: 'diy-plumbing',
    title: 'vs DIY Plumbing',
    metaTitle: 'DIY Plumbing vs Hiring a Professional Plumber | San Diego',
    metaDescription: 'Thinking about DIY plumbing? Compare the risks and costs of DIY vs hiring Christensen Plumbing in San Diego. Learn which jobs to tackle and which to leave to the pros.',
    heroHeading: 'DIY Plumbing vs Professional Plumber',
    heroSubheading: 'Know which plumbing jobs you can handle — and when to call a pro.',
    intro: [
      'YouTube tutorials make plumbing look easy, and some simple tasks truly are DIY-friendly. But plumbing mistakes can cause thousands of dollars in water damage, mold, and structural problems.',
      'Here\'s an honest comparison to help you decide when to grab your wrench and when to call Christensen Plumbing.',
    ],
    comparisonPoints: [
      { category: 'Simple faucet swap', christensen: 'Done right the first time in under an hour, with warranty', competitor: 'Usually manageable with basic tools and a tutorial', advantage: 'neutral' },
      { category: 'Toilet replacement', christensen: 'Proper wax ring seal, level set, and code-compliant connection', competitor: 'Possible for handy homeowners, but improper sealing causes leaks', advantage: 'christensen' },
      { category: 'Water heater install', christensen: 'Permitted, code-compliant installation with proper venting and gas/electrical', competitor: 'Dangerous — improper gas connections can cause carbon monoxide or explosion', advantage: 'christensen' },
      { category: 'Drain cleaning', christensen: 'Professional tools clear the clog and diagnose the underlying cause', competitor: 'Store-bought drain cleaner may work temporarily, can damage pipes long-term', advantage: 'christensen' },
      { category: 'Leak repair', christensen: 'Correct diagnosis, proper repair, and verification the fix holds', competitor: 'Patch fixes often fail and can mask a bigger problem', advantage: 'christensen' },
      { category: 'Repiping', christensen: 'Engineered system design, proper sizing, and pressure balancing', competitor: 'Not recommended — requires permits, specialized tools, and expertise', advantage: 'christensen' },
      { category: 'Time investment', christensen: 'A few hours of professional work vs your entire weekend', competitor: 'Multiple trips to the hardware store, watching tutorials, and troubleshooting', advantage: 'christensen' },
      { category: 'Cost of mistakes', christensen: 'Insured — any errors covered at no additional cost', competitor: 'Water damage repair averages $3,000-$5,000 for a significant leak', advantage: 'christensen' },
    ],
    conclusion: [
      'Some plumbing tasks are perfectly fine to DIY: changing a showerhead, replacing a faucet aerator, or tightening a loose handle. These won\'t put your home at risk if something goes slightly wrong.',
      'But for anything involving water supply lines, drain systems, gas connections, or permits, the savings from DIY don\'t justify the risk. A $200 professional repair is much cheaper than a $5,000 water damage claim.',
    ],
    faqs: [
      { question: 'What plumbing can I safely do myself?', answer: 'Safe DIY tasks include: replacing showerheads, swapping faucet aerators, replacing toilet flappers, clearing simple sink clogs with a plunger, and installing new toilet seats. Anything involving pipes, supply lines, or gas should be left to a professional.' },
      { question: 'Will DIY plumbing void my home insurance?', answer: 'If DIY plumbing work causes water damage and it\'s determined the work was improperly done or unpermitted, your insurance company may deny the claim. Always check your policy and consider the risk.' },
      { question: 'How much does it cost to fix a DIY plumbing mistake?', answer: 'It varies widely. A minor leak fix might cost $150-$300. But water damage from a failed DIY project averages $3,000-$5,000 for cleanup, drying, and repairs — not including mold remediation if needed.' },
    ],
  },
];

export function getComparisonBySlug(slug: string): ComparisonData | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getComparisonSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}

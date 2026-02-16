import type { Project, PortfolioPhoto } from '../lib/supabase';

const photo = (
  id: string,
  title: string,
  filename: string,
  category: string,
  project_id: string,
  created_at: string,
): PortfolioPhoto => ({
  id,
  title,
  description: '',
  image_url: `/images/portfolio/${filename}`,
  category,
  project_id,
  created_at,
  updated_at: created_at,
});

// Project IDs from the original database
const P1 = '829f351a-5f70-4a18-b502-e9181627984b'; // Outdoor Granite Kitchen
const P2 = 'fb767e1f-cab2-404d-b292-00e7920637f0'; // Repiping and Bathroom Remodeling
const P3 = '6c1a3ef0-95e5-47fb-9daa-d215e95f2fb2'; // Residential Water Heater Installation
const P4 = '685f4b7f-269b-4d7c-aac4-d06f49e27b1e'; // Luxury Bathroom Remodel

const photos: PortfolioPhoto[] = [
  // --- Outdoor Granite Kitchen (P1) - 34 photos ---
  photo('ba62d99f-e8f4-44a0-ad6e-26ec309bf6f7', 'Photo 1', '1751227353500-mafat7ja0m.jpg', 'general', P1, '2025-06-29T20:02:33.897Z'),
  photo('1a7d5b01-6790-446d-b357-ad4b98bf97b7', 'Photo 2', '1751227354024-rkuvqmqfx1.jpg', 'general', P1, '2025-06-29T20:02:34.283Z'),
  photo('b8c7eb85-4e6e-4afe-9e2a-8b562b70974b', 'Photo 3', '1751227354421-l8rjc26fne.jpg', 'general', P1, '2025-06-29T20:02:34.945Z'),
  photo('3578a1b6-e6f3-4930-b3be-2b989e4bc9b1', 'Photo 4', '1751227355066-r4m7gpjvqhd.jpg', 'general', P1, '2025-06-29T20:02:35.502Z'),
  photo('a92a1e7c-fc8f-44b5-bf4a-ba55d71eb63a', 'Photo 5', '1751227355625-f5x2pmf2y2e.jpg', 'general', P1, '2025-06-29T20:02:36.159Z'),
  photo('64bd1233-e69c-41e0-9caf-ecf0decdde12', 'Photo 6', '1751227356288-tiwwa21zn8r.jpg', 'general', P1, '2025-06-29T20:02:36.729Z'),
  photo('150f9d61-204e-4c01-83c8-1e10b886851f', 'Photo 7', '1751227356856-d2nc51s78y.jpg', 'general', P1, '2025-06-29T20:02:37.280Z'),
  photo('3da0045a-d668-4a19-bfb0-42830f61692d', 'Photo 8', '1751227357405-2nz9md0brn6.jpg', 'general', P1, '2025-06-29T20:02:38.047Z'),
  photo('3df1b769-8146-4003-a124-67de64e6f01c', 'Photo 9', '1751227358171-g8snnsoij5.jpg', 'general', P1, '2025-06-29T20:02:38.358Z'),
  photo('5cd4c4d6-894a-485a-9335-064ffb9cfc8b', 'Photo 10', '1751227358481-gvqvkw4z0ah.jpg', 'general', P1, '2025-06-29T20:02:38.667Z'),
  photo('bc32f55d-7155-4b2c-bfd3-311aba865339', 'Photo 11', '1751227358787-ew1etjjnfqw.jpg', 'general', P1, '2025-06-29T20:02:39.612Z'),
  photo('041f7e6c-47cb-4b77-992a-ed04faea8679', 'Photo 12', '1751227359739-zc3s7fhcm6.jpg', 'general', P1, '2025-06-29T20:02:40.137Z'),
  photo('3fe89110-3f21-4271-9087-9d77680a0a3e', 'Photo 13', '1751227360273-jzwo62l90kg.jpg', 'general', P1, '2025-06-29T20:02:40.916Z'),
  photo('f295d505-f3a6-4e85-a1c8-7735cf68a7a6', 'Photo 14', '1751227361038-la2frcftfgn.jpg', 'general', P1, '2025-06-29T20:02:41.247Z'),
  photo('a7727ece-80c4-45c6-92a4-6b8fe3a47e91', 'Photo 15', '1751227361370-9b7yh1ls9hb.jpg', 'general', P1, '2025-06-29T20:02:41.789Z'),
  photo('a1e82107-4c2d-428e-b8a9-b0e41ad85134', 'Photo 16', '1751227361921-3w4mzph5bhq.jpg', 'general', P1, '2025-06-29T20:02:42.509Z'),
  photo('118460a2-7ae9-4bd4-a0ce-9356913f74a9', 'Photo 17', '1751227362628-a44l2ujb2jh.jpg', 'general', P1, '2025-06-29T20:02:43.127Z'),
  photo('0bb5738c-b69b-4485-b79b-9857e8ae3a81', 'Photo 18', '1751227363245-zzq7xib4gh.jpg', 'general', P1, '2025-06-29T20:02:43.840Z'),
  photo('6f79f4b5-b056-4355-8422-abb70af74828', 'Photo 19', '1751227364051-ti3az09d6j.jpg', 'general', P1, '2025-06-29T20:02:44.793Z'),
  photo('5d8e1030-6187-4618-b5ba-64588f016094', 'Photo 20', '1751227364921-buwlbcm2gkl.jpg', 'general', P1, '2025-06-29T20:02:45.563Z'),
  photo('6ea54e53-8c89-439b-98de-f649aabae5cb', 'Photo 21', '1751227365686-ksi8j3t1zj.jpg', 'general', P1, '2025-06-29T20:02:46.526Z'),
  photo('50137a2a-b695-4111-853a-5031f0972b60', 'Photo 22', '1751227366677-ixj6iyx977.jpg', 'general', P1, '2025-06-29T20:02:47.228Z'),
  photo('d46de959-4d33-4717-8a11-2844df2f843b', 'Photo 23', '1751227367352-q4595zm458t.jpg', 'general', P1, '2025-06-29T20:02:47.660Z'),
  photo('7ea38836-4bfa-4b49-a34b-c2d0b5a6210a', 'Photo 24', '1751227367788-idr01ouscvl.jpg', 'general', P1, '2025-06-29T20:02:48.583Z'),
  photo('ee71a49a-4dfb-4bbd-bb1d-0a3eae473195', 'Photo 25', '1751227368770-2b08d7di6hy.jpg', 'general', P1, '2025-06-29T20:02:49.438Z'),
  photo('670282f5-857a-403c-9017-9952c086086e', 'Photo 26', '1751227369564-e95p3afw9qi.jpg', 'general', P1, '2025-06-29T20:02:50.169Z'),
  photo('e4e9209a-116c-492c-aaad-f8813e411585', 'Photo 27', '1751227370292-2g4o3loo5dt.jpg', 'general', P1, '2025-06-29T20:02:50.944Z'),
  photo('a7ce3ef7-234f-4489-bb7d-3cea144e9f85', 'Photo 28', '1751227371070-ras63s6ylj.jpg', 'general', P1, '2025-06-29T20:02:51.710Z'),
  photo('e6302a86-382e-46c9-8dfc-a56f34ca20af', 'Photo 29', '1751227371828-jcw19rbqq8m.jpg', 'general', P1, '2025-06-29T20:02:52.488Z'),
  photo('1243dbdb-a056-4845-a86e-40f4d49c95ed', 'Photo 30', '1751227372624-9t67r50r0e4.jpg', 'general', P1, '2025-06-29T20:02:53.221Z'),
  photo('b21272a4-19bc-4c43-838a-95081ae6ff65', 'Photo 31', '1751227373346-rbcoszu4egb.jpg', 'general', P1, '2025-06-29T20:02:53.896Z'),
  photo('3131bd9b-6d2a-4738-bcf6-e2ea0a60604e', 'Photo 32', '1751227374017-0rbr1nenlfsi.jpg', 'general', P1, '2025-06-29T20:02:54.599Z'),
  photo('45ea507a-9b62-44f9-9711-42173ffa6f48', 'Photo 34', '1751227376158-th2iz4x8ft.jpg', 'general', P1, '2025-06-29T20:02:56.647Z'),
  photo('ee39abfd-fb2b-46c4-88a7-4f4584a1f751', 'Photo 35', '1751227376769-azsmvqu15nd.jpg', 'general', P1, '2025-06-29T20:02:57.182Z'),

  // --- Repiping and Bathroom Remodeling (P2) - 15 photos ---
  photo('b8a84d8b-ca46-446c-8c1f-29ee1908a2b4', 'Photo 1', '1751227519725-0x4f1hsquydh.jpg', 'custom-work', P2, '2025-06-29T20:05:20.325Z'),
  photo('84378988-1cb4-4bdd-b246-9a1887b30d03', 'Photo 5', '1751227521640-3d06fb10bil.jpg', 'custom-work', P2, '2025-06-29T20:05:21.997Z'),
  photo('f57cdbbe-a9ad-48db-a986-d6e46d45f104', 'Photo 6', '1751227522119-ofmdig29wq.jpg', 'custom-work', P2, '2025-06-29T20:05:22.422Z'),
  photo('464734c6-8556-4f71-a748-e8ee52c1f86c', 'Photo 8', '1751227522937-mq1t2nkfv0j.jpg', 'custom-work', P2, '2025-06-29T20:05:24.753Z'),
  photo('620fc824-fb6b-4632-922d-42f050f1c4e6', 'Photo 9', '1751227524874-pbmmv81to78.jpg', 'custom-work', P2, '2025-06-29T20:05:25.135Z'),
  photo('b4663064-2adc-4df3-9fbd-1cb2fa5bf5d4', 'Photo 10', '1751227525263-nlu1d6uh95c.jpg', 'custom-work', P2, '2025-06-29T20:05:25.636Z'),
  photo('70e5fc8a-163e-4d09-bf20-4bafaec5ee67', 'Photo 11', '1751227525780-4rf5er4tb6n.jpg', 'custom-work', P2, '2025-06-29T20:05:26.060Z'),
  photo('de3d8a6f-4282-48e2-8d48-e7ff624a959e', 'Photo 12', '1751227526180-u3b1kddnlx.jpg', 'custom-work', P2, '2025-06-29T20:05:26.499Z'),
  photo('525ecda2-f9c2-4d1c-ab99-897a3ae726fe', 'Photo 14', '1751227527051-ydnl4n3imw.jpg', 'custom-work', P2, '2025-06-29T20:05:27.292Z'),
  photo('4ece6c2d-e61c-4e03-acdd-3d3390a454e0', 'Photo 18', '1751227528370-pjru111x9be.jpg', 'custom-work', P2, '2025-06-29T20:05:28.643Z'),
  photo('dd24e972-1424-4f99-8a6b-14b628972f37', 'Photo 20', '1751227529125-2izzhjth4m.jpg', 'custom-work', P2, '2025-06-29T20:05:29.399Z'),
  photo('3c394baa-8cfa-45b7-b64f-3ad555cad395', 'Photo 21', '1751227529515-cawxrk0k4om.jpg', 'custom-work', P2, '2025-06-29T20:05:29.895Z'),
  photo('83569115-63f9-4631-98b6-119413779e28', 'Photo 26', '1751227531632-dmh6rpjeqmp.jpg', 'custom-work', P2, '2025-06-29T20:05:31.874Z'),
  photo('31404f78-ee35-4504-8e97-3163590047de', 'Photo 27', '1751227532012-yixfufm123.jpg', 'custom-work', P2, '2025-06-29T20:05:32.370Z'),
  photo('716a521a-1d95-4c4e-a0b4-ec563953bf4d', 'Photo 30', '1751227533449-ozszew0japp.jpg', 'custom-work', P2, '2025-06-29T20:05:33.721Z'),

  // --- Residential Water Heater Installation (P3) - 4 photos ---
  photo('a8bdfadd-2c4f-4cad-93d3-43a4fadcbc70', 'Photo 1', '1751227927875-exsys93bd2c.jpg', 'bathroom', P3, '2025-06-29T20:12:08.162Z'),
  photo('b9677bd3-4803-4ca5-a845-a443bc23c856', 'Photo 2', '1751227928282-on4tcofbqdl.jpg', 'bathroom', P3, '2025-06-29T20:12:08.958Z'),
  photo('956e3952-5003-40bc-aee2-fc4c3a8664ba', 'Photo 1', '1751227943116-xfpy71bjax.jpg', 'general', P3, '2025-06-29T20:12:23.350Z'),
  photo('c54b682c-a3a0-4da1-8a5b-bdd5f5fb2048', 'Photo 2', '1751227943484-wokr4x4cldi.jpg', 'general', P3, '2025-06-29T20:12:23.816Z'),

  // --- Luxury Bathroom Remodel (P4) - 5 photos ---
  photo('fa543d8f-25e7-4afc-973e-813c5613ba89', 'Untitled Photo', '1751226401310-updllguyfk.jpg', 'bathroom', P4, '2025-06-29T19:46:41.553Z'),
  photo('4ae051ad-8ab7-4226-9040-e3275b5822eb', 'Untitled Photo', '1751226401687-kt8sd3vfp6.jpg', 'bathroom', P4, '2025-06-29T19:46:41.867Z'),
  photo('5294c917-3931-4463-961e-c804c06e5014', 'Untitled Photo', '1751226402013-u3pbekc8i9a.jpg', 'bathroom', P4, '2025-06-29T19:46:42.192Z'),
  photo('1840e836-8c6d-495f-abdf-af2bccc71483', 'Untitled Photo', '1751226402316-43lbeq1aqv9.jpg', 'bathroom', P4, '2025-06-29T19:46:42.447Z'),
  photo('67e5932b-1595-4ae6-8864-0f801b9446bc', 'Untitled Photo', '1751226402584-6ockax3rkyj.jpg', 'bathroom', P4, '2025-06-29T19:46:42.704Z'),
];

const projects: Project[] = [
  {
    id: P1,
    title: 'Outdoor Granite Kitchen',
    slug: 'outdoor-granite-kitchen',
    description: 'Complete outdoor kitchen overhaul with new fixtures, appliances, along with custom design and construction.',
    category: 'kitchen',
    location: 'La Jolla',
    completion_date: '2024-01-15',
    featured: true,
    created_at: '2025-06-29T19:28:41.691Z',
    updated_at: '2025-06-29T20:04:34.088Z',
    photos: photos.filter((p) => p.project_id === P1),
  },
  {
    id: P2,
    title: 'Repiping and Bathroom Remodeling',
    slug: 'repiping-bathroom-remodeling',
    description: '',
    category: 'pipes',
    location: 'Chula Vista',
    completion_date: '2024-05-12',
    featured: true,
    created_at: '2025-06-29T19:28:41.691Z',
    updated_at: '2025-06-29T20:08:17.895Z',
    photos: photos.filter((p) => p.project_id === P2),
  },
  {
    id: P3,
    title: 'Residential Water Heater Installation',
    slug: 'residential-water-heater',
    description: 'Water heater system for residential home.',
    category: 'water-heater',
    location: 'Downtown San Diego',
    completion_date: '2024-04-05',
    featured: false,
    created_at: '2025-06-29T19:28:41.691Z',
    updated_at: '2025-06-29T20:12:58.667Z',
    photos: photos.filter((p) => p.project_id === P3),
  },
  {
    id: P4,
    title: 'Luxury Bathroom Remodel',
    slug: 'luxury-bathroom-remodel',
    description: 'High-end bathroom renovation with custom fixtures and heated floors.',
    category: 'bathroom',
    location: 'La Mesa',
    completion_date: '2022-06-29',
    featured: false,
    created_at: '2025-06-29T19:46:41.182Z',
    updated_at: '2025-06-29T20:13:42.936Z',
    photos: photos.filter((p) => p.project_id === P4),
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

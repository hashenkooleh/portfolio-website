// All site copy lives here. Edit freely — components only render it.

export const profile = {
  name: 'Oleh Hashenko',
  short: 'Oleh',
  role: 'Product designer & design engineer',
  from: 'Odesa, Ukraine',
  timezone: 'Europe/Kyiv',
  email: 'oleh.hashenko@gmail.com',
  github: 'hashenkooleh',
  cv: 'https://drive.google.com/file/d/12PsYqNZwhpdOrAdGQmuqfHntXUix9TmL/view?usp=drive_link',
  cvPdf: '/Oleh_Hashenko_CV.pdf',
};

// Plain-words intro, in my own voice. The greeting line is muted except the name.
export const intro = {
  hello: 'Hi, I’m',
  lead: '. I design products, then build them — and honestly, I love every part of it.',
  paragraphs: [
    'My work doesn’t stop at static screens in Figma. I cover the whole path: research and product strategy, UX and UI, all the way to real front-end code, a living design system and screens developers can actually ship.',
    'For ten years I’ve been making complicated B2B products feel simple — cloud consoles, data platforms, AI tools people open every morning. I care about the people on the other side of the screen, so I listen, test and keep polishing until it just works for them.',
    'These days I design with Claude Code, Cursor and a design system that lives in the repo. I learn something new every day, and I’m pretty sure this is where our craft is heading.',
    'When I’m not pushing pixels (or commits), you’ll find me playing guitar, heading to the mountains or bouncing down a trail on my MTB — usually coming back with a couple of new UI ideas.',
  ],
  based: 'Working remotely with teams in the US, UK and Europe.',
};

export const links = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oleh-hashenko/' },
  { label: 'Telegram', href: 'https://t.me/olehhashenko' },
  { label: 'GitHub', href: `https://github.com/${profile.github}` },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/olehhashenko' },
];

export const upwork = 'Top Rated Plus · 100% Job Success · $100K+ earned';

export const experience = [
  { company: 'Openside', role: 'AI-first Product Designer, Design Engineer', years: '2026–∞' },
  { company: 'Bridj', role: 'Lead Product Designer, Design Engineer', years: '2025–2026' },
  { company: 'Pro-Data', role: 'Design Engineer, Lead UX/UI Designer', years: '2025–2026' },
  { company: 'ITERACIA', role: 'Lead UX/UI Designer', years: '2020–2025' },
  { company: 'Animal ID', role: 'Product Designer', years: '2019–2024' },
  { company: 'VP Productions', role: 'UX/UI & Web Designer', years: '2016–2019' },
];

// Featured cases. `video` points to public/previews — rendered from /video (Remotion).
// `tint` colors the backdrop behind each preview; keep it muted.
export const cases = [
  {
    year: '2026',
    title: 'Basewell',
    tagline: 'Backups, restores and history for Airtable',
    text: 'A reimagined concept of my work on Baseout: 200+ screens and a 122-component design system I designed and shipped in Astro, React and Tailwind. Names and data here are fictional.',
    video: '/previews/basewell.mp4',
    poster: '/previews/basewell.jpg',
    tint: '#8fb8ad', // sage teal
    frame: 'full' as const, // concept UI from portfolio-demos/basewell (Remotion), not the client product
    aspect: '3 / 2',
    overview: 'soon', // walkthrough not recorded yet — swap for the URL when it is
  },
  {
    year: '2025',
    title: 'Bridj',
    tagline: 'Sales calls in, insights out',
    text: 'An AI layer over CRM, call recordings and notetakers. Insight timeline, source attribution and content generation, prototyped in code first.',
    video: '/previews/bridj.mp4',
    poster: '/previews/bridj.jpg',
    tint: '#9aa0e8', // periwinkle
    frame: 'full' as const, // story video rendered from portfolio-demos/bridj (Remotion)
    aspect: '3 / 2',
    overview: 'https://youtu.be/6N-cX-2E5-g', // narrated walkthrough
  },
  {
    year: '2025',
    title: 'Pro-Data',
    tagline: 'A cloud console, rebuilt from scratch',
    text: 'VMs, networking, Kubernetes, billing — a DigitalOcean-sized control panel and the design system behind it.',
    video: '/previews/prodata.mp4',
    poster: '/previews/prodata.jpg',
    tint: '#c99068', // copper
    frame: 'full' as const, // story video rendered from portfolio-demos/prodata (Remotion)
    aspect: '3 / 2',
    overview: 'https://youtu.be/JchsAVbriI8', // narrated walkthrough
  },
];

// Toggle sections on/off without deleting their content.
export const show = {
  reviews: false,
};

// Client reviews. PLACEHOLDERS — replace with real quotes (Upwork, LinkedIn, etc.).
// Mix short and long ones: cards size to their text.
export const reviews = [
  {
    quote:
      'Oleh doesn’t hand you a Figma file and disappear. He shipped the actual product — 200 screens, a design system, the docs site — faster than our previous team shipped mockups.',
    author: 'Founder',
    company: 'B2B data platform, USA',
    source: 'Upwork',
  },
  {
    quote: 'Rare mix of taste and engineering. Every detail was thought through.',
    author: 'Head of Product',
    company: 'SaaS, UK',
    source: 'Upwork',
  },
  {
    quote:
      'He took a control panel as complex as AWS and made it feel calm. Our support tickets about “where is this setting” basically disappeared after the redesign.',
    author: 'CTO',
    company: 'Cloud provider, Central Asia',
    source: 'LinkedIn',
  },
  {
    quote: 'Clear communication, zero hand-holding needed. We extended the contract twice.',
    author: 'CEO',
    company: 'AI startup, UK',
    source: 'Upwork',
  },
  {
    quote:
      'Oleh ran user interviews, synthesised them with AI in a day and came back with prototypes in code the same week. It changed how our whole team works.',
    author: 'VP Marketing',
    company: 'Sales intelligence SaaS',
    source: 'Upwork',
  },
  {
    quote: 'Top-tier designer. Would hire again without a second thought.',
    author: 'Product Owner',
    company: 'Pet care platform, USA',
    source: 'Upwork',
  },
];

export const earlier = [
  {
    year: '2019–24',
    title: 'Pet Care ID',
    text: 'iOS & Android app, 1.2M+ users, +400% subscription revenue',
    links: [
      { label: 'Overview', href: 'https://youtu.be/tQUfrEGryZg' },
      { label: 'App Store', href: 'https://apps.apple.com/ua/app/pet-care-id-gps-tracker/id1505139116' },
    ],
  },
  {
    year: '2022–24',
    title: 'Real estate platform',
    text: 'Leasing broker tool for the Asia-Pacific market',
    links: [{ label: 'Overview', href: 'https://youtu.be/3uKeSYF1HVg' }],
  },
  {
    year: '2023–24',
    title: 'Geomarketing platform',
    text: 'AI location planning for retail chains in 12+ countries',
    links: [{ label: 'Overview', href: 'https://youtu.be/GvG2BIFfFHM' }],
  },
  {
    year: '2021–22',
    title: 'Hotel Analyser',
    text: 'AI review analytics for hoteliers',
    links: [
      { label: 'Overview', href: 'https://youtu.be/PBKSGdj6zvA' },
      {
        label: 'Prototype',
        href: 'https://www.figma.com/proto/hRKsHdltN40kv5Pf8gIY2i/Hotel-Analyser---Super-User-Prototype?page-id=4080%3A112876&node-id=6375-158792&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=6098%3A158139',
      },
    ],
  },
];

export const webflow = [
  { title: 'Cloud Nation', text: 'Cloud infrastructure consulting, Germany', href: 'https://cloud-nation-752de6.webflow.io/' },
  { title: 'Involve Flow', text: 'AI workflow automation SaaS', href: 'https://involve-flow.webflow.io/' },
  { title: 'Bol Expertise', text: 'AI-assisted car diagnostics', href: 'https://bol-expertise.webflow.io/' },
  { title: 'ForexTest', text: 'Strategy testing for traders', href: 'https://forextest.webflow.io/' },
  { title: 'Contrast Connect', text: 'Medical equipment', href: 'https://divflow-starting-point-4811f23b09cc5416.webflow.io/' },
];

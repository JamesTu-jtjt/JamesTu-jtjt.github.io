export const publications = [
  {
    year: '2026', venue: 'Findings of the Association for Computational Linguistics (ACL)',
    title: 'OmniCode: A Benchmark for Evaluating Software Engineering Agents',
    authors: 'Atharv Sonwane*, Eng-Shen Tu*, Wei-Chung Lu*, Claas Beger*, …, Kevin Ellis, Saikat Dutta',
    href: 'https://arxiv.org/abs/2602.02262', label: 'arXiv', featured: true,
  },
  {
    year: '2025', venue: 'Journal of Information Science and Engineering · 41(1), 43–60',
    title: 'Input Relation Prompting for Metamorphic Testing on Query-Based Systems',
    authors: 'Eng-Shen Tu and Shin-Jie Lee',
    note: 'Best Paper Award at TCSE 2023',
    href: 'https://openurl.ebsco.com/EPDB%3Agcd%3A10%3A18968218/detailv2?sid=ebsco%3Aplink%3Ascholar&id=ebsco%3Agcd%3A182338962&crl=c&link_origin=scholar.google.com', label: 'Journal',
  },
  {
    year: '2024', venue: 'IEEE COMPSAC',
    title: 'A Clustering-Based Approach for Detecting Low-Contrast Texts on Web Pages',
    authors: 'Eng-Shen Tu, Shin-Jie Lee',
    href: 'https://ieeexplore.ieee.org/abstract/document/10633505/', label: 'IEEE',
  },
  {
    year: '2024', venue: 'IEEE TGRS',
    title: 'Real-Time Compressed Sensing for Hyperspectral Images',
    authors: 'Chih-Chung Hsu, Chih-Yu Jian, Eng-Shen Tu, Chia-Ming Lee, Guan-Lin Chen',
    href: 'https://ieeexplore.ieee.org/abstract/document/10474407', label: 'IEEE',
  },
  {
    year: '2022', venue: 'IEEE Big Data',
    title: 'An Embarrassingly Simple Rule-based Visiting Circulation Approach to Trip Destination Prediction',
    authors: 'Eng-Shen Tu, Yong-Han Chen, En-Chao Liu, Hao-Yun Keng, Cheng-Te Li',
    href: 'https://ieeexplore.ieee.org/abstract/document/10020650/', label: 'IEEE',
  },
]

export const experience = [
  {
    type: 'work', dates: 'Jul 2025 — Jun 2026', role: 'Software Engineer II', org: 'Appier', place: 'Taipei, Taiwan',
    bullets: [
      'Developed QAgent, an LLM-powered test-planning harness used company-wide, increasing test planning throughput by 10x and aligning cross-team quality context; promoted from intern to level 2 software engineer within 3 months.',
      'Hosted multiple sharings on Agentic Workflow Design and took part in the architecture design of multiple related initiatives, e.g., Self-healing E2E Tests, Agent Evaluation, Agentic PR to Production Workflow, and related research.',
      'Mentored 3 interns; awarded 2nd Place (Practical Impact) at the 2025 Company Hackathon (100+ teams).',
    ],
    tags: ['Agentic workflow design', 'LLM evaluation', 'QA automation'],
  },
  {
    type: 'research', dates: 'Jun 2025 — Feb 2026', role: 'Research Intern', org: 'Cornell University · Software Engineering Group', place: 'Ithaca, NY',
    bullets: [
      'Worked with Assistant Professors Saikat Dutta and Kevin Ellis.',
      'Contributed to OmniCode, a multi-language benchmark for evaluating software-development LLM agents (Python, Java, C++) on software engineering tasks (funded by the Meta AI LLM Evaluation Research Grant (2025)).',
      'Implemented key components of the benchmark infrastructure, including multilingual support, containerization, dataset construction, and task evaluation, while collaborating with the team on pipeline design and integration.',
    ],
    tags: ['Software agents', 'Benchmarks', 'Evaluation'],
  },
  {
    type: 'work', dates: 'Dec 2024 — Apr 2025', role: 'Military Service', org: 'Taiwanese Army', place: 'Taiwan',
    copy: 'Completed mandatory service in the 53rd Engineering Group.', tags: [],
  },
  {
    type: 'work', dates: 'Nov 2023 — Aug 2024', role: 'Quality Assurance Intern', org: 'Appier', place: 'Taipei, Taiwan',
    copy: 'Contributed to test case automation and CI/CD pipeline maintenance, increasing test coverage by 20%. Conducted test planning, bug triage, and data pipeline troubleshooting across 19 Agile sprints.',
    tags: ['Test automation', 'CI/CD', 'Data pipelines'],
  },
  {
    type: 'work', dates: 'Sep — Nov 2023', role: 'Software Development Intern', org: 'SEAMEO RECSAM', place: 'Penang, Malaysia',
    copy: 'Selected for the government-funded international talent program (Top 1%) hosted by the Talent Circulation Alliance (TCA). Led full-stack development of a makerspace website and facilitated workshops to promote international talent exchange.',
    tags: ['Full-stack', 'International exchange'],
  },
  {
    type: 'research', dates: 'Mar 2022 — Jul 2024', role: 'Undergraduate Researcher', org: 'National Cheng Kung University (NCKU)', place: 'Tainan, Taiwan',
    bullets: [
      'RLAIF: Fine-tuned 350M code-gen model using LLM feedback, increasing Pass@1 rate by 45% on benchmark tasks.',
      'Metamorphic Testing: Proposed input relation prompting for testing query-based systems (JISE 2025).',
      'Edge AI: Co-authored a real-time compressed sensing network for CubeSats (IEEE TGRS 2024).',
      'Algorithms: Designed a DBSCAN-based clustering algorithm for UI accessibility testing (IEEE COMPSAC 2024).',
    ],
    tags: ['RLAIF', 'Software testing', 'Edge AI', 'Algorithms'],
  },
]

export const news = [
  ['Jun 2026', 'Concluding my time at Appier on June 30.'],
  ['May 2026', 'Grateful to be re-invited to MUN Society Taiwan as Managing Supervisor.'],
  ['Apr 2026', 'OmniCode accepted to ACL Findings; shoutout to the team behind the work!'],
  ['Apr 2026', 'Joining Cornell University as a Computer Science PhD student this fall.'],
  ['Mar 2026', 'Grateful to have received offers from UIUC, Cornell, and Columbia on my journey of applying to CS PhD programs.'],
  ['Feb 2026', 'Released OmniCode, a benchmark for software engineering agents.'],
  ['Nov 2025', 'Spoke at the NCKU Statistics Alumni Homecoming and launched an Information Retrieval research group at GDG NYCU.'],
  ['Oct 2025', 'Joined Appier full-time as a Software Engineer.'],
  ['Sep 2025', 'Returned to GDG NYCU as Project Leader.'],
  ['Aug 2025', 'QAgent received the Practical Impact Award (2nd place) at the Appier Hackathon; grateful to the team who built it.'],
  ['Jul 2025', 'Returned to Appier as a Quality Assurance Intern.'],
  ['Jun 2025', 'Started OmniCode at Cornell; CoverIQ released two projects and placed 3rd at the TCSE competition—grateful to both teams.'],
  ['May 2025', 'Formed the CoverIQ engineering team and joined the Cornell SE Group summer research program.'],
  ['Apr 2025', 'Completed mandatory military service.'],
  ['Jan 2025', 'Published our JISE paper on input relation prompting.'],
  ['Dec 2024', 'Began Taiwanese mandatory military service.'],
  ['Aug 2024', 'Appointed Project Leader for the GDG NYCU LLM Research Group.'],
  ['Jul 2024', 'Presented our COMPSAC paper in Osaka.'],
  ['May 2024', 'Grateful to our team for earning 2nd place and the Popularity Award at the Taipei Metro Hackathon.'],
  ['Nov 2023', 'Completed the TCA International Talent Program at SEAMEO RECSAM; honored to receive the Global Supernova Award.'],
  ['Jun 2023', 'Our work received the Best Paper Award at TCSE 2023; grateful to my advisor and collaborators.'],
  ['May 2023', 'Completed an RLAIF senior project with a 45% improvement across 145 coding tasks.'],
  ['Dec 2022', 'Grateful to our team for placing 2nd globally in the IEEE Big Data Cup and publishing our work at IEEE Big Data.'],
  ['Oct 2022', 'Our team received the MediaTek Better Future Award at NASA Space Apps; grateful for the opportunity to build together.'],
  ['2020', 'Built the Class Info Collector CLI for NCKU’s Office of International Affairs.'],
]

export const awards = [
  ['Aug 2025', 'Practical Impact Award · Second Place', 'Appier Company Hackathon (100+ teams)'],
  ['June 2025', '3rd Place', 'TCSE Software Engineering Competition'],
  ['May 2024', 'Second Place and the Popularity Award', 'Taipei Metro Hackathon (90+ teams)'],
  ['Dec 2023', 'Global Supernova Award · Top 1%', 'TCA International Talent Program'],
  ['June 2023', 'Best Paper Award', '19th Taiwan Conference on Software Engineering (TCSE)'],
  ['Dec 2022', 'Second Place Global', 'IEEE Big Data Cup (Trip Destination Prediction Challenge)'],
  ['Oct 2022', 'MediaTek Better Future Award', 'NASA International Space Apps Challenge'],
]

export const munYears = [
  ['2024', ['Harvard WorldMUN — Crisis Assistant Chair', 'PMUN — Crisis Chair']],
  ['2023', ['CZMUN — NSC Chair', 'PMUN — GA Co-Chair']],
  ['2022', ['TransMUN — UNOOSA Substitute Chair', 'FongMUN — UNSC Substitute Chair', 'PMUN — UNODC Co-Chair', 'NKMUN — Crisis Chair']],
  ['2021', ['CJMUN — USG of Academics and GA1 Chair', 'Talking Titans — Main Chairperson']],
  ['2020', ['TWMUN — Crisis Chair', 'PMUN — UNSC Chair', 'FLYMUN — UNSC Chair']],
  ['2019', ['TWMUN — Crisis WHO Delegate (Best Delegate)', 'HSMUN — UNHRC Delegate (Outstanding Delegate)', 'FLYMUN — UNGA Delegate (Outstanding Delegate)', 'NKMUN — SOCHUM Delegate (Best Delegate)']],
  ['2018', ['NTCMUN — UNDP Delegate (Best Delegate)', 'FLYMUN — USG of Academics & SOCHUM Chair', 'TAMUN — USG of Academics & DISEC Chair', 'YaleMUN — ECOFIN Delegate (Honorable Mention)']],
  ['2017', ['TaoMUN — UNHRC Delegate (Best Delegate)', 'NTCMUN — FAO Delegate (Best Delegate)']],
]

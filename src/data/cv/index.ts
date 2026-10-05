import type { CvData } from "./types";

export type {
  CvData,
  CvEducation,
  CvExperience,
  CvHeader,
  CvLanguage,
  CvLink,
  CvRole,
  CvSkillGroup,
} from "./types";

/**
 * CV content for mattiasalm.se, written for architect and technical leadership
 * roles. Employers are named; clients never are.
 */
export const cv: CvData = {
  header: {
    name: "Mattias Alm",
    title: "Systems Architect",
    location: "Jönköping, Sweden",
    links: [
      {
        label: "linkedin.com/in/mattiasalm",
        href: "https://www.linkedin.com/in/mattiasalm/",
      },
    ],
  },

  profile:
    "I set the technical direction at Grace Studio and advise the team. " +
    "Sometimes I write the code too.",

  experience: [
    {
      employer: "Grace Studio",
      url: "https://gracestudio.se",
      roles: [
        { title: "Systems Architect", period: "Nov 2024–present" },
        { title: "Developer", period: "May 2022–Nov 2024" },
      ],
      location: "Jönköping",
      points: [
        "Architecture across industry, e-commerce and energy tech",
        "Platform and code standards",
        "Cloud costs, estimation and pricing",
        "AI-assisted development",
      ],
    },
    {
      employer: "Columbus",
      url: "https://www.columbusglobal.com",
      roles: [{ title: "Senior Frontend Developer", period: "Feb–May 2022" }],
      location: "Jönköping",
      points: ["E-commerce storefronts on Litium"],
    },
    {
      employer: "Nexer Group",
      url: "https://nexergroup.com",
      roles: [
        { title: "Senior Frontend Developer", period: "Sep 2017–Feb 2022" },
      ],
      location: "Gothenburg / Jönköping",
      points: [
        "Industrial systems and real-time monitoring",
        "Scrum master, UX and digital strategy",
      ],
    },
    {
      employer: "GWEN",
      roles: [{ title: "Frontend Developer", period: "Mar 2016–Aug 2017" }],
      location: "Gothenburg",
      points: ["Hybrid mobile and web gamification apps"],
    },
    {
      // TODO(mattias): confirm the role title before publishing.
      employer: "Property owners' association",
      roles: [{ title: "Board member, finances", period: "2023–present" }],
      location: "Jönköping",
      points: ["Bookkeeping, accruals and grants", "Member governance"],
    },
    {
      employer: "Mattias Alm Photo",
      roles: [{ title: "Photographer", period: "2012–2019" }],
      location: "Gothenburg",
      points: ["Own business: events, weddings and lifestyle"],
    },
  ],

  skills: [
    {
      label: "Architecture",
      body: "Distributed systems, data modelling, multi-tenant access, SSO, API design, headless commerce and CMS, calculation-heavy domains (M.Sc. structural engineering)",
    },
    {
      label: "AI & engineering",
      body: "Agent-driven development, voice AI, TypeScript across the stack, calculation engines",
    },
    {
      label: "Platform & data",
      body: "Google Cloud, Firebase, AWS, serverless, CI/CD, observability",
    },
    {
      label: "Technical leadership",
      body: "Standards, hiring, cloud costs, estimation, documentation, scrum",
    },
  ],

  education: [
    {
      institution: "Hyper Island",
      programme: "Leading Teams In The Digital Age",
      period: "2018",
    },
    {
      institution: "Chalmers University of Technology",
      programme: "M.Sc. Civil Engineering, structural engineering specialisation",
      period: "2008–2015",
    },
  ],

  languages: [
    { language: "Swedish", level: "native" },
    { language: "English", level: "fluent" },
  ],
} as const;

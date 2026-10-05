/**
 * A labelled external link in the CV header, rendered as contact details.
 */
export type CvLink = {
  /** Visible text for the link, e.g. `mattiasalm.se`. */
  readonly label: string;
  /** Absolute URL the link points to. */
  readonly href: string;
};

/**
 * Identity block at the top of the CV.
 */
export type CvHeader = {
  /** Full name. */
  readonly name: string;
  /** Professional title line, e.g. `Systems Architect & Fullstack Developer`. */
  readonly title: string;
  /** City and country. */
  readonly location: string;
  /** Contact links, rendered inline under the title. */
  readonly links: readonly CvLink[];
};

/**
 * A single title held at an employer, with the period it was held.
 *
 * @example { title: 'Systems Architect', period: 'Nov 2024–present' }
 */
export type CvRole = {
  /** Job title. */
  readonly title: string;
  /** Period the title was held, in `MMM YYYY–MMM YYYY` form. */
  readonly period: string;
};

/**
 * One employer, with every role held there.
 *
 * Client names are deliberately absent throughout — client work is described by
 * sector and system type only.
 */
export type CvExperience = {
  /** Employer name. */
  readonly employer: string;
  /** Employer website, linked from the employer name when present. */
  readonly url?: string;
  /** Roles held at this employer, most recent first. */
  readonly roles: readonly CvRole[];
  /** Work location, e.g. `Jönköping`. */
  readonly location: string;
  /** A few words each — what was done and its effect. */
  readonly points: readonly string[];
};

/**
 * One thematic group of capabilities.
 */
export type CvSkillGroup = {
  /** Group name, e.g. `Platform & data`. */
  readonly label: string;
  /** Short comma-separated line covering the group. */
  readonly body: string;
};

/**
 * A degree or programme.
 */
export type CvEducation = {
  /** Awarding institution. */
  readonly institution: string;
  /** Programme or degree, including specialisation. */
  readonly programme: string;
  /** Years attended, e.g. `2008–2015`. */
  readonly period: string;
};

/**
 * A spoken language and the level it is held at.
 */
export type CvLanguage = {
  /** Language name. */
  readonly language: string;
  /** Proficiency, e.g. `full professional proficiency`. */
  readonly level: string;
};

/**
 * The complete CV content, consumed by the `/cv` page.
 */
export type CvData = {
  /** Identity and contact details. */
  readonly header: CvHeader;
  /** Opening profile paragraph. */
  readonly profile: string;
  /** Employment history, most recent first. */
  readonly experience: readonly CvExperience[];
  /** Capability groups. */
  readonly skills: readonly CvSkillGroup[];
  /** Education, most recent first. */
  readonly education: readonly CvEducation[];
  /** Spoken languages. */
  readonly languages: readonly CvLanguage[];
};

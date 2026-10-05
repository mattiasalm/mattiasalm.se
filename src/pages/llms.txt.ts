import type { APIRoute } from "astro";

import { cv } from "../data/cv";
import type { CvEducation, CvExperience, CvLanguage, CvSkillGroup } from "../data/cv";

/**
 * Formats one employer as a Markdown section: heading, roles, website and points.
 *
 * @param entry - The employer and roles to format.
 * @returns The section as Markdown.
 */
const formatExperience = (entry: CvExperience): string =>
  [
    `### ${entry.employer}, ${entry.location}`,
    "",
    entry.roles.map((role) => `${role.title} (${role.period})`).join("; "),
    ...(entry.url ? [`Website: ${entry.url}`] : []),
    "",
    ...entry.points.map((point) => `- ${point}`),
  ].join("\n");

/** @returns One skill group as a Markdown list item. */
const formatSkill = (group: CvSkillGroup): string => `- ${group.label}: ${group.body}`;

/** @returns One education entry as a Markdown list item. */
const formatEducation = (item: CvEducation): string =>
  `- ${item.institution}: ${item.programme} (${item.period})`;

/** @returns One language as a Markdown list item. */
const formatLanguage = (item: CvLanguage): string => `- ${item.language}: ${item.level}`;

/**
 * Builds the llms.txt document from the CV data, so it never drifts from `/cv`.
 *
 * @param siteUrl - Absolute site origin, used for page links.
 * @returns The full llms.txt body.
 */
const buildLlmsTxt = (siteUrl: string): string =>
  [
    `# ${cv.header.name}`,
    "",
    `> ${cv.header.title} in ${cv.header.location}.`,
    "",
    cv.profile,
    "",
    "## Experience",
    "",
    cv.experience.map(formatExperience).join("\n\n"),
    "",
    "## Skills",
    "",
    ...cv.skills.map(formatSkill),
    "",
    "## Education",
    "",
    ...cv.education.map(formatEducation),
    "",
    "## Languages",
    "",
    ...cv.languages.map(formatLanguage),
    "",
    "## Links",
    "",
    `- [CV](${new URL("/cv", siteUrl).href}): the full CV as a web page`,
    ...cv.header.links.map((link) => `- [${link.label}](${link.href})`),
    "",
  ].join("\n");

/** Serves `/llms.txt` as plain Markdown text, generated at build time. */
export const GET: APIRoute = ({ site }) =>
  new Response(buildLlmsTxt(site?.href ?? "https://mattiasalm.se"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

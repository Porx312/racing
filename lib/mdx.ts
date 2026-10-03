import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";
import { flattenLessons } from "@/lib/curriculum";

export const lessonSectionIds = ["what", "why", "example", "exercise"] as const;

export type LessonSectionId = (typeof lessonSectionIds)[number];

export type LessonPublishStatus = "coming-soon" | "published";

export type LessonFrontmatter = {
  title: string;
  part: string;
  slug: string;
  status: LessonPublishStatus;
  sections: LessonSectionId[];
};

export type LoadedLessonMdx = {
  frontmatter: LessonFrontmatter;
  content: string;
};

function isSectionId(value: unknown): value is LessonSectionId {
  return (
    typeof value === "string" &&
    (lessonSectionIds as readonly string[]).includes(value)
  );
}

function parseFrontmatter(data: unknown): LessonFrontmatter | null {
  if (typeof data !== "object" || data === null) {
    return null;
  }

  const record = data as Record<string, unknown>;
  if (typeof record.title !== "string") return null;
  if (typeof record.part !== "string") return null;
  if (typeof record.slug !== "string") return null;

  const status = record.status === "published" ? "published" : "coming-soon";
  const rawSections = Array.isArray(record.sections)
    ? record.sections.filter(isSectionId)
    : [...lessonSectionIds];

  return {
    title: record.title,
    part: record.part,
    slug: record.slug,
    status,
    sections: rawSections.length > 0 ? rawSections : [...lessonSectionIds],
  };
}

export function getLessonMdxPath(
  locale: Locale,
  part: string,
  slug: string,
): string {
  return path.join(
    process.cwd(),
    "content",
    locale,
    "lessons",
    part,
    `${slug}.mdx`,
  );
}

export function lessonStatusKey(part: string, slug: string): string {
  return `${part}/${slug}`;
}

export async function loadLessonMdx(
  locale: Locale,
  part: string,
  slug: string,
): Promise<LoadedLessonMdx | null> {
  const filePath = getLessonMdxPath(locale, part, slug);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    const frontmatter = parseFrontmatter(parsed.data);
    if (!frontmatter) {
      return null;
    }

    return {
      frontmatter,
      content: parsed.content,
    };
  } catch {
    return null;
  }
}

/** Master locale for publish status is always Spanish. */
export async function getLessonStatus(
  part: string,
  slug: string,
): Promise<LessonPublishStatus> {
  const mdx = await loadLessonMdx("es", part, slug);
  return mdx?.frontmatter.status === "published" ? "published" : "coming-soon";
}

/** Build a map of part/slug -> status from Spanish MDX (master). */
export async function getLessonStatusMap(): Promise<
  Record<string, LessonPublishStatus>
> {
  const map: Record<string, LessonPublishStatus> = {};
  await Promise.all(
    flattenLessons().map(async (item) => {
      const key = lessonStatusKey(item.part.slug, item.lesson.slug);
      map[key] = await getLessonStatus(item.part.slug, item.lesson.slug);
    }),
  );
  return map;
}

export async function isPartFullyPublished(partSlug: string): Promise<boolean> {
  const lessons = flattenLessons().filter((item) => item.part.slug === partSlug);
  if (lessons.length === 0) return false;
  const statuses = await Promise.all(
    lessons.map((item) => getLessonStatus(item.part.slug, item.lesson.slug)),
  );
  return statuses.every((status) => status === "published");
}

export async function countPublishedInPart(partSlug: string): Promise<number> {
  const lessons = flattenLessons().filter((item) => item.part.slug === partSlug);
  const statuses = await Promise.all(
    lessons.map((item) => getLessonStatus(item.part.slug, item.lesson.slug)),
  );
  return statuses.filter((status) => status === "published").length;
}

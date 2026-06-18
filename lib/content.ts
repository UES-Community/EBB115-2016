import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface LessonFrontmatter {
  title: string;
  description: string;
  section: string;
  order: number;
}

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  section: string;
  order: number;
}

export interface SectionMeta {
  id: string;
  title: string;
  lessons: LessonMeta[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface CourseMeta {
  sections: { id: string; title: string }[];
}

function getMeta(): CourseMeta {
  const metaPath = path.join(CONTENT_DIR, "meta.json");
  const raw = fs.readFileSync(metaPath, "utf-8");
  return JSON.parse(raw) as CourseMeta;
}

export function getAllLessons(): LessonMeta[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const lessons = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    const fm = data as LessonFrontmatter;
    return {
      slug,
      title: fm.title ?? slug,
      description: fm.description ?? "",
      section: fm.section ?? "general",
      order: fm.order ?? 0,
    };
  });

  return lessons.sort((a, b) => a.order - b.order);
}

export function getSections(): SectionMeta[] {
  const meta = getMeta();
  const lessons = getAllLessons();

  return meta.sections.map((section) => ({
    id: section.id,
    title: section.title,
    lessons: lessons.filter((l) => l.section === section.id),
  }));
}

export function getLessonBySlug(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as LessonFrontmatter;

  return {
    slug,
    frontmatter: {
      title: fm.title ?? slug,
      description: fm.description ?? "",
      section: fm.section ?? "general",
      order: fm.order ?? 0,
    },
    content,
  };
}

export function getAdjacentLessons(slug: string) {
  const lessons = getAllLessons();
  const index = lessons.findIndex((l) => l.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}

export function getLessonProgress(slug: string): number {
  const lessons = getAllLessons();
  const index = lessons.findIndex((l) => l.slug === slug);
  if (index === -1 || lessons.length === 0) return 0;
  return Math.round(((index + 1) / lessons.length) * 100);
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, text, level });
  }

  return items;
}

export function getAllSlugs(): string[] {
  return getAllLessons().map((l) => l.slug);
}

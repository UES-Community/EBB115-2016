import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  getLessonBySlug,
  getSections,
  getAdjacentLessons,
  getLessonProgress,
  extractToc,
  getAllSlugs,
} from "@/lib/content";
import { DocsLayout } from "@/components/docs-layout";
import { mdxComponents } from "@/components/mdx";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "Lección no encontrada" };
  return {
    title: lesson.frontmatter.title,
    description: lesson.frontmatter.description,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const sections = getSections();
  const { prev, next } = getAdjacentLessons(slug);
  const progress = getLessonProgress(slug);
  const toc = extractToc(lesson.content);

  return (
    <DocsLayout
      sections={sections}
      toc={toc}
      slug={slug}
      title={lesson.frontmatter.title}
      description={lesson.frontmatter.description}
      progress={progress}
      prev={prev}
      next={next}
    >
      <MDXRemote
        source={lesson.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ],
          },
        }}
      />
    </DocsLayout>
  );
}

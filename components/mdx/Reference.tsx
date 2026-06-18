import type { ReactNode } from "react";
import { BookOpen, FileText, Video, Github, ExternalLink, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReferenceType = "doc" | "video" | "github" | "article" | "link";

interface ReferenceItemProps {
  title: string;
  url: string;
  description?: string;
  type?: ReferenceType;
}

const icons: Record<ReferenceType, ReactNode> = {
  doc: <FileText className="h-5 w-5 text-jetstream-blue" />,
  video: <Video className="h-5 w-5 text-stratosphere" />,
  github: <Github className="h-5 w-5 text-onyx" />,
  article: <BookOpen className="h-5 w-5 text-onyx" />,
  link: <Globe className="h-5 w-5 text-stratosphere" />,
};

export function ReferenceItem({ title, url, description, type = "link" }: ReferenceItemProps) {
  const icon = icons[type] || icons.link;

  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch {
    hostname = url;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block border border-onyx/20 bg-white p-4 transition-all duration-200",
        "hover:border-jetstream-blue",
        "no-underline"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 shrink-0 border border-onyx/10 bg-gray-50 p-2 text-stratosphere transition-colors duration-200 group-hover:border-jetstream-blue group-hover:text-jetstream-blue">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-sans text-sm font-semibold text-onyx group-hover:text-jetstream-blue transition-colors duration-200 m-0">
              {title}
            </h4>
            <ExternalLink className="h-3.5 w-3.5 text-stratosphere shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          {description && (
            <p className="mt-1 text-xs text-onyx/60 line-clamp-2 leading-relaxed m-0">
              {description}
            </p>
          )}
          <span className="mt-2 inline-block font-mono text-[10px] text-stratosphere tracking-widest uppercase">
            {hostname}
          </span>
        </div>
      </div>
    </a>
  );
}

interface ReferencesProps {
  title?: string;
  children: ReactNode;
}

export function References({ title = "Referencias y Lecturas Recomendadas", children }: ReferencesProps) {
  return (
    <div className="my-8 border border-onyx/20 bg-gray-50 p-6 not-prose">
      <h3 className="mb-4 font-sans text-xs font-semibold text-onyx tracking-widest uppercase border-b border-onyx/20 pb-3">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import LinkExt from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Markdown } from "tiptap-markdown";
import {
  Download,
  Eye,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Code,
} from "lucide-react";
import { PageShell, SiteHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/toaster";
import { MdxPreview } from "@/components/author/mdx-preview";
import { courseSections } from "@/lib/course-sections";
import { escapeYamlString, validateLessonTitle } from "@/lib/yaml";
import { cn } from "@/lib/utils";

const lowlight = createLowlight(common);

function EditorSkeleton() {
  return (
    <PageShell>
      <SiteHeader variant="minimal" />
      <main className="mx-auto max-w-6xl px-6 py-8 space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-6 sm:grid-cols-3 border border-onyx/20 p-6">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
        <Skeleton className="h-[500px]" />
      </main>
    </PageShell>
  );
}

export default function AuthorPage() {
  const { toast } = useToast();
  const [title, setTitle] = React.useState("Nueva lección");
  const [description, setDescription] = React.useState("");
  const [section, setSection] = React.useState(courseSections[0]?.id ?? "introduccion");
  const [previewMarkdown, setPreviewMarkdown] = React.useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      LinkExt.configure({ openOnClick: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Underline,
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({
        placeholder: "Escribe el contenido de la lección...",
      }),
      Markdown.configure({
        html: false,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: "<h2>Introducción</h2><p>Escribe tu lección aquí...</p>",
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[400px] focus:outline-none text-onyx font-sans leading-relaxed",
      },
    },
    onUpdate: ({ editor: ed }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storage = ed.storage as any;
      const md = storage.markdown?.getMarkdown?.() ?? ed.getText();
      setPreviewMarkdown(md);
    },
  });

  React.useEffect(() => {
    if (!editor) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storage = editor.storage as any;
    const md = storage.markdown?.getMarkdown?.() ?? editor.getText();
    setPreviewMarkdown(md);
  }, [editor]);

  const getMarkdown = () => {
    if (!editor) return "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storage = editor.storage as any;
    return storage.markdown?.getMarkdown?.() ?? editor.getText();
  };

  const titleError = validateLessonTitle(title);
  const canExport = !titleError && !!editor;

  const exportMdx = () => {
    const validationError = validateLessonTitle(title);
    if (validationError) {
      toast({
        title: "Error de validación",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    const markdown = getMarkdown();
    const frontmatter = `---
title: "${escapeYamlString(title.trim())}"
description: "${escapeYamlString(description.trim())}"
section: ${section}
order: 99
---

`;
    const mdx = frontmatter + markdown;
    const blob = new Blob([mdx], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.trim().toLowerCase().replace(/\s+/g, "-")}.mdx`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exportado",
      description: "El archivo MDX se ha descargado correctamente.",
    });
  };

  if (!editor) return <EditorSkeleton />;

  const toolbarItems = [
    {
      label: "Negrita",
      icon: Bold,
      active: editor.isActive("bold"),
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Cursiva",
      icon: Italic,
      active: editor.isActive("italic"),
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Título 1",
      icon: Heading1,
      active: editor.isActive("heading", { level: 1 }),
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Título 2",
      icon: Heading2,
      active: editor.isActive("heading", { level: 2 }),
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Lista",
      icon: List,
      active: editor.isActive("bulletList"),
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Bloque de código",
      icon: Code,
      active: editor.isActive("codeBlock"),
      action: () => editor.chain().focus().toggleCodeBlock().run(),
    },
  ];

  return (
    <TooltipProvider>
      <PageShell>
        <SiteHeader variant="minimal" />

        <main className="mx-auto max-w-6xl px-6 py-8 space-y-6">
          <h2
            className="font-display font-semibold text-onyx border-b border-onyx/20 pb-4"
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Nueva Lección
          </h2>

          <div className="border border-onyx/20 bg-cloud p-6 grid gap-6 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Introducción a la materia"
                aria-invalid={!!titleError}
              />
              {titleError && (
                <p className="text-xs text-destructive font-mono">{titleError}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve resumen..."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="section">Sección</Label>
              <Select value={section} onValueChange={setSection}>
                <SelectTrigger id="section">
                  <SelectValue placeholder="Seleccionar sección" />
                </SelectTrigger>
                <SelectContent>
                  {courseSections.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border border-onyx/20 bg-cloud overflow-hidden">
            <div className="flex flex-wrap gap-1 border-b border-onyx/20 bg-gray-50 p-2 items-center">
              {toolbarItems.map((item) => (
                <Button
                  key={item.label}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={item.action}
                  aria-label={item.label}
                  aria-pressed={item.active}
                  className={cn(
                    "h-8 w-8 border border-onyx/10",
                    item.active && "bg-jetstream-10 text-jetstream-blue border-jetstream-blue/30"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                </Button>
              ))}

              <div className="ml-auto">
                <Button
                  size="sm"
                  onClick={exportMdx}
                  disabled={!canExport}
                  className="font-mono text-xs gap-2"
                >
                  <Download className="h-3.5 w-3.5" />
                  Exportar MDX
                </Button>
              </div>
            </div>

            <div className="p-6">
              <Tabs defaultValue="edit" className="space-y-4">
                <TabsList className="border-b border-onyx/20 bg-transparent gap-0 w-full justify-start">
                  <TabsTrigger value="edit">Editar</TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Vista previa
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="edit">
                  <div className="border border-onyx/20 bg-white p-4 min-h-[420px] focus-within:border-jetstream-blue transition-colors duration-150">
                    <EditorContent editor={editor} />
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <MdxPreview markdown={previewMarkdown} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </PageShell>
    </TooltipProvider>
  );
}

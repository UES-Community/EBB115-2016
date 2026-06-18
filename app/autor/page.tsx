"use client";

import * as React from "react";
import Link from "next/link";
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
  ArrowLeft,
  Download,
  Eye,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Code,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/toaster";

const lowlight = createLowlight(common);

export default function AuthorPage() {
  const { toast } = useToast();
  const [title, setTitle] = React.useState("Nueva lección");
  const [description, setDescription] = React.useState("");
  const [section, setSection] = React.useState("introduccion");

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
  });

  const getMarkdown = () => {
    if (!editor) return "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storage = editor.storage as any;
    return storage.markdown?.getMarkdown?.() ?? editor.getText();
  };

  const exportMdx = () => {
    const markdown = getMarkdown();
    const frontmatter = `---
title: "${title}"
description: "${description}"
section: ${section}
order: 99
---

`;
    const mdx = frontmatter + markdown;
    const blob = new Blob([mdx], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.mdx`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exportado",
      description: "El archivo MDX se ha descargado correctamente.",
    });
  };

  if (!editor) return null;

  const ToolbarBtn = ({
    onClick,
    label,
    children,
  }: {
    onClick: () => void;
    label: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center h-8 w-8 border border-onyx/10 bg-white text-stratosphere hover:text-onyx hover:border-onyx/30 transition-all"
    >
      {children}
    </button>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-cloud text-onyx font-sans">
        {/* Header */}
        <header className="border-b border-onyx/20 bg-cloud sticky top-0 z-50">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Inicio
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-jetstream-blue" />
              <h1 className="font-mono text-sm font-semibold tracking-wide text-onyx select-none">
                Editor de Lecciones
                <span className="text-stratosphere font-normal"> · EBB115-2016</span>
              </h1>
            </div>
            <div className="w-24" />
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-6xl px-6 py-8 space-y-6">
          {/* Section headline */}
          <h2
            className="font-display font-semibold text-onyx border-b border-onyx/20 pb-4"
            style={{ fontSize: "clamp(22px, 3vw, 36px)", letterSpacing: "-0.02em", lineHeight: 1 }}
          >
            Nueva Lección
          </h2>

          {/* Metadata inputs */}
          <div className="border border-onyx/20 bg-cloud p-6 grid gap-6 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label htmlFor="title" className="text-xs font-mono font-medium text-stratosphere uppercase tracking-widest">
                Título
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Introducción a la materia"
                className="w-full border border-onyx/20 bg-white text-onyx px-3 py-2 text-sm focus:border-jetstream-blue focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="description" className="text-xs font-mono font-medium text-stratosphere uppercase tracking-widest">
                Descripción
              </label>
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve resumen..."
                className="w-full border border-onyx/20 bg-white text-onyx px-3 py-2 text-sm focus:border-jetstream-blue focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="section" className="text-xs font-mono font-medium text-stratosphere uppercase tracking-widest">
                Sección
              </label>
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full border border-onyx/20 bg-white text-onyx px-3 py-2 text-sm focus:border-jetstream-blue focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="introduccion">Introducción</option>
                <option value="fundamentos">Fundamentos</option>
                <option value="practica">Práctica</option>
              </select>
            </div>
          </div>

          {/* Editor */}
          <div className="border border-onyx/20 bg-cloud overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 border-b border-onyx/20 bg-gray-50 p-2 items-center">
              <ToolbarBtn
                onClick={() => editor.chain().focus().toggleBold().run()}
                label="Negrita"
              >
                <Bold className="h-4 w-4" />
              </ToolbarBtn>
              <ToolbarBtn
                onClick={() => editor.chain().focus().toggleItalic().run()}
                label="Cursiva"
              >
                <Italic className="h-4 w-4" />
              </ToolbarBtn>
              <ToolbarBtn
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                label="Título 1"
              >
                <Heading1 className="h-4 w-4" />
              </ToolbarBtn>
              <ToolbarBtn
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                label="Título 2"
              >
                <Heading2 className="h-4 w-4" />
              </ToolbarBtn>
              <ToolbarBtn
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                label="Lista"
              >
                <List className="h-4 w-4" />
              </ToolbarBtn>
              <ToolbarBtn
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                label="Bloque de código"
              >
                <Code className="h-4 w-4" />
              </ToolbarBtn>

              <div className="ml-auto">
                <button
                  onClick={exportMdx}
                  className="inline-flex items-center gap-2 border-[1.5px] border-jetstream-blue text-jetstream-blue text-xs font-mono px-4 py-1.5 hover:bg-jetstream-blue hover:text-cloud transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  Exportar MDX
                </button>
              </div>
            </div>

            {/* Tabs */}
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
                  <div className="border border-onyx/20 bg-white p-4 min-h-[420px] focus-within:border-jetstream-blue transition-all">
                    <EditorContent editor={editor} />
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <div
                    className="prose-course border border-onyx/20 bg-white p-6 min-h-[420px] overflow-auto"
                    dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

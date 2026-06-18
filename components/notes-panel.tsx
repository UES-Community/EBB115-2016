"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  CheckSquare,
  Highlighter,
  Link as LinkIcon,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function getStorageKey(slug: string) {
  return `ebb115-notas-${slug}`;
}

interface NotesPanelProps {
  slug: string;
  className?: string;
}

export function NotesPanel({ slug, className }: NotesPanelProps) {
  const [open, setOpen] = React.useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Link.configure({ openOnClick: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({
        placeholder: "Escribe tus notas para esta lección...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[200px] focus:outline-none px-4 py-3 text-onyx font-sans leading-relaxed text-sm",
      },
    },
    onUpdate: ({ editor: ed }) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(getStorageKey(slug), JSON.stringify(ed.getJSON()));
      }
    },
  });

  React.useEffect(() => {
    if (!editor || typeof window === "undefined") return;
    const saved = localStorage.getItem(getStorageKey(slug));
    if (saved) {
      try {
        editor.commands.setContent(JSON.parse(saved));
      } catch {
        editor.commands.setContent(saved);
      }
    } else {
      editor.commands.clearContent();
    }
  }, [slug, editor]);

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    children,
    label,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    label: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "h-7 w-7",
        active
          ? "border border-jetstream-blue text-jetstream-blue bg-jetstream-10"
          : "text-stratosphere hover:text-onyx hover:bg-gray-100"
      )}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </Button>
  );

  return (
    <aside
      className={cn(
        "flex flex-col border-l border-onyx/20 bg-cloud transition-all duration-200",
        open ? "w-72" : "w-12",
        className
      )}
      aria-label="Panel de notas"
    >
      <div className="flex h-14 items-center justify-between border-b border-onyx/20 px-3 py-2">
        {open && (
          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-onyx tracking-wide">
            <StickyNote className="h-4 w-4 text-jetstream-blue" />
            Mis Notas
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-gray-100 text-stratosphere hover:text-onyx mx-auto"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Colapsar notas" : "Expandir notas"}
          aria-expanded={open}
        >
          <StickyNote className="h-4 w-4" />
        </Button>
      </div>

      {open && (
        <>
          <div className="flex flex-wrap gap-0.5 border-b border-onyx/20 bg-gray-50 p-1.5 items-center">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              label="Negrita"
            >
              <Bold className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              label="Cursiva"
            >
              <Italic className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              active={editor.isActive("highlight")}
              label="Resaltar"
            >
              <Highlighter className="h-3.5 w-3.5" />
            </ToolbarButton>

            <Separator orientation="vertical" className="mx-1 h-5" />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
              label="Lista"
            >
              <List className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
              label="Lista numerada"
            >
              <ListOrdered className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              active={editor.isActive("taskList")}
              label="Lista de tareas"
            >
              <CheckSquare className="h-3.5 w-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                const url = window.prompt("URL del enlace:");
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }}
              active={editor.isActive("link")}
              label="Enlace"
            >
              <LinkIcon className="h-3.5 w-3.5" />
            </ToolbarButton>
          </div>
          <ScrollArea className="flex-1 bg-white">
            <EditorContent editor={editor} />
          </ScrollArea>
        </>
      )}
    </aside>
  );
}

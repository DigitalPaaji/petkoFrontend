"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichEditor = ({ value, onChange }) => {
  const [mounted, setMounted] = useState(false);

  // Ensure it's only rendered after mount (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[150px] outline-none p-3",
      },
    },
    // 👇 this avoids hydration mismatch
    injectCSS: false,
    autofocus: false,
    editable: true,
    parseOptions: {
      preserveWhitespace: "full",
    },
    immediatelyRender: false, // 👈 required in Next.js SSR
  });

  // Wait until mounted to avoid SSR hydration issues
  if (!mounted || !editor) return <p>Loading editor...</p>;

  return (
    <div className="border rounded-md border-gray-300">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "font-bold text-blue-600" : ""}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "italic text-blue-600" : ""}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "text-blue-600" : ""}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "text-blue-600" : ""}
        >
          1. List
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichEditor;

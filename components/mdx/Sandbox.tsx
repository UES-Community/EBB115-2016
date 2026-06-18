"use client";

import * as React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  type SandpackFiles,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";

interface SandboxProps {
  template?: SandpackPredefinedTemplate;
  files?: SandpackFiles;
}

// Heart Aerospace light theme for Sandpack
const heartSandpackTheme = {
  colors: {
    surface1: "#ffffff",   // Cloud
    surface2: "#f5f5f5",   // Off-white
    surface3: "#e8e8e8",   // Light gray
    clickable: "#716e85",   // Stratosphere
    base: "#000000",        // Onyx
    disabled: "#999999",
    hover: "#001489",       // Jetstream Blue
    accent: "#001489",      // Jetstream Blue
    error: "#cc0000",
    errorSurface: "#fff0f0",
  },
  syntax: {
    plain: "#000000",
    comment: { color: "#716e85", fontStyle: "italic" as const },
    keyword: "#001489",
    tag: "#001489",
    punctuation: "#000000",
    definition: "#000000",
    property: "#716e85",
    static: "#001489",
    string: "#005a00",
  },
  font: {
    body: "var(--font-sans)",
    mono: "var(--font-mono)",
    size: "13px",
    lineHeight: "1.6",
  },
};

export function Sandbox({
  template = "react",
  files,
}: SandboxProps) {
  return (
    <div className="my-6 overflow-hidden border border-onyx/20 not-prose bg-white">
      <SandpackProvider
        template={template}
        files={files}
        theme={heartSandpackTheme}
        options={{
          autorun: true,
          recompileMode: "delayed",
          recompileDelay: 500,
        }}
      >
        <SandpackLayout className="!border-0 !rounded-none">
          <SandpackCodeEditor
            showTabs={template === "react"}
            showLineNumbers
            style={{ height: 320 }}
            className="!border-r !border-onyx/20"
          />
          <SandpackPreview
            style={{ height: 320 }}
            showNavigator={false}
            showRefreshButton={true}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

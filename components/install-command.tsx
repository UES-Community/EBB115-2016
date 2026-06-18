"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Platform = "unix" | "win" | "package";

const COMMANDS: Record<Platform, string> = {
  unix: "curl -fsSL https://ues.edu.sv/ebb115 | sh",
  win: 'powershell -c "irm https://ues.edu.sv/ebb115.ps1 | iex"',
  package: "pnpm add ebb115-2016",
};

export function InstallCommand() {
  const [platform, setPlatform] = useState<Platform>("unix");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(COMMANDS[platform]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="w-full max-w-lg">
      {/* Platform tabs */}
      <div className="flex border-b border-onyx/20 mb-0">
        {(["unix", "win", "package"] as Platform[]).map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`px-4 py-2 text-xs font-mono border-b-2 transition-all ${
              platform === p
                ? "border-jetstream-blue text-onyx font-semibold"
                : "border-transparent text-stratosphere hover:text-onyx"
            }`}
          >
            {p === "unix" ? "macOS / Linux" : p === "win" ? "Windows" : "pnpm"}
          </button>
        ))}
      </div>

      {/* Command box — outlined ghost style */}
      <div className="relative flex items-center justify-between border border-jetstream-blue bg-cloud p-4 font-mono text-sm overflow-hidden group">
        <span className="text-onyx select-all pr-12 truncate">
          <span className="text-stratosphere">$ </span>
          {COMMANDS[platform]}
        </span>
        <button
          onClick={handleCopy}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 border border-onyx/20 bg-white text-stratosphere hover:text-onyx hover:border-onyx transition-all active:scale-95"
          aria-label="Copiar comando"
        >
          {copied ? (
            <Check className="h-4 w-4 text-jetstream-blue" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

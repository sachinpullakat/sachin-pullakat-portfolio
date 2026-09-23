import { useState } from "react";
import { profile } from "../data/profile";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail (permissions/unsupported browser); fail silently, link still works.
    }
  };

  return (
    <section id="contact" className="border-t border-graphite-700/60 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-2xl font-semibold text-graphite-50">Let's build something useful.</h2>
        <p className="mt-3 max-w-prose font-body text-sm text-graphite-400">
          Interested in AI, computer vision, software engineering, or building something together?
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="focus-ring rounded bg-signal px-5 py-2.5 font-body text-sm font-medium text-graphite-950 hover:bg-signal-bright"
          >
            Email me
          </a>
          <button
            onClick={copyEmail}
            className="focus-ring rounded border border-graphite-600 px-5 py-2.5 font-body text-sm text-graphite-50 hover:border-signal hover:text-signal-bright"
          >
            {copied ? "Copied ✓" : "Copy email"}
          </button>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded border border-graphite-600 px-5 py-2.5 font-body text-sm text-graphite-50 hover:border-signal hover:text-signal-bright"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded border border-graphite-600 px-5 py-2.5 font-body text-sm text-graphite-50 hover:border-signal hover:text-signal-bright"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ReactNode } from "react";
import { ExerciseCallout } from "./ExerciseCallout";
import { LessonSection } from "./LessonSections";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function H2({ children }: { children?: ReactNode }) {
  return (
    <h2 className="mt-12 scroll-mt-24 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white first:mt-0">
      {children}
    </h2>
  );
}

function H3({ children }: { children?: ReactNode }) {
  return (
    <h3 className="mt-8 font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-green-500">
      {children}
    </h3>
  );
}

function P({ children }: { children?: ReactNode }) {
  return (
    <p className="mt-4 text-base leading-7 text-neutral-300">{children}</p>
  );
}

function Ul({ children }: { children?: ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-neutral-300 marker:text-green-500">
      {children}
    </ul>
  );
}

function Ol({ children }: { children?: ReactNode }) {
  return (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-neutral-300 marker:text-green-500">
      {children}
    </ol>
  );
}

function Li({ children }: { children?: ReactNode }) {
  return <li className="pl-1">{children}</li>;
}

function Strong({ children }: { children?: ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

function A({
  href,
  children,
}: {
  href?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-green-500 underline decoration-green-500/40 underline-offset-2 transition-colors hover:text-green-400"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function Blockquote({ children }: { children?: ReactNode }) {
  return (
    <blockquote className="mt-6 border-l-4 border-green-500 bg-neutral-950 px-5 py-4 text-neutral-300">
      {children}
    </blockquote>
  );
}

function Hr() {
  return <hr className="my-10 border-neutral-800" />;
}

/** Legacy box — kept so Module I MDX still renders. */
function Concept({ children }: { children?: ReactNode }) {
  return <LessonSection id="what">{children}</LessonSection>;
}

function Why({ children }: { children?: ReactNode }) {
  return <LessonSection id="why">{children}</LessonSection>;
}

function Example({ children }: { children?: ReactNode }) {
  return <LessonSection id="example">{children}</LessonSection>;
}

function Exercise({ children }: { children?: ReactNode }) {
  return <ExerciseCallout>{children}</ExerciseCallout>;
}

function YouTube({
  id,
  title = "Video",
}: {
  id: string;
  title?: string;
}) {
  const videoId = id.includes("youtube.com") || id.includes("youtu.be")
    ? extractYouTubeId(id)
    : id;

  if (!videoId) return null;

  return (
    <figure className="mt-8 overflow-hidden border border-neutral-800 bg-black">
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {title ? (
        <figcaption className="border-t border-neutral-800 px-4 py-2 font-[family-name:var(--font-display)] text-xs uppercase tracking-wider text-neutral-500">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1) || null;
    }
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

function Figure({
  src,
  alt,
  caption,
  children,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <figure className="mt-8 border border-neutral-800 bg-neutral-950">
      {src ? (
        <div className="relative aspect-[16/9] w-full bg-black">
          <Image
            src={src}
            alt={alt ?? caption ?? ""}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      ) : (
        <div className="px-4 py-6">{children}</div>
      )}
      {caption ? (
        <figcaption className="border-t border-neutral-800 px-4 py-2 text-sm text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Simple cockpit posture diagram for Module 0. */
function PostureDiagram() {
  return (
    <Figure caption="Referencia: brazos casi rectos, muñecas sobre la corona, espalda apoyada.">
      <svg
        viewBox="0 0 360 180"
        className="mx-auto h-auto w-full max-w-lg text-green-500"
        role="img"
        aria-label="Diagrama de postura en el cockpit"
      >
        <rect
          x="20"
          y="40"
          width="90"
          height="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text x="35" y="30" fill="#a3a3a3" fontSize="12">
          Asiento
        </text>
        <circle cx="140" cy="55" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="140" y1="69" x2="140" y2="120" stroke="currentColor" strokeWidth="2" />
        <line x1="140" y1="80" x2="220" y2="70" stroke="currentColor" strokeWidth="2" />
        <line x1="140" y1="80" x2="220" y2="95" stroke="currentColor" strokeWidth="2" />
        <circle cx="250" cy="82" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="236" y="86" fill="#a3a3a3" fontSize="11">
          Volante
        </text>
        <path
          d="M 155 125 L 155 160 L 200 160"
          fill="none"
          stroke="#737373"
          strokeWidth="2"
        />
        <text x="205" y="164" fill="#a3a3a3" fontSize="11">
          Pedales
        </text>
        <path
          d="M 155 78 Q 185 60 218 68"
          fill="none"
          stroke="#00e676"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text x="170" y="52" fill="#00e676" fontSize="11">
          ~recto
        </text>
      </svg>
    </Figure>
  );
}

function VisionLoopDiagram() {
  return (
    <Figure caption="Ciclo visual: planificar ~1 s adelante, check rápido al morro, repetir.">
      <svg
        viewBox="0 0 420 140"
        className="mx-auto h-auto w-full max-w-xl text-green-500"
        role="img"
        aria-label="Diagrama visión de planificación y evaluación"
      >
        <rect x="20" y="40" width="140" height="55" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="72" fill="#f5f5f5" fontSize="13">
          Planificar
        </text>
        <path d="M165 67 H205" stroke="currentColor" strokeWidth="2" />
        <rect x="210" y="40" width="140" height="55" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="245" y="72" fill="#f5f5f5" fontSize="13">
          Evaluar
        </text>
        <path
          d="M280 95 V115 H90 V95"
          fill="none"
          stroke="#737373"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <text x="155" y="132" fill="#a3a3a3" fontSize="11">
          repetir en el sector
        </text>
      </svg>
    </Figure>
  );
}

function BrakeProfileDiagram() {
  return (
    <Figure caption="Poca carga: pico ≈ terminal. Mucha carga: pico alto y soltado fuerte al caer la velocidad.">
      <svg
        viewBox="0 0 420 180"
        className="mx-auto h-auto w-full max-w-xl text-green-500"
        role="img"
        aria-label="Perfiles de frenada poca vs mucha carga aerodinámica"
      >
        <line x1="40" y1="150" x2="390" y2="150" stroke="#525252" strokeWidth="1" />
        <line x1="40" y1="20" x2="40" y2="150" stroke="#525252" strokeWidth="1" />
        <text x="8" y="30" fill="#a3a3a3" fontSize="10">
          P
        </text>
        <text x="370" y="168" fill="#a3a3a3" fontSize="10">
          t
        </text>
        <path
          d="M50 130 L90 70 L200 75 L340 80"
          fill="none"
          stroke="#a3a3a3"
          strokeWidth="2"
        />
        <text x="200" y="65" fill="#a3a3a3" fontSize="11">
          poca DF
        </text>
        <path
          d="M50 130 L85 30 L140 55 L220 95 L340 125"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text x="250" y="100" fill="#00e676" fontSize="11">
          mucha DF
        </text>
      </svg>
    </Figure>
  );
}

function PressLessDiagram() {
  return (
    <Figure caption="Press Less: sigues empujando, pero cada vez menos — el pedal sube solo.">
      <svg
        viewBox="0 0 420 140"
        className="mx-auto h-auto w-full max-w-xl text-green-500"
        role="img"
        aria-label="Diagrama técnica Press Less"
      >
        <text x="30" y="30" fill="#a3a3a3" fontSize="12">
          presión
        </text>
        {[100, 90, 80, 70].map((v, i) => (
          <g key={v}>
            <rect
              x={60 + i * 80}
              y={40 + i * 18}
              width="60"
              height={90 - i * 18}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text x={72 + i * 80} y={35 + i * 18} fill="#f5f5f5" fontSize="12">
              {v}%
            </text>
          </g>
        ))}
        <path
          d="M50 125 H370"
          stroke="#525252"
          strokeWidth="1"
        />
      </svg>
    </Figure>
  );
}

function PracticeLoopDiagram() {
  return (
    <Figure caption="Ciclo: aprender una variable → practicar hasta automatizar → siguiente capa.">
      <svg
        viewBox="0 0 420 120"
        className="mx-auto h-auto w-full max-w-xl text-green-500"
        role="img"
        aria-label="Diagrama aprender versus practicar"
      >
        <rect x="10" y="35" width="110" height="50" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="28" y="65" fill="#f5f5f5" fontSize="13">
          Aprender
        </text>
        <path d="M125 60 H165" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="170" y="35" width="120" height="50" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="188" y="65" fill="#f5f5f5" fontSize="13">
          Practicar
        </text>
        <path d="M295 60 H335" stroke="currentColor" strokeWidth="2" />
        <rect x="340" y="35" width="70" height="50" fill="none" stroke="#737373" strokeWidth="2" />
        <text x="352" y="65" fill="#a3a3a3" fontSize="13">
          +1 capa
        </text>
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="#00e676" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

export const lessonMdxComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  strong: Strong,
  a: A,
  blockquote: Blockquote,
  hr: Hr,
  Concept,
  Why,
  Example,
  Exercise,
  YouTube,
  Figure,
  PostureDiagram,
  PracticeLoopDiagram,
  VisionLoopDiagram,
  BrakeProfileDiagram,
  PressLessDiagram,
};

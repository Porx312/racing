/**
 * Creates empty bilingual MDX article shells from the curriculum.
 * Does not overwrite existing files.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { curriculum, flattenLessons } from "../lib/curriculum";

const root = process.cwd();

const placeholders = {
  es: {
    lead: "Lead: qué vas a aprender y por qué importa hoy.",
    idea: "Definición y contexto en prosa.",
    why: "Física, hábitos o grip.",
    track: "Una curva o sesión concreta.",
    errors: "- Error típico uno\n- Error típico dos",
    exercise: "Pasos medibles: reps, %, qué anotar.",
    next: "Qué abrir a continuación en el temario.",
    hIdea: "La idea",
    hWhy: "Por qué funciona",
    hTrack: "En pista",
    hErrors: "Errores típicos",
    hNext: "Siguiente",
  },
  en: {
    lead: "Lead: what you will learn and why it matters today.",
    idea: "Definition and context in prose.",
    why: "Physics, habits, or grip.",
    track: "One concrete corner or session.",
    errors: "- Typical mistake one\n- Typical mistake two",
    exercise: "Measurable steps: reps, %, what to log.",
    next: "What to open next in the syllabus.",
    hIdea: "The idea",
    hWhy: "Why it works",
    hTrack: "On track",
    hErrors: "Typical mistakes",
    hNext: "Next",
  },
} as const;

function mdxBody(locale: "es" | "en", title: string, part: string, slug: string): string {
  const p = placeholders[locale];
  return `---
title: ${JSON.stringify(title)}
part: ${part}
slug: ${slug}
status: coming-soon
---

${p.lead}

## ${p.hIdea}

${p.idea}

## ${p.hWhy}

${p.why}

## ${p.hTrack}

${p.track}

## ${p.hErrors}

${p.errors}

<Exercise>
${p.exercise}
</Exercise>

## ${p.hNext}

${p.next}
`;
}

async function writeIfMissing(filePath: string, contents: string): Promise<"created" | "skipped"> {
  try {
    await fs.access(filePath);
    return "skipped";
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, contents, "utf8");
    return "created";
  }
}

async function main() {
  let created = 0;
  let skipped = 0;

  for (const item of flattenLessons()) {
    const part = item.part.slug;
    const slug = item.lesson.slug;

    for (const locale of ["es", "en"] as const) {
      const filePath = path.join(root, "content", locale, "lessons", part, `${slug}.mdx`);
      const title = item.lesson.title[locale];
      const result = await writeIfMissing(filePath, mdxBody(locale, title, part, slug));
      if (result === "created") created += 1;
      else skipped += 1;
    }
  }

  console.log(
    `Scaffold lessons: ${created} created, ${skipped} skipped (${curriculum.length} parts, ${flattenLessons().length} lessons × 2 locales)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

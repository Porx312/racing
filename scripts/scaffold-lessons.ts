/**
 * Creates empty bilingual MDX shells from the curriculum.
 * Does not overwrite existing files.
 *
 * Usage: npx tsx scripts/scaffold-lessons.ts
 */
import fs from "node:fs/promises";
import path from "node:path";
import { curriculum, flattenLessons } from "../lib/curriculum";

const root = process.cwd();

const placeholders = {
  es: {
    concept: "Definición corta del concepto.",
    why: "Física: peso, grip y rotación.",
    example: "Una curva o situación concreta.",
    exercise: "Pasos medibles para practicarlo.",
  },
  en: {
    concept: "Short definition of the concept.",
    why: "Physics: weight, grip, and rotation.",
    example: "One concrete corner or situation.",
    exercise: "Measurable steps to practice it.",
  },
} as const;

function mdxBody(locale: "es" | "en", title: string, part: string, slug: string): string {
  const p = placeholders[locale];
  return `---
title: ${JSON.stringify(title)}
part: ${part}
slug: ${slug}
status: coming-soon
sections:
  - what
  - why
  - example
  - exercise
---

<Concept>
${p.concept}
</Concept>

<Why>
${p.why}
</Why>

<Example>
${p.example}
</Example>

<Exercise>
${p.exercise}
</Exercise>
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

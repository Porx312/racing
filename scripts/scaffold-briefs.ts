/**
 * Creates empty Spanish briefs from the curriculum.
 * Does not overwrite existing files.
 *
 * Usage: npx tsx scripts/scaffold-briefs.ts
 */
import fs from "node:fs/promises";
import path from "node:path";
import { flattenLessons } from "../lib/curriculum";

const root = process.cwd();

function briefBody(title: string): string {
  return `# Brief: ${title}

## Concepto
Una frase: qué es.

## Física
Peso / grip / rotación — lo mínimo para entender el porqué.

## Ejemplo
Curva o situación concreta (reutilizable en la lección).

## Ejercicio
Pasos medibles: velocidad, % freno, procedimiento.

## Errores típicos
- Error 1
- Error 2
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
    const filePath = path.join(root, "content", "briefs", part, `${slug}.md`);
    const result = await writeIfMissing(filePath, briefBody(item.lesson.title.es));
    if (result === "created") created += 1;
    else skipped += 1;
  }

  console.log(`Scaffold briefs: ${created} created, ${skipped} skipped`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

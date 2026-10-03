/**
 * Creates empty Spanish article briefs from the curriculum.
 * Does not overwrite existing files.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { flattenLessons } from "../lib/curriculum";

const root = process.cwd();

function briefBody(title: string): string {
  return `# Brief: ${title}

## Lead
2–3 frases: qué aprenderás y por qué importa hoy.

## La idea
Definición + contexto.

## Por qué funciona
Física / hábitos / grip.

## En pista
Curva o sesión concreta (reutilizable en el módulo).

## Errores típicos
- Error 1
- Error 2

## Ejercicio
Pasos medibles: reps, %, qué anotar.

## Media
- YouTube ID (opcional):
- Figura / diagrama (opcional):

## Siguiente
Siguiente lección del temario.
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

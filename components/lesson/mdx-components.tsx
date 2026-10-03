import type { MDXComponents } from "mdx/types";
import { LessonSection } from "./LessonSections";

function Concept({ children }: { children: React.ReactNode }) {
  return <LessonSection id="what">{children}</LessonSection>;
}

function Why({ children }: { children: React.ReactNode }) {
  return <LessonSection id="why">{children}</LessonSection>;
}

function Example({ children }: { children: React.ReactNode }) {
  return <LessonSection id="example">{children}</LessonSection>;
}

function Exercise({ children }: { children: React.ReactNode }) {
  return <LessonSection id="exercise">{children}</LessonSection>;
}

export const lessonMdxComponents: MDXComponents = {
  Concept,
  Why,
  Example,
  Exercise,
};

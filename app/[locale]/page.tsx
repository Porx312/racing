import { getTranslations, setRequestLocale } from "next-intl/server";
import { countLessons, curriculum, flattenLessons, getLessonHref } from "@/lib/curriculum";
import { countPublishedInPart } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tLearn = await getTranslations("learn");
  const tLesson = await getTranslations("lesson");

  const publishedByPart = Object.fromEntries(
    await Promise.all(
      curriculum.map(async (part) => [
        part.slug,
        await countPublishedInPart(part.slug),
      ]),
    ),
  ) as Record<string, number>;

  const steps = [
    { title: t("stepConcept"), body: t("stepConceptBody") },
    { title: t("stepWhy"), body: t("stepWhyBody") },
    { title: t("stepExample"), body: t("stepExampleBody") },
    { title: t("stepExercise"), body: t("stepExerciseBody") },
  ];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-neutral-800">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-full w-1/2 skew-x-[-12deg] bg-green-500/10"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.35em] text-green-500">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-7xl lg:text-8xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="bg-green-500 px-6 py-3 font-[family-name:var(--font-display)] text-xl uppercase tracking-wider text-black transition-colors hover:bg-green-400"
            >
              {t("cta")}
            </Link>
            <a
              href="#metodo"
              className="border border-neutral-600 px-6 py-3 font-[family-name:var(--font-display)] text-xl uppercase tracking-wider text-white transition-colors hover:border-green-500 hover:text-green-500"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </section>

      <section
        id="metodo"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
      >
        <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-green-500">
          {t("methodEyebrow")}
        </p>
        <h2 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl uppercase leading-none text-white sm:text-5xl">
          {t("methodTitle")}
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">{t("methodBody")}</p>
        <ol className="mt-10 grid gap-px bg-neutral-800 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-black p-6">
              <p className="font-[family-name:var(--font-display)] text-4xl text-green-500">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl uppercase text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase text-white sm:text-5xl">
            {t("curriculumTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-400">{t("curriculumBody")}</p>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {curriculum.map((part, index) => {
              const firstInPart = flattenLessons().find(
                (item) => item.part.slug === part.slug,
              );
              const href = firstInPart ? getLessonHref(firstInPart) : "/learn";
              const publishedCount = publishedByPart[part.slug] ?? 0;
              const total = countLessons(part);
              const partBadge =
                publishedCount === 0
                  ? t("comingSoon")
                  : publishedCount === total
                    ? tLesson("published")
                    : `${publishedCount}/${total}`;

              return (
                <article
                  key={part.slug}
                  className="group flex flex-col border border-neutral-800 bg-black p-6 transition-colors hover:border-green-500"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-[family-name:var(--font-display)] text-5xl text-green-500">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <span
                      className={`font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] ${
                        publishedCount > 0 ? "text-green-500" : "text-neutral-500"
                      }`}
                    >
                      {partBadge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl uppercase text-white">
                    {part.title[locale]}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-neutral-400">
                    {part.summary[locale]}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-wider text-neutral-500">
                    {tLearn("lessons", { count: countLessons(part) })}
                  </p>
                  <Link
                    href={href}
                    className="mt-5 inline-flex font-[family-name:var(--font-display)] text-lg uppercase tracking-wider text-green-500 group-hover:text-green-400"
                  >
                    {t("viewPart")} →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

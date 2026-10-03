import { Link } from "@/i18n/navigation";

export function Logo() {
  return (
    <Link
      href="/"
      className="pl-3 font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.08em] text-white transition-colors hover:text-green-500"
    >
      Apex School
    </Link>
  );
}

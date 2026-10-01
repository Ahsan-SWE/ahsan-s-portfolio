import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-5 px-4 pt-24 text-center sm:px-6 lg:px-8">
      <p className="rounded-full border border-blue-500/20 bg-white/65 px-5 py-2 text-sm font-bold text-blue-500 backdrop-blur-2xl dark:bg-slate-800/65">
        404
      </p>
      <h1 className="font-heading text-4xl font-extrabold text-slate-950 dark:text-white">
        Page not found
      </h1>
      <p className="max-w-md text-slate-600 dark:text-slate-400">
        The page you requested does not exist. Return to the portfolio home
        page.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-7 py-3.5 font-bold text-white shadow-xl shadow-blue-500/30 transition duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-purple-600"
      >
        <FaArrowLeft aria-hidden="true" />
        Back to Home
      </Link>
    </section>
  );
}

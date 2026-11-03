import { WARD_NAME } from "@/lib/ward";

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-800 py-4 text-center text-sm text-white print:hidden">
      <p>
        &copy; {new Date().getFullYear()} {WARD_NAME} Sacrament Meeting Planner
      </p>
    </footer>
  );
}

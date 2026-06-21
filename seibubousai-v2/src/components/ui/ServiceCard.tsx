import Link from "next/link";
import type { Service } from "@/types";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.href}
      className="service-card group relative flex flex-col overflow-hidden rounded-2xl bg-white"
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-red-50 to-orange-50">
        <div className="absolute inset-0 flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-110">
          {service.icon}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line flex-1">
          {service.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-600">
          詳しく見る
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-slate-700">
      <span className="text-red-600" aria-hidden="true">
        ✓
      </span>
      {label}
    </span>
  );
}

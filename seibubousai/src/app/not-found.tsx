import Link from "next/link";
import { Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-black text-brand-red mb-4 select-none">404</p>
        <h1 className="text-2xl font-bold text-brand-navy mb-3">
          ページが見つかりません
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          お探しのページは移動・削除されたか、URLが間違っている可能性があります。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white font-bold px-6 py-3 rounded-md hover:bg-brand-navy-dark transition-colors"
          >
            <Home size={18} />
            トップページへ
          </Link>
          <a
            href="tel:048XXXXXXX"
            className="inline-flex items-center justify-center gap-2 bg-brand-red text-white font-bold px-6 py-3 rounded-md hover:bg-brand-red-dark transition-colors"
          >
            <Phone size={18} />
            お電話でお問い合わせ
          </a>
        </div>
      </div>
    </div>
  );
}

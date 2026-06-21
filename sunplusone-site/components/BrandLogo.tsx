import Image from "next/image";
import { SITE_IMAGES } from "@/lib/siteImages";

type Props = {
  className?: string;
  /** トップ LCP 用 */
  priority?: boolean;
};

export function BrandLogo({ className = "h-10 w-auto md:h-12", priority }: Props) {
  return (
    <Image
      src={SITE_IMAGES.logo}
      alt="株式会社サンプラスワン（SUNPLUS ONE）"
      width={280}
      height={72}
      className={className}
      priority={priority}
      sizes="(max-width: 768px) 200px, 280px"
    />
  );
}

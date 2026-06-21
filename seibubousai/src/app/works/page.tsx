import type { Metadata } from "next";
import { baseMetadata, pageMetadata } from "@/lib/metadata";
import WorksClient from "./WorksClient";

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.works.title,
  description: pageMetadata.works.description,
};

export default function WorksPage() {
  return <WorksClient />;
}

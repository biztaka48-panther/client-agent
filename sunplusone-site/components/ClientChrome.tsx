"use client";

import { FloatingActionDock } from "@/components/FloatingActionDock";
import { QuickJump } from "@/components/QuickJump";
import { StickyCall } from "@/components/StickyCall";

export function ClientChrome() {
  return (
    <>
      <FloatingActionDock />
      <QuickJump />
      <StickyCall />
    </>
  );
}

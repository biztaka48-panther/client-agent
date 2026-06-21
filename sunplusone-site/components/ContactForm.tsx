"use client";

import { btnPrimary } from "@/lib/ui";

export function ContactForm() {
  return (
    <form
      className="mt-4 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label className="block text-sm font-medium text-ink" htmlFor="org">
          会社名 / 団体名
        </label>
        <input
          id="org"
          name="org"
          className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
          placeholder="例: 〇〇株式会社"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink" htmlFor="name">
          ご担当者名
        </label>
        <input id="name" name="name" className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink" htmlFor="email">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink" htmlFor="body">
          ご依頼内容
        </label>
        <textarea
          id="body"
          name="body"
          rows={5}
          className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
          placeholder="現場所在地、希望日時、警備種別など"
        />
      </div>
      <button type="submit" className={`${btnPrimary} w-full md:w-auto`}>
        送信（デモ: 未接続）
      </button>
    </form>
  );
}

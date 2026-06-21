"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  company: z.string().optional(),
  tel: z.string().optional(),
  email: z.string().email("正しいメールアドレスを入力してください"),
  type: z.enum(["inspection", "construction", "estimate", "recruit", "other"], {
    message: "お問い合わせ種別を選択してください",
  }),
  message: z.string().min(10, "10文字以上ご入力ください"),
  privacy: z
    .boolean()
    .refine((val) => val === true, "プライバシーポリシーへの同意が必要です"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const typeOptions = [
  { value: "inspection", label: "消防設備点検について" },
  { value: "construction", label: "消防設備工事について" },
  { value: "estimate", label: "お見積り依頼" },
  { value: "recruit", label: "採用について" },
  { value: "other", label: "その他" },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const formData = new URLSearchParams();
    formData.append("form-name", "contact");
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-brand-navy mb-2">
          送信が完了しました
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          お問い合わせありがとうございます。
          <br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* お名前 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            お名前 <span className="text-brand-red">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="山田 太郎"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
          />
          {errors.name && (
            <p className="text-brand-red text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* 会社名 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            会社名・建物名 <span className="text-gray-400 font-normal text-xs">（任意）</span>
          </label>
          <input
            {...register("company")}
            type="text"
            placeholder="株式会社〇〇"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
          />
        </div>

        {/* 電話番号 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            電話番号 <span className="text-gray-400 font-normal text-xs">（任意）</span>
          </label>
          <input
            {...register("tel")}
            type="tel"
            placeholder="048-XXX-XXXX"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
          />
        </div>

        {/* メールアドレス */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            メールアドレス <span className="text-brand-red">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="example@email.com"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
          />
          {errors.email && (
            <p className="text-brand-red text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* お問い合わせ種別 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          お問い合わせ種別 <span className="text-brand-red">*</span>
        </label>
        <select
          {...register("type")}
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent bg-white"
          defaultValue=""
        >
          <option value="" disabled>
            選択してください
          </option>
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-brand-red text-xs mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* メッセージ */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          お問い合わせ内容 <span className="text-brand-red">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="ご相談内容をご記入ください。&#10;例：○○区のマンションで消防設備点検を依頼したい。建物の規模は〜"
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent resize-none"
        />
        {errors.message && (
          <p className="text-brand-red text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* プライバシーポリシー */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register("privacy")}
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-brand-red"
          />
          <span className="text-sm text-gray-600">
            <a href="/privacy/" className="text-brand-red underline hover:no-underline" target="_blank">
              プライバシーポリシー
            </a>
            に同意する <span className="text-brand-red">*</span>
          </span>
        </label>
        {errors.privacy && (
          <p className="text-brand-red text-xs mt-1">{errors.privacy.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-red text-white font-bold py-4 rounded-md hover:bg-brand-red-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-lg"
      >
        {isSubmitting ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";

const recruitSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  kana: z.string().min(1, "フリガナを入力してください"),
  birthday: z.string().min(1, "生年月日を入力してください"),
  tel: z.string().min(1, "電話番号を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  position: z.enum(["inspection", "construction"], {
    message: "希望職種を選択してください",
  }),
  experience: z.string().optional(),
  license: z.string().optional(),
  message: z.string().optional(),
  privacy: z
    .boolean()
    .refine((val) => val === true, "プライバシーポリシーへの同意が必要です"),
});

type RecruitFormData = z.infer<typeof recruitSchema>;

export default function RecruitForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecruitFormData>({
    resolver: zodResolver(recruitSchema),
  });

  const onSubmit = async (data: RecruitFormData) => {
    const formData = new URLSearchParams();
    formData.append("form-name", "recruit");
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
          応募が完了しました
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          ご応募ありがとうございます。
          <br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form
      name="recruit"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="recruit" />
      <input type="hidden" name="bot-field" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            お名前 <span className="text-brand-red">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="山田 太郎"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
          {errors.name && (
            <p className="text-brand-red text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            フリガナ <span className="text-brand-red">*</span>
          </label>
          <input
            {...register("kana")}
            type="text"
            placeholder="ヤマダ タロウ"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
          {errors.kana && (
            <p className="text-brand-red text-xs mt-1">{errors.kana.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            生年月日 <span className="text-brand-red">*</span>
          </label>
          <input
            {...register("birthday")}
            type="date"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
          {errors.birthday && (
            <p className="text-brand-red text-xs mt-1">{errors.birthday.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            電話番号 <span className="text-brand-red">*</span>
          </label>
          <input
            {...register("tel")}
            type="tel"
            placeholder="090-XXXX-XXXX"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
          {errors.tel && (
            <p className="text-brand-red text-xs mt-1">{errors.tel.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            メールアドレス <span className="text-brand-red">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="example@email.com"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
          {errors.email && (
            <p className="text-brand-red text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          希望職種 <span className="text-brand-red">*</span>
        </label>
        <select
          {...register("position")}
          defaultValue=""
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red bg-white"
        >
          <option value="" disabled>
            選択してください
          </option>
          <option value="inspection">消防設備点検スタッフ</option>
          <option value="construction">消防設備施工スタッフ</option>
        </select>
        {errors.position && (
          <p className="text-brand-red text-xs mt-1">{errors.position.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          経験・スキル <span className="text-gray-400 font-normal text-xs">（任意）</span>
        </label>
        <textarea
          {...register("experience")}
          rows={3}
          placeholder="前職や関連する経験があればご記入ください"
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          保有資格 <span className="text-gray-400 font-normal text-xs">（任意）</span>
        </label>
        <input
          {...register("license")}
          type="text"
          placeholder="消防設備士 甲種○類、普通自動車免許 など"
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          メッセージ <span className="text-gray-400 font-normal text-xs">（任意）</span>
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="志望動機や質問などご自由にご記入ください"
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red resize-none"
        />
      </div>

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
        {isSubmitting ? "送信中…" : "応募する"}
      </button>
    </form>
  );
}

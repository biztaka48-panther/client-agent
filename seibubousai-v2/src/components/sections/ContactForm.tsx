"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  company: z.string().optional(),
  name: z.string().min(1, "お名前を入力してください"),
  tel: z
    .string()
    .min(1, "電話番号を入力してください")
    .regex(/^[0-9\-+() ]+$/, "電話番号の形式が正しくありません"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません"),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
  agree: z.boolean().refine((v) => v === true, {
    message: "個人情報の取扱いに同意してください",
  }),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.append("form-name", "contact");
      Object.entries(data).forEach(([k, v]) => body.append(k, String(v)));

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      window.location.href = "/contact/thanks";
    } catch {
      setSubmitting(false);
      alert("送信に失敗しました。お手数ですがお電話にてご連絡ください。");
    }
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          このフィールドは入力しないでください
          <input name="bot-field" />
        </label>
      </p>

      <div>
        <label className="mb-1.5 block text-sm text-slate-700">
          会社名（任意）
        </label>
        <input type="text" className={inputClass} {...register("company")} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-700">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input type="text" className={inputClass} {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-700">
          電話番号 <span className="text-red-500">*</span>
        </label>
        <input type="tel" className={inputClass} {...register("tel")} />
        {errors.tel && (
          <p className="mt-1 text-xs text-red-400">{errors.tel.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-700">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input type="email" className={inputClass} {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-700">
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={6}
          className={inputClass}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-red-600"
            {...register("agree")}
          />
          <span>
            個人情報の取扱いに同意します <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.agree && (
          <p className="mt-1 text-xs text-red-400">{errors.agree.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full rounded-lg bg-red-700 py-4 font-semibold text-white hover:bg-red-600 disabled:opacity-60"
      >
        {submitting ? "送信中..." : "この内容で送信する"}
      </button>
    </form>
  );
}

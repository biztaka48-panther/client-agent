"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/data/services";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.2em] text-red-600">
            Service
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl font-bold text-slate-900 sm:text-4xl">
            私たちにできること
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

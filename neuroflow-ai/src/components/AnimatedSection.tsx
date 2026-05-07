"use client";

import { motion } from "framer-motion";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"section">;

export function AnimatedSection({ children, className = "", ...rest }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.section>
  );
}

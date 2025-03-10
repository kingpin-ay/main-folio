"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />

      <div className="container relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="block">Hi, I'm </span>
            <span className="block text-primary">Ayush Mondal</span>
          </h1>

          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            A passionate full-stack developer specializing in building
            exceptional digital experiences that are fast, accessible, and
            responsive.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>

          <div className="mt-12 flex justify-center gap-6">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/kingpin-ay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://www.linkedin.com/in/ayush-mondal-a13023205/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://x.com/_Ayush_01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

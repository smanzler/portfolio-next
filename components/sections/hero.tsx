"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { scrollToSection } from "@/lib/utils";
import { H1, P } from "../ui/typography";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen grid grid-cols-2">
      <div className="flex justify-end items-center p-16">
        <div className="flex flex-col gap-4">
          <div className="text-left">
            <H1>Simon Manzler</H1>
            <P>
              Building modern, responsive, and user-friendly web and mobile
              applications
            </P>
          </div>
          <Button
            onClick={() => scrollToSection("projects")}
            className="w-fit  "
          >
            View Projects
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="flex justify-start items-center p-20 bg-accent">
        <div className="max-w-sm overflow-hidden rounded-lg">
          <Image
            src="/simon-ramen.png"
            alt="Simon Manzler"
            width={300}
            height={300}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

import { H1, H2, Lead, P, Muted } from "../ui/typography";
import ThresholdMotionDiv from "../motion/threshold-motion-div";
import { Mail } from "lucide-react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import AccentShadowContainer from "../motion/accent-shadow-container";
import ContactForm from "../contact-form";
import { ResponsiveButton } from "../responsive-button";

export default function Contact() {
  return (
    <section id="contact" className="py-40 min-h-screen">
      <ThresholdMotionDiv className="mb-12">
        <H1>Get in Touch</H1>
        <Lead>
          I'm always open to new opportunities and collaborations. Feel free to
          reach out!
        </Lead>
      </ThresholdMotionDiv>

      <div className="grid gap-12 lg:grid-cols-2">
        <ThresholdMotionDiv className="flex flex-col gap-6">
          <div>
            <H2>Let's Connect</H2>
            <P>
              Whether you have a project in mind or just want to chat, I'd love
              to hear from you!
            </P>
          </div>

          <div>
            <div className="flex gap-3">
              <ResponsiveButton
                size="sm"
                asChild
                icon={<Mail className="h-4 w-4" />}
                parent={AccentShadowContainer}
                className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shrink-0 h-9 px-6 has-[>svg]:px-4"
              >
                <Link href="mailto:simanzler@gmail.com">Email me</Link>
              </ResponsiveButton>

              <ResponsiveButton
                size="sm"
                asChild
                icon={<Icon icon="line-md:github" />}
                parent={AccentShadowContainer}
                className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shrink-0 h-9 px-6 has-[>svg]:px-4"
              >
                <Link
                  href="https://github.com/smanzler"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </ResponsiveButton>

              <ResponsiveButton
                size="sm"
                asChild
                icon={<Icon icon="line-md:linkedin" />}
                parent={AccentShadowContainer}
                className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shrink-0 h-9 px-6 has-[>svg]:px-4"
              >
                <Link
                  href="https://linkedin.com/in/simonmanzler"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </ResponsiveButton>
            </div>
          </div>
        </ThresholdMotionDiv>

        <ThresholdMotionDiv className="flex flex-col gap-6">
          <div>
            <H2>Send a Message</H2>
            <Muted>
              Fill out the form below and I'll get back to you as soon as
              possible.
            </Muted>
          </div>

          <ContactForm />
        </ThresholdMotionDiv>
      </div>
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import { useState } from "react";
import { sendContactEmail } from "@/app/actions/send-email";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitStatus.type === "success" ? (
        <Alert variant="default" className="mb-6 !grid-cols-[auto_1fr_auto]">
          <CheckCircle2 />
          <AlertTitle>Success! Your message has been sent</AlertTitle>
          <X onClick={() => setSubmitStatus({ type: null, message: "" })} />
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      ) : submitStatus.type === "error" ? (
        <Alert
          variant="destructive"
          className="mb-6 !grid-cols-[auto_1fr_auto]"
        >
          <AlertCircle />
          <AlertTitle>Error! Your message has not been sent</AlertTitle>
          <X onClick={() => setSubmitStatus({ type: null, message: "" })} />
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      ) : null}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <FieldContent>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <FieldError />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <FieldContent>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <FieldError />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <FieldContent>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <FieldError />
          </FieldContent>
        </Field>

        <div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

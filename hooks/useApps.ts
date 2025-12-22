// src/hooks/useProjects.ts
import { useMemo } from "react";

interface Policy {
  lastUpdated: string;
  sections: {
    title: string;
    content: (string | string[])[];
  }[];
}

interface Review {
  name: string;
  review: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface App {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image?: string;
  assets?: {
    type: "image" | "video";
    path: string;
    fallback?: string;
    alt?: string;
    width: number;
    height: number;
  }[];
  features?: string[];
  link?: string;
  featured?: boolean;
  github?: string;
  reviews?: Review[];
  faq?: FAQ[];
  privacyPolicy?: Policy;
  termsOfService?: Policy;
}

export function useApps() {
  const apps: App[] = useMemo(
    () => [
      {
        title: "Rep",
        description:
          "Workout tracker built to work offline and sync with your friends.",
        longDescription:
          "Rep is a comprehensive workout tracking mobile application built with React Native and Expo. It enables users to log exercises, track progress over time, and share achievements with friends. The app features offline-first architecture, ensuring users can log workouts without internet connectivity, with automatic synchronization when connection is restored. Supabase provides real-time data sync, authentication, and cloud storage.",
        image: "/rep/icon.png",
        assets: [
          {
            type: "image",
            path: "/rep/icon.png",
            alt: "Rep Icon",
            width: 100,
            height: 100,
          },
          {
            type: "image",
            path: "/rep/icon.png",
            alt: "Rep Icon",
            width: 100,
            height: 100,
          },
          {
            type: "image",
            path: "/rep/icon.png",
            alt: "Rep Icon",
            width: 100,
            height: 100,
          },
        ],
        tags: ["React Native", "Expo", "TypeScript"],
        features: [
          "Offline-first architecture with automatic sync",
          "Exercise library with custom exercise creation",
          "Progress tracking with charts and statistics",
          "Workout history and personal records",
          "Social features for sharing progress with friends",
          "Real-time data synchronization via Supabase",
        ],
        reviews: [
          {
            name: "John Doe",
            review:
              "I love this app! It's so easy to use and has all the features I need.",
            rating: 5,
          },
          {
            name: "Jane Doe",
            review: "This app has changed my life! I'm so much stronger now.",
            rating: 5,
          },
        ],
        faq: [
          {
            question: "How do I add a new exercise?",
            answer:
              "You can add a new exercise by tapping the 'Add Exercise' button and entering the exercise details.",
          },

          {
            question: "How do I track my progress?",
            answer:
              "You can track your progress by tapping the 'Progress' button and entering the exercise details.",
          },

          {
            question: "How do I sync my data?",
            answer:
              "You can sync your data by tapping the 'Sync' button and entering the exercise details.",
          },
          {
            question: "How do I share my progress with my friends?",
            answer:
              "You can share your progress with your friends by tapping the 'Share' button and entering the exercise details.",
          },
        ],
        privacyPolicy: {
          lastUpdated: "2025-01-01",
          sections: [
            {
              title: "1. Introduction",
              content: [
                'Welcome to Rep ("we", "our", "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app, Rep.',
              ],
            },
            {
              title: "2. Information We Collect",
              content: [
                "We collect the following information to provide and improve our services:",
                [
                  "Personal Information: Names and email addresses to authenticate users and personalize your experience.",
                  "Workout Data: Information about your workouts, such as exercises, sets, reps, and performance metrics.",
                  "Health Data: Optional health-related data like weight, height, and fitness goals to tailor your experience.",
                  "Photos and Images: Photos you choose to upload related to your fitness journey.",
                  "Authentication Data: Passwords, which are encrypted and securely stored using Supabase Auth.",
                ],
              ],
            },
            {
              title: "3. How We Use Your Information",
              content: [
                "We use your information to:",
                [
                  "Authenticate and verify your identity.",
                  "Track and analyze your workout performance.",
                  "Provide personalized workout recommendations and insights.",
                  "Allow you to share photos and progress updates with others (if you choose to).",
                  "Communicate with you about updates, security alerts, and support.",
                ],
              ],
            },
            {
              title: "4. Data Security",
              content: [
                "We take data security seriously and implement the following measures to protect your information:",
                [
                  "Encryption: Passwords are encrypted using Supabase Auth.",
                  "Access Controls: Only authorized personnel have access to your personal information.",
                  "Secure Storage: Data is stored on secure servers with appropriate safeguards.",
                ],
              ],
            },
            {
              title: "5. Sharing Your Information",
              content: [
                "We do not sell, trade, or otherwise transfer your personal information to outside parties, except:",
                [
                  "When we have your consent.",
                  "To comply with legal obligations.",
                  "To protect our rights, privacy, safety, or property, and that of our users.",
                ],
              ],
            },
            {
              title: "6. Your Rights",
              content: [
                "You have the following rights regarding your personal information:",
                [
                  "Access: You can request access to the personal information we hold about you.",
                  "Correction: You can request correction of any inaccurate or incomplete information.",
                  "Deletion: You can request the deletion of your personal information, subject to legal and contractual obligations.",
                ],
              ],
            },
            {
              title: "7. Changes to This Privacy Policy",
              content: [
                "We may update this Privacy Policy from time to time. We will notify you of any changes by updating the effective date at the top of this policy. We encourage you to review this Privacy Policy periodically.",
              ],
            },
            {
              title: "8. Contact Us",
              content: [
                "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at dev.simanzler@gmail.com.",
              ],
            },
            {
              title: "9. Consent",
              content: ["By using our app, you consent to our Privacy Policy."],
            },
          ],
        },
        termsOfService: {
          lastUpdated: "2025-01-01",
          sections: [
            {
              title: "1. Acceptance of Terms",
              content: [
                "By downloading, accessing, or using Dash, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, discontinue use of the app immediately.",
              ],
            },
            {
              title: "2. Eligibility and Account Registration",
              content: [
                "You must be at least 13 years old to use Dash. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.",
              ],
            },
            {
              title: "3. Use of the Service",
              content: [
                "Dash is provided for personal running tracking and community engagement.",
                [
                  "Do not use Dash for any unlawful or unauthorized purpose.",
                  "Do not attempt to access, interfere with, or disrupt any system or network connected to the service.",
                  "Do not misrepresent your identity, run data, or achievements.",
                ],
              ],
            },
            {
              title: "4. Health and Safety",
              content: [
                "Dash does not provide medical advice. Consult a physician before beginning any new fitness program. You assume all risks associated with your running activities and agree to use the app responsibly.",
              ],
            },
            {
              title: "5. Location and Sensor Data",
              content: [
                "Dash may collect location, motion, and other sensor data to track your runs. You control when tracking is active, and you can revoke permissions at any time through your device settings, though some features may become unavailable.",
              ],
            },
            {
              title: "6. Subscriptions and Payments",
              content: [
                "Certain features may be offered as paid upgrades. Fees are disclosed before purchase and are non-refundable unless required by law. You authorize us to charge your selected payment method for any applicable fees.",
              ],
            },
            {
              title: "7. Termination",
              content: [
                "We may suspend or terminate your access to Dash at any time if you violate these terms or engage in fraudulent, abusive, or harmful behavior. You may stop using Dash at any time by deleting your account.",
              ],
            },
            {
              title: "8. Intellectual Property",
              content: [
                "Dash, including its design, content, and features, is owned by us or our licensors. You receive a limited, non-transferable license to use the app for personal purposes. You may not copy, modify, or distribute our content without permission.",
              ],
            },
            {
              title: "9. Disclaimers and Limitation of Liability",
              content: [
                'Dash is provided "as is" without warranties of any kind. To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the app.',
              ],
            },
            {
              title: "10. Governing Law and Dispute Resolution",
              content: [
                "These terms are governed by the laws of the jurisdiction in which we operate, without regard to conflict-of-law principles. Any disputes will be resolved through good-faith negotiations, and if necessary, binding arbitration or a court of competent jurisdiction.",
              ],
            },
            {
              title: "11. Contact",
              content: [
                "If you have questions about these Terms of Service, contact us at dev.simanzler@gmail.com.",
              ],
            },
          ],
        },
      },
      {
        title: "Dash",
        description:
          "Running tracker built to work offline and sync with your friends.",
        longDescription:
          "Dash is a comprehensive running tracking mobile application built with React Native and Expo. It enables users to track their runs, track progress over time, and share achievements with friends. The app features offline-first architecture, ensuring users can track runs without internet connectivity, with automatic synchronization when connection is restored. Supabase provides real-time data sync, authentication, and cloud storage.",
        image: "/dash/icon.png",
        assets: [
          {
            type: "image",
            path: "/dash/icon.png",
            alt: "Dash Icon",
            width: 100,
            height: 100,
          },
          {
            type: "image",
            path: "/dash/icon.png",
            alt: "Dash Icon",
            width: 100,
            height: 100,
          },
          {
            type: "image",
            path: "/dash/icon.png",
            alt: "Dash Icon",
            width: 100,
            height: 100,
          },
        ],
        tags: ["React Native", "Expo", "TypeScript"],
        features: [
          "Offline-first architecture with automatic sync",
          "Running tracking with charts and statistics",
          "Running history and personal records",
          "Social features for sharing progress with friends",
          "Real-time data synchronization via Supabase",
        ],
        reviews: [
          {
            name: "John Doe",
            review:
              "I love this app! It's so easy to use and has all the features I need.",
            rating: 5,
          },
          {
            name: "Jane Doe",
            review: "This app has changed my life! I'm so much stronger now.",
            rating: 5,
          },
        ],
        privacyPolicy: {
          lastUpdated: "2025-01-01",
          sections: [
            {
              title: "1. Introduction",
              content: [
                'Welcome to Dash ("we", "our", "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app, Dash.',
              ],
            },
            {
              title: "2. Information We Collect",
              content: [
                "We collect the following information to provide and improve our services:",
                [
                  "Personal Information: Names and email addresses to authenticate users and personalize your experience.",
                  "Running Data: Information about your runs, such as distance, duration, pace, route, and performance metrics.",
                  "Health Data: Optional health-related data like weight, height, and running goals to tailor your experience.",
                  "Photos and Images: Photos you choose to upload related to your running journey.",
                  "Location Data: GPS coordinates and routes for tracking your runs (only when actively running).",
                  "Authentication Data: Passwords, which are encrypted and securely stored using Supabase Auth.",
                ],
              ],
            },
            {
              title: "3. How We Use Your Information",
              content: [
                "We use your information to:",
                [
                  "Authenticate and verify your identity.",
                  "Track and analyze your running performance and progress.",
                  "Provide personalized running recommendations and insights.",
                  "Allow you to share photos and progress updates with others (if you choose to).",
                  "Communicate with you about updates, security alerts, and support.",
                ],
              ],
            },
            {
              title: "4. Data Security",
              content: [
                "We take data security seriously and implement the following measures to protect your information:",
                [
                  "Encryption: Passwords are encrypted using Supabase Auth.",
                  "Access Controls: Only authorized personnel have access to your personal information.",
                  "Secure Storage: Data is stored on secure servers with appropriate safeguards.",
                ],
              ],
            },
            {
              title: "5. Sharing Your Information",
              content: [
                "We do not sell, trade, or otherwise transfer your personal information to outside parties, except:",
                [
                  "When we have your consent.",
                  "To comply with legal obligations.",
                  "To protect our rights, privacy, safety, or property, and that of our users.",
                ],
              ],
            },
            {
              title: "6. Your Rights",
              content: [
                "You have the following rights regarding your personal information:",
                [
                  "Access: You can request access to the personal information we hold about you.",
                  "Correction: You can request correction of any inaccurate or incomplete information.",
                  "Deletion: You can request the deletion of your personal information, subject to legal and contractual obligations.",
                ],
              ],
            },
            {
              title: "7. Changes to This Privacy Policy",
              content: [
                "We may update this Privacy Policy from time to time. We will notify you of any changes by updating the effective date at the top of this policy. We encourage you to review this Privacy Policy periodically.",
              ],
            },
            {
              title: "8. Contact Us",
              content: [
                "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at dev.simanzler@gmail.com.",
              ],
            },
            {
              title: "9. Consent",
              content: ["By using our app, you consent to our Privacy Policy."],
            },
          ],
        },
        termsOfService: {
          lastUpdated: "2025-01-01",
          sections: [
            {
              title: "1. Acceptance of Terms",
              content: [
                "By downloading, accessing, or using Rep, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please discontinue use of the app immediately.",
              ],
            },
            {
              title: "2. Eligibility and Account Registration",
              content: [
                "You must be at least 13 years old to use Rep. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.",
              ],
            },
            {
              title: "3. Use of the Service",
              content: [
                "Rep is provided for personal workout tracking and community engagement.",
                [
                  "Do not use Rep for any unlawful or unauthorized purpose.",
                  "Do not attempt to access, interfere with, or disrupt any system or network connected to the service.",
                  "Do not misrepresent your identity, workout data, or achievements.",
                ],
              ],
            },
            {
              title: "4. Health and Safety",
              content: [
                "Rep does not provide medical advice. Consult a physician before beginning any fitness program. You assume all risks associated with your workouts and agree to use the app responsibly.",
              ],
            },
            {
              title: "5. Data and Media Usage",
              content: [
                "Rep may collect workout metrics, custom exercise entries, and optional photos or media you upload. You control what media you share, and you can revoke permissions at any time through your device settings, though some features may become unavailable.",
              ],
            },
            {
              title: "6. Subscriptions and Payments",
              content: [
                "Certain features may be offered as paid upgrades. Fees are disclosed before purchase and are non-refundable unless required by law. You authorize us to charge your selected payment method for any applicable fees.",
              ],
            },
            {
              title: "7. Termination",
              content: [
                "We may suspend or terminate your access to Rep at any time if you violate these terms or engage in fraudulent, abusive, or harmful behavior. You may stop using Rep at any time by deleting your account.",
              ],
            },
            {
              title: "8. Intellectual Property",
              content: [
                "Rep, including its design, content, and features, is owned by us or our licensors. You receive a limited, non-transferable license to use the app for personal purposes. You may not copy, modify, or distribute our content without permission.",
              ],
            },
            {
              title: "9. Disclaimers and Limitation of Liability",
              content: [
                'Rep is provided "as is" without warranties of any kind. To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the app.',
              ],
            },
            {
              title: "10. Governing Law and Dispute Resolution",
              content: [
                "These terms are governed by the laws of the jurisdiction in which we operate, without regard to conflict-of-law principles. Any disputes will be resolved through good-faith negotiations, and if necessary, binding arbitration or a court of competent jurisdiction.",
              ],
            },
            {
              title: "11. Contact",
              content: [
                "If you have questions about these Terms of Service, contact us at dev.simanzler@gmail.com.",
              ],
            },
          ],
        },
      },
    ],
    []
  );

  return { apps };
}

import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#F5F4E8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SITE_URL = "https://adithyanspillai.in";
const SITE_TITLE = "Adithyan S Pillai | Software Engineer, Full-Stack & Mobile Developer";
const SITE_DESC =
  "Official portfolio of Adithyan S Pillai, a Software Engineer & B.Tech CSE Graduate from CCET, KTU. Specializing in Full-Stack Web (React, Node.js, Next.js, Express), Mobile Development (Flutter, Android), AI/ML (RIAAQE), and Cloud & Tools.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Adithyan S Pillai",
  },
  description: SITE_DESC,
  applicationName: "Adithyan S Pillai Portfolio",
  authors: [{ name: "Adithyan S Pillai", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    // Personal names & brand
    "Adithyan S Pillai",
    "Adithyan S",
    "Adithyan Pillai",
    "Adithyan",
    "Adithyan S Pillai CCET",
    "Adithyan S Pillai KTU",
    "Adithyan S Pillai Developer",
    "Adithyan S Pillai Software Engineer",
    "Adithyan S Pillai Portfolio",
    "AdithyanSPillaiOfficial",
    // Core Roles
    "Software Engineer",
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile App Developer",
    "Web Developer Kerala",
    "Software Developer India",
    // Primary Technologies & Stacks
    "React.js Developer",
    "Node.js Developer",
    "Next.js Portfolio",
    "TypeScript Developer",
    "Python Developer",
    "Flutter Developer",
    "Android App Developer",
    "Express.js",
    "MongoDB",
    "SQL",
    "Tailwind CSS",
    "Three.js Developer",
    "GSAP Animations",
    // AI & Projects
    "AI ML Developer",
    "Machine Learning Engineer",
    "RIAAQE Interview Analysis",
    "Realtime Interview Analysis & Adaptive Questioning Engine",
    "EXamin CBT Platform",
    "EduCCET Academic App",
    // Education & Location
    "CCET Alappuzha",
    "Carmel College of Engineering and Technology",
    "APJ Abdul Kalam Technological University",
    "KTU BTech CSE",
    "Software Engineer Kerala",
    "Hire Software Engineer India",
  ],
  creator: "Adithyan S Pillai",
  publisher: "Adithyan S Pillai",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Adithyan S Pillai — Software Engineer & Full-Stack Developer",
    description:
      "Explore the projects, technical skills, and experience of Adithyan S Pillai. Building scalable web applications, mobile experiences, and AI solutions.",
    url: SITE_URL,
    siteName: "Adithyan S Pillai Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/adithyan.jpg",
        width: 1200,
        height: 630,
        alt: "Adithyan S Pillai - Software Engineer & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithyan S Pillai — Software Engineer",
    description:
      "Software Engineer & Full-Stack Developer. React, Node.js, Flutter, Python & AI/ML.",
    images: ["/adithyan.jpg"],
    creator: "@adithyanspillai",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon",
  },
};

// Rich Structured Data (JSON-LD) for Search Engines (Person, WebSite, ProfilePage)
const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://adithyanspillai.in/#person",
      name: "Adithyan S Pillai",
      alternateName: ["Adithyan", "Adithyan S", "Adithyan Pillai"],
      url: "https://adithyanspillai.in",
      image: "https://adithyanspillai.in/adithyan.jpg",
      jobTitle: "Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance / Open to Opportunities",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Carmel College of Engineering and Technology (CCET), Alappuzha",
          sameAs: "https://ccet.ac.in",
        },
        {
          "@type": "EducationalOrganization",
          name: "APJ Abdul Kalam Technological University (KTU)",
          sameAs: "https://ktu.edu.in",
        },
      ],
      knowsAbout: [
        "Software Engineering",
        "Full-Stack Web Development",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "Python",
        "TypeScript",
        "JavaScript",
        "Flutter",
        "Android App Development",
        "Artificial Intelligence",
        "Machine Learning",
        "MongoDB",
        "SQL",
        "Three.js",
        "GSAP",
        "Git",
        "Linux",
      ],
      sameAs: [
        "https://github.com/AdithyanSPillaiOfficial",
        "https://linkedin.com/in/adithyan-s-pillai",
      ],
      email: "mailto:adithyanspillaiofficial@gmail.com",
      telephone: "+919605987219",
      description:
        "B.Tech Computer Science and Engineering graduate (CGPA: 6.91) from CCET, affiliated with KTU. Software Engineer skilled in React, Node.js, Flutter, Python, and AI/ML.",
    },
    {
      "@type": "WebSite",
      "@id": "https://adithyanspillai.in/#website",
      url: "https://adithyanspillai.in",
      name: "Adithyan S Pillai Portfolio",
      description: "Official portfolio and showcase of Software Engineer Adithyan S Pillai.",
      publisher: {
        "@id": "https://adithyanspillai.in/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://adithyanspillai.in/#profilepage",
      url: "https://adithyanspillai.in",
      name: "Adithyan S Pillai - Software Engineer Portfolio",
      isPartOf: {
        "@id": "https://adithyanspillai.in/#website",
      },
      about: {
        "@id": "https://adithyanspillai.in/#person",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://adithyanspillai.in/adithyan.jpg",
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://adithyanspillai.in/#riaaqe",
      name: "RIAAQE - Realtime Interview Analysis & Adaptive Questioning Engine",
      description: "AI-powered tool assessing participant confidence using audio/video cues and providing real-time adaptive questioning.",
      creator: { "@id": "https://adithyanspillai.in/#person" },
      programmingLanguage: ["Python", "JavaScript", "TypeScript"],
      runtimePlatform: "Node.js, React",
      applicationCategory: "Artificial Intelligence / Machine Learning",
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://adithyanspillai.in/#examin",
      name: "EXamin - Computer-Based Testing Platform",
      description: "Online computer-based exam platform featuring section-based MCQs, interactive navigation palette, and result assessment.",
      creator: { "@id": "https://adithyanspillai.in/#person" },
      programmingLanguage: ["JavaScript", "TypeScript"],
      runtimePlatform: "React, Node.js, Express, MongoDB",
      applicationCategory: "Educational Software",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://adithyanspillai.in/#educcet",
      name: "EduCCET - Student Academic Companion App",
      description: "Mobile app for CCET students to navigate course syllabi, credits, and academic criteria.",
      creator: { "@id": "https://adithyanspillai.in/#person" },
      operatingSystem: "Android, iOS",
      applicationCategory: "Educational Application",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

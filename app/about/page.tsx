import React from "react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mai Tri Thanh - Fullstack Developer specializing in Next.js, React, TypeScript, SwiftUI, and Laravel. Based in Ho Chi Minh City, Vietnam.",
  openGraph: {
    title: "About | Mai Tri Thanh",
    description:
      "Fullstack Developer specializing in Next.js, React, TypeScript, SwiftUI, and Laravel.",
    url: `${SITE_URL}/about`,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "About Mai Tri Thanh",
      },
    ],
  },
  twitter: {
    title: "About | Mai Tri Thanh",
    description:
      "Fullstack Developer specializing in Next.js, React, TypeScript, SwiftUI, and Laravel.",
    images: [SITE_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const AboutPage = () => {
  return (
    <div className="space-y-6">
      <Card className="neo-glass">
        <CardHeader>
          <CardTitle className="text-3xl">About Me</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            I&apos;m Mai Tri Thanh, a Fullstack Developer who enjoys blending solid engineering with thoughtful UI.
          </p>
          <p>
            My focus is building fast web products with clean architecture, smooth interactions, and details users can feel.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Laravel</Badge>
            <Badge variant="outline">REST APIs</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="neo-glass">
        <CardHeader>
          <CardTitle className="text-2xl">Experience Highlights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• Built responsive production interfaces and optimized performance on modern frontend stacks.</p>
          <p>• Contributed backend APIs and data integrations to ship end-to-end features.</p>
          <p>• Collaborated with designers to turn concepts into maintainable, reusable component systems.</p>
        </CardContent>
      </Card>

      <Card className="neo-glass">
        <CardHeader>
          <CardTitle className="text-2xl">Education</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Major in Software Engineering — Ho Chi Minh City University of Foreign Languages – Information Technology (2020 - 2024)
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;

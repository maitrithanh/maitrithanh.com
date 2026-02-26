import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

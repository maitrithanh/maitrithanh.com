import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContentCard = ({
  title,
  children,
  description,
}: {
  title: string;
  children: React.ReactNode;
  description?: string;
}) => {
  return (
    <Card className="border-primary/20 bg-white/75 shadow-lg backdrop-blur-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description ? (
          <CardDescription className="border-l-2 border-border pl-4 text-sm">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ContentCard;

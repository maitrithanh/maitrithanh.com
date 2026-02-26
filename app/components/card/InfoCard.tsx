"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const InfoCard = () => {
  return (
    <Card className="border-primary/20 bg-white/75 shadow-xl backdrop-blur-xl">
      <CardContent className="flex flex-col items-center gap-8 p-8 md:flex-row">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="relative h-32 w-32 md:h-36 md:w-36">
          {/* Subtle Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-md"></div>
          
          {/* Avatar */}
          <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white shadow-md">
            <Image
              src="/ThanhAVT.png"
              fill
              sizes="144px"
              alt="Avatar"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
          Open To Work
        </Badge>

        {/* Name */}
        <h1 className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text font-bold text-3xl text-transparent md:text-4xl">
          <Typewriter
            options={{
              strings: ["Mai Tri Thanh", "Fullstack Developer"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
          <SocialLink
            href="https://www.linkedin.com/in/maitrithanh06/"
            icon={<FaLinkedin size={16} />}
            label="LinkedIn"
          />

          <SocialLink
            href="https://github.com/maitrithanh"
            icon={<FaGithub size={16} />}
            label="GitHub"
          />

          <SocialLink
            href="https://www.facebook.com/BluMTT/"
            icon={<FaFacebook size={16} />}
            label="Facebook"
          />
        </div>
      </div>

      </CardContent>
    </Card>
  );
};

// Minimal Social Link
const SocialLink = ({ 
  href, 
  icon, 
  label
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
}) => {
  return (
    <Button asChild variant="outline" size="sm" className="gap-1.5 rounded-full">
      <Link href={href} target="_blank" rel="noreferrer">
        {icon}
        <span>{label}</span>
      </Link>
    </Button>
  );
};

export default InfoCard;

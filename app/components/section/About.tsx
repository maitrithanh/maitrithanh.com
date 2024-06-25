import React from "react";
import ContentCard from "../card/ContentCard";
import Image from "next/image";

const About = () => {
  return (
    <div className="mt-4 pb-2 border-b">
      <div>
        <ContentCard title={`About`}>
          <div>
            <div className="flex justify-center items-center py-4">
              <Image
                src="/images/T1.jpg"
                alt="Thanh Picture 1"
                className="rounded-md -rotate-6 hover:rotate-0 hover:scale-110 duration-300 translate-x-0 "
                width={150}
                height={150}
              />

              <Image
                src="/images/T2.jpg"
                alt="Thanh Picture 2"
                className="rounded-md rotate-6 hover:rotate-0 hover:scale-110 duration-300 translate-x-0"
                width={150}
                height={150}
              />
            </div>

            <p className="my-2 text-justify break-words">
              Hi, I&apos;m Mai Tri Thanh (Tony) a Fullstack Developer. I
              graduated with honors in Software Engineering from HUFLIT. I have
              a year of experience in Fullstack programming and a passion for
              creating content, traveling, and learning new things. I manage
              three YouTube channels—one with over 30K subscribers, another with
              over 8K, and a third with over 2K. I also run a TikTok channel
              with 30K followers.
            </p>
          </div>
        </ContentCard>
      </div>
    </div>
  );
};

export default About;

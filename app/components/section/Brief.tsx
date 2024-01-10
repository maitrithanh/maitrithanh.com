import React from "react";

const Brief = () => {
  return (
    <div className="mt-4 pb-2 border-b">
      <div className="w-full flex justify-center my-4">
        <p className="animate-bounce">— Start —</p>
      </div>
      <div>
        <h1 className="text-2xl font-bold">🙋🏻‍♂️ Brief introduction</h1>
        <div className="border-l-4 border-[#b3b3b3] pl-6 m-1">
          <p className="text-[#545454]">
            Hi! I{"'"}m a Software Engineer [Web Developer].
          </p>
        </div>
        <p className="my-2 text-justify">
          I am studying information technology
        </p>
        <p className="my-2 text-justify">
          As a result, I gained skills and experience in web and mobile software
          development in university.
        </p>
        <p className="my-2 text-justify">
          In the past, I have won many awards in youth innovation competitions
          at city, provincial and school levels when I was in high school in the
          field of system software.
        </p>
      </div>
    </div>
  );
};

export default Brief;

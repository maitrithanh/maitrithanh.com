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
          Passionate about crafting captivating digital experiences through
          pixel-perfect code. With a keen eye for design and a knack for
          problem-solving, I specialize in bringing visions to life on the web.
          From responsive layouts to interactive interfaces, I thrive on
          creating seamless user experiences that leave a lasting impression.
          Let's build something beautiful together!
        </p>
      </div>
    </div>
  );
};

export default Brief;

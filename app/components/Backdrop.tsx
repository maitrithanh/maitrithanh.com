import React from "react";

interface BackdropProps {
  children: React.ReactNode;
  setIsOpenMenu: any;
}

const Backdrop: React.FC<BackdropProps> = ({ children, setIsOpenMenu }) => {
  return (
    <div className="w-screen h-screen fixed top-0 z-30 bg-[#0000007d]">
      {children}
    </div>
  );
};

export default Backdrop;

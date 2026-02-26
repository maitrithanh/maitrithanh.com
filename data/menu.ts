import { GoProject } from "react-icons/go";
import { TbBrandBlogger } from "react-icons/tb";
import { CiCircleInfo, CiHome } from "react-icons/ci";

export const menu = [
  {
    name: "Home",
    icon: CiHome,
    pathName: "/",
  },
  {
    name: "About",
    icon: CiCircleInfo,
    pathName: "/about",
  },
  {
    name: "Blog",
    icon: TbBrandBlogger,
    pathName: "/blog",
  },
  {
    name: "Projects",
    icon: GoProject,
    pathName: "/projects",
  },
];

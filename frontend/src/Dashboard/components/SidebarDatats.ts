// import {
//     UilEstate,
//     UilClipboardAlt,
//     UilUsersAlt,
//     UilPackage,
//     UilChart,
//   } from "@iconscout/react-unicons";
  
  interface SidebarItem {
    icon: string;
    heading: string;
  }
  export const SidebarData: SidebarItem[] = [
    {
      icon: "fluent:home-12-regular",// fluent:home-20-filled
      heading: "الرئيسية",
    },
    {
      icon: "hugeicons:football-pitch",//<Icon icon="hugeicons:football-pitch" />
      heading: "الملاعب",
    },
    {
      icon: "lucide:users-round",
      heading: "المستخدمين",
    },
    {
      icon: "icon-park-outline:agreement",// icon-park-solid:agreement
      heading: "الحجوزات",
    },

    {
      icon: "lets-icons:chart",//<Icon icon="" />
      heading: "التحليل",
    },
  ];
  

  interface SidebarItem {
    icon: string;
    heading: string;
    path: string;
  }
  export const SidebarData: SidebarItem[] = [
    {
      icon: "fluent:home-12-regular",// fluent:home-20-filled
      heading: "الرئيسية",
      path: "fields"
    },
    {
      icon: "hugeicons:football-pitch",//<Icon icon="hugeicons:football-pitch" />
      heading: "الملاعب",
      path: "fields"

    },
    {
      icon: "lucide:users-round",
      heading: "المستخدمين",
      path: "users"

    },
    {
      icon: "solar:posts-carousel-horizontal-linear",//solar:posts-carousel-horizontal-bold"
      heading: "المنشورات",
      path: "posts"

    },
    {
      icon: "icon-park-outline:agreement",// icon-park-solid:agreement
      heading: "الحجوزات",
      path: "reservations"

    },

    {
      icon: "lets-icons:chart",//<Icon icon="" />
      heading: "التحليل",
      path: "/"

    },
  ];
  
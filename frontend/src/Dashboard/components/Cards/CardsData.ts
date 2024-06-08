
interface CardData {
  compactCardProps: {
    color: { backGround: string; boxShadow: string };
    barValue: number;
    title: string;
    value: string;
    icon: string;
  };
  expandedCardProps: {
    color: { backGround: string; boxShadow: string };
    title: string;
    series: { name: string; data: number[] }[];
  };
}

export const cardsData: CardData[] = [
  {
    compactCardProps: {
      title: "الحجوزات",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: "25,970",
      icon: "icon-park-outline:agreement",
    },
    expandedCardProps: {
      title: "الحجوزات",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      series: [
        {
          name: "الحجوزات",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "الحجوزات 2",
          data: [20, 30, 40, 50, 60, 70, 80],
        },
      ],
    },
  },
  {
    compactCardProps: {
      title: "المستخدمين",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      value: "14,270",
      icon: "lucide:users-round",
    },
    expandedCardProps: {
      title: "المستخدمين",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      series: [
        {
          name: "المستخدمين",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
  },
  {
    compactCardProps: {
      title: "الملاعب",
      color: {
        backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      value: "4,270",
      icon: "hugeicons:football-pitch",
    },
    expandedCardProps: {
      title: "الملاعب",
      color: {
        backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      series: [
        {
          name: "الملاعب",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  },
];

import {GreenHomeIcon, OutlineHomeIcon, GreenFavoriteIcon, OutLineFavoriteIcon,
    GreenPostsIcon,OutlinePostsIcon, GreenSearchIcon, OutlineSearchIcon ,
    GreenReservationIcon,OutlineReservationIcon} from "./Components/IconsComponent/IconComponent";

    import {HomeIcon, FavoriteIcon, PostsIcon, SearchIcon, ReservationIcon} from "./Components/IconsComponent/IconComponent";
 
 
   export const NavContentPc = [
     { id: 1, pathAndisSelected: "/", iconSrc: <HomeIcon />,outlineIconSrc: <OutlineHomeIcon />, label: "الرئيسيه"},
     { id: 2, pathAndisSelected: "/favorite", iconSrc: <FavoriteIcon />,outlineIconSrc: <OutLineFavoriteIcon />, label: "المفضله"},
     { id: 3, pathAndisSelected: "/posts", iconSrc: <PostsIcon />,outlineIconSrc: <OutlinePostsIcon />, label: "المنشورات"},
     { id: 4, pathAndisSelected: "/search", iconSrc: <SearchIcon />,outlineIconSrc: <OutlineSearchIcon />, label: "البحث"},
     { id: 5, pathAndisSelected: "/reservations/current", iconSrc: <ReservationIcon />,outlineIconSrc: <OutlineReservationIcon />, label: "الحجوزات"},
 
   ];

export const NavContentMobile = [
    { id: 1, pathAndisSelected: "/", iconSrc: <GreenHomeIcon />,outlineIconSrc: <OutlineHomeIcon />, label: "الرئيسيه"},
    { id: 2, pathAndisSelected: "/favorite", iconSrc: <GreenFavoriteIcon />,outlineIconSrc: <OutLineFavoriteIcon />, label: "المفضله"},
    { id: 3, pathAndisSelected: "/posts", iconSrc: <GreenPostsIcon />,outlineIconSrc: <OutlinePostsIcon />, label: "المنشورات"},
    { id: 4, pathAndisSelected: "/search", iconSrc: <GreenSearchIcon />,outlineIconSrc: <OutlineSearchIcon />, label: "البحث"},
    { id: 5, pathAndisSelected: "/reservations/current", iconSrc: <GreenReservationIcon />,outlineIconSrc: <OutlineReservationIcon />, label: "الحجوزات"},

  ];

  export const information = [
    { id: 1, imageUrl: 'https://th.bing.com/th/id/OIP.qChHVnS-8mJszMpvT8vlFwHaDj?w=1200&h=575&rs=1&pid=ImgDetMain', title: 'ملعب سباعي الرمادي' },
    { id: 2, imageUrl: 'https://i.pinimg.com/originals/c2/a5/19/c2a519566d628121523b1e75205586a5.jpg', title: 'ملعب الحارثية' },
    { id: 3, imageUrl: 'https://th.bing.com/th/id/OIP.s4TqNOMBzI0TJyyDfiVixAAAAA?w=215&h=381&c=7&o=5&dpr=1.3&pid=1.7', title: 'ملعب البوبالي' },
    { id: 4, imageUrl: 'https://th.bing.com/th/id/OIP.HJneywe55Q1GeDYgcKPvcQHaJ3?w=215&h=286&c=7&o=5&dpr=1.3&pid=1.7', title: 'ملعب السجارية' },
    { id: 5, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.7orlBPbAts33PDeZTUhlrQHaLJ?w=215&h=323&c=7&o=5&dpr=1.3&pid=1.7', title: 'ملعب بغداد' },
    { id: 6, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.yFkW8daqPrFSfmIlAHPOWwHaFj?w=215&h=161&c=7&o=5&dpr=1.3&pid=1.7', title: 'سباعي هيت' },
    { id: 7, imageUrl: 'https://i.pinimg.com/originals/c2/a5/19/c2a519566d628121523b1e75205586a5.jpg', title: 'Post 2' },
    { id: 8, imageUrl: 'https://th.bing.com/th/id/OIP.s4TqNOMBzI0TJyyDfiVixAAAAA?w=215&h=381&c=7&o=5&dpr=1.3&pid=1.7', title: 'ملعب الكتظمية' },
    { id: 9, imageUrl: 'https://th.bing.com/th/id/OIP.HJneywe55Q1GeDYgcKPvcQHaJ3?w=215&h=286&c=7&o=5&dpr=1.3&pid=1.7', title: 'خماشي راوه' },
    { id: 10, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.7orlBPbAts33PDeZTUhlrQHaLJ?w=215&h=323&c=7&o=5&dpr=1.3&pid=1.7', title: 'سباعي الرصافه' },
    { id: 11, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.yFkW8daqPrFSfmIlAHPOWwHaFj?w=215&h=161&c=7&o=5&dpr=1.3&pid=1.7', title: 'ملعب الكوت' },
    { id: 12, imageUrl: 'https://th.bing.com/th/id/OIP.qChHVnS-8mJszMpvT8vlFwHaDj?w=1200&h=575&rs=1&pid=ImgDetMain', title: 'ملعب البصرة' },

  ];


 /// reseve date 
  export const ReservDateInfo = [
    { id: 1, isReserved: true, isSelected_DateOrTime: "2/23 الخميس" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/24 الجمعه" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/25 السبت" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/26 الاحد" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/27 الاثنين" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/28 الثلاثاء" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/29 الاربعاء" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/30 الخميس" },
  ];
  
  export const ReservTimeInfo = [
    { id: 1, isReserved: false, isSelected_DateOrTime: "9:00 ص" },
    { id: 2, isReserved: false, isSelected_DateOrTime: "10:00 ص" },
    { id: 3, isReserved: false, isSelected_DateOrTime: "11:00 ص" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "12:00 ص" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "1:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2:00 م" },
    { id: 1, isReserved: true, isSelected_DateOrTime: "3:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "4:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "5:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "6:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "7:00 م" },
    { id: 1, isReserved: true, isSelected_DateOrTime: "8:00 م" },
    { id: 1, isReserved: true, isSelected_DateOrTime: "9:00 م" },
    { id: 1, isReserved: true, isSelected_DateOrTime: "10:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "11:00 م" },

  ];
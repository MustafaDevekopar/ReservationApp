import img1 from './../../imgs/img1.png'; // Assuming these are the paths to your images
import img2 from './../../imgs/img2.png';
import img3 from './../../imgs/img3.png';

export interface Update {
  img: string;
  name: string;
  noti: string;
  time: string;
}

export const UpdatesData: Update[] = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];

import React from 'react';

// Import SVG icons
import { ReactComponent as LocationIconSVG } from "../../assets/Icons/LocationIcon.svg";
import { ReactComponent as LikeIconSVG } from "../../assets/Icons/LikeIcon.svg";
import { ReactComponent as PhoneIconSVG } from "../../assets/Icons/PhoneIcon.svg";
import { ReactComponent as EyeIconSVG } from "../../assets/Icons/EyeIcon.svg";
import { ReactComponent as TimeIconSVG } from "../../assets/Icons/TimeIcon.svg";

//card reservation icons
import { ReactComponent as XIconSVG } from "../../assets/Icons/xIcon.svg";
import { ReactComponent as PhoneBlackIconSVG } from "../../assets/Icons/phoneBlackIcon.svg";

//navbar icons 
import { ReactComponent as HomeIconSVG } from "../../assets/Icons/LightHome.svg";
import { ReactComponent as OutlineHomeIconSVG } from "../../assets/Icons/outlineHomeIcon.svg";
import { ReactComponent as FavoriteIconSVG } from "../../assets/Icons/LightFavorite.svg";
import { ReactComponent as OutLineFavoriteIconSVG } from "../../assets/Icons/outlineLikeIcon.svg";
import { ReactComponent as PostsIconSVG } from "../../assets/Icons/LightPost.svg";
import { ReactComponent as OutlinePostsIconSVG } from "../../assets/Icons/outlinePostsIcon.svg";
import { ReactComponent as SearchIconSVG } from "../../assets/Icons/LightSearch.svg";
import { ReactComponent as OutlineSearchIconSVG } from "../../assets/Icons/OutlineSearchIcon.svg";
import { ReactComponent as ReservationIconSVG } from "../../assets/Icons/LightReservation.svg";
import { ReactComponent as OutlineReservationIconSVG } from "../../assets/Icons/OutlineReservationIcon.svg";

//navbar icons of mobile Green 
import { ReactComponent as GreenHomeIconSVG } from "../../assets/Icons/HomeIcon.svg";
import { ReactComponent as GreenFavoriteIconSVG } from "../../assets/Icons/FavaratIcon.svg";
import { ReactComponent as GreenPostsIconSVG } from "../../assets/Icons/PostsIcon.svg";
import { ReactComponent as GreenSearchIconSVG } from "../../assets/Icons/SearchSolidIcon.svg";
import { ReactComponent as GreenReservationIconSVG } from "../../assets/Icons/ReservationIcon.svg";


// Like and comment icons for showOnepost  component
import { ReactComponent as LikePostSVG } from "../../assets/Icons/LikePostIcon.svg";
import { ReactComponent as CommentIconSVG } from "../../assets/Icons/CommentIcon.svg";

//reserv confirm and close icon 
import { ReactComponent as WhiteConfirmIconSVG } from "../../assets/Icons/WhiteConfirmIcon.svg";
import { ReactComponent as WhitCloseSVG } from "../../assets/Icons/WhitClose.svg";

// icon for field services and offers
import { ReactComponent as GreenConfirmSVG } from "../../assets/Icons/GreenConfirm.svg";
// Rating of show field
import { ReactComponent as StatrRattingSvg } from "../../assets/Icons/StatrRatting.svg";
import { ReactComponent as ShareIconSVG } from "../../assets/Icons/shareIcon.svg";

// new post and anvbar Icon to profile page  
import { ReactComponent as NewPostIconSVG } from "../../assets/Icons/NewPostIcon.svg";
import { ReactComponent as NavigationIconSVG } from "../../assets/Icons/NavigationIcon.svg";
import { ReactComponent as NotificationIconSVG } from "../../assets/Icons/notificationIcon.svg";




// Define icon components
export const LocationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <LocationIconSVG {...props} />;
export const LikeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <LikeIconSVG {...props} />;
export const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <PhoneIconSVG {...props} />;
export const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <EyeIconSVG {...props} />;
export const TimeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <TimeIconSVG {...props} />;

//card reservation export icons
export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <XIconSVG {...props} />;
export const PhoneBlackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <PhoneBlackIconSVG {...props} />;

//reserv confirm and close icon 
export const WhiteConfirmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <WhiteConfirmIconSVG {...props} />;
export const WhitClose: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <WhitCloseSVG {...props} />;

//navbar icons 
export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <HomeIconSVG {...props} />;
export const OutlineHomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <OutlineHomeIconSVG {...props} />;
export const FavoriteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <FavoriteIconSVG {...props} />;
export const OutLineFavoriteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <OutLineFavoriteIconSVG {...props} />;
export const PostsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <PostsIconSVG {...props} />;
export const OutlinePostsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <OutlinePostsIconSVG {...props} />;
export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SearchIconSVG {...props} />;
export const OutlineSearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <OutlineSearchIconSVG {...props} />;
export const ReservationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <ReservationIconSVG {...props} />;
export const OutlineReservationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <OutlineReservationIconSVG {...props} />;


//export navbar icons of mobile Green 
export const GreenHomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <GreenHomeIconSVG {...props} />;
export const GreenFavoriteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <GreenFavoriteIconSVG {...props} />;
export const GreenPostsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <GreenPostsIconSVG {...props} />;
export const GreenSearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <GreenSearchIconSVG {...props} />;
export const GreenReservationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <GreenReservationIconSVG {...props} />;


// Like and comment icons for showOnepost  component
export const LikePost: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <LikePostSVG {...props} />;
export const CommentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <CommentIconSVG {...props} />;

// icon for field services and offers
export const GreenConfirm: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <GreenConfirmSVG {...props} />;

// Rating of show field
export const StarRatting: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <StatrRattingSvg {...props} />;
export const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <ShareIconSVG {...props} />;

// new post and anvbar Icon to profile page  
export const NewPostIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <NewPostIconSVG {...props} />;
export const NavigationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <NavigationIconSVG {...props} />;
export const NotificationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <NotificationIconSVG {...props} />;





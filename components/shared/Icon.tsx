import React from "react";
import {
  FaHotTubPerson,
  FaFire,
  FaWifi,
  FaLaptop,
  FaSquareParking,
  FaUtensils,
  FaSnowflake,
  FaBath,
  FaPlug,
  FaPersonSwimming,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaXmark,
  FaHeart,
  FaRegHeart,
  FaAward,
  FaLocationDot,
  FaAngleDown,
  FaChevronDown,
} from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = "w-5 h-5 text-airbnb-ink" }: IconProps) {
  switch (name) {
    // Amenities
    case "hot_tub":
      return <FaHotTubPerson className={className} />;
    case "fireplace":
      return <FaFire className={className} />;
    case "wifi":
      return <FaWifi className={className} />;
    case "workspace":
      return <FaLaptop className={className} />;
    case "parking":
      return <FaSquareParking className={className} />;
    case "kitchen":
      return <FaUtensils className={className} />;
    case "ac":
      return <FaSnowflake className={className} />;
    case "bathtub":
      return <FaBath className={className} />;
    case "ev_charger":
      return <FaPlug className={className} />;
    case "pool":
      return <FaPersonSwimming className={className} />;

    // General UI
    case "star":
      return <FaStar className={className} />;
    case "chevron-left":
      return <FaChevronLeft className={className} />;
    case "chevron-right":
      return <FaChevronRight className={className} />;
    case "chevron-down":
      return <FaChevronDown className={className} />;
    case "close":
      return <FaXmark className={className} />;
    case "share":
      return <IoShareOutline className={className} />;
    case "heart-filled":
      return <FaHeart className={className} />;
    case "heart-outline":
      return <FaRegHeart className={className} />;
    case "superhost":
      return <FaAward className={className} />;
    case "location":
      return <FaLocationDot className={className} />;
    case "arrow-down":
      return <FaAngleDown className={className} />;
    default:
      return <span className={className}>•</span>;
  }
}

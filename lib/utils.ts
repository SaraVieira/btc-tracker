import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAMPM = (date: Date, withSeconds?: boolean) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedSeconds = `:${seconds < 10 ? "0" + seconds : seconds}`;
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 ? hours % 12 : 12;
  return `${formattedHours}:${minutes < 10 ? "0" + minutes : minutes}${
    withSeconds ? formattedSeconds : ""
  } ${ampm}`;
};

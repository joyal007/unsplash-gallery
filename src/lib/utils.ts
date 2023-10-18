import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Access_Key = "3cqdBAWBgDtzEPZ6qHMInuH78YumohHaD1lo8-cbRpo"

export const Unsplash_url = "https://api.unsplash.com/"
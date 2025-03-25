import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createHash } from 'crypto'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function hashColor(input: string) {
  const hash = createHash('md5').update(input).digest("hex")
  const idx = parseInt(hash[0], 16)
  const hex = hash.substring(idx, idx + 6)
  return `#${hex}`
}


export const PLACEHOLDER_IMAGE =
  "https://fomldwntujceqbgkuack.supabase.co/storage/v1/object/public/dev//No_Image.jpg"

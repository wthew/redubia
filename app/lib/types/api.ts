export type ImageFile = { height: number; source: string; width: number };


export type ImageResponse = {
  pageid: number;
  pageimage: string;
  thumbnail: ImageFile;
  original: ImageFile;
  title: string;
}
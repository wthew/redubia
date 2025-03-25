'use client';

import Script from "next/script";

export default function AdBanner() {

  return <Script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9123981005716024"
    crossOrigin="anonymous"
    strategy="lazyOnload"
  />
}

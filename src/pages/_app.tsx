import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>LeetCode - The World's dumbest platform</title>
        <link
          rel="icon"
          href="https://user-images.githubusercontent.com/63964149/152531278-5e01909d-0c2e-412a-8acc-4a06863c244d.png"
        />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </RecoilRoot>
  );
}

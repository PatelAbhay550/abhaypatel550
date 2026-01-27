import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhay Patel - Portfolio",
  description: "Portfolio website of Abhay Patel, a frontend developer specializing in Next.js and modern React ecosystems.",
  openGraph: {
    title: "Abhay Patel - Portfolio",
    description: "Portfolio website of Abhay Patel, a frontend developer specializing in Next.js and modern React ecosystems.",
    url: "https://abhaypatel550.vercel.app",
    siteName: "Abhay Patel Portfolio",
    images: [
      {
        url: "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-1/334998150_2915813855229526_2877140648363160727_n.jpg?stp=c74.0.790.790a_dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=98eOaJc3IG0Q7kNvwEXIXGG&_nc_oc=AdnJ0KvCLq_iSQaCG4fMC0yhWMoFIROUq9yaw8n-TTyZT8fJmtz3eyzYWE5uAJWI-pE&_nc_zt=24&_nc_ht=scontent.fknu1-6.fna&_nc_gid=IE3IqhWUMBEpgP86IewrWw&oh=00_AfoVkF9Ja5nhaqMX67heagOlg0c-GZ-20xDLTBt8sj70wA&oe=697E2A45",
        width: 1200,
        height: 630,
        alt: "Abhay Patel Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

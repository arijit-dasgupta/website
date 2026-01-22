import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arijit Dasgupta - PhD Student, MIT EECS",
  description: "Personal academic and technical portfolio",
  icons: {
    icon: "/images/profile/solo_shot.jpg",
    shortcut: "/images/profile/solo_shot.jpg",
    apple: "/images/profile/solo_shot.jpg",
  },
  openGraph: {
    title: "Arijit Dasgupta - PhD Student, MIT EECS",
    description: "Personal academic and technical portfolio",
    images: [
      {
        url: "/images/profile/solo_shot.jpg",
        width: 3450,
        height: 5185,
        alt: "Arijit Dasgupta",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Arijit Dasgupta - PhD Student, MIT EECS",
    description: "Personal academic and technical portfolio",
    images: ["/images/profile/solo_shot.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased bg-background text-foreground`}>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

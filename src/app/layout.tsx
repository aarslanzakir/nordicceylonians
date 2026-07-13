import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nordicceylonians.com"),
  title: {
    default: "Nordic Ceylonians — Study & Settle in Finland",
    template: "%s | Nordic Ceylonians",
  },
  description:
    "Your trusted overseas education and migration consultant. We help students study at Finnish universities — admissions, visas, life coaching, and business agreement drafting.",
  keywords: [
    "study in Finland",
    "Finland student visa",
    "education consultant",
    "migration consultancy",
    "Nordic Ceylonians",
    "Finnish universities",
  ],
  openGraph: {
    title: "Nordic Ceylonians — Study & Settle in Finland",
    description:
      "From university admission to visa approval and settling in — trusted, end-to-end guidance for your journey to Finland.",
    type: "website",
    locale: "en_US",
    siteName: "Nordic Ceylonians",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/logo4.png", type: "image/png" }],
    shortcut: "/logo4.png",
    apple: "/logo4.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

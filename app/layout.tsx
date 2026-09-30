import type { Metadata } from "next";
import { Fira_Code, IBM_Plex_Mono, JetBrains_Mono, Onest, Source_Code_Pro } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const onest = Onest({ variable: "--font-onest", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "600"] });
const fira = Fira_Code({ variable: "--font-fira", subsets: ["latin"], weight: ["400", "600"] });
const plex = IBM_Plex_Mono({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "600"] });
const source = Source_Code_Pro({ variable: "--font-source", subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Snippet Studio",
  description:
    "Turn code into clean, shareable images for LinkedIn, Twitter and your docs. Free, no sign-up, runs entirely in your browser.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${onest.variable} ${jetbrains.variable} ${fira.variable} ${plex.variable} ${source.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}

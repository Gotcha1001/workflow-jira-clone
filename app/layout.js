import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | WorkFlow",
    default: "WorkFlow",
  },
  description: "Business Project Management Application",
};

export default function RootLayout({ children }) {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#000",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "bg-indigo-800 hover:bg-indigo-900 text-white",
          card: "gradient-background2",
          headerTitle: "text-indigo-800",
          headerSubtitle: "text-purple-700",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          {/* Animated Background */}
          <div className="animated-bg" />
          <ThemeProvider attribute="class" defaultTheme="dark">
            {/* Header */}

            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-indigo-300 py-10 bg-opacity-10 gradient-background2 p-10">
              <div className="mx-auto px-4 text-center text-gray-200">
                <p> © {currentYear} CodeNow101. All Rights Reserved</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

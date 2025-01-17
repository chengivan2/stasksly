import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = `https://${process.env.VERCEL_URL}`;

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Taskform",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

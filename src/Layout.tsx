import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </div>
        {/* <TailwindIndicator /> */}
      </ThemeProvider>
    </div>
  );
}

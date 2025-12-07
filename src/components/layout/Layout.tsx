import { ReactNode } from "react";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${!isHome ? "pt-24" : ""}`}>{children}</main>
      <footer className="border-t border-border bg-muted/30">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Graviti. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

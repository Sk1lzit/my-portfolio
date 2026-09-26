import type { Metadata } from "next";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import NavLinks from "@/components/NavLinks";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Lazy load — только на клиенте, не в первом бандле
const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const EasterEgg = dynamic(() => import("@/components/EasterEgg"), {
  ssr: false,
});
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
  ssr: false,
});
const ToastContainer = dynamic(() => import("@/components/Toast"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Sk1lz — Разработка на Python, Java, React",
  description: "Разработка программных продуктов на Python, Java, React.",
  openGraph: {
    title: "Sk1lz — Разработка на Python, Java, React",
    description: "Разработка программных продуктов.",
    url: "https://my-portfolio-cskm.vercel.app",
    siteName: "Sk1lz",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ru">
        <head>
          <link rel="icon" href="/images/favicon.jpg" />
        </head>
        <body className={inter.className}>
          <CustomCursor />
          <ParticleBackground />
          <EasterEgg />

          <nav className="navbar">
            <div className="nav-container">
              <Link href="/" className="logo">
                <Image
                  src="/images/favicon.jpg"
                  alt="Sk1lz"
                  width={36}
                  height={36}
                  className="logo-img"
                  priority
                />
                <span className="logo-text">Sk1lz</span>
              </Link>
              <ul className="nav-links">
                <NavLinks />
              </ul>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="btn" style={{ background: "transparent", color: "var(--purple-light)" }}>
                      Войти
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn btn-primary">Регистрация</button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </div>
            </div>
          </nav>

          <main>{children}</main>

          <ScrollToTop />

          <footer className="footer">
            <p>© 2026 Sk1lz. Все права защищены.</p>
            <div className="footer-links">
              <a href="https://github.com/Sk1lzit" target="_blank" rel="noopener">GitHub</a>
              <a href="https://t.me/Sk1lzzz" target="_blank" rel="noopener">Telegram</a>
              <Link href="/privacy">Политика</Link>
              <Link href="/terms">Согласие</Link>
            </div>
          </footer>

          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
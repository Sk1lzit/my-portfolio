import type { Metadata } from "next";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import ParticleBackground from "@/components/ParticleBackground";
import NavLinks from "@/components/NavLinks";
import ScrollToTop from "@/components/ScrollToTop";
import EasterEgg from "@/components/EasterEgg";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Analytics } from "@vercel/analytics/react";
import ToastContainer from "@/components/Toast";


export const metadata: Metadata = {
  title: "Sk1lz — Разработка на Python, Java, React",
  description: "Разработка программных продуктов на Python, Java, React. Автоматизация, боты, веб-приложения.",
  openGraph: {
    title: "Sk1lz — Разработка на Python, Java, React",
    description: "Разработка программных продуктов. Автоматизация, боты, веб-приложения.",
    url: "https://my-portfolio-cskm.vercel.app",
    siteName: "Sk1lz",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sk1lz — разработка на Python, Java, React",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sk1lz — Разработка на Python, Java, React",
    description: "Разработка программных продуктов.",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ru">
        <head>
          <link rel="icon" href="/images/favicon.jpg" />
        </head>
        <body>
          <ToastContainer />
          <CustomCursor />
          <ParticleBackground />
          <EasterEgg />
          <ThemeSwitcher />

          <nav className="navbar">
            <div className="nav-container">
              <Link href="/" className="logo">
                <Image
                  src="/images/favicon.jpg"
                  alt="Sk1lz"
                  width={36}
                  height={36}
                  className="logo-img"
                />
                <span className="logo-text">Sk1lz</span>
              </Link>
              <ul className="nav-links">
                <NavLinks />
              </ul>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <ThemeSwitcher /> 
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="btn" style={{ background: "transparent", color: "#a78bfa" }}>
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
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
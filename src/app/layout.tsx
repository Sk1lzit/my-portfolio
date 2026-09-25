import type { Metadata } from "next";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import ParticleBackground from "@/components/ParticleBackground";
import "./globals.css";
import NavLinks from "@/components/NavLinks";

export const metadata: Metadata = {
  title: "Sk1lz — Frontend Developer",
  description: "Разработка Discord-ботов и сайтов на заказ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ru">
        <head>
          <link rel="icon" href="/images/favicon.jpg" />
        </head>
        <body>
          <ParticleBackground />

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
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="btn" style={{ background: 'transparent', color: '#a78bfa' }}>
                      Войти
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn btn-primary">
                      Регистрация
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </div>
            </div>
          </nav>

          <main style={{ paddingTop: '80px' }}>{children}</main>

          <footer className="footer">
            <p>© 2026 Sk1lz. Все права защищены.</p>
            <div className="footer-links">
              <a href="https://github.com/Sk1lzit" target="_blank" rel="noopener">GitHub</a>
              <a href="https://t.me/Sk1lzzz" target="_blank" rel="noopener">Telegram</a>
              <Link href="/privacy">Политика конфиденциальности</Link>
              <Link href="/terms">Согласие на обработку данных</Link>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
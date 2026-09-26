"use client";

import { useUser, SignInButton } from "@clerk/nextjs";

export default function HeroGreeting() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <p className="hero-greeting">
        Hello! I am <span className="highlight">Sk1lz</span>
      </p>
    );
  }

  if (isSignedIn && user) {
    const name = user.firstName || user.username || "друг";
    return (
      <p className="hero-greeting">
        Привет, <span className="highlight">{name}</span>! Рад тебя видеть 👋
      </p>
    );
  }

  return (
    <p className="hero-greeting">
      Hello! I am <span className="highlight">Sk1lz</span>
    </p>
  );
}
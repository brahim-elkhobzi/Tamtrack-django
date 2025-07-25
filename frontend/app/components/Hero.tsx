// components/Hero.tsx
'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="py-62 bg-cover bg-center" style={{ backgroundImage: "url('/HomePage/tam.jpg')" }}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white">TAMTRACK</h1>
        <p className="text-xl text-black">L'avenir de l'éducation au Maroc commence ici</p>
        <button className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Découvrir TAMTRACK
        </button>
      </div>
    </section>
    );
}
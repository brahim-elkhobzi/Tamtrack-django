// LA SOLUTION EST ICI : Indiquer que c'est un composant client
"use client";

import type { NextPage } from 'next';
import Image from 'next/image';

// Importations nécessaires pour le carrousel Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Importation des styles de base de Swiper (essentiel)
import 'swiper/css';
import 'swiper/css/navigation';

// --- Le reste de votre code reste identique ---

// Définition de la structure de données
type Testimonial = {
  name: string;
  role: string;
  quote: string;
  tag: string;
  avatarImage: string;
};

// Données des témoignages
const testimonialsData: Testimonial[] = [
    {
    name: "Yasmine",
    role: "17 ans, Terminale Sciences",
    quote: "Grâce à TAMTRACK, j'ai découvert ma passion pour l'informatique. Le module Orientation+ m'a guidée vers une filière que je n'aurais jamais envisagée. Aujourd'hui, je suis acceptée en école d'ingénieurs.",
    tag: "Orientation réussie",
    avatarImage: "/icons/user.svg"
  },
  {
    name: "M. Ahmed Benali",
    role: "Père de 2 enfants",
    quote: "Enfin une plateforme qui me permet de suivre réellement les progrès de mes enfants. Les notifications intelligentes m'alertent au bon moment, et la communication avec les enseignants n'a jamais été aussi fluide.",
    tag: "Parent connecté",
    avatarImage: "/icons/user.svg"
  },
  {
    name: "Mme Fatima Zahra",
    role: "Professeure de Mathématiques",
    quote: "TAMTRACK a révolutionné ma façon d'enseigner. Les analytics me montrent exactement où mes élèves ont des difficultés, et les outils IA m'aident à créer des exercices personnalisés en quelques clics.",
    tag: "Innovation pédagogique",
    avatarImage: "/icons/user.svg"
  }
];


const Testimonials: NextPage = () => {
  return (
    <section className="bg-[#fcfaf6] w-full py-20 md:py-24 font-sans">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-3">
            Témoignages
          </h2>
          <p className="text-lg md:text-xl text-[#0d2d57]">
            Découvrez l'impact de TAMTRACK sur notre communauté
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="!pb-20"
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.name} className="h-full">
                <div className="flex justify-center items-start pt-8 h-full">
                  <div className="bg-white rounded-3xl p-8 shadow-lg relative w-full max-w-sm speech-bubble">
                    <div className="absolute top-[-20px] left-6">
                       <Image
                        src="/icons/quote.svg"
                        alt="Guillemet"
                        width={36}
                        height={36}
                       />
                    </div>
                    
                    <div className="flex items-center mb-5 mt-4">
                      <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center mr-4 flex-shrink-0">
                        <Image 
                           src={testimonial.avatarImage}
                           alt="Avatar"
                           width={28}
                           height={28}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-orange-500 text-lg">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 italic leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="text-center">
                       <span className="bg-[#0d2d57] text-white px-6 py-2 rounded-full font-semibold">
                        {testimonial.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <button className="swiper-button-prev-custom absolute top-1/2 left-0 md:left-[-20px] transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition hidden md:flex items-center justify-center">
            <Image src="/icons/arrow-left.svg" alt="Précédent" width={24} height={24} />
          </button>
          <button className="swiper-button-next-custom absolute top-1/2 right-0 md:right-[-20px] transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition hidden md:flex items-center justify-center">
            <Image src="/icons/arrow-right.svg" alt="Suivant" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
import type { NextPage } from 'next';
import Head from 'next/head';
// ÉTAPE 1: IMPORTER LE COMPOSANT IMAGE DE NEXT.JS
import Image from 'next/image';

// On n'importe plus 'react-icons'

// ÉTAPE 2: ADAPTER LA STRUCTURE DES DONNÉES
// Le type pour 'icon' devient 'string' pour stocker le chemin de l'image.
type Pillar = {
  icon: string; // C'était JSX.Element, maintenant c'est string
  title: string;
  lines: string[];
};

// On met à jour les données avec les chemins vers les images dans le dossier /public/icons/
const pillarsData: Pillar[] = [
  {
    icon: '/icons/sovereignty.svg', // Chemin public
    title: 'Souveraineté Numérique',
    lines: ['100% Marocain,', '100% Souverain'],
  },
  {
    icon: '/icons/ethical-ai.svg',
    title: 'IA Éthique',
    lines: ['IA Responsable,', 'Apprentissage Respectueux'],
  },
  {
    icon: '/icons/pedagogy.svg',
    title: 'Excellence Pédagogique',
    lines: ["L'Excellence comme", 'Standard'],
  },
  {
    icon: '/icons/inclusion.svg',
    title: 'Inclusion Culturelle',
    lines: ['Quatre Langues, Une Nation'],
  },
  {
    icon: '/icons/innovation.svg',
    title: 'Innovation Continue',
    lines: ['Toujours en Avance'],
  },
  {
    icon: '/icons/social-impact.svg',
    title: 'Impact Social',
    lines: ["Éduquer Aujourd'hui,", 'Transformer Demain'],
  },
];


const TamTrackDNA: NextPage = () => {
  return (
    <>
      <Head>
        <title>ADN TAMTRACK - Nos 6 Piliers</title>
        <meta name="description" content="Les 6 piliers fondamentaux de TAMTRACK." />
      </Head>

      <main className="min-h-screen w-full bg-[#fcfaf6] flex flex-col items-center justify-center py-16 px-4 font-sans">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-3">
            ADN TAMTRACK
          </h1>
          <p className="text-lg md:text-xl text-[#0d2d57]">
            Les 6 piliers fondamentaux qui définissent notre identité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {pillarsData.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg"
            >
              {/* ÉTAPE 3: UTILISER LE COMPOSANT IMAGE */}
              <div className="mb-5">
                <Image
                  src={pillar.icon}       // Le chemin de l'image
                  alt={pillar.title}      // Texte alternatif pour l'accessibilité
                  width={60}              // Largeur de l'image en pixels
                  height={60}             // Hauteur de l'image en pixels
                  className="object-contain" // Assure que l'image s'adapte bien
                />
              </div>

              <h3 className="text-xl font-semibold text-orange-500 mb-3 h-14 flex items-center">
                {pillar.title}
              </h3>
              
              <div className="text-gray-700 text-base">
                {pillar.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-16">
          <button
            className="px-8 py-3 bg-white border border-gray-300 rounded-full text-lg text-[#0d2d57] font-semibold transition hover:bg-gray-100 hover:shadow-md"
          >
            Découvrir l'ADN TAMTRACK en détail
          </button>
          <button
            className="px-8 py-3 bg-orange-500 border border-orange-500 rounded-full text-lg text-white font-semibold transition hover:bg-orange-600 hover:shadow-md"
          >
            Rejoindre la révolution éducative
          </button>
        </div>
      </main>
    </>
  );
};

export default TamTrackDNA;
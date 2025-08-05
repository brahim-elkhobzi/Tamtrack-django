

// Ce composant est non-interactif, il peut donc rester un Server Component.
import Link from 'next/link';
import Image from 'next/image';

// --- Définition des Données pour les Cartes ---
// C'est la meilleure pratique pour rendre le composant facile à mettre à jour.
type Module = {
  name: string;
  description: string;
  href: string;
  icon: string;       // Chemin de l'icône de la matière
  color: string;      // Couleur d'accentuation (pour les ombres, les dégradés)
};

const modulesData: Module[] = [
  {
    name: 'Mathématiques',
    description: 'Explorez la logique, l\'algèbre et l\'analyse pour aiguiser votre esprit critique.',
    href: '/quiz/math',
    icon: '/icons/math-icon.svg', // Assurez-vous d'avoir cette icône dans /public/icons/
    color: 'blue',
  },
  {
    name: 'Physique-Chimie',
    description: 'Découvrez les lois de l\'univers, de l\'atome aux galaxies.',
    href: '/quiz/physique',
    icon: '/icons/physics-icon.svg',
    color: 'purple',
  },
  {
    name: 'SVT',
    description: 'Plongez dans les sciences de la vie et de la Terre et comprenez le monde qui nous entoure.',
    href: '/quiz/svt',
    icon: '/icons/svt-icon.svg',
    color: 'green',
  },
];

export default function SelectModulePage() {
  
  // Fonction pour obtenir les classes de couleur de Tailwind dynamiquement
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'hover:shadow-blue-500/30 text-blue-600';
      case 'purple':
        return 'hover:shadow-purple-500/30 text-purple-600';
      case 'green':
        return 'hover:shadow-green-500/30 text-green-600';
      default:
        return 'hover:shadow-gray-500/30 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        
        {/* Vous pouvez inclure votre barre de navigation ici si nécessaire */}
        {/* <Navbar /> */}

        {/* --- Conteneur Principal --- */}
        <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            {/* --- En-tête --- */}
            <header className="text-center mb-16" style={{ animation: 'slideInDown 0.8s ease-out' }}>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0d2d57] mb-4">
                  Choisissez Votre Terrain de Jeu
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Chaque matière est une nouvelle aventure. Sélectionnez celle que vous souhaitez conquérir aujourd'hui.
                </p>
            </header>

            {/* --- Grille des Modules --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {modulesData.map((module, index) => (
                    <Link
                      href={module.href}
                      key={module.name}
                      className={`
                        group block bg-white rounded-2xl p-8 text-center
                        border border-slate-100 shadow-lg shadow-slate-200/50 
                        transition-all duration-300 ease-out 
                        hover:-translate-y-2 hover:shadow-2xl
                        ${getColorClasses(module.color)}
                      `}
                      // L'animation est appliquée avec le style pour le délai
                      style={{ animation: `slideInUp 0.8s ease-out ${index * 0.15}s backwards` }}
                    >
                        {/* Icône du Module */}
                        <div className="mb-6 flex justify-center">
                          <div className="bg-slate-100 p-5 rounded-full transition-colors duration-300 group-hover:bg-current">
                              <Image 
                                src={module.icon} 
                                alt={`${module.name} icon`}
                                width={50}
                                height={50}
                                // L'astuce ici est d'utiliser une icône blanche SVG et de la colorer avec `filter` si besoin,
                                // ou simplement de changer l'opacité au survol.
                                className="transition-transform duration-300 group-hover:scale-110"
                              />
                          </div>
                        </div>

                        {/* Titre du Module */}
                        <h2 className={`text-2xl font-bold mb-3 text-slate-800`}>
                            {module.name}
                        </h2>

                        {/* Description */}
                        <p className="text-slate-500 leading-relaxed mb-6">
                            {module.description}
                        </p>
                        
                        {/* "Bouton" d'appel à l'action */}
                        <span 
                           className={`
                             inline-block font-semibold 
                             transition-colors duration-300
                             group-hover:text-white
                           `}>
                            Commencer l'aventure
                            <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 ml-2">→</span>
                        </span>
                    </Link>
                ))}
            </div>
        </main>
    </div>
  );
}
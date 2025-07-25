import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// --- Définition des Données ---
// C'est la meilleure pratique. Pour modifier un lien, vous ne le faites qu'ici.

type LinkItem = {
  name: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: LinkItem[];
};

const footerSections: FooterSection[] = [
  {
    title: 'Modules',
    links: [
      { name: 'TUTORING+', href: '/tutoring' },
      { name: 'ORIENTATION+', href: '/orientation' },
      { name: 'INSERTION+', href: '/insertion' },
      { name: 'ANALYTICS+', href: '/analytics' },
    ],
  },
  {
    title: 'Profils',
    links: [
      { name: 'Élèves/Étudiants', href: '/students' },
      { name: 'Parents', href: '/parents' },
      { name: 'Enseignants', href: '/teachers' },
      { name: 'Institutions', href: '/institutions' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { name: 'Support', href: '/support' },
      { name: 'Démonstration', href: '/demo' },
      { name: 'Partenariats', href: '/partnerships' },
      { name: 'Presse', href: '/press' },
    ],
  },
];


const Footer: NextPage = () => {
  return (
    // On utilise la balise sémantique <footer>
    // Le code bg-[#04233b] est la couleur bleu marine foncée de l'image.
    <footer className="bg-[#04233b] text-white font-sans">
      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Grille principale : flexible sur mobile, et en colonnes sur les grands écrans */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Colonne 1 : Logo et Description */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="mb-4">
              {/* IMPORTANT: Changez 'logo-white.svg' par le nom de votre fichier logo */}
              <Image
                src="/logo-white.svg" // Chemin vers votre logo dans /public
                alt="Logo TamTrack"
                width={150}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              La première plateforme éducative 100% marocaine qui révolutionne l'apprentissage grâce à l'intelligence artificielle éthique.
            </p>
          </div>

          {/* Colonnes 2, 3 et 4 : Les listes de liens sont générées à partir du tableau */}
          {footerSections.map((section) => (
            <div key={section.title}>
              {/* Titre de la colonne en orange */}
              <h3 className="font-bold text-orange-500 text-lg mb-5 uppercase tracking-wider">
                {section.title}
              </h3>
              {/* Liste de liens avec un espacement vertical */}
              <div className="space-y-4">
                {section.links.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Ligne de séparation et Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TAMTRACK. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
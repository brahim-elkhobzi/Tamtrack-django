// "use client";

// import { useAuth } from "@/app/context/AuthContext";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const DashboardPage = () => {
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.push("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Not Authenticated</h1>
//           <p className="mb-4">You need to login to access this page</p>
//           <Link 
//             href="/login" 
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-600">
//                 Welcome, {user.user_id || user.role}
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">
//               Dashboard Overview
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Stats Cards */}
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
//                 <p className="mt-1 text-3xl font-semibold text-gray-900">1,234</p>
//               </div>
              
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
//                 <p className="mt-1 text-3xl font-semibold text-gray-900">$24,567</p>
//               </div>
              
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-gray-500 text-sm font-medium">Tasks</h3>
//                 <p className="mt-1 text-3xl font-semibold text-gray-900">12/15</p>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="mt-8">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
//               <div className="bg-white shadow overflow-hidden sm:rounded-md">
//                 <ul className="divide-y divide-gray-200">
//                   {[1, 2, 3].map((item) => (
//                     <li key={item}>
//                       <div className="px-4 py-4 sm:px-6">
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm font-medium text-indigo-600 truncate">
//                             Activity {item}
//                           </p>
//                           <div className="ml-2 flex-shrink-0 flex">
//                             <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                               Completed
//                             </p>
//                           </div>
//                         </div>
//                         <div className="mt-2 sm:flex sm:justify-between">
//                           <div className="sm:flex">
//                             <p className="flex items-center text-sm text-gray-500">
//                               Description of activity {item}
//                             </p>
//                           </div>
//                           <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
//                             <p>
//                               {new Date().toLocaleDateString()}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Role-specific content */}
//             {user.role === 'admin' && (
//               <div className="mt-8">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Panel</h3>
//                 <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
//                   <div className="flex">
//                     <div className="flex-shrink-0">
//                       <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-yellow-700">
//                         You have admin privileges. You can access all administrative functions.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardPage;
// app/modules/page.tsx

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
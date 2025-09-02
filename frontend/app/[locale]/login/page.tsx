// // // "use client";

// // // import { useState } from "react";
// // // import { useAuth } from "@/app/context/AuthContext";
// // // import { useRouter } from "next/navigation";
// // // import Link from "next/link";

// // // const LoginPage = () => {
// // //   const [email, setEmail] = useState("user@example.com");
// // //   const [password, setPassword] = useState("password");
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const { login } = useAuth();
// // //   const router = useRouter();

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setError(null);
// // //     setLoading(true);

// // //     try {
// // //       await login(email, password);
// // //       // Redirect after successful login
// // //       router.push("/home"); // or wherever you want to redirect
// // //     } catch (err) {
// // //       setError("Login failed. Please check your credentials and try again.");
// // //       console.error("Login error:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-md w-full space-y-8">
// // //         <div>
// // //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// // //             Sign in to your account
// // //           </h2>
// // //         </div>
        
// // //         {error && (
// // //           <div className="bg-red-50 border-l-4 border-red-500 p-4">
// // //             <div className="flex">
// // //               <div className="flex-shrink-0">
// // //                 <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// // //                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // //                 </svg>
// // //               </div>
// // //               <div className="ml-3">
// // //                 <p className="text-sm text-red-700">{error}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
// // //           <input type="hidden" name="remember" value="true" />
// // //           <div className="rounded-md shadow-sm -space-y-px">
// // //             <div>
// // //               <label htmlFor="email-address" className="sr-only">
// // //                 Email address
// // //               </label>
// // //               <input
// // //                 id="email-address"
// // //                 name="email"
// // //                 type="email"
// // //                 autoComplete="email"
// // //                 required
// // //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// // //                 placeholder="Email address"
// // //                 value={email}
// // //                 onChange={(e) => setEmail(e.target.value)}
// // //               />
// // //             </div>
// // //             <div>
// // //               <label htmlFor="password" className="sr-only">
// // //                 Password
// // //               </label>
// // //               <input
// // //                 id="password"
// // //                 name="password"
// // //                 type="password"
// // //                 autoComplete="current-password"
// // //                 required
// // //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// // //                 placeholder="Password"
// // //                 value={password}
// // //                 onChange={(e) => setPassword(e.target.value)}
// // //               />
// // //             </div>
// // //           </div>

// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center">
// // //               <input
// // //                 id="remember-me"
// // //                 name="remember-me"
// // //                 type="checkbox"
// // //                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
// // //               />
// // //               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
// // //                 Remember me
// // //               </label>
// // //             </div>

// // //             <div className="text-sm">
// // //               <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
// // //                 Forgot your password?
// // //               </Link>
// // //             </div>
// // //           </div>

// // //           <div>
// // //             <button
// // //               type="submit"
// // //               disabled={loading}
// // //               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
// // //             >
// // //               {loading ? (
// // //                 <>
// // //                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                   </svg>
// // //                   Signing in...
// // //                 </>
// // //               ) : (
// // //                 "Sign in"
// // //               )}
// // //             </button>
// // //           </div>
// // //         </form>
        
// // //         <div className="text-center text-sm text-gray-600">
// // //           Don't have an account?{" "}
// // //           <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
// // //             Sign up
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LoginPage;
// // "use client";

// // import { useState, FormEvent } from 'react';
// // import { useAuth } from '@/app/context/AuthContext'; // Assurez-vous que le chemin d'import est correct
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';

// // export default function LoginPage() {
// //   // On récupère la fonction `login` de notre contexte
// //   const { login } = useAuth();
// //   const router = useRouter();

// //   // États locaux pour gérer les champs du formulaire, les erreurs et le chargement
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: FormEvent) => {
// //     e.preventDefault(); // Empêche le rechargement de la page
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       // On appelle la fonction `login` du contexte. C'est elle qui fait tout le travail.
// //       await login(email, password);
// //       // Si la connexion réussit, la redirection est GÉRÉE AUTOMATIQUEMENT par AuthContext.
// //       // Nous n'avons pas besoin d'ajouter router.push() ici.

// //     } catch (err: any) {
// //       // Si AuthContext renvoie une erreur, on l'affiche à l'utilisateur.
// //       setError("L'adresse e-mail ou le mot de passe est incorrect. Veuillez réessayer.");
// //       setLoading(false); // On réactive le bouton en cas d'erreur
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-8">
// //         <div>
// //           <h2 className="text-center text-3xl font-extrabold text-gray-900">
// //             Connectez-vous à votre compte
// //           </h2>
// //           <p className="mt-2 text-center text-sm text-gray-600">
// //             Ou{' '}
// //             <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
// //               créez un nouveau compte
// //             </Link>
// //           </p>
// //         </div>

// //         {/* Affiche une bannière d'erreur si une erreur s'est produite */}
// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
// //             <span className="block sm:inline">{error}</span>
// //           </div>
// //         )}
        
// //         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
// //           <div className="rounded-md shadow-sm -space-y-px">
// //             <div>
// //               <label htmlFor="email-address" className="sr-only">Adresse e-mail</label>
// //               <input
// //                 id="email-address"
// //                 name="email"
// //                 type="email"
// //                 autoComplete="email"
// //                 required
// //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// //                 placeholder="Adresse e-mail"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="password" className="sr-only">Mot de passe</label>
// //               <input
// //                 id="password"
// //                 name="password"
// //                 type="password"
// //                 autoComplete="current-password"
// //                 required
// //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// //                 placeholder="Mot de passe"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
// //             >
// //               {loading ? 'Connexion en cours...' : 'Se connecter'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { useState, FormEvent } from 'react';
// import { useAuth } from '@/app/context/AuthContext'; // Ajustez le chemin
// import Link from 'next/link';

// export default function LoginPage() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       await login(email, password);
//       // La redirection est gérée dans AuthContext
//     } catch (err: any) {
//       setError("L'email ou le mot de passe est incorrect.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900">Connectez-vous</h2>
//           <p className="mt-2 text-sm text-gray-600">ou{' '}<Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">créez un nouveau compte</Link></p>
//         </div>
//         {error && <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"><p>{error}</p></div>}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
//             <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
//             <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
//           </div>
//           <div>
//             <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400">
//               {loading ? 'Connexion...' : 'Se connecter'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, FormEvent } from 'react';
import { useAuth } from '@/app/context/AuthContext'; // Assurez-vous que ce chemin est correct
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // 1. Récupération de la fonction `login` du contexte. C'est elle qui contient toute la logique.
  const { login } = useAuth();
  const router = useRouter();

  // 2. Gestion des états locaux du formulaire : valeurs, erreurs, chargement.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 3. Logique de soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
    setLoading(true);
    setError(null);

    try {
      // Appel de la fonction de connexion. Toute la complexité est dans le contexte.
      await login(email, password);
      // La redirection est GÉRÉE AUTOMATIQUEMENT par AuthContext.
      // Si `login` réussit, l'utilisateur est redirigé vers son tableau de bord.

    } catch (err: any) {
      // Si la fonction `login` du contexte renvoie une erreur (ex: 401 Unauthorized), on l'affiche.
      setError("L'adresse e-mail ou le mot de passe est incorrect. Veuillez réessayer.");
      setLoading(false); // On réactive le bouton pour que l'utilisateur puisse réessayer.
    }
  };

  return (
    // 4. Utilisation de la même structure et des mêmes styles Tailwind CSS que la page d'inscription.
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        
        {/* En-tête de la carte */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Connectez-vous à votre compte
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ou{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              créez un nouveau compte
            </Link>
          </p>
        </div>

        {/* Bannière d'erreur, identique en style à celle de la page d'inscription */}
        {error && (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
                <p>{error}</p>
            </div>
        )}
        
        {/* Formulaire */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
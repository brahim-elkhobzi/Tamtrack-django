"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../../utils/axios"; // Assurez-vous que le chemin vers votre instance axios personnalisée est correct
import { useRouter } from "next/navigation";

// ==========================================================
// 1. DÉFINITION DES TYPES
// Pour un code TypeScript propre et sécurisé
// ==========================================================

type Role = 'student' | 'teacher' | 'parent';

// L'interface pour l'objet utilisateur décodé depuis le JWT et renvoyé par l'API de connexion
interface User {
  exp: number; // Date d'expiration du token, gérée par jwt-decode
  user_id: number;
  email: string;
  role: Role; // Le rôle est crucial pour les redirections
  full_name?: string;
}

// L'interface décrivant les fonctions et les données que notre contexte fournira
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (role: Role, data: any) => Promise<void>;
}

// ==========================================================
// 2. CRÉATION DU CONTEXTE
// ==========================================================
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// ==========================================================
// 3. LE COMPOSANT PROVIDER
// Il encapsulera votre application pour fournir l'état d'authentification
// ==========================================================
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Cet effet s'exécute une seule fois au chargement de l'application
  // pour vérifier si un utilisateur est déjà connecté via les cookies.
  useEffect(() => {
    const initAuth = () => {
      const token = Cookies.get("access_token");
      if (token) {
        try {
          const decodedUser: User = jwtDecode(token);
          // Sécurité : Vérifier si le token n'a pas expiré
          if (Date.now() >= decodedUser.exp * 1000) {
            console.log("Token expiré, déconnexion...");
            logout();
          } else {
            setUser(decodedUser);
          }
        } catch (error) {
          console.error("Token invalide, déconnexion.");
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fonction pour rediriger les utilisateurs après une connexion réussie
  const redirectToDashboard = (role: Role) => {
    switch (role) {
      case 'student':
        alert("Connexion réussie ! Redirection vers le tableau de bord étudiant.");
        router.push('/dashboard/student');
        break;
      case 'teacher':
        router.push('/dashboard/teacher');
        break;
      case 'parent':
        router.push('/dashboard/parent');
        break;
      default:
        router.push('/'); // Redirection par défaut si le rôle n'est pas reconnu
        break;
    }
  };

  // Fonction pour se connecter
  const login = async (email: string, password: string) => {
    try {
      console.log('Tentative de connexion avec:', { email, password });
      // Point d'entrée d'authentification Django
      const response = await api.post("/api/auth/login/", { 
        email: email,
        password: password 
      });
      
      const data = response.data;
      console.log('Réponse du serveur:', data);

      // Stocke les jetons de manière sécurisée dans les cookies
      if (!data.access || !data.refresh) {
        console.error('Tokens manquants dans la réponse:', data);
        throw new Error("Authentication tokens not received");
      }
      
      Cookies.set("access_token", data.access, { expires: 1, secure: true, sameSite: "Strict" });
      Cookies.set("refresh_token", data.refresh, { expires: 7, secure: true, sameSite: "Strict" });
      
      // Décode le token pour obtenir les informations de base
      const decodedToken: any = jwtDecode(data.access);
      console.log('Token décodé:', decodedToken);

      // Crée l'objet utilisateur en combinant les données du token et de la réponse
      const authenticatedUser = {
        exp: decodedToken.exp,
        user_id: decodedToken.user_id || data.user?.id,
        email: decodedToken.email || data.user?.email,
        role: decodedToken.role || data.user?.role || 'student',
        full_name: `${data.user?.first_name || ''} ${data.user?.last_name || ''}`.trim(),
        level: data.user?.level || 'Tronc Commun', // Default level
      } as User;
      
      setUser(authenticatedUser);
      
      // Redirige l'utilisateur vers son tableau de bord
      redirectToDashboard(authenticatedUser.role);
    } catch (error) {
      console.error("La connexion a échoué:", error);
      throw error; // Renvoie l'erreur pour que la page de connexion puisse l'afficher
    }
  };
  
  // Fonction pour s'inscrire
  const register = async (role: Role, data: any) => {
    // Mappe les rôles du frontend aux endpoints de votre API Django
    const roleEndpoints = {
        student: '/api/register/student/',
        parent: '/api/register/parent/',
        teacher: '/api/register/teacher/',
    };
    
    const endpoint = roleEndpoints[role];
    if (!endpoint) throw new Error("Rôle invalide sélectionné pour l'inscription");

    try {
      await api.post(endpoint, data);
      
      // Informe l'utilisateur et le redirige vers la page de connexion
      alert("Inscription réussie ! Veuillez maintenant vous connecter.");
      router.push("/login");

    } catch (error) {
      console.error(`L'inscription en tant que ${role} a échoué:`, error);
      throw error; // Renvoie l'erreur pour que la page d'inscription puisse l'afficher
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUser(null);
    router.push("/login"); // Redirige l'utilisateur vers la page de connexion
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};


// ==========================================================
// 4. LE HOOK PERSONNALISÉ
// Pour consommer facilement le contexte dans vos composants
// ==========================================================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
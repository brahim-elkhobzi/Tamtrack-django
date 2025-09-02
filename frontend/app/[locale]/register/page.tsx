
"use client";
import { useState, FormEvent } from "react";
import { useAuth } from "@/app/context/AuthContext"; // Ajustez le chemin si nécessaire
import Link from "next/link";
import { FaUserGraduate, FaChalkboardTeacher, FaUserFriends } from "react-icons/fa";

type Role = 'student' | 'teacher' | 'parent';

export default function RegisterPage() {
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    level: "", // Spécifique à l'étudiant
    parent_email: "", // Spécifique à l'étudiant
    role: "", // Spécifique à l'étudiant
    subject_specialization: "", // Spécifique au professeur
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setLoading(true);
    setError(null);
    
    try {
      await register(selectedRole, formData);
    } catch (err: any) {
      // Gère les erreurs renvoyées par Django REST Framework (400 Bad Request)
      const backendError = err.response?.data;
      if (typeof backendError === 'object') {
        const errorMessages = Object.entries(backendError)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(' ') : value}`)
          .join(' ');
        setError(errorMessages || "L'inscription a échoué. Veuillez vérifier vos données.");
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- VUE 1 : CHOIX DU RÔLE ---
  if (!selectedRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-gray-900">Créez votre compte</h2><p className="mt-2 text-sm text-gray-600">Pour commencer, dites-nous qui vous êtes.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <RoleCard icon={<FaUserGraduate size={40} className="text-indigo-600"/>} title="Étudiant" description="Accédez à vos cours et suivez votre progression." onClick={() => setSelectedRole('student')}/>
          <RoleCard icon={<FaUserFriends size={40} className="text-indigo-600"/>} title="Parent" description="Suivez les progrès de votre enfant." onClick={() => setSelectedRole('parent')}/>
          <RoleCard icon={<FaChalkboardTeacher size={40} className="text-indigo-600"/>} title="Professeur" description="Supervisez vos élèves et leurs performances." onClick={() => setSelectedRole('teacher')}/>
        </div>
        <p className="mt-8 text-sm text-gray-600">Vous avez déjà un compte ?{' '}<Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Connectez-vous</Link></p>
      </div>
    );
  }

  // --- VUE 2 : FORMULAIRE D'INSCRIPTION ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 capitalize">Inscription {selectedRole}</h2>
          <p className="mt-2 text-sm text-gray-600">ou{' '}<button onClick={() => setSelectedRole(null)} className="font-medium text-indigo-600 hover:text-indigo-500">choisir un autre rôle</button></p>
        </div>
        {error && <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"><p>{error}</p></div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div><label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Prénom</label><input id="first_name" name="first_name" type="text" required value={formData.first_name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
              <div><label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Nom</label><input id="last_name" name="last_name" type="text" required value={formData.last_name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
            </div>
            <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label><input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
            <div><label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label><input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
            {selectedRole === 'student' && (
              <>
                <div><label htmlFor="level" className="block text-sm font-medium text-gray-700">Niveau Scolaire</label><select id="level" name="level" required value={formData.level} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"><option value="" disabled>Sélectionnez un niveau</option><option value="tronc commun">Tronc Commun</option><option value="premier bac">Premier Bac</option><option value="deuxieme bac">Deuxième Bac</option></select></div>
                <div><label htmlFor="parent_email" className="block text-sm font-medium text-gray-700">E-mail du Parent (Optionnel)</label><input id="parent_email" name="parent_email" type="email" value={formData.parent_email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
              </>
            )}
            {selectedRole === 'teacher' && (<div><label htmlFor="subject_specialization" className="block text-sm font-medium text-gray-700">Matière enseignée</label><input id="subject_specialization" name="subject_specialization" type="text" value={formData.subject_specialization} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>)}
            <div><button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400">{loading ? 'Création en cours...' : 'Créer le compte'}</button></div>
        </form>
      </div>
    </div>
  );
}

const RoleCard = ({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) => (<button onClick={onClick} className="text-center w-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"><div className="flex justify-center mb-4">{icon}</div><h3 className="text-xl font-bold text-gray-900">{title}</h3><p className="mt-2 text-sm text-gray-600">{description}</p></button>);
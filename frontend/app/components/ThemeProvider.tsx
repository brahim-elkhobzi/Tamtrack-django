

// app/components/ThemeProvider.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false)

  // S'exécute uniquement côté client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Si on est sur le serveur ou au premier rendu client, ne rien rendre
  // ou un loader pour éviter les erreurs d'hydratation.
  if (!mounted) {
    return <>{children}</>
  }

  // defaultTheme="system" est excellent car il s'adapte aux préférences de l'OS de l'utilisateur.
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}
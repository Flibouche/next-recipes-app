import { Roles } from '@/lib/types/globals'
import { auth } from '@clerk/nextjs/server'

// Fonction pour vérifier le rôle de l'utilisateur par les métadonnées
export const checkRole = async (role: Roles) => {
    const { sessionClaims } = await auth()
    return sessionClaims?.metadata.role === role
}
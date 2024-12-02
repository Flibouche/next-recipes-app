import { Session } from "@/lib/types/types";

// Fonction pour vérifier le rôle de l'utilisateur par l'organisation
export function checkUserRoleByOrganization(session: Session | null): string | null {
    // Si la session n'existe pas ou si l'utilisateur n'a pas de rôle ou d'appartenance à une organisation, retournez null
    if (
        !session ||
        !session.user ||
        !session.user.organizationMemberships ||
        session.user.organizationMemberships.length === 0
    ) {
        return null;
    }

    // On récupère les appartenances à l'organisation
    const organizationMemberships = session.user.organizationMemberships;

    // On loop sur les appartenances à l'organisation
    for (const membership of organizationMemberships) {
        if (membership.role) {
            return membership.role.toLowerCase(); // Retourne le rôle en minuscules s'il est trouvé dans les appartenances
        }
    }

    return null; // Retourne null si le rôle n'est pas trouvé
}

// Fonction pour vérifier le rôle de l'utilisateur par les métadonnées
export function checkUserRoleByMetadata(session: Session | null | undefined): string | null {
    // Si la session n'existe pas ou si l'utilisateur n'a pas de métadonnées publiques ou de rôle, retournez null
    if (
        !session ||
        !session.user ||
        !session.user.publicMetadata ||
        !session.user.publicMetadata.role
    ) {
        return null;
    }

    // On récupère le rôle de l'utilisateur
    const role = session.user.publicMetadata.role as string;
    if (!role) {
        return null; // Retourne null si le rôle n'est pas trouvé
    }

    return role.toLowerCase(); // Retourne le rôle en minuscules s'il est trouvé dans les métadonnées
}
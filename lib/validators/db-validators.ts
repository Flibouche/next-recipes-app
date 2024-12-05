import { db } from '@/lib/db';

export async function checkIsExisting(table: 'ingredient' | 'recipe' | 'category' | 'tag', name: string): Promise<boolean> {
    const trimmedName = name.trim();

    switch (table) {
        case 'ingredient':
            return (
                await db.ingredient.findFirst({
                    where: {
                        name: {
                            equals: trimmedName,
                            mode: 'insensitive', // Ignore la casse
                        },
                    },
                })
            ) !== null;
        case 'recipe':
            return (
                await db.recipe.findFirst({
                    where: {
                        name: {
                            equals: trimmedName,
                            mode: 'insensitive',
                        },
                    },
                })
            ) !== null;
        case 'category':
            return (
                await db.category.findFirst({
                    where: {
                        name: {
                            equals: trimmedName,
                            mode: 'insensitive',
                        },
                    },
                })
            ) !== null;
        case 'tag':
            return (
                await db.tag.findFirst({
                    where: {
                        name: {
                            equals: trimmedName,
                            mode: 'insensitive',
                        },
                    },
                })
            ) !== null;
        default:
            return false;
    }
}
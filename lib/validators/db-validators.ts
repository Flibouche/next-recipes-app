import { db } from '@/lib/db';

export async function checkIsExisting(table: 'ingredient' | 'recipe' | 'category' | 'tag', name: string): Promise<boolean> {
    const trimmedName = name.trim();

    switch (table) {
        case 'ingredient':
            return (await db.ingredient.findUnique({ where: { name: trimmedName } })) !== null;
        case 'recipe':
            return (await db.recipe.findUnique({ where: { name: trimmedName } })) !== null;
        case 'category':
            return (await db.category.findUnique({ where: { name: trimmedName } })) !== null;
        case 'tag':
            return (await db.tag.findUnique({ where: { name: trimmedName } })) !== null;
        default:
            return false;
    }
}
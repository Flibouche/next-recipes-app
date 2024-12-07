export const API_ROUTES = {
    INGREDIENTS: {
        GET_ALL: `${process.env.NEXT_PUBLIC_APP_URL}/api/ingredient`,
    },
    RECIPES: {
        GET_ALL: `${process.env.NEXT_PUBLIC_APP_URL}/api/recipe`,
        GET_ONE: (recipeId: string) => `${process.env.NEXT_PUBLIC_APP_URL}/api/recipe/${recipeId}`,
    }
}
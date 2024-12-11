const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export const API_ROUTES = {
    INGREDIENTS: {
        GET_ALL: `${API_URL}/api/ingredient`,
        CREATE: `${API_URL}/api/ingredient/create`,
    },
    RECIPES: {
        GET_ALL: `${API_URL}/api/recipe`,
        GET_LAST_ADDED: `${API_URL}/api/recipe?type=lastAdded`,
        GET_ONE: (recipeSlug: string) => `${API_URL}/api/recipe/${recipeSlug}`,
        CREATE: `${API_URL}/api/recipe/create`,
    }
}
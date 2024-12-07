const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export const API_ROUTES = {
    INGREDIENTS: {
        GET_ALL: `${API_URL}/api/ingredient`,
        CREATE: `${API_URL}/api/ingredient/create`,
    },
    RECIPES: {
        GET_ALL: `${API_URL}/api/recipe`,
        GET_ONE: (recipeId: string) => `${API_URL}/api/recipe/${recipeId}`,
        CREATE: `${API_URL}/api/recipe/create`,
    }
}
/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Request type for /api/getRecipe
 */
export interface GetRecipeRequest {
  mood: string;
}

/**
 * Response type for /api/getRecipe
 */
export interface Recipe {
  name: string;
  image: string;
  ingredients: string[];
  steps: string[];
}

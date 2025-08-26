/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Response type for /api/getRecipe
 */
export interface Recipe {
  name: string;
  image: string;
  servings: string;
  readyInMinutes: number;
  ingredients: string[];
  steps: string[];
}

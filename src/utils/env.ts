import { FIREBASE_WEB_API_KEY } from '@env';

/**
 * This file provides a centralized place to access environment variables.
 * It's recommended to import from this file rather than directly from '@env'
 * to make it easier to add validation, default values, or transformations.
 */

export const getFirebaseWebApiKey = (): string => {
  if (!FIREBASE_WEB_API_KEY) {
    console.warn('FIREBASE_WEB_API_KEY is not defined in .env file');
    return '';
  }
  return FIREBASE_WEB_API_KEY;
};

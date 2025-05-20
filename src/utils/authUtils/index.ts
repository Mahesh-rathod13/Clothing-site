import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  [key: string]: any;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log('Decoded token:', decoded);
    if (decoded.exp === undefined) {
      console.warn('Token does not have an expiration time.');
      return true; 
    }
    return decoded.exp * 1000 < Date.now(); // exp is in seconds, Date.now() in ms
  } catch (error) {
    console.error('Failed to decode token:', error);
    return true; // Assume expired if decoding fails
  }
};

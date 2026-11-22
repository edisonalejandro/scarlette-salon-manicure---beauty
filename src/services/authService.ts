import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { auth } from '../firebase';
import { apiClient } from '../lib/apiClient';

export interface UserProfile {
  id: string;
  email: string | null;
  name: string | null;
  role: 'admin' | 'client';
}

/**
 * Sign in with Google popup
 */
export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
  return firebaseSignOut(auth);
}

/**
 * Sincroniza el perfil del usuario con el backend REST.
 * Crea el perfil si no existe (primer login) o lo actualiza.
 * El token ya está disponible porque Firebase Auth ya actualizó currentUser.
 */
export async function syncUserProfile(user: User): Promise<UserProfile> {
  return apiClient.post<UserProfile>('/api/users/me', {
    email: user.email,
    name: user.displayName,
  });
}

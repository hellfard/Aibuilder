// Authentication services - Enhanced from firebase_barebones_javascript integration
import {
  signInWithRedirect,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  getRedirectResult
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import { createUser, getUser, updateUser } from "./database";
import { User } from "../types";

// Enhanced provider setup
googleProvider.addScope('email');
googleProvider.addScope('profile');

githubProvider.addScope('user:email');

export type AuthProvider = 'google' | 'github' | 'discord';

// Sign in functions
export const signInWithGoogle = async (usePopup: boolean = true): Promise<void> => {
  try {
    if (usePopup) {
      await signInWithPopup(auth, googleProvider);
    } else {
      await signInWithRedirect(auth, googleProvider);
    }
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signInWithGitHub = async (usePopup: boolean = true): Promise<void> => {
  try {
    if (usePopup) {
      await signInWithPopup(auth, githubProvider);
    } else {
      await signInWithRedirect(auth, githubProvider);
    }
  } catch (error) {
    console.error("Error signing in with GitHub:", error);
    throw error;
  }
};

// Handle redirect result (from firebase_barebones_javascript integration)
export const handleRedirectResult = async (): Promise<void> => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      // User signed in successfully via redirect
      console.log("Redirect sign-in successful:", result.user.email);
    }
  } catch (error) {
    console.error("Error handling redirect result:", error);
    throw error;
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Convert Firebase user to app user
const createAppUserFromFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  const provider = firebaseUser.providerData[0]?.providerId;
  let appProvider: AuthProvider = 'google';
  
  if (provider?.includes('github')) {
    appProvider = 'github';
  } else if (provider?.includes('discord')) {
    appProvider = 'discord';
  }

  const appUser: Omit<User, "id"> = {
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || 'Anonymous User',
    avatar: firebaseUser.photoURL || undefined,
    provider: appProvider,
    subscription: 'free', // Default subscription
  };

  // Check if user exists in Firestore
  let existingUser = await getUser(firebaseUser.uid);
  
  if (!existingUser) {
    // Create new user in Firestore
    await createUser(appUser);
    existingUser = await getUser(firebaseUser.uid);
  } else {
    // Update existing user with latest info
    await updateUser(firebaseUser.uid, {
      email: appUser.email,
      name: appUser.name,
      avatar: appUser.avatar,
    });
    existingUser = await getUser(firebaseUser.uid);
  }

  return existingUser!;
};

// Auth state listener
export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const appUser = await createAppUserFromFirebaseUser(firebaseUser);
        callback(appUser);
      } catch (error) {
        console.error("Error creating app user:", error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

// Get current user
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
};
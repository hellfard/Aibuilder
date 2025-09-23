// Firestore database services for website builder
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch
} from "firebase/firestore";
import { db } from "../firebase";
import { User, Project, Page } from "../types";

// Collections
const USERS_COLLECTION = "users";
const PROJECTS_COLLECTION = "projects";
const PAGES_COLLECTION = "pages";

// User operations
export const createUser = async (userData: Omit<User, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), {
      ...userData,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    }
    return null;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<void> => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(docRef, {
      ...userData,
      updated_at: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Project operations
export const createProject = async (
  userId: string, 
  projectData: Omit<Project, "id" | "created_at" | "updated_at">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      userId,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const getUserProjects = async (userId: string): Promise<Project[]> => {
  try {
    const q = query(
      collection(db, PROJECTS_COLLECTION),
      where("userId", "==", userId),
      orderBy("updated_at", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Project[];
  } catch (error) {
    console.error("Error getting user projects:", error);
    throw error;
  }
};

export const getProject = async (projectId: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, projectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
        updated_at: data.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as Project;
    }
    return null;
  } catch (error) {
    console.error("Error getting project:", error);
    throw error;
  }
};

export const updateProject = async (projectId: string, projectData: Partial<Project>): Promise<void> => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(docRef, {
      ...projectData,
      updated_at: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    // Delete project and all its pages in a batch
    const batch = writeBatch(db);
    
    // Delete the project
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    batch.delete(projectRef);
    
    // Delete all pages belonging to this project
    const pagesQuery = query(
      collection(db, PAGES_COLLECTION),
      where("projectId", "==", projectId)
    );
    const pagesSnapshot = await getDocs(pagesQuery);
    
    pagesSnapshot.docs.forEach((pageDoc) => {
      batch.delete(pageDoc.ref);
    });
    
    await batch.commit();
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Page operations
export const createPage = async (
  projectId: string,
  pageData: Omit<Page, "id" | "created_at" | "updated_at">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PAGES_COLLECTION), {
      ...pageData,
      projectId,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating page:", error);
    throw error;
  }
};

export const getProjectPages = async (projectId: string): Promise<Page[]> => {
  try {
    const q = query(
      collection(db, PAGES_COLLECTION),
      where("projectId", "==", projectId),
      orderBy("created_at", "asc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Page[];
  } catch (error) {
    console.error("Error getting project pages:", error);
    throw error;
  }
};

export const updatePage = async (pageId: string, pageData: Partial<Page>): Promise<void> => {
  try {
    const docRef = doc(db, PAGES_COLLECTION, pageId);
    await updateDoc(docRef, {
      ...pageData,
      updated_at: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating page:", error);
    throw error;
  }
};

export const deletePage = async (pageId: string): Promise<void> => {
  try {
    const docRef = doc(db, PAGES_COLLECTION, pageId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting page:", error);
    throw error;
  }
};

// Real-time subscriptions
export const subscribeToUserProjects = (
  userId: string,
  callback: (projects: Project[]) => void
) => {
  const q = query(
    collection(db, PROJECTS_COLLECTION),
    where("userId", "==", userId),
    orderBy("updated_at", "desc")
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Project[];
    
    callback(projects);
  }, (error) => {
    console.error("Error in projects subscription:", error);
  });
};

export const subscribeToProjectPages = (
  projectId: string,
  callback: (pages: Page[]) => void
) => {
  const q = query(
    collection(db, PAGES_COLLECTION),
    where("projectId", "==", projectId),
    orderBy("created_at", "asc")
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const pages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Page[];
    
    callback(pages);
  }, (error) => {
    console.error("Error in pages subscription:", error);
  });
};
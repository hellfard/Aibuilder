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

// Collections
const USERS_COLLECTION = "users";
const PROJECTS_COLLECTION = "projects";
const PAGES_COLLECTION = "pages";

// User operations
export const createUser = async (userData) => {
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

export const getUser = async (userId) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
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
export const createProject = async (userId, projectData) => {
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

export const getUserProjects = async (userId) => {
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
    }));
  } catch (error) {
    console.error("Error getting user projects:", error);
    throw error;
  }
};

export const getProject = async (projectId) => {
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
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting project:", error);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
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

export const deleteProject = async (projectId) => {
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
export const createPage = async (projectId, pageData) => {
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

export const getProjectPages = async (projectId) => {
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
    }));
  } catch (error) {
    console.error("Error getting project pages:", error);
    throw error;
  }
};

export const updatePage = async (pageId, pageData) => {
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

export const deletePage = async (pageId) => {
  try {
    const docRef = doc(db, PAGES_COLLECTION, pageId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting page:", error);
    throw error;
  }
};

// Real-time subscriptions
export const subscribeToUserProjects = (userId, callback) => {
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
    }));
    
    callback(projects);
  }, (error) => {
    console.error("Error in projects subscription:", error);
  });
};

export const subscribeToProjectPages = (projectId, callback) => {
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
    }));
    
    callback(pages);
  }, (error) => {
    console.error("Error in pages subscription:", error);
  });
};
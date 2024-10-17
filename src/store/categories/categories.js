import { defineStore } from 'pinia';
import { db , storage } from '@/firebase/firebaseConfig.js'; 

export const useCategoriesStore = defineStore('useCategoriesStore', {
  state: () => ({
    categories: [],
  }),
  actions: {
    async fetchCategories() {
      const querySnapshot = await db.collection('catogries').get();
      this.categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
     
    },

    async addCategory(category) {
      await db.collection('catogries').add(category);
      this.fetchCategories();
    },

    async updateCategory(category) {
      await db.collection('catogries').doc(category.id).update(category);
      this.fetchCategories();
    },

    async deleteCategory(categoryId) {
      await db.collection('catogries').doc(categoryId).delete();
      this.fetchCategories();
    },
    async uploadImage(file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`images/${file.name}`);
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      console.log("we got url from 'getDownloadURL' ");
      return url;
    },
    async deleteImageFromStorage(imageUrl) {
      try {
        console.log(imageUrl)
        const storageRef = storage.refFromURL(imageUrl);
        await storageRef.delete();
        console.log("Image deleted from storage");
      } catch (error) {
        console.error("Error deleting image from storage", error);
        throw new Error("Error deleting image from storage");
      }
    }
  }
});

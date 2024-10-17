// Pinia Store - src/stores/products.js
import { defineStore } from 'pinia';
import { db, storage } from '@/firebase/firebaseConfig.js';

export const useProductsStore = defineStore('useProductsStore', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      const querySnapshot = await db.collection('products').get();
      this.products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    async addProduct(product) {
      await db.collection('products').add(product);
      this.fetchProducts();
    },
    
    async updateProduct(product) {
      await db.collection('products').doc(product.id).update(product);
      this.fetchProducts();

    },
    
    async deleteProduct(productId) {
      await db.collection('products').doc(productId).delete();
      this.fetchProducts();
    },
    
    async uploadImage(imageUrl) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${new Date().getTime()}.jpg`);
      const response = await imageRef.putString(imageUrl, 'data_url');
      return await response.ref.getDownloadURL();
    },
    
    async deleteImageFromStorage(imageUrl) {
      try {
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

import { defineStore } from 'pinia';
import { db } from '@/firebase/firebaseConfig.js'; 

export const usePurchasesStore = defineStore('usePurchasesStore', {
  state: () => ({
    purchases: [],
  }),
  actions: {
    async addPurchase(purchase) {
      const docRef = await db.collection('purchases').add(purchase);
      return docRef.id; 
    },

    async fetchPurchases() {
      const querySnapshot = await db.collection('purchases').get();
      this.purchases = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    
    async deletePurchase(purchaseId) {
      await db.collection('purchases').doc(purchaseId).delete();
      this.fetchPurchases();
    },
  },
});

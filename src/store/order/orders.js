import { defineStore } from 'pinia';
import { db, storage } from '@/firebase/firebaseConfig.js';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
  }),
  actions: {
    async fetchOrders() {
      const querySnapshot = await db.collection('orders').orderBy('numberOfOrder', 'desc').get();
      this.orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async generateOrderNumber() {
      const ordersSnapshot = await db.collection('orders').orderBy('numberOfOrder', 'desc').limit(1).get();
      if (!ordersSnapshot.empty) {
        const lastOrder = ordersSnapshot.docs[0].data();
        return (parseInt(lastOrder.numberOfOrder)+1);
      } else {
        return 1; 
      }
  },
    async addOrder(order) {
      const orderRef = await db.collection('orders').add(order);
      await this.fetchOrders();
      return orderRef.id;
    },
    async updateOrder(order) {
      await db.collection('orders').doc(order.id).update(order);
      await this.fetchOrders();
     
    },
    async deleteOrder(orderId) {
      await db.collection('orders').doc(orderId).delete();
      await this.fetchOrders();
    },
    async uploadImage({ file }) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`orders/${new Date().getTime()}_${file.name}`);
      await fileRef.put(file);
      return await fileRef.getDownloadURL();
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
  },
});

import { defineStore } from 'pinia';
import { db } from '@/firebase/firebaseConfig.js';

export const useGetUserStore = defineStore('useGetUserStore', {
  state: () => ({
    users: [],
    technicalUsers: [],
    clientUsers: []
  }),
  actions: {
    async fetchUsers() {
      const querySnapshot = await db.collection('users').get();
      this.users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filter users into technicalUsers and clientUsers arrays
      this.technicalUsers = this.users.filter(user => user.role === 'technical');
      this.clientUsers = this.users.filter(user => user.role === 'clint');
    },
    async fetchSingleUser(userId) {
      const doc = await db.collection('users').doc(userId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error("User not found");
      }
    }
  }
});

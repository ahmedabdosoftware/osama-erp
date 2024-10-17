import { defineStore } from 'pinia';
import { db  } from '@/firebase/firebaseConfig.js'; 

export const useBranchesStore = defineStore('useBranchesStore', {
  state: () => ({
    branches: [],
  }),
  actions: {
    async fetchBranches() {
      const querySnapshot = await db.collection('branches').get();
      this.branches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async addBranch(branch) {
      await db.collection('branches').add(branch);
      this.fetchBranches();
    },
    
    async updateBranch(branch) {
      await db.collection('branches').doc(branch.id).update(branch);
      this.fetchBranches();
    },
    
    async deleteBranch(branchId) {
      await db.collection('branches').doc(branchId).delete();
      this.fetchBranches();
    },


      async fetchBranchById (branchId) {
        const branchRef = db.collection('branches').doc(branchId);
        const branchSnapshot = await branchRef.get();

        if (branchSnapshot.exists) {
          return { id: branchSnapshot.id, ...branchSnapshot.data() }; 
        } else {
          throw new Error('Branch not found');
        }
      }




    },
   
})

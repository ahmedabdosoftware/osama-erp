import { defineStore } from 'pinia';
import { db  } from '@/firebase/firebaseConfig.js'; 

export const useBranchTransferStore = defineStore('useBranchTransferStore', {
  state: () => ({
    transferes: [],
  }),
  actions: {
    async fetchTransferes() {
      const querySnapshot = await db.collection('transferes').get();
      this.transferes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(this.transferes);
      console.log(this.transferes[0]);
    },

    async addTransfer(transfer) {
      await db.collection('transferes').add(transfer);
      this.fetchTransferes();
    },
    
   // async updateTransfer(transfer) {
    //  await db.collection('transferes').doc(transfer.id).update(transfer);
    //  this.fetchTransferes();
    //},
    
    async deleteTransfer(transferId) {
      await db.collection('transferes').doc(transferId).delete();
      this.fetchTransferes();
    },
    },
   
});

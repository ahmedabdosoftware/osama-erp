import { defineStore } from 'pinia';
import { db  } from '@/firebase/firebaseConfig.js'; 

export const useUnitsStore = defineStore('useUnitsStore', {
  state: () => ({
    units: [],
  }),
  actions: {
    async fetchUnits() {
      const querySnapshot = await db.collection('units').get();
      this.units = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(this.units);
      console.log(this.units[0]);
    },

    async addUnit(unit) {
      await db.collection('units').add(unit);
      this.fetchUnits();
    },

    async updateUnit(unit) {
      await db.collection('units').doc(unit.id).update(unit);
      this.fetchUnits();
    },

    async deleteUnit(unitId) {
      await db.collection('units').doc(unitId).delete();
      this.fetchUnits();
    },
    },
   
});

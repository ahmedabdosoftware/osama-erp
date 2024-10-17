// src/store/transactions.js
import { defineStore } from 'pinia';
import { db } from '@/firebase/firebaseConfig.js';

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [],
    userTransactions:[],
  }),
  actions: {
    async fetchTransactions() {
      const querySnapshot = await db.collection('transactions').get();
      this.transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async fetchTransactionById(transactionId) {
      const doc = await db.collection('transactions').doc(transactionId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        console.error('No such document!');
        return null;
      }
    },
    async fetchTransactionsByUserId(userId) {
      const querySnapshot = await db.collection('transactions')
        .where('userId', '==', userId)
        .get();
      this.userTransactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async addTransaction(transaction) {
      await db.collection('transactions').doc(transaction.id).set(transaction);
      await this.fetchTransactions();
      return transaction.id;
    },
    async updateTransaction(transaction) {
      await db.collection('transactions').doc(transaction.id).update(transaction);
      await this.fetchTransactions();
    },
    async deleteTransaction(transactionId,userId) {
      await db.collection('transactions').doc(transactionId).delete();
       this.fetchTransactions();
       this.fetchTransactionsByUserId(userId);
    },
  },
});

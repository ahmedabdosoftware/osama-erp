import { defineStore } from 'pinia';
import { db } from '@/firebase/firebaseConfig.js'; 



export const useReturnsStore = defineStore('useReturnsStore', {
  state: () => ({
    returns: [],
  }),
  actions: {
    // Fetch returns for a specific purchase
    async fetchReturnsByPurchaseId(purchaseId) {
      const querySnapshot = await db.collection('returns')
        .where('purchaseId', '==', purchaseId)
        .get();
      
      this.returns = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return this.returns;
    },

    // Check if the quantity to be returned for each product is valid
    async canReturnProducts(purchaseId, productsToReturn) {
      // Fetch all returns associated with the purchase
      const returns = await this.fetchReturnsByPurchaseId(purchaseId);
      console.log(returns)
      // Fetch the purchase to check the purchased quantities
      const purchaseDoc = await db.collection('purchases').doc(purchaseId).get();
      const purchase = purchaseDoc.data();
      console.log(purchase)

      // Loop over the products to return and check their quantities individually
      for (const productToReturn of productsToReturn) {

        const { id, quantityReturn } = productToReturn;

          // Skip this product if there's no return value for it
          if (!quantityReturn || quantityReturn <= 0) {
            continue; // Skip this iteration
          }

        // Calculate the total returned quantity for this specific product across all previous returns
        let totalReturnedQuantity = 0;
        for (const ret of returns) {
          const returnedProduct = ret.products.find(p => p.id === id);
          if (returnedProduct) {
            totalReturnedQuantity +=Number(returnedProduct.quantityReturn);
          }
        }

        // Get the purchased quantity of the product
        const purchasedProduct = purchase.products.find(p => p.id === id);
        const purchasedQuantity = purchasedProduct ? purchasedProduct.quantity : 0;

        // Check if the new return quantity exceeds the purchased quantity for this specific product
        if (totalReturnedQuantity + Number(quantityReturn) > purchasedQuantity) {
          return {
            success: false,
            id,
            //message: `Cannot return product ${id}. Exceeded purchased quantity.`,
            message: `مجموع المرتجعات لهذا المنتج تخطى كميه الشراء `,
          };
        }
      }

      // If all products pass the check, allow the return
      return { success: true };
    },

    // Check if the warehouse has enough quantity of the product to be deducted
    async checkWarehouseStock(branchId, productsToReturn) {
      for (const product of productsToReturn) {
        const { id, quantityReturn } = product;

         // Skip this product if there's no return value for it
          if (!quantityReturn || quantityReturn <= 0) {
            continue; // Skip this iteration
          }

        // Fetch the product stock in the warehouse
        const warehouseDoc = await db.collection('branches').doc(branchId).get();
        const warehouseData = warehouseDoc.data();
        
        const warehouseProduct = warehouseData.products.find(p => p.id === id);
        if (!warehouseProduct || warehouseProduct.quantity < quantityReturn) {
          return {
            success: false,
            id,
            //message: `Cannot return product ${id}. Not enough stock in the warehouse.`,
            message: `لا توجد كميه كافيه فى المخزن `,
          };
        }
      }

      return { success: true };
    },

    // Deduct product quantities from the warehouse
    async updateWarehouseStock(branchId, productsToReturn) {
      const warehouseDoc = await db.collection('branches').doc(branchId).get();
      const warehouseData = warehouseDoc.data();
        console.log("warehouse Data",warehouseData)
        console.log("products To Return",productsToReturn)
      // Loop over the products and update their quantities in the warehouse
      for (const product of productsToReturn) {
        const { id, quantityReturn } = product;

          // Skip this product if there's no return value for it
          if (!quantityReturn || quantityReturn <= 0) {
            continue; // Skip this iteration
          }
          
        const warehouseProduct = warehouseData.products.find(p => p.id === id);
        if (warehouseProduct) {
          warehouseProduct.quantity -= quantityReturn;
        }
      }

      // Update the warehouse data in Firestore
      await db.collection('branches').doc(branchId).update({
        products: warehouseData.products
      });
    },

    // Add a new return for a specific purchase and update warehouse stock
    async addReturn(purchaseId, returnData) {
      // Fetch the purchase to get the BranchId
      const purchaseDoc = await db.collection('purchases').doc(purchaseId).get();
      const purchase = purchaseDoc.data();
      const BranchId = purchase.BranchId;  // Assuming each purchase is associated with a specific warehouse

      // Check if returning products is allowed for each product individually
      const validation = await this.canReturnProducts(purchaseId, returnData.products);
      if (!validation.success) {
        throw new Error(validation.message);
      }

      // Check if there is enough stock in the warehouse to deduct the returned quantities
      const stockValidation = await this.checkWarehouseStock(BranchId, returnData.products);
      if (!stockValidation.success) {
        throw new Error(stockValidation.message);
      }

      // If allowed and stock is sufficient, proceed with adding the return
  
      console.log("ok")
      const docRef = await db.collection('returns').add(returnData);

      // Update the warehouse stock by deducting the returned quantities
      await this.updateWarehouseStock(BranchId, returnData.products);

      return docRef.id;
    },

    async fetchAllReturns() {
      const querySnapshot = await db.collection('returns').get();
      this.returns = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async deleteReturn(reId) {
      await db.collection('returns').doc(reId).delete();
      this.fetchAllReturns();
    },
  },
});

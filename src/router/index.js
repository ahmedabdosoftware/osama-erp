import Vue from "vue";
import VueRouter from "vue-router";
import { db , auth  } from '@/firebase/firebaseConfig.js'; 

import MainDashboard from "@/shared/layouts/MainDashboard.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import Reviews from "../views/Reviews.vue";
import Category from "../views/category/Category.vue";
import AddCatagory from "../views/category/AddCatagory.vue";
import EditCategory from "../views/category/EditCategory.vue";
import Product from "../views/product/Product.vue";
import AddNewProduct from "../views/product/AddNewProduct.vue";
import EditProduct from "../views/product/EditProduct.vue";
import Units from "../views/product/units/Units.vue";
import AddUnit from "../views/product/units/AddUnit.vue";
import EditUnit from "../views/product/units/EditUnit.vue";
import Order from "../views/order/Order.vue";
import AddNewOrder from "../views/order/AddNewOrder.vue";
import EditOrder from "../views/order/EditOrder.vue";
import DetailsOrder from "../views/order/DetailsOrder.vue";
import Fatora from "../views/order/invoice/Fatora.vue";
import CustomInvoice from "../views/order/invoice/CustomInvoice.vue";
import Branches from "../views/storage/Branches.vue";
import AddNewBranch from "../views/storage/AddNewBranch.vue";
import EditBranch from "../views/storage/EditBranch.vue";
import DetailsBranch from "../views/storage/DetailsBranch.vue";
import Transfer from "../views/storage/transfer/Transfer.vue";
import AddTransfer from "../views/storage/transfer/AddTransfer.vue";
import StockAlerts from "../views/storage/Stockalerts/StockAlerts.vue";
import Purchases from "../views/purchase/Purchases.vue";
import AddPurchase from "../views/purchase/AddPurchase.vue";
import DetailsPurchase from "../views/purchase/DetailsPurchase.vue";
import Returns from "../views/returns/Returns.vue";
import AddPurchaseReturn from "../views/returns/AddPurchaseReturn.vue";
import DetailsReturn from "../views/returns/DetailsReturn.vue";


import Technical from "../views/users/technicalPages/Technical.vue";
import AddTechnical from "../views/users/technicalPages/AddTechnical.vue";
import Clint from "../views/users/clintePages/Clint.vue";
import AddClint from "../views/users/clintePages/AddClint.vue";
import deleteUser from "../views/users/shared/deleteUser.vue";


import MainProfile from "@/shared/layouts/MainProfile.vue";
import UserOrder from "../views/UserProfile/UserOrder.vue";
import UserFinancial from "../views/UserProfile/financial/UserFinancial.vue";
import AddFinancial from "../views/UserProfile/financial/AddFinancial.vue";
import TransactionDetails from "../views/UserProfile/financial/TransactionDetails.vue";
import EditTransaction from "../views/UserProfile/financial/EditTransaction.vue";
import UserProjects from "../views/UserProfile/UserProjects.vue";
import UserSetting from "../views/UserProfile/UserSetting.vue";

import Login from "../views/auth/Login.vue";

Vue.use(VueRouter);
const routes = [

  {
    path: "/",
    redirect: "/dashboard" // توجيه المسار الجذري إلى "/dashboard" 
  },
  {
    path: "/dashboard",
    component: MainDashboard,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "Product",
        name: "Product",
        component: Product,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "AddNewProduct",
        name: "AddNewProduct",
        component: AddNewProduct,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "addcatagory",
        name: "AddCatagory",
        component: AddCatagory,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "Category",
        name: "Category",
        component: Category,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "EditCategory/:id",
        name: "EditCategory",
        component: EditCategory,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "EditProduct/:id",
        name: "EditProduct",
        component: EditProduct,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "EditUnit/:unitId",
        name: "EditUnit",
        component: EditUnit,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "Units",
        name: "Units",
        component: Units,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "AddUnit",
        name: "AddUnit",
        component: AddUnit,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "Order",
        name: "Order",
        component: Order,
        // yes the componnent not common bit inside it another componnent with links and this compomment is comman
        meta: { requiresAuth: true, roles: ['admin'] ,layout: 'DashboardLayout' },
      },
      {
        path: "AddNewOrder",
        name: "AddNewOrder",
        component: AddNewOrder,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "EditOrder/:orderId",
        name: "EditOrder",
        component: EditOrder,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "DetailsOrder/:orderId",
        name: "DetailsOrder",
        component: DetailsOrder,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: 'Fatora/:orderId/:isCustom',
        name: "Fatora",
        component: Fatora,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "CustomInvoice/:orderId",
        name: "CustomInvoice",
        component: CustomInvoice,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "Branches",
        name: "Branches",
        component: Branches,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "AddNewBranch",
        name: "AddNewBranch",
        component: AddNewBranch,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "EditBranch/:branchId",
        name: "EditBranch",
        component: EditBranch,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "DetailsBranch/:branchId",
        name: "DetailsBranch",
        component: DetailsBranch,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "Transfer",
        name: "Transfer",
        component: Transfer,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "AddTransfer",
        name: "AddTransfer",
        component: AddTransfer,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "StockAlerts",
        name: "StockAlerts",
        component: StockAlerts,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "Purchases",
        name: "Purchases",
        component: Purchases,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
       {
        path: "AddPurchase",
        name: "AddPurchase",
        component: AddPurchase,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
      {
        path: "DetailsPurchases/:purchasesId",
        name: "DetailsPurchase",
        component: DetailsPurchase,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
      {
        path: "Returns",
        name: "Returns",
        component: Returns,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
      {
        path: "Returns/:purchaseId",
        name: "ReturnsWithId",
        component: Returns,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
      {
        path: "PurchaseReturn/:purchasesId",
        name: "PurchaseReturn",
        component: AddPurchaseReturn,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
      {
        path: "DetailsReturn/:returnId",
        name: "DetailsReturn",
        component: DetailsReturn,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
      {
        path: "TransactionDetails/:transactionId",
        name: "TransactionDetails",
        component: TransactionDetails,
        meta: { requiresAuth: true, roles: ['admin'],layout: 'DashboardLayout' },
      },
      {
        path: "Reviews",
        name: "Reviews",
        component: Reviews,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "users/technicalPages/Technical",
        name: "Technical",
        component: Technical,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "users/technical/AddTechnical",
        name: "AddTechnical",
        component: AddTechnical,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "users/clintPages/Clint",
        name: "Clint",
        component: Clint,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "users/clint/AddClint",
        name: "AddClint",
        component: AddClint,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "users/clint/deleteUser/:profileId",
        name: "deleteUser",
        component: deleteUser,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: "profile/:profileId",
        component: MainProfile,
        children: [
          {
            path: "",
            name: "AdminUserOrder",
            component: UserOrder,

            // why layout property? good qustion, 
            //this componnent inside more than layout and there are links inside this componnent , and ?
            // i just want when i go to any link from thats links i keep on the same layout which i am in  

            meta: { requiresAuth: true, roles: ['admin'],layout: 'profileInDashboardLayout' },
          },
          {
            path: "financial",
            name: "AdminUserFinancial",
            component: UserFinancial,
            meta: { requiresAuth: true, roles: ['admin'],layout: 'profileInDashboardLayout' },
          },
          {
            path: "AddFinancial",
            name: "AdminAddFinancial",
            component: AddFinancial,
            meta: { requiresAuth: true, roles: ['admin'],layout: 'profileInDashboardLayout' },
          },
          {
            path: "TransactionDetails/:transactionId",
            name: "AdminTransactionDetails",
            component: TransactionDetails,
            meta: { requiresAuth: true, roles: ['admin'],layout: 'profileInDashboardLayout' },
          },
          {
            path: "EditTransaction/:transactionId",
            name: "AdminEditTransaction",
            component: EditTransaction,
            meta: { requiresAuth: true, roles: ['admin'],layout: 'profileInDashboardLayout' },
          },
          {
            path: "projects",
            name: "AdminUserProjects",
            component: UserProjects,
            meta: { requiresAuth: true, roles: ['admin'],layout: 'profileInDashboardLayout' },
          },
          {
            path: "settings",
            name: "AdminUserSetting",
            component: UserSetting,
            meta: { requiresAuth: true, roles: ['admin'],layout: 'profileInDashboardLayout' },
          },
          {
            path: "DetailsOrder/:orderId",
            name: "AdminOrderDetails",
            component: DetailsOrder,
            meta: { requiresAuth: true, roles: ['admin'] ,layout: 'profileInDashboardLayout' },
          },
          {
            path: 'Fatora/:orderId/:isCustom',
            name: "AdminOrderFatora",
            component: Fatora,
            meta: { requiresAuth: true, roles: ['admin'],layout: 'profileInDashboardLayout'  },
          },
        ],
      },
     
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile/:profileId",
    component: MainProfile,
    children: [
      {
        path: "",
        name: "UserOrder",
        component: UserOrder,
        meta: { requiresAuth: true, roles: ['technical', 'clint', 'admin'] ,layout: 'profileOutDashboardLayout'},
      },
      {
        path: "financial",
        name: "UserFinancial",
        component: UserFinancial,
        meta: { requiresAuth: true, roles: ['technical', 'clint', 'admin'] ,layout: 'profileOutDashboardLayout'},
      },
      {
        path: "TransactionDetails/:transactionId",
        name: "UserTransactionDetails",
        component: TransactionDetails,
        meta: { requiresAuth: true, roles: ['technical', 'clint', 'admin'] ,layout: 'profileOutDashboardLayout'},
      },
      {
        path: "EditTransaction/:transactionId",
        name: "UserEditTransaction",
        component: EditTransaction,
        meta: { requiresAuth: true, roles: ['technical', 'clint', 'admin'] ,layout: 'profileOutDashboardLayout'},
      },
      {
        path: "projects",
        name: "UserProjects",
        component: UserProjects,
        meta: { requiresAuth: true, roles: ['technical', 'clint', 'admin'] ,layout: 'profileOutDashboardLayout'},
      },
      {
        path: "settings",
        name: "UserSetting",
        component: UserSetting,
        meta: { requiresAuth: true, roles: ['technical', 'clint', 'admin'] ,layout: 'profileOutDashboardLayout'},
      },
      {
        path: "DetailsOrder/:orderId",
        name: "OrderDetails",
        component: DetailsOrder,
        meta: { requiresAuth: true, roles: ['technical', 'clint', 'admin'] ,layout: 'profileOutDashboardLayout'},
      },
      {
        path: 'Fatora/:orderId/:isCustom',
        name: "OrderFatora",
        component: Fatora,
        meta: { requiresAuth: true, roles: ['technical', 'clint', 'admin'],layout: 'profileOutDashboardLayout' },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  const checkAuthState = () => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe(); // Stop listening for auth state changes after we get the current state
        resolve(user);
      });
    });
  };

  checkAuthState().then(async (user) => {
    let isUserExist = false;
    let role = null;

    if (user) {
      isUserExist = true;
      const userDoc = await db.collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        role = userDoc.data().role;
      }
    }

    const requiresAuth = to.meta.requiresAuth;
    const roles = to.meta.roles || [];

    console.log(isUserExist);
    console.log("finally", role);

    if (requiresAuth && !isUserExist) {
      next('/login');
    } else if (requiresAuth && roles.length && !roles.includes(role)) {
      console.log("you are not admin to go to this page ya ailk", role);
      next('/profile');
    } else {
      next();
    }
  });
});

export default router;

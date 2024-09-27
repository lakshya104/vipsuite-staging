/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import { BrandProductDetails } from '@/interfaces/brand';

// interface StoreState {
//   basket: BrandProductDetails[];
//   addProduct: (product: BrandProductDetails) => void;
//   removeProduct: (id: number) => void;
//   clearBasket: () => void;
// }

// export const useStore = create<StoreState>()(
//   persist(
//     (set) => ({
//       basket: [],
//       addProduct: (product) =>
//         set((state) => {
//           const existingProduct = state.basket.find((p) => p.id === product.id);

//           if (existingProduct) {
//             return {
//               basket: state.basket.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)),
//             };
//           }
//           const basketProducts = { basket: [...state.basket, { ...product, quantity: 1 }] };
//           return basketProducts;
//         }),
//       removeProduct: (id) =>
//         set((state) => ({
//           basket: state.basket.filter((product) => product.id !== id),
//         })),
//       clearBasket: () => set(() => ({ basket: [] })),
//     }),
//     {
//       name: 'product-storage',
//       storage: createJSONStorage(() => sessionStorage),
//     },
//   ),

// store/orderStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

interface OrderState {
  orderCount: number;
  increaseOrderCount: () => void;
  setOrderCount: (count: number) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orderCount: 0,
  increaseOrderCount: () => set((state) => ({ orderCount: state.orderCount + 1 })),
  setOrderCount: (count) => set({ orderCount: count }),
}));

interface LookbookOrderState {
  lookbookDescription: string;
  setLookbookDescription: (description: string) => void;
  clearLookbookDescription: () => void;
}

export const useLookbookOrder = create<LookbookOrderState>((set) => ({
  lookbookDescription: '',
  setLookbookDescription: (description) => set({ lookbookDescription: description }),
  clearLookbookDescription: () => set({ lookbookDescription: '' }),
}));

interface RequestOnlyState {
  requestProductId: number | null;
  clearRequestProductId: () => void;
  setRequestProductId: (count: number) => void;
}

export const useRequestOnlyStore = create<RequestOnlyState>((set) => ({
  requestProductId: 0,
  clearRequestProductId: () => set({ requestProductId: null }),
  setRequestProductId: (count) => set({ requestProductId: count }),
}));

interface UserInfoState {
  vipIdStore: any;
  tokenStore: string | null;
  userRoleStore: string | null;
  clearVipIdStore: () => void;
  setVipIdStore: (id: any) => void;
  clearTokenStore: () => void;
  setTokenStore: (token: string) => void;
  clearUserRoleStore: () => void;
  setUserRoleStore: (role: string) => void;
  clearAll: () => void;
}

export const useUserInfoStore = create<UserInfoState>()(
  persist(
    (set) => ({
      vipIdStore: null,
      setVipIdStore: (id) => set({ vipIdStore: id }),
      clearVipIdStore: () => set({ vipIdStore: null }),
      tokenStore: null,
      setTokenStore: (token) => set({ tokenStore: token }),
      clearTokenStore: () => set({ tokenStore: null }),
      userRoleStore: null,
      setUserRoleStore: (role) => set({ userRoleStore: role }),
      clearUserRoleStore: () => set({ userRoleStore: null }),
      clearAll: () => set({ vipIdStore: null, tokenStore: null, userRoleStore: null }),
    }),
    {
      name: 'user-info-storage',
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<UserInfoState>,
  ),
);

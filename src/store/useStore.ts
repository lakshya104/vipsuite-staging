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


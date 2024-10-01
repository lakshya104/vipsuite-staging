/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
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
  userEmailStore: string | null;
  clearVipIdStore: () => void;
  setVipIdStore: (id: any) => void;
  clearTokenStore: () => void;
  setTokenStore: (token: string) => void;
  clearUserRoleStore: () => void;
  setUserRoleStore: (role: string) => void;
  setUserEmailStore: (email: any) => void;
  clearUserEmailStore: () => void;
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
      userEmailStore: null,
      setUserEmailStore: (email) => set({ userEmailStore: email }),
      clearUserEmailStore: () => set({ userEmailStore: null }),
      clearAll: () => set({ vipIdStore: null, tokenStore: null, userRoleStore: null, userEmailStore: null }),
    }),
    {
      name: 'user-info-storage',
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<UserInfoState>,
  ),
);

interface EditVipIdState {
  editVipId: string | null;
  setVipId: (id: string) => void;
  clearVipId: () => void;
}

export const useEditVipIdStore = create<EditVipIdState>()(
  persist(
    (set) => ({
      editVipId: null,
      setVipId: (id) => set({ editVipId: id }),
      clearVipId: () => set({ editVipId: null }),
    }),
    {
      name: 'vip-id-storage',
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<EditVipIdState>,
  ),
);

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';
import { persistNSync } from 'persist-and-sync';
import { UserRole } from '@/helpers/enums';
import { Question } from '@/interfaces/events';

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

export const useLookbookOrder = create<LookbookOrderState>()(
  persist(
    (set) => ({
      lookbookDescription: '',
      setLookbookDescription: (description) => set({ lookbookDescription: description }),
      clearLookbookDescription: () => set({ lookbookDescription: '' }),
    }),
    {
      name: 'look-book-storage',
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<LookbookOrderState>,
  ),
);

interface RequestOnlyState {
  requestProductId: number | null;
  questions: Question[];
  requestESign: string | null;
  opportunityId: string;
  setOpportunityId: (id: string) => void;
  clearOpportunityId: () => void;
  setRequestESign: (sign: string) => void;
  clearRequestESign: () => void;
  setRequestProductId: (count: number) => void;
  clearRequestProductId: () => void;
  setQuestions: (questions: Question[]) => void;
  clearQuestions: () => void;
  clearAllRequestStore: () => void;
}

export const useRequestOnlyStore = create<RequestOnlyState>()(
  persist(
    (set) => ({
      requestProductId: 0,
      questions: [],
      requestESign: '',
      opportunityId: '',
      setOpportunityId: (id) => set({ opportunityId: id }),
      clearOpportunityId: () => set({ opportunityId: '' }),
      setRequestESign: (sign) => set({ requestESign: sign }),
      clearRequestESign: () => set({ requestESign: null }),
      setRequestProductId: (count) => set({ requestProductId: count }),
      clearRequestProductId: () => set({ requestProductId: null }),
      setQuestions: (questions) => set({ questions }),
      clearQuestions: () => set({ questions: [] }),
      clearAllRequestStore: () => set({ requestProductId: null, questions: [], requestESign: null, opportunityId: '' }),
    }),
    {
      name: 'request-only-storage',
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<RequestOnlyState>,
  ),
);

interface UserInfoState {
  vipIdStore: any;
  tokenStore: string | null;
  userRoleStore: UserRole | null;
  userEmailStore: string | null;
  clearVipIdStore: () => void;
  setVipIdStore: (id: any) => void;
  clearTokenStore: () => void;
  setTokenStore: (token: string) => void;
  clearUserRoleStore: () => void;
  setUserRoleStore: (role: UserRole) => void;
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

interface ProductImageStore {
  productImage: string | null;
  setProductImage: (image: string) => void;
  clearProductImage: () => void;
}

export const useProductImageStore = create<ProductImageStore>((set) => ({
  productImage: null,
  setProductImage: (image) => set({ productImage: image }),
  clearProductImage: () => set({ productImage: null }),
}));

interface InstaInfoState {
  instaInfo: { code: string; followers: string; picture: string; username: string; expires: number };
  setInstaInfo: (info: { code: string; followers: string; picture: string; username: string; expires: number }) => void;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  clearAll: () => void;
}

export const useInstaInfo = create<InstaInfoState>()(
  persistNSync(
    (set) => ({
      instaInfo: { code: '', followers: '', picture: '', username: '', expires: 0 },
      setInstaInfo: (info) => set({ instaInfo: info }),
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      clearAll: () => set({ instaInfo: { code: '', followers: '', picture: '', username: '', expires: 0 } }),
    }),
    {
      name: 'insta-info-storage',
    },
  ),
);

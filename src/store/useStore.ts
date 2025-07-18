/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';
import { persistNSync } from 'persist-and-sync';
import { UserRole } from '@/helpers/enums';
import { Question } from '@/interfaces/events';
import { AgentVipsPayload } from '@/interfaces';

interface MessageCountState {
  messageCount: number;
  setMessageCount: (count: number) => void;
}

export const useMessageCountStore = create<MessageCountState>()(
  persist(
    (set) => ({
      messageCount: 0,
      setMessageCount: (count) => set({ messageCount: count }),
    }),
    {
      name: 'order-store',
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<MessageCountState>,
  ),
);

interface LookbookOrderState {
  lookbookDescription: string;
  agentVipInfo: AgentVipsPayload | null;
  setAgentVipInfo: (info: AgentVipsPayload) => void;
  clearAgentVipInfo: () => void;
  setLookbookDescription: (description: string) => void;
  clearLookbookDescription: () => void;
  clearLookbookData: () => void;
}

export const useLookbookOrder = create<LookbookOrderState>()(
  persist(
    (set) => ({
      lookbookDescription: '',
      agentVipInfo: null,
      setAgentVipInfo: (info) => set({ agentVipInfo: info }),
      clearAgentVipInfo: () => set({ agentVipInfo: null }),
      setLookbookDescription: (description) => set({ lookbookDescription: description }),
      clearLookbookDescription: () => set({ lookbookDescription: '' }),
      clearLookbookData: () => set({ lookbookDescription: '', agentVipInfo: null }),
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
  agentVipInfo: AgentVipsPayload | null;
  setAgentVipInfo: (info: AgentVipsPayload) => void;
  clearAgentVipInfo: () => void;
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
      agentVipInfo: null,
      setAgentVipInfo: (info) => set({ agentVipInfo: info }),
      clearAgentVipInfo: () => set({ agentVipInfo: null }),
      setOpportunityId: (id) => set({ opportunityId: id }),
      clearOpportunityId: () => set({ opportunityId: '' }),
      setRequestESign: (sign) => set({ requestESign: sign }),
      clearRequestESign: () => set({ requestESign: null }),
      setRequestProductId: (count) => set({ requestProductId: count }),
      clearRequestProductId: () => set({ requestProductId: null }),
      setQuestions: (questions) => set({ questions }),
      clearQuestions: () => set({ questions: [] }),
      clearAllRequestStore: () =>
        set({ requestProductId: null, questions: [], requestESign: null, opportunityId: '', agentVipInfo: null }),
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
  shouldVipEdit: boolean;
  setShouldVipEdit: (bool: boolean) => void;
  setVipId: (id: string) => void;
  clearVipIdStore: () => void;
}

export const useEditVipIdStore = create<EditVipIdState>()(
  persist(
    (set) => ({
      editVipId: null,
      shouldVipEdit: false,
      setShouldVipEdit: (bool) => set({ shouldVipEdit: bool }),
      setVipId: (id) => set({ editVipId: id }),
      clearVipIdStore: () => set({ editVipId: null, shouldVipEdit: false }),
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
  instaInfo: { code: string; followers: string; picture: string; username: string; expires: number | null };
  setInstaInfo: (info: { code: string; followers: string; picture: string; username: string; expires: number }) => void;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  clearAll: () => void;
}

export const useInstaInfo = create<InstaInfoState>()(
  persistNSync(
    (set) => ({
      instaInfo: { code: '', followers: '', picture: '', username: '', expires: null },
      setInstaInfo: (info) => set({ instaInfo: info }),
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      clearAll: () => set({ instaInfo: { code: '', followers: '', picture: '', username: '', expires: null } }),
    }),
    {
      name: 'insta-info-storage',
    },
  ),
);

interface TiktokInfoState {
  tiktokInfo: {
    code: string;
    followers: string;
    picture: string;
    username: string;
    expires: number;
    refreshCode: string;
  };
  setTiktokInfo: (info: {
    code: string;
    followers: string;
    picture: string;
    username: string;
    expires: number;
    refreshCode: string;
  }) => void;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  clearAll: () => void;
}

export const useTiktokInfo = create<TiktokInfoState>()(
  persistNSync(
    (set) => ({
      tiktokInfo: { code: '', followers: '', picture: '', username: '', expires: 0, refreshCode: '' },
      setTiktokInfo: (info) => set({ tiktokInfo: info }),
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      clearAll: () =>
        set({ tiktokInfo: { code: '', followers: '', picture: '', username: '', expires: 0, refreshCode: '' } }),
    }),
    {
      name: 'tiktok-info-storage',
    },
  ),
);

interface UserStatusState {
  lastUpdateTime: number;
  setLastUpdateTime: (time: number) => void;
  shouldUpdate: (cooldownMinutes?: number) => boolean;
  clearAll: () => void;
}

export const useUserStatusStore = create<UserStatusState>()(
  persist(
    (set, get) => ({
      lastUpdateTime: 0,
      setLastUpdateTime: (time) => set({ lastUpdateTime: time }),
      shouldUpdate: (cooldownMinutes = 5) => {
        const now = Date.now();
        const lastUpdate = get().lastUpdateTime;
        return now - lastUpdate >= cooldownMinutes * 60 * 1000;
      },
      clearAll: () => {
        useUserStatusStore.persist.clearStorage();
      },
    }),
    {
      name: 'user-status-storage',
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<UserStatusState>,
  ),
);

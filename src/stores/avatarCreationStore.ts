/**
 * @file avatarCreationStore.ts
 * @description AvatarCreation 컴포넌트의 상태를 관리하는 Zustand 스토어입니다.
 *              새로운 기능추가 시 이 파일을 수정.
 * @version 2.0.0
 * @data 2025-08-23
 */

import { create } from "zustand";
/**
 * @description 선택된 아바타의 상세 정보
 * @property {string | null} description - 아바타에 대한 설명
 * @property {string | null} img - 아바타 이미지 URL
 * @property {number} activeIndex - 현재 활성화된 Swiper 슬라이드의 인덱스
 */
interface Avatar {
  id: number | null;
  description: string | null;
  img: string | null;
}

/**
 * @description 아바타 생성 플로우의 전체 상태
 */
interface AvatarCreationState {
  pickCreation: boolean;
  pickSelection: boolean;
  pickSelectionAvatar: Avatar;
  pickCreationAvatar: Avatar;
  pickAvatar: Avatar;
  avatarName: string;
  activeOption: "selection" | "creation" | "none";
  actions: {
    completeCreation: () => void;
    completeSelection: () => void;
    setPickSelectionAvatar: (avatar: Avatar) => void;
    setPickCreationAvatar: (avatar: Avatar) => void;
    setPickAvatar: (avatar: Avatar) => void;
    setAvatarName: (avatar: string) => void;
    setActiveOption: (option: "selection" | "creation" | "none") => void;
  };
}

const initialState: Omit<AvatarCreationState, "actions"> = {
  pickCreation: false,
  pickSelection: false,
  pickSelectionAvatar: {
    id: null,
    description: null,
    img: null,
  },
  pickCreationAvatar: {
    id: null,
    description: null,
    img: null,
  },
  pickAvatar: {
    id: null,
    description: null,
    img: null,
  },
  avatarName: "",
  activeOption: "none",
};

/**
 * @description 아바타 생성 및 선택 플로우의 상태를 관리하는 Zustand 스토어.
 */
export const useAvatarCreationStore = create<AvatarCreationState>(set => ({
  ...initialState,
  actions: {
    completeCreation: () => set({ pickCreation: true }),
    completeSelection: () => set({ pickSelection: true }),
    setPickSelectionAvatar: (avatar: Avatar) =>
      set({ pickSelectionAvatar: avatar }),

    setPickCreationAvatar: (avatar: Avatar) =>
      set({ pickCreationAvatar: avatar }),

    setPickAvatar: (avatar: Avatar) => set({ pickAvatar: avatar }),

    setAvatarName: (avatar: string) => set({ avatarName: avatar }),
    setActiveOption: option => set({ activeOption: option }),
  },
}));

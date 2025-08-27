// src/stores/useHomeSummaryStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  HomeSummaryPayload,
  GardenSummary,
  TodayMission,
  UserInfo,
} from "@/types/home/garden";

type HomeSummaryState = {
  user: UserInfo | null;
  gardens: GardenSummary[];
  missions: TodayMission[];

  // methods (actions 없이 최상위에)
  hydrate: (payload: HomeSummaryPayload) => void;
  updateGarden: (gardenId: number, patch: Partial<GardenSummary>) => void;
  setGardens: (gardens: GardenSummary[]) => void;

  setUser: (user: UserInfo) => void;
  updateMissions: (missions: TodayMission[]) => void;
  reset: () => void;
};

const initialState: Omit<
  HomeSummaryState,
  | "hydrate"
  | "updateGarden"
  | "setGardens"
  | "setUser"
  | "updateMissions"
  | "reset"
> = {
  user: null,
  gardens: [],
  missions: [],
};

export const useHomeSummaryStore = create<HomeSummaryState>()(
  persist(
    set => ({
      ...initialState,

      hydrate: payload =>
        set(() => ({
          user: payload.userInfo,
          gardens: payload.gardenSummaries,
          missions: payload.todayMissions,
        })),

      updateGarden: (gardenId, patch) =>
        set(state => ({
          gardens: state.gardens.map(g =>
            g.gardenId === gardenId ? { ...g, ...patch } : g
          ),
        })),

      setGardens: gardens => set(s => ({ ...s, gardens })),

      setUser: user => set(s => ({ ...s, user })),

      updateMissions: missions => set(s => ({ ...s, missions })),

      reset: () => set(() => ({ ...initialState })),
    }),
    {
      name: "home-summary",
      storage: createJSONStorage(() => localStorage),
      // 함수들은 저장하지 않고 상태만 저장
      partialize: state => ({
        user: state.user,
        gardens: state.gardens,
        missions: state.missions,
      }),
    }
  )
);

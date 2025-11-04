// src/stores/gameStore.js
import toast from "react-hot-toast";
import { createBaseStore } from "./templateStore";
import { useUpgradeStore } from "./upgradesStore";

const initialState = {
  gold: 0,
  goldPerClick: 1,
  goldPerSecond: 0,
  pickaxeLevel: 1,
  pickaxeCost: 10,
  minerLevel: 0,
  minerCost: 10,
  lastAction: Date.now(),
  goldUpgrades: []
};

const second = 1000;

const name = "goldStore";
export const version = 1;

function config(set, get) {
  return {
    ...initialState,
    mineGold: () => set((s) => ({ gold: s.gold + s.goldPerClick })),
    addGold: (x) => set((s) => ({ gold: s.gold + x })),
    upgradePickaxe: () => {
      const s = get();
      if (s.gold >= s.pickaxeCost) {
        s.deductGold(s.pickaxeCost);
        s.pickaxeLevelInc();
        s.pickaxeCostCalc();
      }
    },
    upgradeMiner: () => {
      const s = get();
      if (s.gold >= s.minerCost) {
        s.deductGold(s.minerCost);
        s.minerLevelInc();
        s.minerCostCalc();
      }
    },
    goldRateBase: () => get().minerLevel * 1,
    minerCostCalc: () => {
      const pow = 0.05;
      const base = 10;
      set((s) => ({
        minerCost: Math.trunc(base ** (1 + pow * s.minerLevel)),
      }));
    },
    pickaxeCostCalc: () => {
      const pow = 0.05;
      const base = 10;
      set((s) => ({
        pickaxeCost: Math.trunc(base ** (1 + pow * s.pickaxeLevel)),
      }));
    },
    minerLevelInc: () => set((s) => ({ minerLevel: s.minerLevel + 1 })),
    pickaxeLevelInc: () => set((s) => ({ pickaxeLevel: s.pickaxeLevel + 1 })),
    deductGold: (gold) => set((s) => ({ gold: s.gold - gold })),
    goldPerClickBase: () => get().pickaxeLevel * 1,
    tick: (delta) => {
      const s = get();
      const seconds = delta / second;
      const goldPerClick = s.goldPerClickBase();

      const {isUpgradeActivated} = useUpgradeStore.getState();

      const goldRateBase = s.goldRateBase();
      const goldRateMulti = isUpgradeActivated(0) ? 2 : 1;
      const goldRatePower = isUpgradeActivated(1) ? 2 : 1;
      const goldRate = (goldRateBase * goldRateMulti) ** goldRatePower;
      const goldIncrease = goldRate * seconds;

      set({
        gold: s.gold + goldIncrease,
        goldPerSecond: goldRate,
        goldPerClick: goldPerClick,
        lastAction: Date.now(),
      });
    },
    reset: () => set({ ...initialState }),
  };
}

export function migrate(persistedState, persistedVersion) {
  if (persistedVersion == 0) persistedVersion++;
  return persistedState;
}

function rehydrateHandler(state) {
  if (!state) return;
  const s = state.getState ? state.getState() : state;
  const now = Date.now();
  const elapsedSeconds = (now - s.lastAction) / second;
  const earned = s.goldRateBase() * elapsedSeconds;

  setTimeout(() => {
    if (elapsedSeconds > 0) {
      toast.success(
        `Offline for ${elapsedSeconds.toFixed(1)}s, earned ${earned.toFixed(1)} gold`
      );
    }
    s.pickaxeCostCalc(s.pickaxeLevel);
    s.minerCostCalc(s.minerLevel);
    s.addGold(earned);
  }, 0);
}

export function partialize(state) {
  return {
    gold: state.gold,
    minerLevel: state.minerLevel,
    pickaxeLevel: state.pickaxeLevel,
    lastAction: state.lastAction,
  };
}

export const useGoldStore = createBaseStore(
  config,
  name,
  version,
  rehydrateHandler,
  partialize,
  migrate
);

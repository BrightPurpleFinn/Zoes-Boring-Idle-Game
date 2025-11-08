import { createBaseStore } from "./templateStore.js";
import { newUpgrades } from "../utils/upgradeUtils.js";
import { useGoldStore } from "./goldStore.js";

const name = "upgradeStore";
export const version = 2;

const upgrades = newUpgrades([
  // name, description, [[currency, cost]], REDUNDNET?, index
  ["Big Upgrade no. One!", "Doubles your gold per second", [["Gold", 100]], ["gold"], 0],
  ["Other big upgrade", "Squares your gold per second", [["Gold", 1000]], ["gold"], 1]
]);

const initialState = {
  upgrades: upgrades,
  broughtUpgrades: []
};

function config(set, get) {
  return {
    ...initialState,
    buyUpgrade: (index) => {
      const s = get();


      const upgrade = s.upgrades.find((x) => x.index == index);
      if (!upgrade) {
        throw Error(`Unknown error occured`);
      }

      const { gold, updateGold } = useGoldStore.getState();

      if (!upgrade.cost.every((x) => {
        if (x[0] == "Gold") return gold >= x[1];
        throw Error(`Unknown Currency in upgrade ${upgrade.name}`);
      })) return;

      upgrade.cost.forEach((x) => {
        if (x[0] == "Gold") updateGold(- x[1]);
      });

      if (s.broughtUpgrades.includes(index)) {
        throw Error(`Upgrade ${index} already present in broughtUpgrades`);
      }
      set({
        broughtUpgrades: [...s.broughtUpgrades, index],
        availableUpgrades: s.availableUpgrades.filter(x => { return x != index; })
      });
    },
    getAvailableUpgrades: () => {
      const s = get();
      return s.upgrades.filter((x) => !s.broughtUpgrades.includes(x.index));
    },
    setAvailableUpgrades: (x) => set({ availableUpgrades: x }),
    isUpgradeActivated: (index) => {
      const s = get();
      return s.broughtUpgrades.includes(index);
    },
    reset: () => set({ ...initialState }),
  };
}

export function migrate(persistedState, persistedVersion) {
  if (persistedVersion == 1) persistedVersion++;
  return persistedState;
}

function rehydrateHandler(state) {
  if (!state) return;
  const s = state.getState ? state.getState() : state;
  const availableUpgrades = upgrades.map((x) => { return x.index; }).filter((x) => !s.broughtUpgrades.includes(x));
  s.setAvailableUpgrades(availableUpgrades);
}

export function partialize({ broughtUpgrades }) {
  return { broughtUpgrades };
}

export const useUpgradeStore = createBaseStore(
  config,
  name,
  version,
  rehydrateHandler,
  partialize,
  migrate
);

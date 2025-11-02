import { useGoldStore } from "../../../src/stores/goldStore";
import { encode } from "../../../src/utils/storageUtils";

// mock localStorage
beforeEach(() => {
  let store = {};

  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value.toString()),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
});

test("should persist gold amount to localStorage", () => {
  let store = useGoldStore.getState();

  expect(store.gold).toBe(0);
  store.mineGoldg();
  store = useGoldStore.getState(); // 👈 refresh snapshot
  expect(store.gold).toBeGreaterThan(0);

  // Simulate persist middleware writing to storage
  const savedData = localStorage.getItem("goldStore");
  expect(savedData).toBeTruthy();
});

test("should rehydrate store from localStorage", () => {
  // Simulate stored data (as persisted)
  const fakeData = {
    state: { gold: 123, pickaxeLevel: 2, minerLevel: 3, lastAction: Date.now() },
    version: 0,
  };

  localStorage.setItem("goldStore", encode((fakeData)));

  // Re-import store (simulate app reload)
  jest.resetModules();
  const { useGoldStore: reloadedStore } = require("../../../src/stores/goldStore");
  const newStore = reloadedStore.getState();

  for (const k of Object.keys(fakeData)) {
    expect(newStore[k]).toEqual(fakeData.state[k]);
  }
});

// src/stores/baseStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { base64Storage } from "../utils/storageUtils";

/**
 * A reusable factory for creating persisted Zustand stores.
 *
 * @param {Object} config - Zustand state/actions object (the body of your store)
 * @param {string} name - LocalStorage key name
 * @param {Function} [rehydrateHandler] - Optional function run on rehydrate
 * @param {Function} [partialize] - Optional function for selective persistence
 */
export function createBaseStore(config, name, version, rehydrateHandler, partialize, migrate) {
  return create(
    persist(
      (set, get) => ({
        ...config(set, get),
      }),
      {
        name,
        version: version,
        migrate: migrate,
        storage: base64Storage,
        partialize:
          partialize ||
          ((s) => {
            const copy = { ...s };
            delete copy.reset;
            return copy;
          }),
        onRehydrateStorage: () => (state, error) => {
          if (error) {
            console.error(`[${name}] Error rehydrating:`, error);
            return;
          }
          if (rehydrateHandler) rehydrateHandler(state);
        },
      }
    )
  );
}

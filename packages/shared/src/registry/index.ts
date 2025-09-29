import assert from "node:assert/strict";

/**
 * Implementation factory type
 */
export type ImplementationFactory<T> = () => T | Promise<T>;

/**
 * Public API types with improved get method
 */
export type Registry<T, Names extends string> = {
  register: (name: Names, factory: ImplementationFactory<T>) => Registry<T, Names>;

  // Overloaded get method that infers return types based on input.
  get: {
    <K extends Names>(name: K): Promise<T>;
    <K extends [Names, ...Names[]]>(...names: K): Promise<{ [P in keyof K]: T }>;
  };

  setup: (group?: string) => Promise<void>;
  addSetup: (group: string, callback: () => Promise<void>) => Registry<T, Names>;
};

/**
 * @name createRegistry
 * @description Creates a new registry instance with the provided implementations.
 * @returns A new registry instance.
 */
export function createRegistry<T, Names extends string = string>(): Registry<T, Names> {
  const implementations = new Map<Names, ImplementationFactory<T>>();
  const setupCallbacks = new Map<string, Array<() => Promise<void>>>();
  const setupPromises = new Map<string, Promise<void>>();

  const registry: Registry<T, Names> = {
    register(name, factory) {
      implementations.set(name, factory);
      return registry;
    },

    // Updated get method overload that supports tuple inference
    get: (async (...names: Names[]) => {
      await registry.setup();

      if (names?.length === 1) {
        const name = names[0];
        return await getImplementation(name as Names);
      }

      return await Promise.all(names.map((name) => getImplementation(name)));
    }) as Registry<T, Names>["get"],

    async setup(group?: string) {
      if (group) {
        if (!setupPromises.has(group)) {
          const callbacks = setupCallbacks.get(group) ?? [];
          const setupPromise = new Promise<void>((resolve, reject) => {
            Promise.all(callbacks.map((cb) => cb()))
              .then(() => resolve())
              .catch(reject);
          });

          setupPromises.set(group, setupPromise);
        }

        return setupPromises.get(group);
      }

      const groups = Array.from(setupCallbacks.keys());

      await Promise.all(groups.map((group) => registry.setup(group)));
    },

    addSetup(group, callback) {
      if (!setupCallbacks.has(group)) {
        setupCallbacks.set(group, []);
      }

      const callbacks = setupCallbacks.get(group);
      assert(callbacks, "Callbacks not found");

      callbacks.push(callback);
      return registry;
    },
  };

  async function getImplementation(name: Names) {
    const factory = implementations.get(name);

    if (!factory) {
      throw new Error(`Implementation "${name}" not found`);
    }

    const implementation = await factory();

    if (!implementation) {
      throw new Error(`Implementation "${name}" is not available`);
    }

    return implementation;
  }

  return registry;
}

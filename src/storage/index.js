import { AsyncStorage } from "./AsyncStorage/index";

/**
 @typedef {
   "USERS" | "COSTS"
} Keys
 */

export const storage = {
  /**
   * @param {Keys} key
   * @param {any} data
   */
  async setItem(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      // nothing
    }
  },

  /**
   * @param {Keys} key
   * @param {any} data
   */
  async getItem(key) {
    try {
      let content = await AsyncStorage.getItem(key);
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      // nothing
    }
    return;
  },

  /**
   * @param {Keys} key
   * @param {any} data
   */
  async removeItem(name) {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.log(error);
      // nothing
    }
  },
};

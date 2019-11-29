import { storage } from "./storage/index";
import { generate as generateId } from "shortid";

export class DataStore {
  /**
   * @param {string} name
   */
  constructor(name) {
    /**
     * @private
     * @type {string}
     */
    this._name = name;
    /**
     * @private
     * @type {object[]}
     */
    this._entities = [];
  }

  /**
   * @param {object} obj
   * @returns {string}
   */
  async create(obj) {
    const entity = { id: generateId(), ...obj };
    this._entities.push(entity);
    await storage.setItem(this._name, this._entities);
    return entity.id;
  }

  async delete(id) {
    const index = findIndex(this._entities, id, this._name);
    this._entities.splice(index, 1);
    await storage.setItem(this._name, this._entities);
  }

  /**
   * @param {string} id
   */
  get(id) {
    return this._entities.find(item => item.id === id);
  }

  /**
   * @returns {[]}
   */
  list() {
    return this._entities;
  }

  async update(entity) {
    const index = findIndex(this._entities, entity.id, this._name);
    this._entities[index] = entity;
    await storage.setItem(this._name, this._entities);
  }

  async load() {
    this._entities = (await storage.getItem(this._name)) || [];
  }
}

/**
 * @param {string} id
 */
function findIndex(entities, id, name) {
  const index = entities.findIndex(current => current.id === id);
  if (index === -1) {
    throw new Error(`No ${name} found with id "${id}"`);
  }
  return index;
}

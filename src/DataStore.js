import { storage } from "./storage/index";
import { generate as generateId } from "shortid";

export class DataStore {
  name = "";
  entities = [];

  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * @param {object} obj
   * @returns {string}
   */
  async create(obj) {
    const entity = { id: generateId(), ...obj };
    this.entities.push(entity);
    await storage.setItem(this.name, this.entities);
    return entity.id;
  }

  async delete(id) {
    const index = findIndex(this.entities, id, this.name);
    this.entities.splice(index, 1);
    await storage.setItem(this.name, this.entities);
  }

  /**
   * @param {string} id
   */
  get(id) {
    return this.entities.find(item => item.id === id);
  }

  /**
   * @returns {[]}
   */
  list() {
    return this.entities;
  }

  async update(entity) {
    const index = findIndex(this.entities, entity.id, this.name);
    this.entities[index] = entity;
    await storage.setItem(this.name, this.entities);
  }

  async load() {
    this.entities = await storage.getItem(this.name);
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

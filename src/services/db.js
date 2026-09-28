// src/services/db.js
// Service layer sederhana - mudah diganti ke REST API/Supabase nanti

const PREFIX = 'jmu_';

// Generic CRUD untuk localStorage
function getCollection(key) {
  try {
    const data = localStorage.getItem(PREFIX + key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setCollection(key, data) {
  localStorage.setItem(PREFIX + key, JSON.stringify(data));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Generic service factory
export function createService(collectionName) {
  return {
    getAll: () => getCollection(collectionName),

    getById: (id) => {
      const items = getCollection(collectionName);
      return items.find((item) => item.id === id) || null;
    },

    create: (data) => {
      const items = getCollection(collectionName);
      const newItem = { ...data, id: generateId(), createdAt: new Date().toISOString() };
      items.push(newItem);
      setCollection(collectionName, items);
      return newItem;
    },

    update: (id, data) => {
      const items = getCollection(collectionName);
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) throw new Error('Item not found');
      items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
      setCollection(collectionName, items);
      return items[index];
    },

    remove: (id) => {
      const items = getCollection(collectionName);
      const filtered = items.filter((item) => item.id !== id);
      setCollection(collectionName, filtered);
      return true;
    },

    findBy: (key, value) => {
      const items = getCollection(collectionName);
      return items.filter((item) => item[key] === value);
    },

    findOneBy: (key, value) => {
      const items = getCollection(collectionName);
      return items.find((item) => item[key] === value) || null;
    },
  };
}

export const userService = createService('users');
export const sessionService = createService('sessions');

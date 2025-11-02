export const encode = (data) => {
  try {
    return btoa(JSON.stringify(data));
  } catch (err) {
    console.error("Error encoding data:", err);
    return null;
  }
};

export const decode = (data) => {
  try {
    return JSON.parse(atob(data));
  } catch (err) {
    console.error("Error decoding data:", err);
    return null;
  }
};

export const base64Storage = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? decode(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, encode(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

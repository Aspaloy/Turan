export const api = {
  async get(path) {
    const baseUrl = "http://127.0.0.1:8000";
    const res = await fetch(baseUrl + path);
    return await res.json();
  }
};

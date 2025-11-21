// const API_URL = "http://localhost:5000/api/links";
const API_URL = "https://tinylink-backend-oohv.onrender.com/api/links";

export async function getLinks() {
  return fetch(API_URL).then(res => res.json());
}

export async function createLink(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export async function deleteLink(code) {
  return fetch(`${API_URL}/${code}`, { method: "DELETE" });
}

export async function getStats(code) {
  return fetch(`${API_URL}/${code}`).then(res => res.json());
}

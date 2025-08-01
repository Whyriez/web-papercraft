export async function fetchMenus() {
  const res = await fetch("/api/menus");
  const json = await res.json();
  return json.data;
}

export async function createMenu(data) {
  const res = await fetch("/api/menus", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateMenu(id, data) {
  const res = await fetch(`/api/menus/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteMenu(id) {
  const res = await fetch(`/api/menus/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

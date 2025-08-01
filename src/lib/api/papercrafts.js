// Sesuaikan URL jika perlu
const base = "/api/papercraft";

export const fetchPapercrafts = async () => {
  const res = await fetch(base);
  const { data } = await res.json();
  return data;
};

export const createPapercraft = async (payload) => {
  const res = await fetch(base, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const updatePapercraft = async (id, payload) => {
  const res = await fetch(`${base}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const deletePapercraft = async (id) => {
  await fetch(`${base}/${id}`, { method: "DELETE" });
};

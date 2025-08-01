"use client";
import { useEffect, useState } from "react";
import PapercraftForm from "@/components/papercraft/PapercraftForm";
import PapercraftTable from "@/components/papercraft/PapercraftTable";
import {
  fetchPapercrafts,
  createPapercraft,
  updatePapercraft,
  deletePapercraft,
} from "@/lib/api/papercrafts";
import {
  fetchMenus,
} from "@/lib/api/menus";

export default function PapercraftPage() {
  const [papercrafts, setPapercrafts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [menus, setMenus] = useState([]);

  const loadData = async () => {
    const [crafts, menuList] = await Promise.all([
      fetchPapercrafts(),
      fetchMenus(),
    ]);
    setPapercrafts(crafts);
    setMenus(menuList);

    console.log("asas", menuList)
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data) => {
    if (data.id) await updatePapercraft(data.id, data);
    else await createPapercraft(data);
    setEditing(null);
    await loadData();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this papercraft?")) {
      await deletePapercraft(id);
      await loadData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Papercraft Management</h1>

      <PapercraftForm
        onSubmit={handleSubmit}
        initialData={editing}
        menuOptions={menus}
        onCancel={() => setEditing(null)}
      />

      <div className="mt-8">
        <PapercraftTable
          papercrafts={papercrafts}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

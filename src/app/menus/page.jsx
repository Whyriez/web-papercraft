"use client";
import { useEffect, useState } from "react";
import { fetchMenus, createMenu, updateMenu, deleteMenu } from "@/lib/api/menus";
import MenuForm from "@/components/menu/MenuForm";
import MenuTable from "@/components/menu/MenuTable";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await fetchMenus();
    const withParentName = data.map((menu) => {
      const parent = data.find((p) => p.id === menu.parent_id);
      return { ...menu, parent_name: parent?.name || null };
    });
    setMenus(withParentName);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (data) => {
    if (data.id) await updateMenu(data.id, data);
    else await createMenu(data);
    setEditing(null);
    await load();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this menu?")) {
      await deleteMenu(id);
      await load();
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>

      <MenuForm
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
        initialData={editing}
        parentOptions={menus}
      />

      <div className="mt-6">
        <MenuTable menus={menus} onEdit={setEditing} onDelete={handleDelete} />
      </div>
    </div>
  );
}

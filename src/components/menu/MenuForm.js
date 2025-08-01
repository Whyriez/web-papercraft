"use client";
import { useState, useEffect } from "react";

export default function MenuForm({ onSubmit, onCancel, initialData, parentOptions }) {
  const [form, setForm] = useState({ name: "", parent_id: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const buildTree = (data) => {
    const map = {};
    const roots = [];

    data.forEach((item) => (map[item.id] = { ...item, children: [] }));
    data.forEach((item) => {
      if (item.parent_id) {
        map[item.parent_id]?.children.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });

    return roots;
  };

  const tree = buildTree(parentOptions);

  const filteredTree = search
    ? tree.filter((node) =>
        node.name.toLowerCase().includes(search.toLowerCase())
      )
    : tree;

  const renderOptions = (nodes, level = 0) =>
    nodes.flatMap((node) => [
      <button
        key={node.id}
        type="button"
        className={`block w-full text-left px-3 py-1 rounded-md transition-colors ${
          form.parent_id === node.id
            ? "bg-primary text-white font-semibold"
            : "hover:bg-neutral/50"
        }`}
        onClick={() => setForm({ ...form, parent_id: node.id })}
      >
        <span
          className="inline-block"
          style={{ paddingLeft: `${level * 16}px` }}
        >
          {"—".repeat(level) + " " + node.name}
        </span>
      </button>,
      ...renderOptions(node.children || [], level + 1),
    ]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-6 p-6 bg-white rounded-xl shadow-lg"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Menu Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter menu name..."
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Parent Menu
        </label>

        <input
          type="text"
          placeholder="Search root menu..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-sm divide-y divide-gray-100">
          <button
            type="button"
            onClick={() => setForm({ ...form, parent_id: null })}
            className={`w-full text-left px-3 py-2 transition-colors ${
              !form.parent_id
                ? "bg-primary text-white font-semibold"
                : "hover:bg-neutral/50"
            }`}
          >
            — No Parent —
          </button>
          {renderOptions(filteredTree)}
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <button
          type="submit"
          className="flex-1 py-3 rounded-md bg-primary text-white font-bold hover:bg-primary/90 transition"
        >
          {form.id ? "Update Menu" : "Create Menu"}
        </button>

        {form.id && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: "", parent_id: "" }); // reset form
              onCancel?.(); // optional external reset
            }}
            className="flex-1 py-3 rounded-md bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

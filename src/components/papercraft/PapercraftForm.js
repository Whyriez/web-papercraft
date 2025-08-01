"use client";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

export default function PapercraftForm({
  onSubmit,
  initialData,
  menuOptions,
  onCancel,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "",
    dimensions: "",
    time: "",
    paper: "",
    pages: "",
    category_id: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        title: "",
        description: "",
        difficulty: "",
        dimensions: "",
        time: "",
        paper: "",
        pages: "",
        category_id: "",
        images: [],
      });
    }
  }, [initialData]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file.name);

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    const res = await fetch("/api/papercraft/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setUploading(false);
    setSelectedFile(null);

    if (result.url) {
      setForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), result.url],
      }));
    }
  };

  const renderMenuOptions = (data, parentId = null, level = 0) => {
    return data
      .filter((item) => item.parent_id === parentId)
      .sort((a, b) => a.name.localeCompare(b.name))
      .flatMap((item) => [
        <option key={item.id} value={item.id}>
          {"— ".repeat(level) + item.name}
        </option>,
        ...renderMenuOptions(data, item.id, level + 1),
      ]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="w-full max-w-5xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {form.id ? "✏️ Edit Papercraft" : "🎨 Create New Papercraft"}
      </h2>

      {[
        ["title", "Title"],
        ["dimensions", "Dimensions"],
        ["time", "Assembly Time"],
        ["paper", "Paper Type"],
        ["pages", "Pages"],
      ].map(([field, label]) => (
        <div key={field}>
          <label className="block mb-1 font-medium text-gray-700">
            {label}
          </label>
          <input
            type="text"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        </div>
      ))}

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
          rows={4}
          placeholder="Describe the papercraft..."
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Difficulty
        </label>
        <select
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        >
          <option value="">-- Select Difficulty --</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Category</label>
        <select
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
          value={form.category_id || ""}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">-- No Category --</option>
          {renderMenuOptions(menuOptions)}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Upload Image
        </label>
        <input type="file" onChange={handleImageUpload} />
        {selectedFile && (
          <p className="text-sm text-gray-500">📁 {selectedFile}</p>
        )}
        {uploading && <p className="text-sm text-blue-500">Uploading...</p>}

        <div className="flex gap-2 mt-4 flex-wrap">
          {(form.images || []).map((url, i) => (
            <div key={i} className="relative w-24 h-24">
              <img
                src={url}
                alt={`Image ${i}`}
                className="w-full h-full object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={async () => {
                  const updated = [...form.images];
                  const removed = updated.splice(i, 1)[0];
                  const path = removed.split("/storage/v1/object/public/")[1];

                  await fetch("/api/papercraft/delete-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ path }),
                  });

                  setForm((prev) => ({ ...prev, images: updated }));
                }}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-700"
                title="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex gap-3 justify-end">
        {form.id && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-primary/90 transition"
        >
          {form.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}

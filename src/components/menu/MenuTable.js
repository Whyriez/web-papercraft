export default function MenuTable({ menus, onEdit, onDelete }) {
  const renderRow = (menu, level = 0) => {
    return (
      <tr
        key={menu.id}
        className="border-b hover:bg-gray-50 transition group"
      >
        <td
          className="px-4 py-3 font-medium text-gray-800"
          style={{ paddingLeft: `${level * 20 + 16}px` }}
        >
          {menu.name}
        </td>
        <td className="px-4 py-3 text-gray-500">
          {menu.parent_name || <span className="italic text-gray-400">None</span>}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(menu)}
              className="px-3 py-1 text-xs font-semibold rounded bg-yellow-400 text-white hover:bg-yellow-500 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(menu.id)}
              className="px-3 py-1 text-xs font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const renderTree = (data, parentId = null, level = 0) => {
    return data
      .filter((item) => item.parent_id === parentId)
      .sort((a, b) => a.name.localeCompare(b.name))
      .flatMap((item) => [
        renderRow(item, level),
        ...renderTree(data, item.id, level + 1),
      ]);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Parent</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>{renderTree(menus)}</tbody>
      </table>
    </div>
  );
}

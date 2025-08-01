export default function PapercraftTable({ papercrafts, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Difficulty</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Pages</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {papercrafts.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.difficulty}</td>
              <td className="p-2">{item.time}</td>
              <td className="p-2">{item.pages}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="px-2 py-1 text-xs bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {papercrafts.length === 0 && (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan={5}>
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

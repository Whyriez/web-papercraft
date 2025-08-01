"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PapercraftGrid() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();

  const category_id = searchParams.get("category_id");
  const difficultyParam = searchParams.get("difficulty");

  const limit = 6;

  // Debounce pencarian
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  // Reset page saat filter/search berubah
  useEffect(() => {
    setPage(1);
  }, [category_id, debouncedSearch]);

  useEffect(() => {
    const fetchData = async () => {
      let query = [`limit=${limit}`, `offset=${(page - 1) * limit}`];
      if (category_id) query.push(`category_id=${category_id}`);
      if (debouncedSearch)
        query.push(`search=${encodeURIComponent(debouncedSearch)}`);
      if (difficultyParam)
        query.push(`difficulty=${encodeURIComponent(difficultyParam)}`);

      const res = await fetch(`/api/papercraft?${query.join("&")}`);
      const json = await res.json();
      setItems(json.data || []);
      setTotalPages(Math.ceil((json.total || 0) / limit));
    };
    fetchData();
  }, [category_id, debouncedSearch, difficultyParam, page]);

  return (
    <div id="homepage">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Featured Papercrafts</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search crafts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            <p className="text-lg font-semibold">😕 No papercrafts found.</p>
            <p className="text-sm">Try adjusting your filter or search term.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="card paper-texture rounded-xl overflow-hidden cursor-pointer"
              onClick={() => router.push(`/detail/${item.id}`)}
            >
              <div className="relative h-48 bg-neutral overflow-hidden">
                {item.images?.[0] ? (
                  <img
                    src={item.images[0]}
                    className="w-full h-full object-cover"
                    alt={item.title}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {item.description?.slice(0, 60)}...
                </p>
                <div className="flex gap-2 items-center">
                  <span className="text-xs bg-neutral rounded-full px-3 py-1">
                    {item.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

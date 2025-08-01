"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const activeId = searchParams.get("category_id");
    if (activeId) {
      setActiveMenuId(activeId);
    }

    fetch("/api/menus")
      .then((res) => res.json())
      .then(({ data }) => {
        const tree = buildMenuTree(data);
        setCategories(tree);
      });
  }, [searchParams]);

  function buildMenuTree(data) {
    const map = {};
    const roots = [];

    data.forEach((item) => {
      map[item.id] = { ...item, submenus: [] };
    });

    data.forEach((item) => {
      if (item.parent_id) {
        map[item.parent_id]?.submenus.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });

    return roots;
  }

  const [selectedDifficulties, setSelectedDifficulties] = useState(() => {
    const param = searchParams.get("difficulty");
    return param ? param.split(",") : [];
  });

  const handleDifficultyChange = (level) => {
    let updated;
    if (selectedDifficulties.includes(level)) {
      updated = selectedDifficulties.filter((l) => l !== level);
    } else {
      updated = [...selectedDifficulties, level];
    }

    setSelectedDifficulties(updated);

    const query = new URLSearchParams(window.location.search);
    if (updated.length > 0) {
      query.set("difficulty", updated.join(","));
    } else {
      query.delete("difficulty");
    }

    router.push(`/?${query.toString()}`);
  };

  return (
    <aside className="w-full md:w-64 mb-8 md:mb-0 md:mr-8">
      <div className="paper-texture rounded-xl p-5">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          Categories
        </h2>

        <ul className="space-y-2">
          {categories.map((category, i) => (
            <li key={category.id}>
              <button
                onClick={() => setOpenCategory(openCategory === i ? null : i)}
                className="flex items-center w-full p-2 rounded-lg bg-neutral/40 font-semibold hover:bg-neutral/60 transition-colors"
              >
                <span>{category.name}</span>
                <svg
                  className={`ml-auto w-4 h-4 transition-transform ${
                    openCategory === i ? "rotate-90" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {openCategory === i && (
                <ul className="pl-6 mt-2 space-y-1 text-sm text-gray-600">
                  {category.submenus.map((submenu, j) => {
                    const isChildActive = submenu.submenus.some(
                      (child) => child.id === activeMenuId
                    );

                    return (
                      <li key={submenu.id}>
                        <button
                          onClick={() =>
                            setOpenSubmenu(
                              openSubmenu === `${i}-${j}` ? null : `${i}-${j}`
                            )
                          }
                          className={`flex items-center w-full text-left py-1 px-2 rounded transition-colors ${
                            isChildActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "hover:bg-neutral text-gray-700"
                          }`}
                        >
                          <span>{submenu.name}</span>
                          {submenu.submenus.length > 0 && (
                            <svg
                              className={`ml-auto w-4 h-4 transition-transform ${
                                openSubmenu === `${i}-${j}`
                                  ? "rotate-90"
                                  : "rotate-0"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>

                        {submenu.submenus.length > 0 &&
                          openSubmenu === `${i}-${j}` && (
                            <ul className="pl-4 space-y-1">
                              {submenu.submenus.map((child) => {
                                const isActive = activeMenuId === child.id;
                                return (
                                  <li key={child.id}>
                                    <button
                                      onClick={() => {
                                        setActiveMenuId(child.id);
                                        router.push(
                                          `/?category_id=${child.id}`
                                        );
                                      }}
                                      className={`block w-full text-left px-2 py-1 rounded transition-colors ${
                                        isActive
                                          ? "bg-primary text-white font-semibold"
                                          : "hover:bg-neutral text-gray-700"
                                      }`}
                                    >
                                      {child.name}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Difficulty
        </h2>
        {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
          <label
            key={i}
            className="flex items-center p-2 rounded-lg hover:bg-neutral cursor-pointer"
          >
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-primary rounded"
              checked={selectedDifficulties.includes(level)}
              onChange={() => handleDifficultyChange(level)}
            />
            <span className="ml-2">{level}</span>
          </label>
        ))}
      </div>
    </aside>
  );
}

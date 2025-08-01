// File: src/components/Navbar.js
"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              className="scissors-icon w-8 h-8 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-dark flex items-center">
              Paper<span className="text-primary">Wonder</span>
              <span className="font-handwritten text-accent ml-1">Crafts</span>
            </h1>
          </div>

          <div className="hidden md:flex space-x-8">
            {['Home'].map((item, i) => (
              <a key={i} href="/" className="font-medium hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden flex items-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pt-4 pb-2">
            {['Home'].map((item, i) => (
              <a key={i} href="/" className="block py-2 hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// File: src/components/DetailPage.js
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [item, setItem] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/papercraft/${id}`);
      const result = await res.json();

      if (res.ok) {
        setItem(result.data);
      } else {
        console.error("Error loading item:", result.error);
      }
    };

    if (id) fetchItem();
  }, [id]);

  if (!item) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="paper-texture rounded-xl p-6">
      <button
        onClick={() => history.back()}
        className="mb-6 flex items-center text-dark hover:text-primary transition-colors"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to all papercrafts
      </button>
      <div className="flex flex-col lg:flex-row">
        {/* Left: Preview Image */}
        <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-6">
          <div className="relative rounded-lg overflow-hidden bg-neutral h-80 flex items-center justify-center">
            <img
              src={item.images[selectedImage]}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {item.images.map((url, index) => (
              <div
                key={index}
                className={`rounded overflow-hidden border-2 transition-colors cursor-pointer ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-primary"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover aspect-square w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:w-1/2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <span className="difficulty-badge bg-green-100 text-green-600 px-3 py-1 rounded-full border border-green-200">
              {item.difficulty}
            </span>
          </div>

          <p className="text-gray-600 mt-2">{item.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-neutral rounded-lg p-3">
              <span className="text-sm text-gray-500">Dimensions</span>
              <p className="font-medium">{item.dimensions}</p>
            </div>
            <div className="bg-neutral rounded-lg p-3">
              <span className="text-sm text-gray-500">Assembly Time</span>
              <p className="font-medium">{item.time}</p>
            </div>
            <div className="bg-neutral rounded-lg p-3">
              <span className="text-sm text-gray-500">Paper Type</span>
              <p className="font-medium">{item.paper}</p>
            </div>
            <div className="bg-neutral rounded-lg p-3">
              <span className="text-sm text-gray-500">Pages</span>
              <p className="font-medium">{item.pages}</p>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-primary hover:bg-pink-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF Tutorial
            </button>

            <div className="flex mt-3 space-x-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("📋 Link copied to clipboard!");
                }}
                className="flex-1 border border-gray-200 hover:bg-neutral font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Assembly Instructions dan Related Models bisa ditambahkan di bawah sini jika diinginkan */}
    </div>
  );
}

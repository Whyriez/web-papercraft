"use client";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import PapercraftGrid from "@/components/PapercraftGrid";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function HomePage() {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1">
          <Suspense fallback={<div>Loading crafts...</div>}>
            <PapercraftGrid />
          </Suspense>
        </main>
      </div>
      <Footer />
    </>
  );
}

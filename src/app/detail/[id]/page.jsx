// File: src/app/detail/[id]/page.js
"use client";
import { useSearchParams } from "next/navigation";
import DetailPage from "@/components/DetailPage";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function DetailRoutePage() {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1">
          <DetailPage id={id} />
        </main>
      </div>
      <Footer />
    </>
  );
}

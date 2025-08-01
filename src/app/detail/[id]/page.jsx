// File: src/app/detail/[id]/page.js
"use client";
import { use } from "react";
import DetailPage from "@/components/DetailPage";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function DetailRoutePage(props) {
  const { id } = use(props.params);

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

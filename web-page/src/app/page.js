"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, QrCodeUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        `http://localhost:8000/generate-qr/?url=${url}`
      );
      QrCodeUrl(response.data.qr_code_url);
    } catch (error) {
      console.log("Error generating QR code:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="m-0 leading-tight text-4xl text-center">
        QR Code Generator
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL like https://example.com"
          className="p-2 rounded border-none mt-5 w-72 text-gray-900"
        />
        <button
          type="submit"
          className="p-2 mt-5 rounded bg-blue-500 text-white cursor-pointer"
        >
          Generate QR Code
        </button>
      </form>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="mt-5" />}
    </div>
  );
}

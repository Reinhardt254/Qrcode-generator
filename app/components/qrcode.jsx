"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

const QRGenerator = () => {
  const [qrData, setQrData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hydrate, setHydrate] = useState(true);
  const canvasRef = useRef(null);

  const generateQRCode = async () => {
    if (!qrData) {
      alert("Please enter valid data.");
      return;
    }

    try {
      // Generate QR code on the canvas
      const canvas = canvasRef.current;
      await QRCode.toCanvas(canvas, qrData, {
        width: 250,
        margin: 1,
      });

      // Generate a PNG image URL for download
      const imageUrl = canvas.toDataURL("image/png");
      setImageUrl(imageUrl);
    } catch (err) {
      console.error("Failed to generate QR Code:", err);
    }
  };

  useEffect(() => {
    setHydrate(false);
  }, []);

  if (hydrate) {
    return null;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="pb-10 font-bold text-center text-white text-7xl max-sm:text-4xl">
        QR Code Generator
      </h1>

      <div className="flex items-center justify-center max-sm:flex-col">
        <input
          type="text"
          placeholder="Enter text or URL"
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
          className="px-5 py-3 mr-2 text-black rounded-3xl w-80"
        />
        <br />
        <button
          onClick={generateQRCode}
          className="px-5 py-3 text-lg text-white transition border-2 border-col primary rounded-3xl hover:bg-white hover:text-black"
        >
          Generate QR Code
        </button>
      </div>

      <div className="flex flex-col justify-center pt-10 flex-items-center">
        <canvas
          ref={canvasRef}
          style={{ display: imageUrl ? "block" : "none" }}
        ></canvas>
        {imageUrl && (
          <a
            href={imageUrl}
            download={`${qrData.replace(/[^a-zA-Z0-9]/g, "_")}`}
            style={{
              display: "inline-block",
              marginTop: "20px",
              textDecoration: "none",
              color: "white",
              textAlign: "center",
              background: "blue",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            Download QR Code
          </a>
        )}
      </div>
    </section>
  );
};

export default QRGenerator;

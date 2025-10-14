import React from "react";
import VectorBL from "../assets/VectorBL.svg";
import VectorBR from "../assets/VectorBR.svg";
import VectorTL from "../assets/VectorTL.svg";
import VectorTR from "../assets/VectorTR.svg";
import Vector from "../assets/Vector.svg";

// Horizontal floating blobs
const blobsX = [
  {
    src: VectorTL,
    top: "7.5rem",
    left: "20rem",
    size: "w-48 h-48",
    delay: "-10s",
    color: "bg-blue-500/30",
  },
  {
    src: VectorBL,
    top: "5rem",
    left: "10rem",
    size: "w-32 h-32",
    delay: "-12s",
    color: "bg-blue-500",
  },
  {
    src: Vector,
    top: "15rem",
    right: "17.5rem",
    size: "w-64 h-64",
    delay: "-4s",
  },
  {
    src: Vector,
    bottom: "17.5rem",
    left: "5rem",
    size: "w-56 h-56",
    delay: "-6s",
  },
  {
    src: VectorTL,
    top: "2.5rem",
    right: "3.75rem",
    size: "w-40 h-40",
    delay: "-8s",
    color: "bg-green-500",
  },
  {
    src: Vector,
    bottom: "5rem",
    left: "10rem",
    size: "w-32 h-32",
    delay: "-11s",
  },
];

// Vertical floating blobs
const blobsY = [
  {
    src: VectorBL,
    top: "2.5rem",
    left: "3.75rem",
    size: "w-40 h-40",
    delay: "0s",
    color: "bg-blue-500/30",
  },
  {
    src: VectorBR,
    top: "15rem",
    left: "17.5rem",
    size: "w-64 h-64",
    delay: "-5s",
    color: "bg-blue-50",
  },
  {
    src: VectorTR,
    top: "17.5rem",
    left: "5rem",
    size: "w-56 h-56",
    delay: "-7s",
    color: "bg-blue-500/30",
  },
  {
    src: VectorBR,
    bottom: "2.5rem",
    right: "3.75rem",
    size: "w-48 h-48",
    delay: "-3s",
    color: "bg-blue-500/30",
  },

  {
    src: Vector,
    bottom: "7.5rem",
    left: "20rem",
    size: "w-48 h-48",
    delay: "-9s",
  },
];

const FloatingBlobs = ({ children }) => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-100">
      {/* Horizontal floating blobs */}
      {blobsX.map((blob, idx) => (
        <img
          key={`x-${idx}`}
          src={blob.src}
          alt={`blob-x-${idx}`}
          className={`absolute ${
            blob.size
          } rounded-full blur-3xl animate-floatX ${blob.color ?? ""}`}
          style={{
            top: blob.top,
            left: blob.left,
            bottom: blob.bottom,
            right: blob.right,
            animationDelay: blob.delay,
          }}
        />
      ))}

      {/* Vertical floating blobs */}
      {blobsY.map((blob, idx) => (
        <img
          key={`y-${idx}`}
          src={blob.src}
          alt={`blob-y-${idx}`}
          className={`absolute ${
            blob.size
          } rounded-full blur-3xl animate-floatY ${blob.color ?? ""}`}
          style={{
            top: blob.top,
            left: blob.left,
            bottom: blob.bottom,
            right: blob.right,
            animationDelay: blob.delay,
          }}
        />
      ))}

      {/* Render page content on top of blobs */}
      {children && (
        <div className="relative z-10 w-full h-full">{children}</div>
      )}
    </div>
  );
};

export default FloatingBlobs;

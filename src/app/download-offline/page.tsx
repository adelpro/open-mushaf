"use client";
import useDownloadassetsOffLine from "@/hooks/useDownloadassetsOffLine";
import React from "react";

export default function Page() {
  const { total, status, progress } = useDownloadassetsOffLine();
  return (
    <div className="progress-container" style={{ marginTop: "10px" }}>
      {status && <p>{status}</p>}
      {total > 0 && (
        <div
          className="progress-bar"
          style={{
            width: `${(progress / total) * 100}%`,
            height: "10px",
            backgroundColor: "#4CAF50",
            transition: "width 0.3s ease",
          }}
        />
      )}
    </div>
  );
}

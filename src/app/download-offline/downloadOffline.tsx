"use client";
import useDownloadassetsOffLine from "@/hooks/useDownloadassetsOffLine";
import React from "react";

export default function DownloadOffline() {
  const { total, status, progress, downloadAssets } =
    useDownloadassetsOffLine();

  const percentage = total > 0 ? (progress / total) * 100 : 0;

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full max-w-md mx-5 p-2">
      <div className="w-full m-10 border border-black flex flex-col items-center">
        {status && <p>{status}</p>}
        {total > 0 && (
          <div className="relative">
            <svg
              className="gauge"
              width="120"
              height="120"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="12"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="12"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                strokeDashoffset="25"
                transform="rotate(-90 60 60)"
                style={{
                  transition: "stroke-dasharray 0.3s ease",
                }}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="20px"
                fill="#4CAF50"
              >
                {Math.round(percentage)}%
              </text>
            </svg>
          </div>
        )}
      </div>
      <button onClick={downloadAssets} className="mt-4 p-2 w-full max-w-md">
        Download offline data
      </button>
    </div>
  );
}

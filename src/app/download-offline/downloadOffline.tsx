"use client";
import useDownloadassetsOffLine from "@/hooks/useDownloadassetsOffLine";
import { cn } from "@/utils/cn";
import React from "react";

export default function DownloadOffline() {
  const { total, status, progress, downloadAssets } =
    useDownloadassetsOffLine();

  const percentage = total > 0 ? (progress / total) * 100 : 0;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-2">
      {total > 0 && (
        <div className="flex justify-center w-full items-center">
          <svg className="gauge" width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="12"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#4CAF50"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
              style={{
                transition: "stroke-dashoffset 0.3s ease",
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

      {status && <p>{status}</p>}
      <button
        onClick={downloadAssets}
        disabled={percentage !== 0}
        aria-disabled={percentage !== 0}
        className={cn(
          "w-full max-w-md transition duration-300 ease-in-out mx-4 my-2 px-4 py-2 font-medium rounded bg-blue-600 hover:opacity-90 text-white",
          {
            "cursor-not-allowed": percentage !== 0,
          }
        )}
      >
        تحميل المعطيات
      </button>
    </div>
  );
}

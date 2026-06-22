import React from "react";
import { motion } from "framer-motion";

export default function FeedLoader() {
  return (
    <div className="loader-wrapper">

      {/* Inline CSS */}
      <style>{`
        .loader-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0px 40px ;
          gap: 30px;
          transform: translateY(-20px);
        }

        .spinner {
          width: 70px;
          height: 70px;
          position: relative;
        }

        .spinner:before {
          content: "";
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 6px solid #3b82f6;
          position: absolute;
          top: 0;
          left: 0;
          animation: pulse 1s ease-in-out infinite;
        }

        .spinner:after {
          content: "";
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 6px solid transparent;
          border-top-color: #3b82f6;
          position: absolute;
          top: 0;
          left: 0;
          animation: spin 1.2s linear infinite;
        }

        .loader-text {
          color: #3b82f6;
          font-weight: 600;
          font-size: 18px;
        }

        @keyframes pulse {
          0% { transform: scale(0.6); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(0.6); opacity: 1; }
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .grid {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }

        .card {
          width: 100%;
          height: 140px;
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          animation: fade 1.2s infinite;
        }

        @media(min-width: 640px) {
          .card { width: 48%; }
        }

        @media(min-width: 1024px) {
          .card { width: 31%; }
        }

        .row {
          display: flex;
          gap: 12px;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #ddd;
        }

        .line {
          height: 10px;
          background: #ddd;
          border-radius: 6px;
          margin-bottom: 6px;
        }

        .line.short {
          width: 60%;
        }

        .line.tiny {
          width: 40%;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .btn {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: #ddd;
        }

        @keyframes fade {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>

      {/* Spinner */}
      <div className="spinner"></div>
      <div className="loader-text">Loading Feed...</div>

     
    </div>
  );
}
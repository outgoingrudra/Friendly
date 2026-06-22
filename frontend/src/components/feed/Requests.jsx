import { useEffect, useState } from "react";
import { getRequests } from "../../api/connection";
import RequestCard from "./RequestCard";
import FeedLoader from "../../components/shimmerUI/feed/FeedLoader";
import toast from "react-hot-toast";
import { RefreshCw } from "lucide-react";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async (force=false) => {
    setLoading(true);

    try {
      const res = await getRequests(force);

      if (res.success) {
        setRequests(res.connectionRequests);
      } else {
        toast.error("Failed to load requests");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Connection Requests
          </h1>
          <p className="text-sm text-gray-500">
            People who want to connect with you
          </p>
        </div>

        <button
          onClick={() => fetchRequests(true)}
          disabled={loading}
          className="p-2 rounded-xl bg-white/60 border border-white/70 shadow hover:bg-white/80 disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>
      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <FeedLoader />
        </div>
      )}

      {/* Requests Grid */}
      {!loading && requests?.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {requests.map((req) => (
            <RequestCard
              key={req._id}
              request={req}
              onRemove={(id) =>
                setRequests((prev) => prev.filter((r) => r._id !== id))
              }
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && requests?.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No connection requests 😢
        </div>
      )}
    </div>
  );
}

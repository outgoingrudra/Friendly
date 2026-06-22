import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getConnections } from "../../api/connection";
import FriendCard from "../../components/user/FriendCard";
import FeedLoader from "../../components/shimmerUI/feed/FeedLoader";
import toast from "react-hot-toast";

export default function Friends() {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const res = await getConnections();
      if (res.success) {
        setConnections(res.connections);
      } else {
        toast.error("Failed to load connections");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // figure out the other person
  const getFriend = (connection) => {
    return connection.fromUserId._id === user._id
      ? connection.toUserId
      : connection.fromUserId;
  };

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Friends</h1>
        <p className="text-sm text-gray-500">
          {connections.length} connection{connections.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <FeedLoader />
        </div>
      )}

      {/* Grid */}
      {!loading && connections.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {connections.map((conn) => (
            <FriendCard
              key={conn._id}
              friend={getFriend(conn)}
              connectionId={conn._id}
              onUnfriend={(id) =>
                setConnections((prev) => prev.filter((c) => c._id !== id))
              }
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && connections.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No connections yet 😢
        </div>
      )}
    </div>
  );
}
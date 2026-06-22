import React, { useEffect } from "react";
import { useFeed } from "../../context/FeedContext";
import FeedCard from "../../components/feed/FeedCard.jsx";
import FeedLoader from "../../components/shimmerUI/feed/FeedLoader.jsx";
import { RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Suggestions() {
  const { feed, fetchFeed, loading } = useFeed();

  const handleRefresh = () => {
    fetchFeed(true); // force refresh
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            People You May Know
          </h1>
          <p className="text-gray-500 text-sm">
            Suggested connections for you
          </p>
        </div>

        <motion.button
          onClick={handleRefresh}
          disabled={loading}
          animate={{
            rotate: loading ? 360 : 0,
            scale: loading ? 1.05 : 1,
          }}
          transition={{
            rotate: {
              repeat: loading ? Infinity : 0,
              ease: "linear",
              duration: 1,
            },
            scale: { duration: 0.2 },
          }}
          whileHover={!loading ? { scale: 1.15 } : {}}
          whileTap={!loading ? { scale: 0.92 } : {}}
          className="
            p-2 rounded-xl 
            bg-white/70 
            backdrop-blur-xl 
            border border-white/60 
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            hover:bg-white
            transition
            relative
          "
        >
          <RefreshCcw size={18} className="text-blue-500" />
        </motion.button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <FeedLoader />
        </div>
      )}

      {/* Feed Grid */}
      {!loading && feed?.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {feed.map((user) => (
            <FeedCard key={user._id} user={user} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && feed?.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No suggestions found 😢
        </div>
      )}
    </div>
  );
}
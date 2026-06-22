// import React, { useEffect } from "react";
// import { useFeed } from "../../context/FeedContext";
// import FeedCard from "../../components/feed/FeedCard.jsx";
// import Developing from "../../components/Developing";
// import FeedLoader from "../../components/shimmerUI/feed/FeedLoader.jsx";
// import { RefreshCcw } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Feed() {
//   const { feed, fetchFeed, loading } = useFeed();

//   const handleRefresh = () => {
//   fetchFeed(true); // force refresh (you already support it)
// };

//   useEffect(() => {
//     fetchFeed();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 px-4 py-6">

//       <div className="mb-6 flex items-center justify-between">
  
//   <div>
//     <h1 className="text-2xl font-bold text-gray-800">Feed</h1>
//     <p className="text-gray-500 text-sm">
//       People you may want to connect with
//     </p>
//   </div>

//  <motion.button
//   onClick={handleRefresh}
//   disabled={loading}
//   animate={{
//     rotate: loading ? 360 : 0,
//     scale: loading ? 1.05 : 1,
//   }}
//   transition={{
//     rotate: {
//       repeat: loading ? Infinity : 0,
//       ease: "linear",
//       duration: 1,
//     },
//     scale: { duration: 0.2 },
//   }}
//   whileHover={!loading ? { scale: 1.15 } : {}}
//   whileTap={!loading ? { scale: 0.92 } : {}}
//   className="
//     p-2 rounded-xl 
//     bg-white/70 
//     backdrop-blur-xl 
//     border border-white/60 
//     shadow-[0_8px_30px_rgba(0,0,0,0.08)]
//     hover:bg-white
//     transition
//     relative
//   "
// >
//   <RefreshCcw
//     size={18}
//     className="text-blue-500"
//   />
// </motion.button>

// </div>

//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center py-10">
//          <FeedLoader/>
//         </div>
//       )}

//       {/* Feed grid */}
//       {!loading && feed?.length > 0 && (
//         <div className="flex flex-wrap gap-4">
//           {feed.map((user) => (
//             <FeedCard key={user._id} user={user} />
//           ))}
//         </div>
//       )}

//       {/* Empty state */}
//       {!loading && feed?.length === 0 && (
//         <div className="text-center text-gray-500 mt-10">
//           No users found 😢
//         </div>
//       )}

//     </div>
//   );
// }






import React, { useState } from "react";
import Suggestions from "../../components/feed/Suggestions";
import Requests from "../../components/feed/Requests";
import { motion } from "framer-motion";

export default function Feed() {
  const [activeTab, setActiveTab] = useState("suggestions");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 px-4 py-6">

      {/* Tab buttons */}
      <div className="mb-6 flex items-center gap-3">
        <TabButton
          label="Suggestions"
          active={activeTab === "suggestions"}
          onClick={() => setActiveTab("suggestions")}
        />
        <TabButton
          label="Requests"
          active={activeTab === "requests"}
          onClick={() => setActiveTab("requests")}
        />
      </div>

      {/* Tab content */}
      {activeTab === "suggestions" ? <Suggestions /> : <Requests />}

    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
        ${active
          ? "bg-blue-500 text-white shadow-md"
          : "bg-white/70 text-gray-600 border border-white/60 hover:bg-white"
        }`}
    >
      {label}
    </motion.button>
  );
}
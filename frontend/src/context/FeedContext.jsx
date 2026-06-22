import { createContext, useContext, useState } from "react";
import { getFeed } from "../api/feed";

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeed = async (force = false) => {
    if (feed.length > 0 && !force) return; // 🚀 cache hit

    setLoading(true);
    try {
      const res = await getFeed(0, 15);
      setFeed(res.users);
    } catch (err) {
      console.log(err);
    } finally {
          setLoading(false);
    }
  };

  return (
    <FeedContext.Provider value={{ feed, fetchFeed, loading }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => useContext(FeedContext);
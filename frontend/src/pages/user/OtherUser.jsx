import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { getUserById } from "../../api/user.js";
import ProfileLoader from "../../components/shimmerUI/ProfileLoader.jsx";

export default function OtherUser() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getUserById(id);
        if (res.success) setProfile(res.user);
        else toast.error(res.message || "Failed to load profile");
      } catch (err) {
        toast.error(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <ProfileLoader/>
  if (!profile) return <div className="text-center py-20 text-gray-400">User not found</div>;

  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen px-4 py-8 max-w-xl mx-auto">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />
        <h2 className="mt-3 text-xl font-bold text-gray-800">{profile.name}</h2>
        {profile.bio && <p className="text-sm text-gray-500 mt-1 text-center">{profile.bio}</p>}

        <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
          {profile.city && (
            <span className="flex items-center gap-1">
              <MapPin size={13} /> {profile.city}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={13} /> Joined {memberSince}
          </span>
        </div>
      </div>

      {/* Info Cards */}
      {profile.gender && (
        <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl px-4 py-3 mb-3 shadow-sm">
          <p className="text-xs text-gray-400">Gender</p>
          <p className="text-sm text-gray-700 capitalize">{profile.gender}</p>
        </div>
      )}

      {profile.city && (
        <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl px-4 py-3 mb-3 shadow-sm">
          <p className="text-xs text-gray-400">City</p>
          <p className="text-sm text-gray-700">{profile.city}</p>
        </div>
      )}
    </div>
  );
}
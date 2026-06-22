import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  X,
  Check,
  MapPin,
  Calendar,
  User,
  Mail,
  FileText,
  Image,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateProfile, uploadProfileImage } from "../../api/user.js";
import { useNavigate } from "react-router-dom";
import { getConnections } from "../../api/connection.js";


export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const [editField, setEditField] = useState(null);
  const [formValue, setFormValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const openEdit = (field) => {
    setEditField(field);
    setFormValue(user[field] || "");
  };

  const cancelEdit = () => {
    setEditField(null);
    setFormValue("");
  };

  const saveField = async () => {
    if (!formValue.trim()) return toast.error("Field cannot be empty");
    setSaving(true);
    try {
      const res = await updateProfile({ [editField]: formValue });
      if (res?.success) {
        setUser((prev) => ({ ...prev, [editField]: formValue }));
        toast.success("Updated!");
        setEditField(null);
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const toastId = toast.loading("Uploading image...");
    setSaving(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const res = await uploadProfileImage({
          image: reader.result,
          fileName: file.name,
        });
        if (res?.success) {
          setUser(res.user);
          toast.success("Image updated!", { id: toastId });
        } else {
          toast.error(res?.message || "Upload failed", { id: toastId });
        }
        setSaving(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error("Upload failed", { id: toastId });
      setSaving(false);
    }
  };

  
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
  const fields = [
    { key: "name", label: "Name", icon: <User size={15} />, value: user.name },
    {
      key: "bio",
      label: "Bio",
      icon: <FileText size={15} />,
      value: user.bio,
      textarea: true,
    },
    {
      key: "gender",
      label: "Gender",
      icon: <User size={15} />,
      value: user.gender,
      select: ["male", "female"],
    },
    {
      key: "city",
      label: "City",
      icon: <MapPin size={15} />,
      value: user.city,
    },
  ];
 
   

  return (
    <div className="min-h-screen px-4 py-8 max-w-xl mx-auto">
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={user.image}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow hover:bg-blue-600 transition cursor-pointer">
            <Image size={13} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={saving}
            />
          </label>
        </div>

        <h2 className="mt-3 text-xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
          <Calendar size={13} /> Member since {memberSince}
        </p>
        <div className="mt-3 flex items-center gap-4">
          <button
            onClick={() => navigate("/friends")}
            className="text-sm text-blue-500 font-medium hover:underline cursor-pointer"
          >
            {connections.length} Friends
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-1.5 text-sm text-red-400 font-medium hover:text-red-500 cursor-pointer transition"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      {/* Email (read-only) */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl px-4 py-3 mb-3 flex items-center gap-3 shadow-sm opacity-70">
        <span className="text-gray-400">
          <Mail size={15} />
        </span>
        <div className="flex-1">
          <p className="text-xs text-gray-400">Email</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <span className="text-xs text-gray-300 bg-gray-100 px-2 py-0.5 rounded-full">
          read-only
        </span>
      </div>

      {/* Editable fields */}
      {fields.map(({ key, label, icon, value, textarea, select }) => (
        <div
          key={key}
          className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl px-4 py-3 mb-3 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-gray-400">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">{label}</p>
                {editField === key ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1"
                    >
                      {select ? (
                        <select
                          value={formValue}
                          onChange={(e) => setFormValue(e.target.value)}
                          className="text-sm w-full bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-700"
                        >
                          <option value="">Select...</option>
                          {select.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </option>
                          ))}
                        </select>
                      ) : textarea ? (
                        <textarea
                          value={formValue}
                          onChange={(e) => setFormValue(e.target.value)}
                          rows={3}
                          className="text-sm w-full bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none text-gray-700"
                        />
                      ) : (
                        <input
                          value={formValue}
                          onChange={(e) => setFormValue(e.target.value)}
                          className="text-sm w-full bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-700"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <p className="text-sm text-gray-700 truncate">
                    {value || (
                      <span className="text-gray-300 italic">Not set</span>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="ml-3 flex gap-1 shrink-0">
              {editField === key ? (
                <>
                  <button
                    onClick={cancelEdit}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                  <button
                    onClick={saveField}
                    disabled={saving}
                    className="p-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
                  >
                    <Check size={15} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => openEdit(key)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 transition cursor-pointer"
                >
                  <Pencil size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

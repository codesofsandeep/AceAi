// Dashboard.jsx

import { Protect, useAuth } from "@clerk/clerk-react";
import { DiameterIcon, Home, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreationItems from "../components/CreationItems";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCreation, setSelectedCreation] = useState(null);

  const { getToken } = useAuth();

  // Mapping of types to badge colors
  const typeColors = {
    article: "bg-green-500/20 text-green-400",
    "blog-title": "bg-yellow-500/20 text-yellow-400",
    "resume-review": "bg-blue-500/20 text-blue-400",
    "background-removal": "bg-pink-500/20 text-pink-400",
    image: "bg-purple-500/20 text-purple-400",
    default: "bg-gray-500/20 text-gray-400",
  };

  // Fetch dashboard data
  const getDashboardData = async () => {
    try {
      const token = await getToken();
      // const { data } = await axios.get(
      //   "/api/ai/user/get-user-creations",
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/get-user-creations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message || "Failed to fetch creations");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] p-4">

      {/* Header */}
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFD700]">
          <Home size={22} color="yellow" /> Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Overview of your AI usage
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Creations */}
        <div className="flex justify-between items-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div>
            <p className="text-sm text-slate-500">Total Creations</p>
            <h2 className="text-2xl font-semibold text-slate-800">
              {loading ? "..." : creations.length}
            </h2>
          </div>
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
            <Sparkles size={22} />
          </div>
        </div>

        {/* Active Plan */}
        <div className="flex justify-between items-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div>
            <p className="text-sm text-slate-500">Active Plan</p>
            <h2 className="text-2xl font-semibold text-slate-800">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
            <DiameterIcon size={22} />
          </div>
        </div>

      </div>

      {/* Recent Creations */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Recent Creations
        </h2>

        {loading ? (
          <p className="text-sm text-slate-400">Loading...</p>
        ) : creations.length === 0 ? (
          <p className="text-sm text-slate-400">No creations yet.</p>
        ) : (
          creations.map((item) => {
            const colorClass = typeColors[item.type] || typeColors.default;

            return (
              <CreationItems
                key={item._id}
                item={{
                  ...item,
                  type: (
                    <span className={`text-xs px-3 py-1 rounded-full ${colorClass}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  ),
                }}
                onView={() => setSelectedCreation(item)}
              />
            );
          })
        )}
      </div>

      {/* View Modal */}
      {selectedCreation && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setSelectedCreation(null)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 rounded-xl p-6 border border-slate-700 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCreation(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-white mb-3">
              Creation Details
            </h2>

            {/* Prompt */}
            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-1">Prompt</p>
              <div className="bg-slate-800 p-3 rounded-md text-sm text-slate-200 max-h-32 overflow-y-auto">
                {selectedCreation.prompt}
              </div>
            </div>

            {/* Result / Content */}
            <div>
              <p className="text-sm text-slate-400 mb-1">Result</p>
              <div className="bg-slate-800 p-3 rounded-md text-sm text-slate-200 max-h-48 overflow-y-auto whitespace-pre-wrap">
                {selectedCreation.content}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
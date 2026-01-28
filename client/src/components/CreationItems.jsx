import React from "react";
import { Eye } from "lucide-react";

function CreationItems({ item, onView }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">

            {/* Left */}
            <div>
                {/* <p className="text-sm font-medium text-slate-100">
                    {item.prompt || "Untitled Creation"}
                </p> */}

                <p className="text-xs text-slate-400 mt-1">
                    {new Date(item.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* Type badge (already styled from Dashboard) */}
                {item.type}

                {/* View Button */}
                <button
                    onClick={onView}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                    title="View"
                >
                    <Eye size={16} className="text-slate-300" />
                </button>
            </div>

        </div>
    );
}

export default CreationItems;
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
// import { Search } from "lucide-react";
// import ChatsHistory from "./ChatsHistory";

const SidebarHeader = ({ searchQuery, setSearchQuery }) => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            {/* <button
                onClick={() => setSearchOpen(true)}
                className="text-white/70 hover:text-white transition p-2 rounded-xl bg-white/10"
            >
                <Search size={18} />
            </button> */}

            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {searchOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm"
                                onClick={() => setSearchOpen(false)}
                            >
                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="mt-24 w-full max-w-xl bg-[#111418] rounded-xl shadow-lg p-4 relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    <div className="mt-2 max-h-64 overflow-y-auto">
                                        <ChatsHistory collapsed={false} searchQuery={searchQuery} />
                                    </div>

                                    <button
                                        onClick={() => setSearchOpen(false)}
                                        className="absolute top-2 right-2 text-white/60 hover:text-white"
                                    >
                                        ✕
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
};

export default SidebarHeader;

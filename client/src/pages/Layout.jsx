

import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut,
  Settings,
  Sparkles,
  Bot,
  Wand2,
  ChevronRight,
  Home,
  ImageMinus,
  Eraser,
  FileSearch,
  Menu,
  X,
  Users
} from "lucide-react";

import logo from "/src/assets/favicon.svg";

import {
  useUser,
  SignIn,
  SignOutButton,
  Protect,
  useClerk
} from "@clerk/clerk-react";

import Particle from "../components/Particle";
import SidebarHeader from "./SidebarHeader";

const aiTools = [
  { to: "/ai", label: "Dashboard", icon: <Home size={18} /> },
  { to: "/ai/write-article", label: "AI Article Writer", icon: <Bot size={18} /> },
  { to: "/ai/blog-title", label: "Blog Title Generator", icon: <Sparkles size={18} /> },
  { to: "/ai/generate-images", label: "AI Image Generation", icon: <Wand2 size={18} /> },
  { to: "/ai/remove-background", label: "Background Removable", icon: <ImageMinus size={18} /> },
  { to: "/ai/remove-object", label: "Object Removal", icon: <Eraser size={18} /> },
  { to: "/ai/review-resume", label: "Resume Reviewer", icon: <FileSearch size={18} /> },
  { to: "/ai/community", label: "Community", icon: <Users size={18} /> },
];

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useUser();
  const { openUserProfile } = useClerk();


  if (!user) {
    return (
      <div className="relative h-screen">
        <div className="absolute inset-0 -z-10">
          <Particle />
        </div>
        <div className="flex items-center justify-center h-full">
          <SignIn />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0b0e13] text-white">

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#111418]/90 backdrop-blur border-b border-white/10">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-white/10"
        >
          <Menu size={22} />
        </button>

        <img src="/favicon.svg" className="h-7" />
        <div className="w-8" />
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-72 bg-[#111418]/90 backdrop-blur-xl border-r border-white/10 flex-col">
        <SidebarContent
          aiTools={aiTools}
          user={user}
          openUserProfile={openUserProfile}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileOpen && (
        <>
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-[#111418]/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            <SidebarContent
              aiTools={aiTools}
              user={user}
              openUserProfile={openUserProfile}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              closeMobile={() => setMobileOpen(false)}
            />
          </motion.aside>

          {/* Overlay */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-40"
          />
        </>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 pt-20 md:pt-6 px-4 md:px-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

/* ================= SIDEBAR CONTENT ================= */
const SidebarContent = ({
  aiTools,
  user,
  openUserProfile,
  searchQuery,
  setSearchQuery,
  closeMobile
}) => {

  const navigate = useNavigate();

  return (
    <>
      <div className="p-4">
        <img
          src={logo}
          onClick={() => navigate("/")}
          className="h-8 cursor-pointer"
          alt="Logo"
        />
        <SidebarHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="px-4 space-y-2">
        <h3 className="text-xs uppercase tracking-wider text-purple-400 font-bold">
          AI Toolkit
        </h3>

        {aiTools.map((item, i) => (
          <NavLink
            key={i}
            to={item.to}
            end={item.to === '/ai'}
            onClick={closeMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl transition
               ${isActive ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`
            }
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
            <ChevronRight size={16} />
          </NavLink>
        ))}
      </div>

      <div className="mt-auto px-4 pb-5">
        <div
          onClick={openUserProfile}
          className="cursor-pointer bg-white/5 p-3 rounded-xl border border-white/10 mb-3"
        >
          <p className="text-sm font-semibold">{user.fullName}</p>
          <p className="text-xs opacity-60">
            <Protect plan="premium" fallback="Free">Premium</Protect> Plan
          </p>
        </div>

        <div className="flex justify-between">
          <button className="p-2 bg-white/10 rounded-xl">
            <Settings size={22} />
          </button>

          <SignOutButton>
            <div className="p-2 bg-white/10 rounded-xl cursor-pointer">
              <LogOut size={20} />
            </div>
          </SignOutButton>
        </div>
      </div>
    </>
  );
};

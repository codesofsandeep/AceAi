import React from "react";
import {
  Flame,
  Rocket,
  BookOpen,
  MessageCircle,
  ExternalLink,
  Users
} from "lucide-react";

const updates = [
  {
    type: "Trending",
    title: "React 19 introduces Compiler Optimizations",
    desc: "React 19 brings automatic memoization and reduced re-renders using its new compiler.",
    tag: "Frontend",
    color: "from-orange-400/20 to-red-500/10",
    icon: <Flame size={14} className="text-orange-400" />,
  },
  {
    type: "AI",
    title: "OpenAI releases multi-agent workflows",
    desc: "Developers can now build autonomous AI agents collaborating in real-time.",
    tag: "AI / ML",
    color: "from-purple-400/20 to-indigo-500/10",
    icon: <Rocket size={14} className="text-purple-400" />,
  },
  {
    type: "Tool",
    title: "Vite 6 improves build speed by 30%",
    desc: "Major DX improvements and faster cold starts announced.",
    tag: "Dev Tools",
    color: "from-cyan-400/20 to-blue-500/10",
    icon: <BookOpen size={14} className="text-cyan-400" />,
  },
  {
    type: "Career",
    title: "Top 10 skills hiring managers want in 2025",
    desc: "AI + full-stack + cloud skills dominate tech hiring.",
    tag: "Jobs",
    color: "from-emerald-400/20 to-green-500/10",
    icon: <MessageCircle size={14} className="text-emerald-400" />,
  },
];

const Community = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-12">

      {/* ===== HEADER ===== */}
      <header className="space-y-2">
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-100">
          <Users color="yellow"/>
          Community
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Discover trending tech, AI breakthroughs, developer tools,
          and community-driven insights — curated for builders.
        </p>
      </header>

      {/* ===== QUICK HIGHLIGHTS ===== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Highlight
          icon={<Flame size={18} className="text-orange-400" />}
          title="Trending Tech"
          desc="What developers are discussing right now"
        />
        <Highlight
          icon={<Rocket size={18} className="text-purple-400" />}
          title="New Launches"
          desc="Fresh tools, APIs & frameworks"
        />
        <Highlight
          icon={<BookOpen size={18} className="text-cyan-400" />}
          title="Learning"
          desc="Guides, tips & best practices"
        />
      </section>

      {/* ===== FEED ===== */}
      <section className="space-y-5">
        <h2 className="text-sm font-medium text-slate-300">
          Latest updates
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {updates.map((item, i) => (
            <article
              key={i}
              className="relative bg-[#111418]/80 border border-white/10 rounded-2xl p-5 space-y-3
                         hover:border-slate-500 hover:shadow-lg hover:shadow-black/30
                         transition-all duration-300 group"
            >
              {/* Glow */}
              <div
                className={`absolute inset-0  rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition`}
              />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300">
                    {item.icon}
                    {item.type}
                  </span>
                  <span className="text-xs text-green-400">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-medium text-slate-100">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer">
                  <ExternalLink size={14} />
                  Read more
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== COMMUNITY CTA ===== */}
      <section className="bg-gradient-to-br from-[#0b0e13] to-[#111418] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <MessageCircle size={20} className="text-slate-300" />
          <p className="text-sm text-slate-400 max-w-xl">
            Join discussions, share insights, and build together with
            developers across frontend, backend, AI, and product engineering.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-green-700 text-white text-sm font-medium hover:bg-green-900 hover:scale-[1.02] transition">
          Join Community
        </button>
      </section>

    </div>
  );
};

export default Community;

/* ===== Highlight Card ===== */
const Highlight = ({ icon, title, desc }) => (
  <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-5 space-y-2
                  hover:border-slate-500 transition">
    <div className="flex items-center gap-2 text-slate-200">
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </div>
    <p className="text-sm text-slate-400">
      {desc}
    </p>
  </div>
);

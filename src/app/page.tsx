"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Code2,
  Database,
  FileText,
  Filter,
  MapPin,
  Menu,
  Radar,
  Search,
  Settings2,
  Sparkles,
  SlidersHorizontal,
  X,
  Zap,
} from "lucide-react";

type Job = {
  id: string;
  company: string;
  mark: string;
  color: string;
  title: string;
  location: string;
  mode: "Remote" | "Hybrid" | "On-site";
  level: "Entry" | "Mid" | "Senior" | "Lead";
  type: string;
  salary: string;
  posted: string;
  skills: string[];
  description: string;
};

const jobs: Job[] = [
  { id: "1", company: "Northstar Labs", mark: "N", color: "#dff7eb", title: "Senior AI / ML Engineer", location: "San Francisco, CA", mode: "Hybrid", level: "Senior", type: "Full-time", salary: "$180k - $230k", posted: "2h ago", skills: ["Python", "PyTorch", "LLMs", "AWS"], description: "Lead the next generation of intelligent products. You will own model development from research to production and partner closely with product and infrastructure teams." },
  { id: "2", company: "Vercel", mark: "V", color: "#e8eaf0", title: "Full-stack Product Engineer", location: "Remote, US", mode: "Remote", level: "Mid", type: "Full-time", salary: "$155k - $195k", posted: "5h ago", skills: ["React", "TypeScript", "Node.js", "Postgres"], description: "Build thoughtful tools for the modern web. Work across the stack to ship delightful experiences used by millions of developers." },
  { id: "3", company: "Mercury", mark: "M", color: "#e3e9ff", title: "Data Analyst, Growth", location: "New York, NY", mode: "Hybrid", level: "Entry", type: "Full-time", salary: "$95k - $120k", posted: "1d ago", skills: ["SQL", "Python", "Looker", "Experiments"], description: "Turn customer behavior into clear decisions. Join a high-ownership growth team and build the insights layer for our next chapter." },
  { id: "4", company: "Arcadia", mark: "A", color: "#fff0d9", title: "Machine Learning Platform Lead", location: "Austin, TX", mode: "On-site", level: "Lead", type: "Full-time", salary: "$210k - $260k", posted: "1d ago", skills: ["Python", "Kubernetes", "GCP", "MLOps"], description: "Shape the platform that makes machine learning reliable, observable, and accessible to every engineering team." },
  { id: "5", company: "Linear", mark: "L", color: "#f0e7ff", title: "Software Engineer, Core", location: "Remote, Americas", mode: "Remote", level: "Mid", type: "Full-time", salary: "$170k - $220k", posted: "2d ago", skills: ["React", "GraphQL", "TypeScript", "Go"], description: "Help define the future of product development software with a small, senior, and deeply collaborative team." },
];

const profiles = {
  "AI / ML Engineer": { initials: "AL", name: "Alex Morgan", role: "AI / ML Engineer", skills: ["Python", "Machine Learning", "PyTorch", "SQL", "AWS"], target: "Senior AI / ML Engineer", experience: "6 years" },
  "Full-stack Developer": { initials: "JD", name: "Jordan Davis", role: "Full-stack Developer", skills: ["React", "TypeScript", "Node.js", "Postgres", "AWS"], target: "Product Engineer", experience: "4 years" },
  "Data Analyst Intern": { initials: "SC", name: "Sam Chen", role: "Data Analyst Intern", skills: ["SQL", "Python", "Tableau", "Excel"], target: "Data Analyst", experience: "1 year" },
};

function scoreJob(job: Job, skills: string[]) {
  const normalized = skills.map((skill) => skill.toLowerCase());
  const hits = job.skills.filter((skill) => normalized.some((item) => item.includes(skill.toLowerCase()) || skill.toLowerCase().includes(item)));
  return Math.min(98, Math.round(63 + (hits.length / job.skills.length) * 35));
}

export default function Home() {
  const [profile, setProfile] = useState(profiles["AI / ML Engineer"]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All locations");
  const [level, setLevel] = useState("All levels");
  const [jobType, setJobType] = useState("All job types");
  const [selectedId, setSelectedId] = useState("1");
  const [saved, setSaved] = useState<string[]>(["3"]);
  const [observability, setObservability] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const text = `${job.title} ${job.company} ${job.skills.join(" ")}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (location === "All locations" || job.mode === location) && (level === "All levels" || job.level === level) && (jobType === "All job types" || job.type === jobType);
  }), [query, location, level, jobType]);
  const selected = jobs.find((job) => job.id === selectedId) ?? jobs[0];
  const score = scoreJob(selected, profile.skills);
  const matched = selected.skills.filter((skill) => profile.skills.some((item) => item.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(item.toLowerCase())));
  const missing = selected.skills.filter((skill) => !matched.includes(skill));

  const loadProfile = (key: keyof typeof profiles) => { setProfile(profiles[key]); setProfileOpen(false); };
  const toggleSave = (id: string) => setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark"><Radar size={19} /></div><span>talent<span className="brand-dot">.</span>match</span><span className="beta">BETA</span></div>
        <nav><button className="nav-active">Discover</button><button>Saved jobs <span className="nav-count">{saved.length}</span></button><button>Applications</button></nav>
        <div className="top-actions"><button className="demo-pill"><Zap size={14} fill="currentColor" /> Demo simulation mode</button><button className="icon-btn"><Settings2 size={17} /></button><button className="avatar">{profile.initials}</button><button className="mobile-menu"><Menu size={20} /></button></div>
      </header>

      <section className="simulation-bar"><div><Sparkles size={15} /><strong>Demo Simulation Mode</strong><span>Explore with a pre-set candidate profile</span></div><div className="profile-buttons"><button onClick={() => loadProfile("AI / ML Engineer")} className={profile.role === "AI / ML Engineer" ? "selected-profile" : ""}>Load AI / ML Engineer</button><button onClick={() => loadProfile("Full-stack Developer")} className={profile.role === "Full-stack Developer" ? "selected-profile" : ""}>Load Full-stack Developer</button><button onClick={() => loadProfile("Data Analyst Intern")} className={profile.role === "Data Analyst Intern" ? "selected-profile" : ""}>Load Data Analyst Intern</button></div></section>

      <div className="page-heading"><div><p className="eyebrow">INTELLIGENT DISCOVERY <span>•</span> 12,482 JOBS INDEXED</p><h1>Find work that <em>fits</em> your next chapter.</h1><p className="subtitle">Your skills, ambitions, and the right opportunity - aligned.</p></div><button className="profile-edit" onClick={() => setProfileOpen(!profileOpen)}><span className="mini-avatar">{profile.initials}</span><span><small>YOUR PROFILE</small><b>{profile.name}</b></span><ChevronDown size={16} className={profileOpen ? "rotate" : ""} /></button></div>
      {profileOpen && <div className="profile-popover"><div className="popover-title"><strong>Candidate profile</strong><button onClick={() => setProfileOpen(false)}><X size={15} /></button></div><p>{profile.role} · {profile.experience}</p><div className="chip-row">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><button className="edit-profile-btn">Edit profile <ArrowUpRight size={14} /></button></div>}

      <section className="metrics"><div><span className="metric-icon blue"><Zap size={15} fill="currentColor" /></span><span><small>APPLICATION MATCH EFFICIENCY</small><b>+72%</b></span></div><div><span className="metric-icon purple"><TargetIcon /></span><span><small>KEYWORD ALIGNMENT PRECISION</small><b>98%</b></span></div><div><span className="metric-icon green"><ArrowUpRight size={17} /></span><span><small>INTERVIEW CONVERSION BOOST</small><b>+3.4x</b></span></div><div className="metrics-note"><span className="live-dot" /> Updated live from your profile</div></section>

      <section className="workspace"><aside className="search-panel"><div className="search-wrap"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search roles, skills, or companies..." /><kbd>⌘ K</kbd></div><div className="filter-heading"><span><Filter size={14} /> FILTERS</span><button onClick={() => { setQuery(""); setLocation("All locations"); setLevel("All levels"); setJobType("All job types"); }}>Reset</button></div><div className="filter-selects"><FilterSelect label="Location" value={location} options={["All locations", "Remote", "Hybrid", "On-site"]} onChange={setLocation} /><FilterSelect label="Experience level" value={level} options={["All levels", "Entry", "Mid", "Senior", "Lead"]} onChange={setLevel} /><FilterSelect label="Job type" value={jobType} options={["All job types", "Full-time", "Contract", "Internship"]} onChange={setJobType} /></div><div className="feed-header"><span><b>{filteredJobs.length}</b> opportunities</span><button><SlidersHorizontal size={14} /> Best match <ChevronDown size={13} /></button></div><div className="job-feed">{filteredJobs.map((job) => <JobCard key={job.id} job={job} active={selected.id === job.id} saved={saved.includes(job.id)} score={scoreJob(job, profile.skills)} onSelect={() => setSelectedId(job.id)} onSave={() => toggleSave(job.id)} />)}{!filteredJobs.length && <div className="empty-state">No roles match these filters.<button onClick={() => { setQuery(""); setLocation("All locations"); setLevel("All levels"); setJobType("All job types"); }}>Clear filters</button></div>}</div></aside>

        <article className="detail-panel"><div className="detail-scroll"><div className="detail-top"><span className="source"><span className="source-dot" /> LinkedIn dataset <span>•</span> {selected.posted}</span><button className={saved.includes(selected.id) ? "bookmark active" : "bookmark"} onClick={() => toggleSave(selected.id)}><Bookmark size={18} fill={saved.includes(selected.id) ? "currentColor" : "none"} /></button></div><div className="company-line"><div className="company-logo" style={{ background: selected.color }}>{selected.mark}</div><div><h2>{selected.title}</h2><p>{selected.company} <span className="verified">✓</span></p></div></div><div className="job-meta"><span><MapPin size={14} /> {selected.location}</span><span><BriefcaseBusiness size={14} /> {selected.type}</span><span><Clock3 size={14} /> {selected.level} level</span></div><div className="detail-actions"><button className="apply-btn">Apply now <ArrowUpRight size={16} /></button><button className="secondary-btn">View company</button></div><div className="match-card"><div className="match-head"><div><span className="match-kicker"><Sparkles size={14} /> AI COMPATIBILITY ANALYSIS</span><h3>Why this job matches you</h3></div><div className={`score-ring ${score >= 90 ? "high" : ""}`}><strong>{score}%</strong><span>match</span></div></div><div className="score-bar"><span style={{ width: `${score}%` }} /></div><div className="reasoning"><div className="reasoning-label"><span className="pulse-dot" /> AGENT REASONING <span>Just now</span></div><p><Check size={15} /> Comparing your skills matrix against job description</p><p><Check size={15} /> Calculating semantic vector distance</p><p><span className="spinner" /> Generating match rationale</p></div><div className="skills-breakdown"><div><span className="breakdown-label success"><Check size={13} /> MATCHED SKILLS <b>{matched.length}</b></span><div className="chips">{matched.map((skill) => <span className="matched" key={skill}>{skill}</span>)}</div></div><div><span className="breakdown-label missing"><CircleHelp size={13} /> RECOMMENDED TO HIGHLIGHT <b>{missing.length}</b></span><div className="chips">{missing.map((skill) => <span className="missing-chip" key={skill}>{skill}</span>)}</div></div></div><div className="narrative"><Sparkles size={16} /><p><strong>The signal is strong.</strong> Your {profile.experience} of experience and strength in {matched.slice(0, 2).join(" and ") || "relevant skills"} align closely with what {selected.company} is building. In your application, emphasize measurable impact and ownership of production systems.</p></div></div><div className="about"><div className="section-title"><h3>About the role</h3><span>$ {selected.salary.replace("$", "")}</span></div><p>{selected.description}</p><h4>What you will do</h4><ul><li>Partner with a cross-functional team to ship high-impact work.</li><li>Build systems that are reliable, observable, and easy to evolve.</li><li>Raise the bar through thoughtful reviews and documentation.</li></ul></div></div><button className="observability" onClick={() => setObservability(!observability)}><Code2 size={16} /> Agent observability drawer <span>{observability ? "Hide" : "Expand"}</span><ChevronDown size={15} className={observability ? "rotate" : ""} /></button>{observability && <div className="observability-content"><div><small>SIMILARITY SCORE</small><b>0.942 vector cosine</b></div><div><small>MODEL LATENCY</small><b>1.24s</b></div><div><small>PAYLOAD LOG</small><b><FileText size={13} /> match_v2.json</b></div></div>}</article>
      </section>
    </main>
  );
}

function TargetIcon() { return <span className="target-icon">◎</span>; }

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="filter-select"><span>{label}</span><div><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={14} /></div></label>;
}

function JobCard({ job, active, saved, score, onSelect, onSave }: { job: Job; active: boolean; saved: boolean; score: number; onSelect: () => void; onSave: () => void }) {
  return <button className={`job-card ${active ? "active" : ""}`} onClick={onSelect}><div className="job-card-top"><div className="company-logo small" style={{ background: job.color }}>{job.mark}</div><span className="job-posted">{job.posted}</span><span className="card-score" style={{ color: score >= 90 ? "#059669" : score >= 75 ? "#2563eb" : "#64748b", background: score >= 90 ? "#ecfdf5" : score >= 75 ? "#eff6ff" : "#f1f5f9" }}>{score}%</span><span className={saved ? "save-icon saved" : "save-icon"} onClick={(event) => { event.stopPropagation(); onSave(); }}><Bookmark size={16} fill={saved ? "currentColor" : "none"} /></span></div><div className="card-copy"><h3>{job.title}</h3><p>{job.company}</p><div className="card-meta"><span><MapPin size={12} /> {job.location}</span><span>{job.mode}</span></div></div><div className="card-skills">{job.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}{job.skills.length > 3 && <span>+{job.skills.length - 3}</span>}</div></button>;
}

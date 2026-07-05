import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ArrowUp,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
  MapPin,
  Trophy,
  Award,
  Cpu,
  Cloud,
  Database,
  Code2,
  Boxes,
  Workflow,
  GraduationCap,
  Briefcase,
  Film,
  Home,
  Plane,
  Bot,
  Globe,
  Server,
} from "lucide-react";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "Full-Stack Developer",
  "React & Node.js Developer",
  "Cloud Practitioner (AWS)",
  "AI & Automation Enthusiast",
];

/* ---------- Theme toggle ---------- */
function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "dark"
      | "light"
      | null;
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

/* ---------- Section wrapper ---------- */
function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">{title}</h2>
    </motion.div>
  );
}

/* ---------- Navbar ---------- */
function Navbar({
  theme,
  toggle,
  active,
}: {
  theme: "dark" | "light";
  toggle: () => void;
  active: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-sm font-bold text-primary ring-1 ring-primary/30 transition group-hover:bg-primary/25">
            RL
          </span>
          <span className="hidden text-sm font-semibold sm:block">Rajesh Lobhisetti</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`group relative rounded-md px-3 py-2 text-sm transition-colors ${
                active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 ${
                  active === n.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-surface transition hover:bg-surface-2"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110 md:inline-flex"
          >
            Let's talk
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-surface md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden border-t border-border md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById(n.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-surface hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- Typewriter ---------- */
function Typewriter() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = ROLES[i % ROLES.length];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, txt.length + 1);
        setTxt(next);
        if (next === word) setTimeout(() => setDel(true), 1400);
      } else {
        const next = word.slice(0, txt.length - 1);
        setTxt(next);
        if (next === "") {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, i]);
  return (
    <span className="text-primary">
      {txt}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[-0.1em] animate-pulse bg-primary align-middle" />
    </span>
  );
}

/* ---------- Cursor gradient ---------- */
function CursorBlob() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[600px] w-[600px] rounded-full opacity-40 blur-[120px] md:block"
      style={{
        background:
          "radial-gradient(circle, oklch(0.72 0.14 220 / 0.35), transparent 60%)",
      }}
    />
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 60]);
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <motion.div style={{ y }} className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Open to full-stack internships & roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Rajesh <span className="text-gradient">Lobhisetti</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl"
        >
          <Typewriter />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          Computer Science student building full-stack web apps with React, Node.js and MongoDB.
          Comfortable working with REST APIs, cloud basics, and always learning something new.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/myportfolio/Rajesh_Lobhisetti_Resume.pdf"
            download="Rajesh_Lobhisetti_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:bg-surface-2"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex items-center gap-4 text-muted-foreground"
        >
          <a
            href="https://github.com/rajeshlobhisetti"
            target="_blank"
            rel="noreferrer"
            className="transition hover:-translate-y-0.5 hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/rajeshlobhis/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:-translate-y-0.5 hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:rajeshlobhisetti@gmail.com"
            className="transition hover:-translate-y-0.5 hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="A student who ships." />
      <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative mx-auto"
        >
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/50 to-transparent opacity-70 blur-xl transition group-hover:opacity-100" />
          <div className="relative h-64 w-64 overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl ring-1 ring-primary/20 transition group-hover:ring-primary/50">
            <img
              src="/myportfolio/rajesh-profile.jpg"
              alt="Rajesh Lobhisetti"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          <p>
            I'm a Computer Science and Engineering student at{" "}
            <span className="text-foreground">Lakireddy Bali Reddy College of Engineering</span>,
            Mylavaram (JNTUK), graduating in 2027 with a CGPA of{" "}
            <span className="text-foreground">9.02 / 10</span>.
          </p>
          <p>
            I enjoy full-stack development, cloud, and workflow automation — and I actively
            practice Java for data structures, algorithms, and problem-solving.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
              <GraduationCap className="h-4 w-4 text-primary" /> B.Tech CSE • 2027
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
              <MapPin className="h-4 w-4 text-primary" /> Vijayawada / Hyderabad, IN
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
              <Briefcase className="h-4 w-4 text-primary" /> Open to work
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- Skills ---------- */
const SKILL_GROUPS = [
  {
    icon: Code2,
    title: "Languages",
    items: ["Python", "Java", "C", "SQL"],
  },
  {
    icon: Boxes,
    title: "Web Development",
    items: ["React.js", "Node.js", "Express.js", "REST APIs", "Java Web Basics"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["MongoDB", "SQL"],
  },
  {
    icon: Cloud,
    title: "Cloud & Tools",
    items: ["AWS", "Git", "GitHub", "Postman"],
  },
  {
    icon: Workflow,
    title: "Other",
    items: ["Salesforce (Apex, LWC)", "n8n Automation"],
  },
];

function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Toolkit" title="Technical skills" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-2"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <g.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-3 text-lg font-semibold">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it, k) => (
                <motion.span
                  key={it}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 + k * 0.04 + 0.15 }}
                  className="rounded-md border border-border bg-background/50 px-2.5 py-1 text-xs text-muted-foreground transition group-hover:text-foreground"
                >
                  {it}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Experience ---------- */
const EXPERIENCE = [
  {
    role: "MERN Stack Developer Intern",
    company: "Bharat Skillz",
    date: "Aug 2025",
    points: [
      "Built and deployed full-stack web apps using React.js, Node.js, Express.js and MongoDB.",
      "Connected frontend with backend REST APIs and worked with real data.",
      "Fixed bugs and improved app speed and user experience.",
    ],
  },
  {
    role: "Full Stack Development Intern (MERN)",
    company: "SmartBridge + APSCHE",
    date: "Jul 2025",
    points: [
      "Built full-stack applications with React.js on the frontend and Node.js on the backend.",
      "Worked with REST APIs and databases in real project scenarios.",
      "Learned how to work well in a team using modern web development workflows.",
    ],
  },
  {
    role: "Salesforce Developer Intern",
    company: "SmartBridge (Virtual)",
    date: "May – Jul 2025",
    points: [
      "Learned Salesforce basics: data management, security, and process automation.",
      "Completed Apex Specialist and Object Relationships badges.",
      "Practiced building simple workflow automations on the Salesforce platform.",
    ],
  },
];

function Experience() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Journey" title="Experience" />
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
        <div className="space-y-10">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`relative pl-12 md:grid md:grid-cols-2 md:gap-10 md:pl-0 ${
                i % 2 === 1 ? "md:[&>div]:col-start-2" : ""
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute left-4 top-5 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:left-1/2"
              />
              <div
                className={`rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/40 hover:bg-surface-2 ${
                  i % 2 === 0 ? "md:mr-8" : "md:ml-8"
                }`}
              >
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {e.date}
                </div>
                <h3 className="text-lg font-semibold">{e.role}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{e.company}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Projects ---------- */
const PROJECTS = [
  {
    title: "IoT-Based Smart Accident Prevention System",
    tech: ["Raspberry Pi", "IoT", "Ultrasonic", "IR Sensors", "Eye-Blink", "GPS", "ThingSpeak"],
    points: [
      "Smart vehicle safety system built with Raspberry Pi and multiple sensors.",
      "Ultrasonic + IR sensors for obstacle detection and lane monitoring, eye-blink sensor for driver fatigue.",
      "Emergency alerts with live GPS location pushed to the ThingSpeak IoT platform.",
    ],
    icon: Cpu,
    href: "https://github.com/rajeshlobhisetti",
    demo: null as string | null,
  },
  {
    title: "Service Agent Automation (n8n)",
    tech: ["n8n", "Automation", "APIs", "Webhooks"],
    points: [
      "Event-driven automation pipelines built with n8n triggers and integrations.",
      "External services connected via APIs/webhooks for seamless coordination.",
      "First Prize — Code Crown AI Hackathon.",
    ],
    icon: Workflow,
    href: "https://github.com/rajeshlobhisetti",
    demo: null,
  },
  {
    title: "LBRCE Attendance Bot",
    tech: ["Python", "GitHub Actions", "Telegram API", "Web Scraping"],
    points: [
      "Automated LBRCE ERP attendance tracker with Telegram notifications.",
      "Runs daily at 7 AM & 4 PM IST on a GitHub Actions cron schedule.",
      "Sends attendance summaries straight to your Telegram inbox.",
    ],
    icon: Bot,
    href: "https://github.com/rajeshlobhisetti/lbrce-attendance-bot",
    demo: null,
  },
  {
    title: "TravelMate — Trip Planner",
    tech: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    points: [
      "Full-stack MERN app for planning and organising trips end-to-end.",
      "React frontend and Node/Express backend with a dedicated API service.",
      "Deployed on Vercel with a split frontend + backend architecture.",
    ],
    icon: Plane,
    href: "https://github.com/rajeshlobhisetti/travelmate",
    demo: "https://travelmate-five-kappa.vercel.app",
  },
  {
    title: "HouseHunt — Rental Home Finder",
    tech: ["MERN", "REST API", "MongoDB"],
    points: [
      "MERN-based rental platform to find the best rental homes.",
      "Search, filter and browse listings backed by a MongoDB store.",
      "Practiced auth flows, protected routes and CRUD APIs.",
    ],
    icon: Home,
    href: "https://github.com/rajeshlobhisetti/Househunt-FindingtheBestRentalHome",
    demo: null,
  },
  {
    title: "CineNext — Movie Updates",
    tech: ["HTML", "CSS", "JavaScript"],
    points: [
      "Movie updates site with information on latest movies, actors and roles.",
      "Built with vanilla HTML, CSS and JavaScript — no framework.",
      "Focus on clean UI, responsive layout and fast browsing.",
    ],
    icon: Film,
    href: "https://github.com/rajeshlobhisetti/MOVIE-UPDATES",
    demo: "https://movie-updates-eight.vercel.app",
  },
  {
    title: "Rental Home Platform",
    tech: ["MERN", "REST API"],
    points: [
      "Iteration on the rental-home idea with a cleaner data model.",
      "Practiced separating listings, owners and tenants into clear collections.",
      "Reused patterns from HouseHunt for filters and detail pages.",
    ],
    icon: Home,
    href: "https://github.com/rajeshlobhisetti/Rental-Home",
    demo: null,
  },
  {
    title: "New — Web Experiment",
    tech: ["HTML", "CSS", "JavaScript"],
    points: [
      "Small web experiment used as a testbed for layout and styling ideas.",
      "Deployed on Vercel to iterate quickly.",
    ],
    icon: Globe,
    href: "https://github.com/rajeshlobhisetti/New",
    demo: "https://new-brown-beta.vercel.app",
  },
  {
    title: "Backend Service",
    tech: ["Node.js", "Express", "REST API"],
    points: [
      "Standalone Node/Express backend used across smaller full-stack experiments.",
      "REST endpoints, middleware and env-based configuration.",
    ],
    icon: Server,
    href: "https://github.com/rajeshlobhisetti/Backend",
    demo: null,
  },
];

function Projects() {
  return (
    <Section id="projects">
      <SectionHeading eyebrow="Work" title="Projects from GitHub" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-2 hover:glow-ring"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/25" />
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <p.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-border bg-background/50 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    Live
                  </a>
                )}
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${p.title} on GitHub`}
                  className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background/50 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold leading-snug">{p.title}</h3>
            <ul className="mb-5 space-y-1.5 text-sm text-muted-foreground">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-background/50 px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-center"
      >
        <a
          href="https://github.com/rajeshlobhisetti"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium transition hover:border-primary/40 hover:text-primary"
        >
          <Github className="h-4 w-4" /> See all repositories on GitHub
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </Section>
  );
}


/* ---------- Certifications ---------- */
const CERTS = [
  "AWS Certified Cloud Practitioner",
  "Python Essentials 1 & 2 — Cisco Networking Academy",
  "Introduction to Modern AI — Cisco Networking Academy",
  "The Joy of Computing using Python — NPTEL (IIT Madras) • Elite, 77%",
  "AI Associate — Salesforce",
  "Advanced Programming in C — Cisco",
  "Python Foundation Course — Infosys",
];

function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading eyebrow="Learning" title="Certifications" />
      <div className="grid gap-3 sm:grid-cols-2">
        {CERTS.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface-2"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
              <Award className="h-5 w-5" />
            </div>
            <p className="text-sm">{c}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Achievements ---------- */
const ACHIEVEMENTS = [
  { title: "First Prize", detail: "Automated Service Agents — Code Crown AI Hackathon" },
  { title: "Second Prize", detail: "Web Development Hackathon — MERN Stack" },
  { title: "NSS Coordinator", detail: "Served during AP 2024 Elections" },
  { title: "Class Representative", detail: "III Semester" },
];

function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading eyebrow="Wins" title="Achievements" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-2"
          >
            <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition group-hover:scale-110">
              <Trophy className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <Section id="contact">
      <SectionHeading eyebrow="Contact" title="Let's build something." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-xl space-y-4"
      >
        <p className="text-muted-foreground">
          I'm looking for full-stack developer internships and new-grad roles. The fastest way
          to reach me is email — happy to chat about projects, teams, or opportunities.
        </p>
        <a href="/myportfolio/Rajesh_Lobhisetti_Resume.pdf" download="Rajesh_Lobhisetti_Resume.pdf" className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition hover:border-primary/40">
          <Download className="h-5 w-5 text-primary" /> Download Resume
        </a>
        <a
          href="mailto:rajeshlobhisetti@gmail.com"
          className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition hover:border-primary/40"
        >
          <Mail className="h-5 w-5 text-primary" />
          <span className="text-sm">rajeshlobhisetti@gmail.com</span>
        </a>
        <a
          href="tel:+916300321330"
          className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition hover:border-primary/40"
        >
          <Phone className="h-5 w-5 text-primary" />
          <span className="text-sm">+91 6300321330</span>
        </a>
        <div className="flex gap-2 pt-2">
          <a
            href="https://www.linkedin.com/in/rajeshlobhis/"
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface transition hover:border-primary/40 hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/rajeshlobhisetti"
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface transition hover:border-primary/40 hover:text-primary"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

/* ---------- Footer + Back to top ---------- */
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Built by Rajesh Lobhisetti · © {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/rajeshlobhisetti"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rajeshlobhis/"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="#top"
            className="text-xs text-muted-foreground transition hover:text-foreground"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ---------- Intro overlay ---------- */
function Intro() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-primary/15 text-lg font-bold text-primary ring-1 ring-primary/30">
              RL
            </span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold tracking-tight"
            >
              Rajesh Lobhisetti
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Scroll spy ---------- */
function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const opts = { rootMargin: "-40% 0px -55% 0px", threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, opts);
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------- Page ---------- */
export function Portfolio() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection();
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Intro />
      <CursorBlob />
      <Navbar theme={theme} toggle={toggle} active={active} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

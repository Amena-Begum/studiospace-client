"use client";

import { ChevronDown, LayoutDashboard, LogOut, Menu, PlusSquare, X, CalendarCheck, Building2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { authHref } from "@/lib/returnTo";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", href: "/", match: (p: string, h: string) => p === "/" && !h },
  { label: "Explore Studios", href: "/studios", match: (p: string) => p.startsWith("/studios") },
  { label: "How It Works", href: "/#how-it-works", match: (p: string, h: string) => p === "/" && h === "#how-it-works" },
  { label: "About Us", href: "/#about", match: (p: string, h: string) => p === "/" && h === "#about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hash, setHash] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    const away = (e: MouseEvent) => menuRef.current && !menuRef.current.contains(e.target as Node) && setMenu(false);
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
      setHash(`#${id}`);
    } else if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", "/");
      setHash("");
    }
  };

  const toAuth = (e: React.MouseEvent, base: "/login" | "/register") => {
    e.preventDefault();
    setOpen(false);
    router.push(authHref(base));
  };

  const onLogout = async () => {
    setMenu(false);
    setOpen(false);
    try {
      await logout();
      toast.success("You have been logged out.");
      router.push("/");
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  };

  const dropdown = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Add New Studio", href: "/add-studio", icon: PlusSquare },
    { label: "My Studio Listings", href: "/my-listings", icon: Building2 },
    { label: "My Bookings", href: "/my-bookings", icon: CalendarCheck },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => {
            const active = l.match(pathname, hash);
            return (
              <Link
                key={l.label}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.92rem] font-semibold transition-colors ${active ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                {l.label}
                <span className={`absolute inset-x-4 -bottom-0.5 h-[2.5px] rounded-full bg-accent transition-transform duration-200 ${active ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {loading ? (
            <span className="skeleton h-10 w-10 !rounded-full" aria-hidden />
          ) : user ? (
            <div className="relative" ref={menuRef} onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setMenu(true)} onMouseLeave={() => window.matchMedia("(hover: hover)").matches && setMenu(false)}>
              <button
                type="button"
                onClick={() => setMenu((m) => !m)}
                aria-haspopup="menu"
                aria-expanded={menu}
                aria-label={`Account menu for ${user.name}`}
                className="flex items-center gap-1.5 rounded-full border border-line bg-surface p-1 pr-2 transition hover:border-accent"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.photoURL || `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(user.name)}`} alt="" className="h-8 w-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                <ChevronDown size={14} className={`transition ${menu ? "rotate-180" : ""}`} />
              </button>
              {menu && (
                <div role="menu" className="absolute right-0 top-full w-64 pt-2">
                  <div className="card rise overflow-hidden p-2">
                    <p className="truncate px-3 pb-2 pt-2 font-display text-lg font-semibold">{user.name}</p>
                    <p className="truncate px-3 pb-2 text-xs text-muted">{user.email}</p>
                    <div className="border-t border-line pt-1">
                      {dropdown.map((d) => (
                        <Link key={d.href} href={d.href} role="menuitem" onClick={() => setMenu(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-surface2">
                          <d.icon size={17} className="text-accent" />
                          {d.label}
                        </Link>
                      ))}
                      <button type="button" role="menuitem" onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold hover:bg-surface2">
                        <LogOut size={17} className="text-accent" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" onClick={(e) => toAuth(e, "/login")} className="btn btn-ghost !px-5 !py-2.5">Login</Link>
              <Link href="/register" onClick={(e) => toAuth(e, "/register")} className="btn btn-primary !px-5 !py-2.5">Register</Link>
            </div>
          )}
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface lg:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="rise border-t border-line bg-bg px-4 pb-5 pt-3 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} onClick={(e) => go(e, l.href)} aria-current={l.match(pathname, hash) ? "page" : undefined} className={`block border-b border-line py-3.5 text-lg font-semibold ${l.match(pathname, hash) ? "text-accent" : ""}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {!loading && !user && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/login" onClick={(e) => toAuth(e, "/login")} className="btn btn-ghost">Login</Link>
              <Link href="/register" onClick={(e) => toAuth(e, "/register")} className="btn btn-primary">Register</Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

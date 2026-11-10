"use client";

import { CalendarHeart, ClipboardList, LogOut, Menu, PlusSquare, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { authHref } from "@/lib/returnTo";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const dropdown = [
  { label: "Create Event", href: "/create-event", icon: PlusSquare },
  { label: "Manage Events", href: "/manage-events", icon: ClipboardList },
  { label: "Joined Events", href: "/joined-events", icon: CalendarHeart },
  { label: "My Profile", href: "/profile", icon: UserRound },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const eventsActive = pathname.startsWith("/events");

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    const away = (e: MouseEvent) => menuRef.current && !menuRef.current.contains(e.target as Node) && setMenu(false);
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, []);

  const toLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    router.push(authHref("/login"));
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

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <Link
            href="/events"
            aria-current={eventsActive ? "page" : undefined}
            className={`relative rounded-full px-4 py-2 text-[0.92rem] font-semibold transition-colors ${eventsActive ? "text-ink" : "text-muted hover:text-ink"}`}
          >
            Upcoming Events
            <span className={`absolute inset-x-4 -bottom-0.5 h-[2.5px] rounded-full bg-accent transition-transform duration-200 ${eventsActive ? "scale-x-100" : "scale-x-0"}`} />
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {loading ? (
            <span className="skeleton h-10 w-10 !rounded-full" aria-hidden />
          ) : user ? (
            <>
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenu((m) => !m)}
                  aria-haspopup="menu"
                  aria-expanded={menu}
                  aria-label={`Account menu for ${user.name}`}
                  title={user.name}
                  className="group relative block rounded-full border border-line bg-surface p-1 transition hover:border-accent"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.photoURL || `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(user.name)}`} alt="" className="h-8 w-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                  {!menu && (
                    <span role="tooltip" className="pointer-events-none absolute right-0 top-full z-10 mt-2 hidden max-w-[14rem] truncate whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-bg shadow-lg group-hover:block">
                      {user.name}
                    </span>
                  )}
                </button>
                {menu && (
                  <div role="menu" className="absolute right-0 top-full w-60 pt-2">
                    <div className="card rise overflow-hidden p-2">
                      <p className="truncate px-3 pb-1 pt-2 font-display text-lg font-semibold">{user.name}</p>
                      <p className="truncate px-3 pb-2 text-xs text-muted">{user.email}</p>
                      <div className="border-t border-line pt-1">
                        {dropdown.map((d) => (
                          <Link key={d.href} href={d.href} role="menuitem" onClick={() => setMenu(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-surface2">
                            <d.icon size={17} className="text-accent" />
                            {d.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button type="button" onClick={onLogout} className="btn btn-ghost !px-3 !py-2.5 sm:!px-5" aria-label="Logout">
                <LogOut size={16} className="sm:hidden" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link href="/login" onClick={toLogin} className="btn btn-primary !px-5 !py-2.5">Login</Link>
          )}
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface md:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="rise border-t border-line bg-bg px-4 pb-5 pt-3 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            <li>
              <Link href="/events" aria-current={eventsActive ? "page" : undefined} className={`block border-b border-line py-3.5 text-lg font-semibold ${eventsActive ? "text-accent" : ""}`}>
                Upcoming Events
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

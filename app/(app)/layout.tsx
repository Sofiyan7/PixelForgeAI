"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
  Trash2,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [theme, setTheme] = useState("dark");
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "WARNING: Are you sure you want to permanently delete your account? This will delete all your uploaded videos from Cloudinary, your database records, and your login account from Clerk. This action cannot be undone."
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Your account has been successfully deleted.");
        await signOut();
        router.push("/sign-in");
      } else {
        const errData = await response.json();
        alert(`Failed to delete account: ${errData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <header className="w-full bg-base-200">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <MenuIcon />
              </label>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <Link href="/" onClick={handleLogoClick}>
                <div className="btn btn-ghost normal-case text-2xl font-bold tracking-tight cursor-pointer flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-white text-sm font-black shadow-md shadow-teal-500/10">
                    PF
                  </div>
                  <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                    PixelForge AI
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex-none flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle text-zinc-400 hover:text-white"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-400" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-400" />
                )}
              </button>
              {user && (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost flex items-center gap-2 px-2 hover:bg-zinc-800 rounded-lg cursor-pointer normal-case"
                  >
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full">
                        <img
                          src={user.imageUrl}
                          alt="user avatar"
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium hidden sm:inline-block max-w-[150px] truncate text-white">
                      {user.username || user.emailAddresses[0].emailAddress}
                    </span>
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-2xl bg-zinc-900 border border-zinc-800 rounded-xl w-56 mt-3 z-50 text-zinc-200"
                  >
                    <li className="menu-title px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      User Settings
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <LogOutIcon className="w-4 h-4 text-zinc-400" />
                        Sign Out
                      </button>
                    </li>
                    <li className="border-t border-zinc-800 mt-1 pt-1">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 w-64 h-full flex flex-col">
          <div className="flex items-center justify-center py-4">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>
          <ul className="menu p-4 w-full text-base-content flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {user && (
            <div className="p-4">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
      {/* Fullscreen Deleting Overlay */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
          <span className="loading loading-spinner loading-lg text-red-500"></span>
          <p className="text-white mt-4 font-semibold text-lg animate-pulse">
            Permanently deleting your account and assets...
          </p>
        </div>
      )}
    </div>
  );
}

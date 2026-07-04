import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full bg-[#030712] flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-md z-10 flex flex-col items-center">
        {/* Brand Header */}
        <div className="mb-8 flex items-center gap-3 bg-zinc-900/40 border border-zinc-800/40 px-5 py-3 rounded-2xl backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-white text-base font-black shadow-md shadow-teal-500/20">
            PF
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white leading-none">PixelForge AI</h2>
            <p className="text-[10px] text-zinc-500 font-medium tracking-wide mt-1 uppercase">Media Intelligence SaaS</p>
          </div>
        </div>

        <SignUp
          appearance={{
            variables: {
              colorPrimary: "#14b8a6", // Teal 500
              colorBackground: "#09090b", // Zinc 955
              colorText: "#f4f4f5", // Zinc 100
              colorTextSecondary: "#a1a1aa", // Zinc 400
              colorInputBackground: "#121214", // Zinc 900
              colorInputText: "#ffffff",
              colorBorder: "#1f1f23", // Zinc 800
            },
            elements: {
              card: "shadow-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-xl rounded-3xl w-full p-6",
              headerTitle: "text-2xl font-bold tracking-tight text-white text-center",
              headerSubtitle: "text-zinc-400 text-sm mt-1 text-center",
              socialButtonsBlockButton: "bg-zinc-900 hover:bg-zinc-855 text-white border border-zinc-800 transition-all duration-200 py-2.5",
              socialButtonsBlockButtonText: "text-white font-medium",
              formButtonPrimary: "bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white transition-all duration-200 border-none shadow-lg shadow-teal-500/10 py-2.5 font-semibold",
              formFieldLabel: "text-zinc-300 font-medium text-xs uppercase tracking-wider mb-1",
              formFieldInput: "bg-zinc-900 border border-zinc-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl text-white py-2 px-3 transition-all",
              dividerLine: "bg-[#1f1f23]",
              dividerText: "text-zinc-500 text-xs uppercase tracking-wider",
              formFieldInputShowPasswordButton: "text-zinc-400 hover:text-white",
              footer: "hidden", // Completely hide the footer containing Clerk branding and Dev mode banner
              main: "gap-4",
            },
            layout: {
              unsafe_disableDevelopmentModeWarnings: true, // Disable development mode warnings
            }
          }}
        />

        {/* Custom Clean Footer */}
        <p className="text-sm text-zinc-400 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
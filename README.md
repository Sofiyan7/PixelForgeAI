# Cloudinary Media Showcase (AI-Saas)

A modern, full-stack Media Software-as-a-Service (SaaS) application built with Next.js, Clerk, Cloudinary, and Prisma. The application allows users to upload videos with progress tracking, optimize and preview media with AI-driven overlays, crop images dynamically for social media presets, and manage their personal media libraries in fully isolated accounts.

---

## 🚀 Key Features

*   **🔒 Secure Authentication:** Implements [Clerk](https://clerk.com/) for authentication with custom-styled, dark-themed sign-in/up routes matching the application shell.
*   **📂 Isolated User Spaces:** Media uploads (videos, images, history lists) are fully partitioned per user at the database and API level.
*   **🎥 Video Compression & Storage:**
    *   Determinate progress bars tracking upload chunks using Axios hooks.
    *   Automatic video compression and optimization (outputting optimized MP4 streams) using Cloudinary.
    *   Asset records and sizes (original vs compressed) stored in Neon PostgreSQL.
*   **👁️ Smart Hover Previews:** Media cards display automatic video previews (`e_preview` transformations) on hover and fall back to custom-cropped video thumbnails.
*   **▶️ On-Site Playback & Downloads:**
    *   Clicking a video opens a responsive modal video player with native controls.
    *   Direct downloads for the full-resolution optimized video file.
*   **✂️ Social Media Image Creator:**
    *   Upload images and crop them dynamically based on preset templates (Instagram Square 1:1, Instagram Portrait 4:5, Twitter Post 16:9, Twitter Header 3:1, Facebook Cover).
    *   Utilizes Cloudinary's AI subject tracking (`gravity="auto"`) to ensure key visual elements are preserved when cropped.
    *   Past image uploads are saved in a gallery history list, allowing users to reload them into the workspace or delete them later.
*   **🗑️ Purge & Account Deletion:**
    *   Purges assets from Cloudinary and deletes database records when deleting individual files.
    *   A permanent **Delete Account** option in the top-right profile settings dropdown. Clicking this purges the user's Postgres database rows, deletes all their files from Cloudinary storage, deletes their account from Clerk, and signs them out.

---

## 🛠️ Technology Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router with Turbopack)
*   **Database ORM:** [Prisma ORM](https://www.prisma.io/)
*   **Database Host:** [Neon Database](https://neon.tech/) (Serverless Postgres)
*   **Media Hosting & Transforms:** [Cloudinary API](https://cloudinary.com/) (`next-cloudinary` & server SDK)
*   **Styling:** [TailwindCSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) (using the `dark` theme config)
*   **Icons:** [Lucide React](https://lucide.dev/)

---

## ⚙️ Environment Configuration

Create a `.env.local` file at the root of the project and specify the following variables:

```env
# Prisma Neon Database Connection
DATABASE_URL="postgresql://<username>:<password>@<host>/<database>?sslmode=require"

# Cloudinary Integration API Keys
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
```

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
Sync the local type declarations with the database schema:
```bash
npx prisma generate
```

### 3. Apply Schema Migrations
Deploy the database schema (creating `Video` and `Image` models) to Neon Postgres:
```bash
npx prisma migrate dev
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📁 Repository Structure

```
├── app/
│   ├── (app)/            # Authenticated application route group
│   │   ├── home/         # Video feed page
│   │   ├── social-share/ # AI Image resizer & gallery
│   │   ├── video-upload/ # Video uploader with progress tracking
│   │   └── layout.tsx    # App layout shell containing sidebar and profile settings dropdown
│   ├── (auth)/           # Authentication route group (Sign-in/Sign-up pages)
│   ├── api/              # API Route endpoints
│   │   ├── image-upload/ # Image upload processor
│   │   ├── video-upload/ # Video upload processor
│   │   ├── videos/       # GET/DELETE routes for video feeds
│   │   ├── images/       # GET/DELETE routes for image galleries
│   │   └── user/delete/  # POST/DELETE route for account removal clean-ups
│   ├── layout.tsx        # Root HTML layout with ClerkProvider
│   └── globals.css       # Tailwind utility classes
├── components/           # Reusable UI components (VideoCard, etc.)
├── prisma/               # Schema configuration and database migrations
└── types/                # TypeScript interface declarations
```

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth, createClerkClient } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Fetch all user videos
        const videos = await prisma.video.findMany({
            where: { userId }
        });

        // 2. Delete all video files from Cloudinary
        for (const video of videos) {
            try {
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.destroy(
                        video.publicId,
                        { resource_type: "video" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                });
            } catch (clError) {
                console.error(`Failed to delete Cloudinary asset ${video.publicId}`, clError);
                // Continue with other deletions even if one fails
            }
        }

        // 3. Delete database records from NeonDB
        await prisma.video.deleteMany({
            where: { userId }
        });

        // 4. Fetch all user images
        const images = await prisma.image.findMany({
            where: { userId }
        });

        // 5. Delete all image files from Cloudinary
        for (const image of images) {
            try {
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.destroy(
                        image.publicId,
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                });
            } catch (clError) {
                console.error(`Failed to delete Cloudinary image asset ${image.publicId}`, clError);
            }
        }

        // 6. Delete image database records from NeonDB
        await prisma.image.deleteMany({
            where: { userId }
        });

        // 7. Delete user account from Clerk
        await clerk.users.deleteUser(userId);

        return NextResponse.json({ message: "Account and associated data deleted successfully" });
    } catch (error) {
        console.error("Account deletion failed:", error);
        return NextResponse.json({ error: "Account deletion failed" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "publicId" TEXT NOT NULL,
    "originalSize" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

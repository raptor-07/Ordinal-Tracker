-- CreateTable
CREATE TABLE "User" (
    "UId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UId")
);

-- CreateTable
CREATE TABLE "User_Collection" (
    "UId" INTEGER NOT NULL,
    "Collection_Id" INTEGER NOT NULL,
    "Watchlist" BOOLEAN NOT NULL,

    CONSTRAINT "User_Collection_pkey" PRIMARY KEY ("UId")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "Wallet_Id" SERIAL NOT NULL,
    "UId" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("Wallet_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User_Collection" ADD CONSTRAINT "User_Collection_UId_fkey" FOREIGN KEY ("UId") REFERENCES "User"("UId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Collection" ADD CONSTRAINT "User_Collection_Collection_Id_fkey" FOREIGN KEY ("Collection_Id") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_UId_fkey" FOREIGN KEY ("UId") REFERENCES "User"("UId") ON DELETE RESTRICT ON UPDATE CASCADE;

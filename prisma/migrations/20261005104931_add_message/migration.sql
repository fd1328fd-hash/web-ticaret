-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "icerik" TEXT NOT NULL,
    "okundu" BOOLEAN NOT NULL DEFAULT false,
    "gonderenId" TEXT NOT NULL,
    "aliciId" TEXT NOT NULL,
    "ilanId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_gonderenId_fkey" FOREIGN KEY ("gonderenId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_aliciId_fkey" FOREIGN KEY ("aliciId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "Listing" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

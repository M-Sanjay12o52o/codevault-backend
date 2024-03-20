-- CreateTable
CREATE TABLE "CodeSnippet" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "codeLanguage" TEXT NOT NULL,
    "stdin" TEXT,
    "sourceCode" TEXT NOT NULL,

    CONSTRAINT "CodeSnippet_pkey" PRIMARY KEY ("id")
);

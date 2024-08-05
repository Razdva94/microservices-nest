"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const filesToCopy = [
    { src: './prisma/schema.prisma', dest: './dist/prisma/schema.prisma' },
    { src: './.env', dest: './dist/.env' },
];
filesToCopy.forEach((file) => {
    const destDir = (0, path_1.dirname)(file.dest);
    if (!(0, fs_1.existsSync)(destDir)) {
        (0, fs_1.mkdirSync)(destDir, { recursive: true });
    }
    (0, fs_1.copyFileSync)(file.src, file.dest);
    console.log(`Copied ${file.src} to ${file.dest}`);
});
//# sourceMappingURL=copy-files.js.map
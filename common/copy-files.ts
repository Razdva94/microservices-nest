import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const filesToCopy = [
  { src: './prisma/schema.prisma', dest: './dist/prisma/schema.prisma' },
  { src: './.env', dest: './dist/.env' },
];

filesToCopy.forEach((file) => {
  const destDir = dirname(file.dest);

  // Создаем директорию, если она не существует
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  // Копируем файл
  copyFileSync(file.src, file.dest);
  console.log(`Copied ${file.src} to ${file.dest}`);
});

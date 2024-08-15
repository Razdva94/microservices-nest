import { copyFileSync, cpSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const filesToCopy = [
  { src: './prisma/schema.prisma', dest: './dist/prisma/schema.prisma' },
  { src: './prisma/migrations', dest: './dist/prisma/migrations' },
  { src: './.env', dest: './dist/.env' },
];

filesToCopy.forEach((file) => {
  const destDir = dirname(file.dest);

  // Создаем директорию, если она не существует
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  // Копируем файл
  if (file.src === './prisma/migrations') {
    cpSync(file.src, file.dest, { recursive: true });
    console.log(`Copied directory ${file.src} to ${file.dest}`);
  } else {
    copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.src} to ${file.dest}`);
  }
});

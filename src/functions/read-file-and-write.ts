import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function readFile(path: string) {
  const dataPath = join(__dirname, '..', '..', 'src', path);
  const dataText = readFileSync(dataPath);
  const data = dataText.toString();
  return data;
}

export function writeFile(path: string, data: string) {
  const writePath = join(__dirname, '..', '..', 'src', path);
  writeFileSync(writePath, data);
}

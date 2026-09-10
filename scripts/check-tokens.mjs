/**
 * Menegakkan FR-002: nilai visual yang sudah punya token tidak boleh ditulis
 * sebagai angka lepas di komponen.
 *
 * Dijalankan sebagai bagian dari gerbang kualitas, bukan sekadar disepakati.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components"];
const CHECKS = [
  { name: "warna heksadesimal lepas", re: /#[0-9a-fA-F]{3,8}\b/g },
  { name: "nilai piksel lepas", re: /\[[0-9]+px\]/g },
];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (full.endsWith(".tsx") || full.endsWith(".ts")) out.push(full);
  }
  return out;
}

const findings = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const source = readFileSync(file, "utf8");
    source.split("\n").forEach((line, i) => {
      // Baris komentar dikecualikan: penjelasan boleh menyebut nilai.
      if (/^\s*(\*|\/\/)/.test(line)) return;
      for (const check of CHECKS) {
        for (const m of line.matchAll(check.re)) {
          findings.push(`${relative(process.cwd(), file)}:${i + 1} ${check.name}: ${m[0]}`);
        }
      }
    });
  }
}

if (findings.length) {
  console.error("Nilai visual lepas ditemukan. Jadikan token di app/globals.css:\n");
  for (const f of findings) console.error("  " + f);
  process.exit(1);
}
console.log("Konsistensi token: bersih.");

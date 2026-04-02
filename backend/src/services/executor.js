import { execFile } from "child_process";

function parsePhpCode(code) {
  let cleanCode = code.trim();

  // Remove <?php opening tag
  cleanCode = cleanCode.replace(/^<\?php\s*/i, "");

  // Remove ?> closing tag
  cleanCode = cleanCode.replace(/\s*\?>$/, "");

  return cleanCode;
}

export function executePHP(code) {
  if (!code) {
    return Promise.resolve({
      output: "",
      error: "No code provided"
    });
  }

  const cleanCode = parsePhpCode(code);

  return new Promise((resolve) => {
    execFile(
      "docker",
      [
        "run",
        "--rm",
        "--memory=128m",
        "--cpus=0.5",
        "--network=none",
        "--pids-limit=64",
        "--read-only",
        "php:8.3-cli",
        "php",
        "-r",
        cleanCode
      ],
      { timeout: 2000 },
      (err, stdout, stderr) => {
        resolve({
          output: stdout,
          error: stderr || err?.message || null
        });
      }
    );
  });
}

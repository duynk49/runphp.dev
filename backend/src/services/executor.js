import { execFile } from "child_process";
import { mkdtemp, writeFile, rm } from "fs/promises";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";

function parsePhpCode(code) {
  let cleanCode = code.trim();

  // Remove <?php opening tag
  cleanCode = cleanCode.replace(/^<\?php\s*/i, "");

  // Remove ?> closing tag
  cleanCode = cleanCode.replace(/\s*\?>$/, "");

  return cleanCode;
}

export async function executePHP(code) {
  if (!code) {
    return {
      output: "",
      error: "No code provided"
    };
  }

  const cleanCode = parsePhpCode(code);
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "runphp-"));
  const codePath = path.join(tempDir, `code-${randomUUID()}.php`);
  const containerName = `runphp-${randomUUID()}`;

  try {
    await writeFile(codePath, `<?php\n${cleanCode}\n`, "utf8");

    return await new Promise((resolve) => {
      let isSettled = false;

      const settleOnce = (result) => {
        if (isSettled) {
          return;
        }

        isSettled = true;
        clearTimeout(timeoutId);
        resolve(result);
      };

      const timeoutId = setTimeout(() => {
        dockerRunProcess.kill("SIGKILL");
        execFile("docker", ["kill", containerName], () => {
          // Ignore kill errors: container may have already exited.
        });

        settleOnce({
          output: "",
          error: "Execution timed out after 3 seconds"
        });
      }, 3000);

      const dockerRunProcess = execFile(
        "docker",
        [
          "run",
          "--rm",
          "--name",
          containerName,
          "--memory=128m",
          "--cpus=0.5",
          "--network=none",
          "--pids-limit=64",
          "--read-only",
          "-v",
          `${codePath}:/sandbox/code.php:ro`,
          "runphp-8.2"
        ],
        { timeout: 0 },
        (err, stdout, stderr) => {
          settleOnce({
            output: stdout,
            error: stderr || err?.message || null
          });
        }
      );
    });
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

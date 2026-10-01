import assert from "node:assert/strict";
import net from "node:net";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { setTimeout as delay } from "node:timers/promises";

// Local SMTP sink: no mail leaves this machine and no real credentials are used.
let mode = "accept";
const messages = [];
const smtp = net.createServer((socket) => {
  socket.setEncoding("utf8");
  socket.write("220 localhost test SMTP\r\n");
  let buffer = "",
    data = "",
    inData = false;
  socket.on("data", (chunk) => {
    buffer += chunk;
    while (buffer.includes("\r\n")) {
      const end = buffer.indexOf("\r\n"),
        line = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      if (inData) {
        if (line === ".") {
          messages.push(data);
          data = "";
          inData = false;
          socket.write("250 2.0.0 Accepted\r\n");
        } else data += line + "\r\n";
      } else if (/^EHLO|^HELO/.test(line))
        socket.write("250-localhost\r\n250 AUTH PLAIN\r\n");
      else if (/^AUTH/.test(line)) socket.write("235 2.7.0 Authenticated\r\n");
      else if (/^RCPT/.test(line) && mode === "reject")
        socket.write("550 5.1.1 Test rejection\r\n");
      else if (line === "DATA") {
        inData = true;
        socket.write("354 End with a dot\r\n");
      } else if (line === "QUIT") {
        socket.end("221 Bye\r\n");
      } else socket.write("250 OK\r\n");
    }
  });
  socket.on("error", () => {});
});
smtp.listen(0, "127.0.0.1");
await once(smtp, "listening");
const smtpPort = smtp.address().port;
const port = Number(process.env.TEST_PORT || 3101);
const base = `http://127.0.0.1:${port}`;
let child;
async function start(configured) {
  child = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      env: {
        ...process.env,
        SMTP_HOST: "127.0.0.1",
        SMTP_PORT: String(smtpPort),
        SMTP_USER: "sender@example.com",
        SMTP_PASS: configured ? "local-test-only" : "",
        CONTACT_TO_EMAIL: "inbox@example.com",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let logs = "";
  child.stderr.on("data", (chunk) => {
    logs += chunk;
  });
  for (let i = 0; i < 60; i++) {
    if (child.exitCode !== null) throw new Error(`Test server failed: ${logs}`);
    try {
      if ((await fetch(base + "/contact")).ok) return;
    } catch {}
    await delay(100);
  }
  throw new Error("Test server did not start.");
}
async function stop() {
  if (child && child.exitCode === null) {
    child.kill("SIGTERM");
    await once(child, "exit");
  }
}
const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  subject: "Website project",
  message: "Please help build a responsive custom WordPress website.",
  service: "WordPress & CMS",
  consent: true,
  website: "",
};
async function post(body, origin = base, type = "application/json") {
  const response = await fetch(base + "/api/contact", {
    method: "POST",
    headers: { origin, "Content-Type": type },
    body: JSON.stringify(body),
  });
  return {
    status: response.status,
    data: await response.json(),
    headers: response.headers,
  };
}
try {
  await start(true);
  assert.equal((await post(valid, "https://unrelated.example")).status, 403);
  assert.equal((await post(valid, base, "text/plain")).status, 415);
  assert.equal((await post({ ...valid, email: "not-an-email" })).status, 400);
  assert.equal((await post({ ...valid, consent: false })).status, 400);
  assert.equal((await post({ ...valid, website: "spam" })).status, 400);
  assert.equal(
    (await post({ ...valid, message: "a".repeat(30000) })).status,
    413,
  );
  const sent = await post(valid);
  assert.equal(sent.status, 200);
  assert.equal(sent.data.ok, true);
  assert.equal(messages.length, 1);
  assert.match(messages[0], /Reply-To: Test Visitor <visitor@example.com>/);
  assert.match(messages[0], /To: inbox@example.com/);
  assert.match(messages[0], /responsive custom WordPress website/);
  mode = "reject";
  assert.equal((await post(valid)).status, 502);
  mode = "accept";
  for (let i = 0; i < 3; i++) assert.equal((await post(valid)).status, 200);
  const limited = await post(valid);
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "900");
  await stop();
  await start(false);
  const unconfigured = await post(valid);
  assert.equal(unconfigured.status, 503);
  assert.equal(unconfigured.data.ok, false);
  console.log(
    "PASS: SMTP delivery, Reply-To, validation, origin checks, size limits, spam field, rate limit, provider failure, and missing configuration.",
  );
} finally {
  await stop();
  await new Promise((resolve) => smtp.close(resolve));
}

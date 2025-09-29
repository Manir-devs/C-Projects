const owner = "Manir-devs";
const repo = "C-Projects";

// --- Utility ---
function escapeHtml(text) {
  return text.replace(/&/g,"&amp;")
             .replace(/</g,"&lt;")
             .replace(/>/g,"&gt;");
}

async function fetchContents(path = "") {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
}

async function loadRootDirs() {
  const items = await fetchContents("");
  const dirs = items.filter(i => i.type === "dir");
  const container = document.querySelector(".container");
  container.innerHTML = dirs.map(d =>
    `<button onclick="window.location='Ignore-Me/files.html?dir=${encodeURIComponent(d.path)}'">${d.name}</button>`
  ).join("");
}

async function loadFilesPage() {
  const params = new URLSearchParams(window.location.search);
  const dir = params.get("dir");
  if (!dir) return;
  document.querySelector("h2").innerText = `Directory: ${dir}`;

  const items = await fetchContents(dir);
  const files = items.filter(i => i.type === "file");

  let html = "";
  for (let f of files) {
    const meta = await fetchContents(f.path);
    let content = atob(meta.content.replace(/\n/g,""));
    let lines = content.split("\n");
    let title = lines[0].startsWith("//") ? lines[0].slice(2).trim() : f.name;
    html += `<button onclick="window.location='code.html?path=${encodeURIComponent(f.path)}'">${title}</button>`;
  }
  document.querySelector(".container").innerHTML = html;
}

async function loadCodePage() {
  const params = new URLSearchParams(window.location.search);
  const path = params.get("path");
  if (!path) return;

  const meta = await fetchContents(path);
  let content = atob(meta.content.replace(/\n/g,""));
  let lines = content.split("\n");
  if (lines[0].startsWith("//")) lines.shift(); // remove first line
  const codeText = lines.join("\n");

  document.querySelector(".container").innerHTML = `
    <button id="copyBtn">Copy</button>
    <pre id="codeBlock">${escapeHtml(codeText)}</pre>
  `;

  document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(codeText);
    alert("Copied!");
  };
}

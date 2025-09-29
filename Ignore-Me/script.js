const owner = "Manir-devs";
const repo = "C-Projects";
const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/`;

function showSpinner(show) {
  document.getElementById("spinner").style.display = show ? "block" : "none";
}

// Breadcrumb builder
function buildBreadcrumb(path) {
  const bc = document.getElementById("breadcrumb");
  if (!bc) return;
  const parts = path ? path.split("/") : [];
  let html = `<a href="../index.html">Home</a>`;
  let link = "";
  parts.forEach((p, i) => {
    link += (i ? "/" : "") + p;
    if (i === parts.length - 1) {
      html += ` / ${p}`;
    } else {
      html += ` / <a href="files.html?path=${encodeURIComponent(link)}">${p}</a>`;
    }
  });
  bc.innerHTML = html;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("GitHub API error " + res.status);
  return res.json();
}
async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch text error " + res.status);
  return res.text();
}

// INDEX PAGE
async function loadIndex() {
  showSpinner(true);
  const data = await fetchJson(apiBase);
  showSpinner(false);

  buildBreadcrumb("");
  const container = document.getElementById("content");
  container.innerHTML = "";

  data.forEach(item => {
    if (item.type === "dir" && item.name !== "Ignore-Me") {
      const btn = document.createElement("button");
      btn.textContent = "📂 " + item.name;
      btn.onclick = () => {
        window.location.href = `Ignore-Me/files.html?path=${encodeURIComponent(item.path)}`;
      };
      container.appendChild(btn);
    }
  });
}

// FILES PAGE
async function initFiles() {
  const params = new URLSearchParams(window.location.search);
  const path = params.get("path");
  if (!path) return;

  buildBreadcrumb(path);
  document.getElementById("dirName").innerText = "📁 " + path;

  showSpinner(true);
  const data = await fetchJson(apiBase + path);
  showSpinner(false);

  const container = document.getElementById("content");
  container.innerHTML = "";

  let fileButtons = [];
  let dirButtons = [];

  for (const item of data) {
    if (item.type === "file") {
      try {
        const text = await fetchText(item.download_url);
        const firstLine = (text.split("\n")[0] || item.name).trim();

        // Properly match format: //NUMBER Some text
        let serial = 9999;
        let title = firstLine;

        const match = firstLine.match(/^\/\/\s*(\d+)\s+(.*)$/);
        if (match) {
          serial = parseInt(match[1], 10);
          title = match[2].trim();
        }

        fileButtons.push({
          serial,
          title: title || item.name,
          path: item.path
        });
      } catch (e) {
        console.error("Error fetching file:", e);
      }
    } else if (item.type === "dir" && item.name !== "Ignore-Me") {
      dirButtons.push(item);
    }
  }

  // Sort files by serial number
  fileButtons.sort((a, b) => a.serial - b.serial);

  // Render file buttons
  fileButtons.forEach(f => {
    const btn = document.createElement("button");
    btn.textContent = `${f.serial}. ${f.title}`;
    btn.onclick = () => {
      window.location.href = `code.html?path=${encodeURIComponent(f.path)}`;
    };
    container.appendChild(btn);
  });

  // Render subdir buttons (after files)
  dirButtons.forEach(d => {
    const btn = document.createElement("button");
    btn.textContent = "📂 " + d.name;
    btn.onclick = () => {
      window.location.href = `files.html?path=${encodeURIComponent(d.path)}`;
    };
    container.appendChild(btn);
  });
}

// CODE PAGE
async function initCode() {
  const params = new URLSearchParams(window.location.search);
  const path = params.get("path");
  if (!path) return;

  buildBreadcrumb(path);
  document.getElementById("fileName").innerText = path;

  showSpinner(true);
  const data = await fetchJson(apiBase + path);
  showSpinner(false);

  const text = await fetchText(data.download_url);
  const lines = text.split("\n");
  if (lines[0].startsWith("//")) lines.shift(); // remove 1st line

  const codeText = lines.join("\n");
  document.getElementById("codeBlock").textContent = codeText;

  document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(codeText);
    alert("Copied!");
  };
}

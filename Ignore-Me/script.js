const repo = "Manir-devs/C-Projects";
const apiBase = "https://api.github.com/repos/" + repo + "/contents/";

function showSpinner(show) {
  const sp = document.getElementById("spinner");
  if (!sp) return;
  sp.style.display = show ? "block" : "none";
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed: " + res.status);
  return await res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch failed: " + res.status);
  return await res.text();
}

async function loadIndex() {
  showSpinner(true);
  const data = await fetchJson(apiBase);
  showSpinner(false);

  const container = document.getElementById("content");
  container.innerHTML = "";

  data.forEach(item => {
    if (item.type === "dir" && item.name !== "Ignore-Me") {
      const btn = document.createElement("button");
      btn.innerText = "📂 " + item.name;
      btn.onclick = () =>
        (window.location.href = `Ignore-Me/files.html?path=${encodeURIComponent(item.path)}`);
      container.appendChild(btn);
    }
  });
}

async function loadFiles(path) {
  showSpinner(true);
  const data = await fetchJson(apiBase + path);
  showSpinner(false);

  document.getElementById("dirName").innerText = "📁 " + path;
  const container = document.getElementById("content");
  container.innerHTML = "";

  for (const item of data) {
    if (item.type === "file" && item.name.endsWith(".c")) {
      try {
        const text = await fetchText(item.download_url);
        const firstLine = (text.split("\n")[0] || item.name).replace(/\/\//, "").trim();

        const btn = document.createElement("button");
        btn.innerText = firstLine;
        btn.onclick = () =>
          (window.location.href = `code.html?path=${encodeURIComponent(item.path)}`);
        container.appendChild(btn);
      } catch (e) {
        console.error("Error fetching file:", e);
      }
    } else if (item.type === "dir" && item.name !== "Ignore-Me") {
      const btn = document.createElement("button");
      btn.innerText = "📂 " + item.name;
      btn.onclick = () =>
        (window.location.href = `files.html?path=${encodeURIComponent(item.path)}`);
      container.appendChild(btn);
    }
  }
}

async function loadCode(path) {
  showSpinner(true);
  const data = await fetchJson(apiBase + path);
  showSpinner(false);

  document.getElementById("fileName").innerText = data.name;

  const text = await fetchText(data.download_url);
  const lines = text.split("\n");
  lines.shift(); // remove 1st line

  document.getElementById("codeBlock").textContent = lines.join("\n");
}

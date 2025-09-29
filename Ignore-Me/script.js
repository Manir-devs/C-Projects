const repo = "Manir-devs/C-Projects";
const apiBase = "https://api.github.com/repos/" + repo + "/contents/";

function showSpinner(show) {
  const sp = document.getElementById("spinner");
  if (!sp) return;
  sp.style.display = show ? "block" : "none";
}

async function loadIndex() {
  showSpinner(true);
  const res = await fetch(apiBase);
  const data = await res.json();
  showSpinner(false);

  const container = document.getElementById("content");
  container.innerHTML = "";

  data.forEach(item => {
    if (item.type === "dir" && item.name !== "Ignore-Me") {
      const btn = document.createElement("button");
      btn.innerText = item.name;
      btn.onclick = () => window.location.href = `Ignore-Me/files.html?path=${item.path}`;
      container.appendChild(btn);
    }
  });
}

async function loadFiles(path) {
  showSpinner(true);
  const res = await fetch(apiBase + path);
  const data = await res.json();
  showSpinner(false);

  document.getElementById("dirName").innerText = "📁 " + path;
  const container = document.getElementById("content");
  container.innerHTML = "";

  data.forEach(async item => {
    if (item.type === "file" && item.name.endsWith(".c")) {
      const fileRes = await fetch(item.download_url);
      const text = await fileRes.text();
      const firstLine = text.split("\n")[0] || item.name;

      const btn = document.createElement("button");
      btn.innerText = firstLine.replace(/\/\//, "").trim();
      btn.onclick = () => window.location.href = `code.html?path=${item.path}`;
      container.appendChild(btn);
    } else if (item.type === "dir" && item.name !== "Ignore-Me") {
      const btn = document.createElement("button");
      btn.innerText = "📂 " + item.name;
      btn.onclick = () => window.location.href = `files.html?path=${item.path}`;
      container.appendChild(btn);
    }
  });
}

async function loadCode(path) {
  showSpinner(true);
  const res = await fetch(apiBase + path);
  const data = await res.json();
  showSpinner(false);

  document.getElementById("fileName").innerText = data.name;

  const fileRes = await fetch(data.download_url);
  const text = await fileRes.text();
  const lines = text.split("\n");
  lines.shift(); // remove 1st line

  document.getElementById("codeBlock").textContent = lines.join("\n");
}

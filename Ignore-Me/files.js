function toggleDrawer() {
  let drawer = document.getElementById("drawer");
  let overlay = document.getElementById("overlay");
  drawer.classList.toggle("active");
  overlay.style.display = drawer.classList.contains("active") ? "block" : "none";
}

function closeDrawer() {
  document.getElementById("drawer").classList.remove("active");
  document.getElementById("overlay").style.display = "none";
}

const owner = "Manir-devs";
const repo = "C-Projects";
const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/`;

function showSpinner(show) {
  document.getElementById("spinner").style.display = show ? "block" : "none";
}

function buildBreadcrumb(path) {
  const bc = document.getElementById("breadcrumb");
  if (!bc) return;
  const parts = path ? path.split("/") : [];
  let html = `<a href="https://Manir-devs.github.io/C-Projects/">Home</a>`;
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

async function initFiles() {
  const params = new URLSearchParams(window.location.search);
  const path = params.get("path");
  if (!path) return;

  buildBreadcrumb(path);
  document.getElementById("dirName").innerText = "" + path;

  showSpinner(true);
  const data = await fetchJson(apiBase + path);
  showSpinner(false);

  const container = document.getElementById("content");
  container.innerHTML = "";

  let filePromises = [];
  let dirButtons = [];

  data.forEach(item => {
    if (item.type === "file") {
      filePromises.push(
        fetchText(item.download_url).then(text => {
          // Extract from <file>...</file> if available
          let fileTagMatch = text.match(/<file>([\s\S]*?)<\/file>/i);
          let titleHtml = "";
          if (fileTagMatch) {
            titleHtml = fileTagMatch[1].trim();
          } else {
            const firstLine = (text.split("\n")[0] || item.name).trim();
            const match = firstLine.match(/^\/\/\s*(\d+)\s+(.*)$/);
            let serial = 9999;
            let title = firstLine;
            if (match) {
              serial = parseInt(match[1], 10);
              title = match[2].trim();
            }
            return { serial, title: title || item.name, path: item.path, htmlTitle: null };
          }

          // Try extracting serial from inside file tag (optional)
          const serialMatch = titleHtml.match(/^(\d+)\./);
          let serial = serialMatch ? parseInt(serialMatch[1], 10) : 9999;

          return { serial, title: "", htmlTitle: titleHtml, path: item.path };
        }).catch(e => {
          console.error("Error fetching file:", e);
          return { serial: 9999, title: item.name, path: item.path, htmlTitle: null };
        })
      );
    } else if (item.type === "dir" && item.name !== "Ignore-Me") {
      dirButtons.push(item);
    }
  });

  // Render subdir buttons first
  dirButtons.forEach(d => {
    const btn = document.createElement("button");
    btn.textContent = "" + d.name;
    btn.onclick = () => {
      window.location.href = `files.html?path=${encodeURIComponent(d.path)}`;
    };
    container.appendChild(btn);
  });

  // Parallel fetch for files
  const fileButtons = await Promise.all(filePromises);

  // Sort files by serial number
  fileButtons.sort((a, b) => a.serial - b.serial);

  // Render file buttons
  fileButtons.forEach(f => {
    const btn = document.createElement("button");

    if (f.htmlTitle) {
      btn.innerHTML = f.htmlTitle; // Use HTML inside <file> tag
    } else {
      btn.textContent = `${f.serial}. ${f.title}`;
    }

    btn.onclick = () => {
      window.location.href = `code.html?path=${encodeURIComponent(f.path)}`;
    };
    container.appendChild(btn);
  });
}

document.getElementById("shareBtn").addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({
      title: "BCA All C Projects",
      text: "",
      url: window.location.href
    });
  } else {
    const url = window.location.href;
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "#fff";
    popup.style.padding = "15px";
    popup.style.border = "1px solid #ccc";
    popup.style.borderRadius = "8px";
    popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    popup.style.zIndex = "9999";
    popup.style.textAlign = "center";

    const input = document.createElement("input");
    input.type = "text";
    input.value = url;
    input.style.width = "250px";
    input.style.marginBottom = "10px";

    const copyBtn = document.createElement("button");
    copyBtn.innerText = "Copy Link";
    copyBtn.style.marginRight = "10px";
    copyBtn.onclick = () => {
      input.select();
      document.execCommand("copy");
      copyBtn.innerText = "Copied!";
      setTimeout(() => (copyBtn.innerText = "Copy Link"), 1500);
    };

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    closeBtn.onclick = () => popup.remove();

    popup.appendChild(input);
    popup.appendChild(document.createElement("br"));
    popup.appendChild(copyBtn);
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);
  }
});

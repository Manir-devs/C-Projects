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
      html += ` / <a href="Ignore-Me/files.html?path=${encodeURIComponent(link)}">${p}</a>`;
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
      btn.textContent = "" + item.name;
      btn.onclick = () => {
        window.location.href = `Ignore-Me/files.html?path=${encodeURIComponent(item.path)}`;
      };
      container.appendChild(btn);
    }
  });
}
document.getElementById("shareBtn").addEventListener("click", () => {
  if (navigator.share) {
    // Mobile share
    navigator.share({
      title: "BCA All C Projects",
      text: "All C programming tested, real code",
      url: window.location.href
    });
  } else {
    // Desktop fallback: popup with copy option
    const url = window.location.href;

    // Popup container
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

    // Input box with URL
    const input = document.createElement("input");
    input.type = "text";
    input.value = url;
    input.style.width = "250px";
    input.style.marginBottom = "10px";

    // Copy button
    const copyBtn = document.createElement("button");
    copyBtn.innerText = "Copy Link";
    copyBtn.style.marginRight = "10px";
    copyBtn.onclick = () => {
      input.select();
      document.execCommand("copy");
      copyBtn.innerText = "Copied!";
      setTimeout(() => (copyBtn.innerText = "Copy Link"), 1500);
    };

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    closeBtn.onclick = () => popup.remove();

    // Add elements
    popup.appendChild(input);
    popup.appendChild(document.createElement("br"));
    popup.appendChild(copyBtn);
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);
  }
});

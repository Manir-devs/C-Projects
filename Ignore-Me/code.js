const owner = "Manir-devs";
const repo = "C-Projects";

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

function buildBreadcrumb(path) {
  const bc = document.getElementById('breadcrumb');
  if (!bc) return;
  if (!path) {
    bc.innerHTML = 'Home';
    return;
  }
  const parts = path.split('/');
  let html = '<a href="https://Manir-devs.github.io/C-Projects/">Home</a>';
  let link = '';
  parts.forEach((p, i) => {
    link += (i ? '/' : '') + p;
    html += ' / ' + (i === parts.length - 1 ? p : `<a href="files.html?path=${encodeURIComponent(link)}">${p}</a>`);
  });
  bc.innerHTML = html;
}

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function highlightCSafe(code, pre) {
  pre.textContent = '';
  const frag = document.createDocumentFragment();
  const lines = code.split(/\r?\n/);
  for (let line of lines) {
    let tokens = line.match(/\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(\.\d+)?\b|#.*|<[^>\n]+>|\b[A-Za-z_]\w*\b|[^\s]/g) || [];
    let pos = 0;
    for (let tok of tokens) {
      const idx = line.indexOf(tok, pos);
      if (idx > pos) frag.appendChild(document.createTextNode(line.slice(pos, idx)));
      pos = idx + tok.length;

      let span = null;
      if (tok.startsWith('//') || tok.startsWith('/*')) { span = document.createElement('span'); span.className = 'tk-comment'; }
      else if (tok.startsWith('#')) { span = document.createElement('span'); span.className = 'tk-preproc'; }
      else if (tok.startsWith('<') && tok.endsWith('>')) { span = document.createElement('span'); span.className = 'tk-include'; }
      else if (tok.startsWith('"') && tok.endsWith('"') || tok.startsWith("'") && tok.endsWith("'")) { span = document.createElement('span'); span.className = 'tk-string'; }
      else if (/^\d+(\.\d+)?$/.test(tok)) { span = document.createElement('span'); span.className = 'tk-num'; }
      else if (/^[A-Za-z_]\w*$/.test(tok)) {
        const keywords = new Set(["return", "for", "while", "if", "else", "break", "continue", "switch", "case", "default", "do", "goto", "sizeof"]);
        const types = new Set(["int", "char", "float", "double", "void", "short", "long", "signed", "unsigned", "const", "struct", "enum", "union", "typedef", "static", "extern", "volatile", "register"]);
        const funcs = new Set(["main", "printf", "scanf", "gets", "puts", "putchar", "getc", "fopen", "fclose", "fread", "fwrite", "memcpy", "memset", "strcpy", "strlen"]);
        if (keywords.has(tok)) span = document.createElement('span'), span.className = 'tk-key';
        else if (types.has(tok)) span = document.createElement('span'), span.className = 'tk-type';
        else if (funcs.has(tok)) span = document.createElement('span'), span.className = 'tk-func';
      }
      if (span) { span.textContent = tok; frag.appendChild(span); }
      else frag.appendChild(document.createTextNode(tok));
    }
    frag.appendChild(document.createTextNode('\n'));
  }
  pre.appendChild(frag);
}

async function fetchText(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Fetch error ' + r.status);
  return await r.text();
}

async function initCode() {
  const params = new URLSearchParams(window.location.search);
  const path = params.get('path') || 'code.c';
  buildBreadcrumb(path);
  try {
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const meta = await (await fetch(api)).json();
    if (meta && meta.download_url) {
      const raw = await fetchText(meta.download_url);
      const lines = raw.split(/\r?\n/);
      let qline = lines[0] || '';
      const m = qline.match(/^..(\d{1,4})\s+(.*)$/);
      if (m) qline = m[2];
      else qline = qline.slice(2).trim();
      document.getElementById('question').textContent = 'Q. ' + qline;
      const code = lines.slice(2).join('\n');
      highlightCSafe(code, document.getElementById('codeBlock'));
      document.getElementById('copyBtn').onclick = () => {
        navigator.clipboard.writeText(code).then(() => alert('Copied!'), () => alert('Copy failed'));
      };
    } else {
      document.getElementById('question').textContent = 'No file found';
      document.getElementById('codeBlock').textContent = '';
    }
  } catch (err) {
    document.getElementById('question').textContent = 'Error loading';
    document.getElementById('codeBlock').textContent = err.message || String(err);
    console.error(err);
  }
}

document.getElementById("shareBtn").addEventListener("click", () => {
  if (navigator.share) {
    // Mobile share
    navigator.share({
      title: "BCA All C Projects",
      text: "",
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

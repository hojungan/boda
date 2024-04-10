const auditBtn = document.querySelector("#BtnAudit");
auditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const { ipcRenderer } = require("electron");
  const urlInput = document.querySelector("#url");
  const workTypeInput = document.querySelector("#workType");
  const workType = workTypeInput.value;
  const url = urlInput.value;

  // ipcRenderer is defined in main.js, which is located in src/main.js
  ipcRenderer.send("crawl", { url, workType });
});

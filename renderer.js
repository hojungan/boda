const path = require("path");

const auditBtn = document.querySelector("#BtnAudit");
auditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const { ipcRenderer } = require("electron");
  const urlInput = document.querySelector("#url");
  const workTypeInput = document.querySelector("#workType");
  const workType = workTypeInput.value;
  const url = urlInput.value;
  ipcRenderer.send("crawl", { url, workType });
});

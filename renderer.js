const crawl = require("./crawler/crawl");

const auditBtn = document.querySelector("#BtnAudit");
auditBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const { ipcRenderer } = require("electron");
  const urlInput = document.querySelector("#url");
  const workTypeInput = document.querySelector("#workType");
  const workType = workTypeInput.value;
  const url = urlInput.value;

  // ipcRenderer is defined in main.js, which is located in src/main.js
  ipcRenderer.invoke("analyze", { url, workType }).then((result) => {
    let violations = result.violations;
    console.log(violations);
  });
});

const { ipcRenderer } = require("electron");

document.getElementById("processBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");

  try {
    status.textContent = "Selecting file...";

    const message = await ipcRenderer.invoke("select-and-update-file");

    status.textContent = message;
  } catch (error) {
    console.error(error);
    status.textContent = "Something went wrong while updating the file.";
  }
});
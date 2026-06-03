const fs = require("fs");
const path = require("path");

document.getElementById("processBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  console.log("Clicked")

  if (!fileInput.files.length) {
    status.textContent = "Please select a file.";
    return;
  }

  const filePath = fileInput.files[0].path;

  try {
    const text = fs.readFileSync(filePath, "utf8");

    const updatedText = text.replace(
      /<StaffIdentifier>([0-9]|[1-3][0-9]|40)<\/StaffIdentifier>/g,
      "<StaffIdentifier>5773</StaffIdentifier><StaffEducationLevel>05</StaffEducationLevel>"
    );

    const parsedPath = path.parse(filePath);

    const newFilePath = path.join(
      parsedPath.dir,
      `${parsedPath.name}.updated${parsedPath.ext}`
    );

    fs.writeFileSync(newFilePath, updatedText, "utf8");

    status.textContent = `File updated successfully: ${newFilePath}`;
  } catch (error) {
    console.error(error);
    //status.textContent = "Something went wrong while updating the file.";
    status.textContent = error
  }
});
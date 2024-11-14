import { Instruction } from "./instruction.js";
import { tooltip } from "./ui.js";

function decode() {
  const inputBox = document.getElementById("search-input");
  const input = inputBox.value.trim();
  let instructionType;

  if (/^[01]+$/.test(input)) {
    instructionType = "Binary";
  } else if (/^[0-9A-Fa-f]+$/.test(input)) {
    instructionType = "Hex";
  } else if (/^\d+$/.test(input)) {
    instructionType = "Decimal";
  } else if (/^[a-zA-Z]+$/.test(input)) {
    // instructionType = "Assembly";
    instructionType = "Invalid";
  } else {
    instructionType = "Invalid";
  }

  const container = document.getElementById("search-container");
  const errorContainer = document.getElementById("error-container");

  if (instructionType === "Invalid") {
    document.getElementById("results-container-box").style.display = "block";
    document.getElementById("valid-result").style.display = "none";

    // Show error
    container.style.setProperty("border-color", "#cc0000", "important");

    // Display error message
    const errorTitle = document.createElement("div");
    errorTitle.className = "result-row result-row-title";
    errorTitle.id = "error-title";
    errorTitle.textContent = "Error";

    const errorData = document.createElement("div");
    errorData.className = "result-row result-row-data";
    errorData.id = "error-data";
    errorData.style.color = "#cc0000";
    errorData.textContent = "Invalid input";

    // Clear any existing content and add new error elements
    errorContainer.innerHTML = "";
    errorContainer.appendChild(errorTitle);
    errorContainer.appendChild(errorData);
  } else {
    container.style.setProperty("border-color", "#ccc", "important");
    document.getElementById("valid-result").style.removeProperty("display");

    // Clear any previous errors
    const errorContainer = document.getElementById("error-container");
    errorContainer.innerHTML = "";
    // Display results
    switch (instructionType) {
      case "Binary":
        decodeBinaryInstruction(input);
        break;
      case "Hex":
        decodeBinaryInstruction(
          parseInt(input, 16).toString(2).padStart(32, "0")
        );
        break;
      case "Decimal":
        decodeBinaryInstruction(parseInt(input).toString(2).padStart(32, "0"));
        break;
      case "Assembly":
        // decodeAssemblyInstruction(input);
        break;
      default:
        // Handle invalid input
        break;
    }
  }
}

const decodeBinaryInstruction = (instruction) => {
  const instrInBit = new Uint32Array([parseInt(instruction, 2)]);
  const instr = new Instruction(0, instrInBit, instruction);

  // Update the result elements in the HTML with the decoded instruction
  document.getElementById("asm-data").innerHTML = instr.getAssembly();
  document.getElementById("binary-data").innerHTML =
    instr.colorCode(instruction);
  document.getElementById("hex-data").textContent = instr.getHex();
  document.getElementById("fmt-data").textContent = instr.getFormat() + " Type";

  // Show the results container
  document.getElementById("results-container-box").style.display = "block";
};

const main = () => {
  // Move tooltip to follow the cursor position
  document.addEventListener("mousemove", (event) => {
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
  });

  document.addEventListener("DOMContentLoaded", () => {
    // implement copying mechanism:
    const copyButtons = document.querySelectorAll(".copy-button");

    copyButtons.forEach((button) => {
      button.addEventListener("click", (_) => {
        const dataId = button.id.replace("-copy", "-data");
        const dataElement = document.getElementById(dataId);
        const textToCopy = dataElement.textContent || dataElement.innerText;

        navigator.clipboard.writeText(textToCopy).then(() => {
          const tooltip = button.querySelector(".button-tooltip");
          tooltip.textContent = "Copied!";
          setTimeout(() => {
            tooltip.textContent = "Copy";
          }, 2000);
        });
      });
    });

    const gearIcon = document.getElementById("gear-icon");
    gearIcon.addEventListener("click", decode);

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        decode();
      }
    });
  });
};

main();

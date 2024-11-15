import { getColor } from "./colorCoder.js";

export const tooltip = createTooltip();

function createTooltip() {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.style.position = "absolute"; // Ensure absolute positioning
  tooltip.style.display = "none"; // Start hidden
  document.body.appendChild(tooltip);
  return tooltip;
}

window.showTooltip = function (_event, text) {
  tooltip.textContent = text;
  tooltip.style.display = "block";
  tooltip.className = "binary-tooltip";
  // --color-hover-bg
  const color = getColor("--color-hover-bg");
  document.getElementById(text).style.backgroundColor = color;
};

window.hideTooltip = function (text) {
  document.getElementById(text).style.backgroundColor = "";
  tooltip.style.display = "none";
};

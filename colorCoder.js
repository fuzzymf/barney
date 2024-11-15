function getColor(variable) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
}

export function colorCodeR(instruction) {
  return `
    <span id="funct7" style="color: ${getColor("--color-funct7")};"
      onmouseover="showTooltip(event, 'funct7'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('funct7'); style.backgroundColor='';">
      ${instruction.slice(0, 7)}
    </span>
    <span id="rs2" style="color: ${getColor("--color-rs2")};"
      onmouseover="showTooltip(event, 'rs2'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rs2'); style.backgroundColor='';">
      ${instruction.slice(7, 12)}
    </span>
    <span id="rs1" style="color: ${getColor("--color-rs1")};"
      onmouseover="showTooltip(event, 'rs1'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rs1'); style.backgroundColor='';">
      ${instruction.slice(12, 17)}
    </span>
    <span id="funct3" style="color: ${getColor("--color-funct3")};"
      onmouseover="showTooltip(event, 'funct3'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('funct3'); style.backgroundColor='';">
      ${instruction.slice(17, 20)}
    </span>
    <span id="rd" style="color: ${getColor("--color-rd")};"
      onmouseover="showTooltip(event, 'rd'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rd'); style.backgroundColor='';">
      ${instruction.slice(20, 25)}
    </span>
    <span id="opcode" style="color: ${getColor("--color-opcode")};"
      onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
      ${instruction.slice(25, 32)}
    </span>
  `;
}

export function colorCodeI(instruction) {
  return `
    <span id="imm" style="color: ${getColor("--color-funct7")};"
      onmouseover="showTooltip(event, 'imm'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('imm'); style.backgroundColor='';">
      ${instruction.slice(0, 12)}
    </span>
    <span id="rs1" style="color: ${getColor("--color-rs1")};"
      onmouseover="showTooltip(event, 'rs1'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rs1'); style.backgroundColor='';">
      ${instruction.slice(12, 17)}
    </span>
    <span id="funct3" style="color: ${getColor("--color-funct3")};"
      onmouseover="showTooltip(event, 'funct3'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('funct3'); style.backgroundColor='';">
      ${instruction.slice(17, 20)}
    </span>
    <span id="rd" style="color: ${getColor("--color-rd")};"
      onmouseover="showTooltip(event, 'rd'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rd'); style.backgroundColor='';">
      ${instruction.slice(20, 25)}
    </span>
    <span id="opcode" style="color: ${getColor("--color-opcode")};"
      onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
      ${instruction.slice(25, 32)}
    </span>
  `;
}

export function colorCodeS(instruction) {
  return `
    <span id="imm" style="color: ${getColor("--color-funct7")};"
      title="imm"
      onmouseover="showTooltip(event, 'imm'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('imm'); style.backgroundColor='';">
      ${instruction.slice(0, 7)}${instruction.slice(20, 25)}
    </span>
    <span id="rs2" style="color: ${getColor("--color-rs2")};"
      title="rs2"
      onmouseover="showTooltip(event, 'rs2'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rs2'); style.backgroundColor='';">
      ${instruction.slice(7, 12)}
    </span>
    <span id="rs1" style="color: ${getColor("--color-rs1")};"
      title="rs1"
      onmouseover="showTooltip(event, 'rs1'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rs1'); style.backgroundColor='';">
      ${instruction.slice(12, 17)}
    </span>
    <span id="funct3" style="color: ${getColor("--color-funct3")};"
      title="funct3"
      onmouseover="showTooltip(event, 'funct3'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('funct3'); style.backgroundColor='';">
      ${instruction.slice(17, 20)}
    </span>
    <span id="opcode" style="color: ${getColor("--color-opcode")};"
      title="opcode"
      onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
      ${instruction.slice(25, 32)}
    </span>
  `;
}

export function colorCodeB(instruction) {
  return `
    <span id="imm" style="color: ${getColor("--color-funct7")};"
      title="imm"
      onmouseover="showTooltip(event, 'imm'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('imm'); style.backgroundColor='';">
      ${instruction.slice(0, 7)}${instruction.slice(20, 25)}
    </span>
    <span id="rs2" style="color: ${getColor("--color-rs2")};"
      title="rs2"
      onmouseover="showTooltip(event, 'rs2'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rs2'); style.backgroundColor='';">
      ${instruction.slice(7, 12)}
    </span>
    <span id="rs1" style="color: ${getColor("--color-rs1")};"
      title="rs1"
      onmouseover="showTooltip(event, 'rs1'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rs1'); style.backgroundColor='';">
      ${instruction.slice(12, 17)}
    </span>
    <span id="funct3" style="color: ${getColor("--color-funct3")};"
      title="funct3"
      onmouseover="showTooltip(event, 'funct3'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('funct3'); style.backgroundColor='';">
      ${instruction.slice(17, 20)}
    </span>
    <span id="opcode" style="color: ${getColor("--color-opcode")};"
      title="opcode"
      onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
      ${instruction.slice(25, 32)}
    </span>
  `;
}

export function colorCodeU(instruction) {
  return `
    <span id="imm" style="color: ${getColor("--color-funct7")};"
      title="imm"
      onmouseover="showTooltip(event, 'imm'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('imm'); style.backgroundColor='';">
      ${instruction.slice(0, 20)}
    </span>
    <span id="rd" style="color: ${getColor("--color-rd")};"
      title="rd"
      onmouseover="showTooltip(event, 'rd'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rd'); style.backgroundColor='';">
      ${instruction.slice(20, 25)}
    </span>
    <span id="opcode" style="color: ${getColor("--color-opcode")};"
      title="opcode"
      onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
      ${instruction.slice(25, 32)}
    </span>
  `;
}

export function colorCodeJ(instruction) {
  return `
    <span id="imm" style="color: ${getColor("--color-funct7")};"
      title="imm"
      onmouseover="showTooltip(event, 'imm'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('imm'); style.backgroundColor='';">
      ${instruction.slice(0, 20)}
    </span>
    <span id="rd" style="color: ${getColor("--color-rd")};"
      title="rd"
      onmouseover="showTooltip(event, 'rd'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('rd'); style.backgroundColor='';">
      ${instruction.slice(20, 25)}
    </span>
    <span id="opcode" style="color: ${getColor("--color-opcode")};"
      title="opcode"
      onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='${getColor(
        "--color-hover-bg"
      )}';"
      onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
      ${instruction.slice(25, 32)}
    </span>
  `;
}

export function colorCodeR(instruction) {
  return `
		<span id="funct7" style="color: #E6BC67;"
			onmouseover="showTooltip(event, 'funct7'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('funct7'); style.backgroundColor='';">
			${instruction.slice(0, 7)}
		</span>
		<span id="rs2" style="color: #A0D2A5;"
			onmouseover="showTooltip(event, 'rs2'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rs2'); style.backgroundColor='';">
			${instruction.slice(7, 12)}
		</span>
		<span id="rs1" style="color: #B0B0C8;"
			onmouseover="showTooltip(event, 'rs1'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rs1'); style.backgroundColor='';">
			${instruction.slice(12, 17)}
		</span>
		<span id="funct3" style="color: #B5EAD7;"
			onmouseover="showTooltip(event, 'funct3'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('funct3'); style.backgroundColor='';">
			${instruction.slice(17, 20)}
		</span>
		<span id="rd" style="color: #E6B8A1;"
			onmouseover="showTooltip(event, 'rd'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rd'); style.backgroundColor='';">
			${instruction.slice(20, 25)}
		</span>
		<span id="opcode" style="color: #8FB0D0;"
			onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
			${instruction.slice(25, 32)}
		</span>
	`;
}

export function colorCodeI(instruction) {
  return `
		<span id="imm" style="color: #E6BC67;"
			onmouseover="showTooltip(event, 'imm'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('imm'); style.backgroundColor='';">
			${instruction.slice(0, 12)}
		</span>
		<span id="rs1" style="color: #B0B0C8;"
			onmouseover="showTooltip(event, 'rs1'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rs1'); style.backgroundColor='';">
			${instruction.slice(12, 17)}
		</span>
		<span id="funct3" style="color: #B5EAD7;"
			onmouseover="showTooltip(event, 'funct3'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('funct3'); style.backgroundColor='';">
			${instruction.slice(17, 20)}
		</span>
		<span id="rd" style="color: #E6B8A1;"
			onmouseover="showTooltip(event, 'rd'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rd'); style.backgroundColor='';">
			${instruction.slice(20, 25)}
		</span>
		<span id="opcode" style="color: #8FB0D0;"
			onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
			${instruction.slice(25, 32)}
		</span>
	`;
}

export function colorCodeS(instruction) {
  return `
		<span id="imm" style="color: #E6BC67;"
			title="imm"
			onmouseover="showTooltip(event, 'imm'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('imm'); style.backgroundColor='';">
			${instruction.slice(0, 7)}${instruction.slice(20, 25)}
		</span>
		<span id="rs2" style="color: #A0D2A5;"
			title="rs2"
			onmouseover="showTooltip(event, 'rs2'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rs2'); style.backgroundColor='';">
			${instruction.slice(7, 12)}
		</span>
		<span id="rs1" style="color: #B0B0C8;"
			title="rs1"
			onmouseover="showTooltip(event, 'rs1'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rs1'); style.backgroundColor='';">
			${instruction.slice(12, 17)}
		</span>
		<span id="funct3" style="color: #B5EAD7;"
			title="funct3"
			onmouseover="showTooltip(event, 'funct3'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('funct3'); style.backgroundColor='';">
			${instruction.slice(17, 20)}
		</span>
		<span id="opcode" style="color: #8FB0D0;"
			title="opcode"
			onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
			${instruction.slice(25, 32)}
		</span>
	`;
}

export function colorCodeB(instruction) {
  return `
		<span id="imm" style="color: #E6BC67;"
			title="imm"
			onmouseover="showTooltip(event, 'imm'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('imm'); style.backgroundColor='';">
			${instruction.slice(0, 7)}${instruction.slice(20, 25)}
		</span>
		<span id="rs2" style="color: #A0D2A5;"
			title="rs2"
			onmouseover="showTooltip(event, 'rs2'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rs2'); style.backgroundColor='';">
			${instruction.slice(7, 12)}
		</span>
		<span id="rs1" style="color: #B0B0C8;"
			title="rs1"
			onmouseover="showTooltip(event, 'rs1'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rs1'); style.backgroundColor='';">
			${instruction.slice(12, 17)}
		</span>
		<span id="funct3" style="color: #B5EAD7;"
			title="funct3"
			onmouseover="showTooltip(event, 'funct3'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('funct3'); style.backgroundColor='';">
			${instruction.slice(17, 20)}
		</span>
		<span id="opcode" style="color: #8FB0D0;"
			title="opcode"
			onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
			${instruction.slice(25, 32)}
		</span>
	`;
}

export function colorCodeU(instruction) {
  return `
		<span id="imm" style="color: #E6BC67;"
			title="imm"
			onmouseover="showTooltip(event, 'imm'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('imm'); style.backgroundColor='';">
			${instruction.slice(0, 20)}
		</span>
		<span id="rd" style="color: #E6B8A1;"
			title="rd"
			onmouseover="showTooltip(event, 'rd'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rd'); style.backgroundColor='';">
			${instruction.slice(20, 25)}
		</span>
		<span id="opcode" style="color: #8FB0D0;"
			title="opcode"
			onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
			${instruction.slice(25, 32)}
		</span>
	`;
}

export function colorCodeJ(instruction) {
  return `
		<span id="imm" style="color: #E6BC67;"
			title="imm"
			onmouseover="showTooltip(event, 'imm'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('imm'); style.backgroundColor='';">
			${instruction.slice(0, 20)}
		</span>
		<span id="rd" style="color: #E6B8A1;"
			title="rd"
			onmouseover="showTooltip(event, 'rd'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('rd'); style.backgroundColor='';">
			${instruction.slice(20, 25)}
		</span>
		<span id="opcode" style="color: #8FB0D0;"
			title="opcode"
			onmouseover="showTooltip(event, 'opcode'); style.backgroundColor='#FFFF99';"
			onmouseout="hideTooltip('opcode'); style.backgroundColor='';">
			${instruction.slice(25, 32)}
		</span>
	`;
}

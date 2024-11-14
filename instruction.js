import {
  colorCodeR,
  colorCodeI,
  colorCodeS,
  colorCodeU,
  colorCodeJ,
} from "./colorCoder.js";

export class Instruction {
  constructor(ass, instr, original = 0) {
    if (!ass) {
      this.binary = original;
      this.decimal = instr[0];
      this.type = "binary";
      this.opcode = instr[0] & 0x7f; // Last 7 bits for opcode
      this.funct = (instr[0] >>> 7) & 0x3f; // 6 bits before opcode
      this.shamt = (instr[0] >>> 13) & 0x1f; // 5 bits before funct
      this.rd = (instr[0] >>> 18) & 0x1f; // 5 bits before shamt
      this.rt = (instr[0] >>> 23) & 0x1f; // 5 bits before rd
      this.rs = (instr[0] >>> 28) & 0x1f; // 5 bits before rt

      switch (this.opcode) {
        case 0x33: // 0110011 in binary, decimal 51
          // R-type instructions (Register-Register operations)
          this.format = "R";
          this.rd = (instr[0] >>> 7) & 0x1f; // bits [11:7]
          this.funct3 = (instr[0] >>> 12) & 0x7; // bits [14:12]
          this.rs1 = (instr[0] >>> 15) & 0x1f; // bits [19:15]
          this.rs2 = (instr[0] >>> 20) & 0x1f; // bits [24:20]
          this.funct7 = (instr[0] >>> 25) & 0x7f; // bits [31:25]

          switch (this.funct3) {
            case 0x0:
              if (this.funct7 === 0x00) {
                this.instructionType = "ADD";
                this.assembly = `ADD x${this.rd}, x${this.rs1}, x${this.rs2}`;
              } else if (this.funct7 === 0x20) {
                this.instructionType = "SUB";
                this.assembly = `SUB x${this.rd}, x${this.rs1}, x${this.rs2}`;
              } else {
                this.instructionType = "UNKNOWN";
                this.assembly = "UNKNOWN";
              }
              break;
            case 0x1:
              this.instructionType = "SLL";
              this.assembly = `SLL x${this.rd}, x${this.rs1}, x${this.rs2}`;
              break;
            case 0x2:
              this.instructionType = "SLT";
              this.assembly = `SLT x${this.rd}, x${this.rs1}, x${this.rs2}`;
              break;
            case 0x3:
              this.instructionType = "SLTU";
              this.assembly = `SLTU x${this.rd}, x${this.rs1}, x${this.rs2}`;
              break;
            case 0x4:
              this.instructionType = "XOR";
              this.assembly = `XOR x${this.rd}, x${this.rs1}, x${this.rs2}`;
              break;
            case 0x5:
              if (this.funct7 === 0x00) {
                this.instructionType = "SRL";
                this.assembly = `SRL x${this.rd}, x${this.rs1}, x${this.rs2}`;
              } else if (this.funct7 === 0x20) {
                this.instructionType = "SRA";
                this.assembly = `SRA x${this.rd}, x${this.rs1}, x${this.rs2}`;
              } else {
                this.instructionType = "UNKNOWN";
                this.assembly = "UNKNOWN";
              }
              break;
            case 0x6:
              this.instructionType = "OR";
              this.assembly = `OR x${this.rd}, x${this.rs1}, x${this.rs2}`;
              break;
            case 0x7:
              this.instructionType = "AND";
              this.assembly = `AND x${this.rd}, x${this.rs1}, x${this.rs2}`;
              break;
            default:
              this.instructionType = "UNKNOWN";
              this.assembly = "UNKNOWN";
          }
          break;

        case 0x13: // 0010011 in binary, decimal 19
        case 0x03: // 0000011 in binary, decimal 3
        case 0x67: // 1100111 in binary, decimal 103
        case 0x73: // 1110011 in binary, decimal 115
          // I-type instructions (Immediate arithmetic, loads, jalr, system instructions)
          this.format = "I";
          this.rd = (instr[0] >>> 7) & 0x1f; // bits [11:7]
          this.funct3 = (instr[0] >>> 12) & 0x7; // bits [14:12]
          this.rs1 = (instr[0] >>> 15) & 0x1f; // bits [19:15]
          this.imm = (instr[0] >>> 20) & 0xfff; // bits [31:20]
          // Sign-extend immediate
          if (this.imm & 0x800) {
            this.imm |= 0xfffff000;
          }

          switch (this.opcode) {
            case 0x13: // Immediate arithmetic instructions
              switch (this.funct3) {
                case 0x0:
                  this.instructionType = "ADDI";
                  this.assembly = `ADDI x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x2:
                  this.instructionType = "SLTI";
                  this.assembly = `SLTI x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x3:
                  this.instructionType = "SLTIU";
                  this.assembly = `SLTIU x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x4:
                  this.instructionType = "XORI";
                  this.assembly = `XORI x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x6:
                  this.instructionType = "ORI";
                  this.assembly = `ORI x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x7:
                  this.instructionType = "ANDI";
                  this.assembly = `ANDI x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x1:
                  this.shamt = (instr[0] >>> 20) & 0x1f; // Shift amount for SLLI
                  this.instructionType = "SLLI";
                  this.assembly = `SLLI x${this.rd}, x${this.rs1}, ${this.shamt}`;
                  break;
                case 0x5:
                  this.shamt = (instr[0] >>> 20) & 0x1f; // Shift amount
                  this.funct7 = (instr[0] >>> 25) & 0x7f; // bits [31:25]
                  if (this.funct7 === 0x00) {
                    this.instructionType = "SRLI";
                    this.assembly = `SRLI x${this.rd}, x${this.rs1}, ${this.shamt}`;
                  } else if (this.funct7 === 0x20) {
                    this.instructionType = "SRAI";
                    this.assembly = `SRAI x${this.rd}, x${this.rs1}, ${this.shamt}`;
                  } else {
                    this.instructionType = "UNKNOWN";
                    this.assembly = "UNKNOWN";
                  }
                  break;
                default:
                  this.instructionType = "UNKNOWN";
                  this.assembly = "UNKNOWN";
              }
              break;

            case 0x03: // Load instructions
              switch (this.funct3) {
                case 0x0:
                  this.instructionType = "LB";
                  this.assembly = `LB x${this.rd}, ${this.imm}(x${this.rs1})`;
                  break;
                case 0x1:
                  this.instructionType = "LH";
                  this.assembly = `LH x${this.rd}, ${this.imm}(x${this.rs1})`;
                  break;
                case 0x2:
                  this.instructionType = "LW";
                  this.assembly = `LW x${this.rd}, ${this.imm}(x${this.rs1})`;
                  break;
                case 0x4:
                  this.instructionType = "LBU";
                  this.assembly = `LBU x${this.rd}, ${this.imm}(x${this.rs1})`;
                  break;
                case 0x5:
                  this.instructionType = "LHU";
                  this.assembly = `LHU x${this.rd}, ${this.imm}(x${this.rs1})`;
                  break;
                default:
                  this.instructionType = "UNKNOWN";
                  this.assembly = "UNKNOWN";
              }
              break;

            case 0x67: // JALR instruction
              if (this.funct3 === 0x0) {
                this.instructionType = "JALR";
                this.assembly = `JALR x${this.rd}, x${this.rs1}, ${this.imm}`;
              } else {
                this.instructionType = "UNKNOWN";
                this.assembly = "UNKNOWN";
              }
              break;

            case 0x73: // System instructions
              switch (this.funct3) {
                case 0x0:
                  if (this.imm === 0) {
                    this.instructionType = "ECALL";
                    this.assembly = "ECALL";
                  } else if (this.imm === 1) {
                    this.instructionType = "EBREAK";
                    this.assembly = "EBREAK";
                  } else {
                    this.instructionType = "UNKNOWN";
                    this.assembly = "UNKNOWN";
                  }
                  break;
                case 0x1:
                  this.instructionType = "CSRRW";
                  this.assembly = `CSRRW x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x2:
                  this.instructionType = "CSRRS";
                  this.assembly = `CSRRS x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x3:
                  this.instructionType = "CSRRC";
                  this.assembly = `CSRRC x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x5:
                  this.instructionType = "CSRRWI";
                  this.assembly = `CSRRWI x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x6:
                  this.instructionType = "CSRRSI";
                  this.assembly = `CSRRSI x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                case 0x7:
                  this.instructionType = "CSRRCI";
                  this.assembly = `CSRRCI x${this.rd}, x${this.rs1}, ${this.imm}`;
                  break;
                default:
                  this.instructionType = "UNKNOWN";
                  this.assembly = "UNKNOWN";
              }
              break;

            default:
              this.instructionType = "UNKNOWN";
              this.assembly = "UNKNOWN";
          }
          break;

        case 0x23: // 0100011 in binary, decimal 35
          // S-type instructions (Store instructions)
          this.format = "S";
          this.funct3 = (instr[0] >>> 12) & 0x7; // bits [14:12]
          this.rs1 = (instr[0] >>> 15) & 0x1f; // bits [19:15]
          this.rs2 = (instr[0] >>> 20) & 0x1f; // bits [24:20]
          this.imm =
            ((instr[0] >>> 7) & 0x1f) | (((instr[0] >>> 25) & 0x7f) << 5);
          // Sign-extend immediate
          if (this.imm & 0x800) {
            this.imm |= 0xfffff000;
          }

          switch (this.funct3) {
            case 0x0:
              this.instructionType = "SB";
              this.assembly = `SB x${this.rs2}, ${this.imm}(x${this.rs1})`;
              break;
            case 0x1:
              this.instructionType = "SH";
              this.assembly = `SH x${this.rs2}, ${this.imm}(x${this.rs1})`;
              break;
            case 0x2:
              this.instructionType = "SW";
              this.assembly = `SW x${this.rs2}, ${this.imm}(x${this.rs1})`;
              break;
            default:
              this.instructionType = "UNKNOWN";
              this.assembly = "UNKNOWN";
          }
          break;

        case 0x63: // 1100011 in binary, decimal 99
          // B-type instructions (Branch instructions)
          this.format = "B";
          this.funct3 = (instr[0] >>> 12) & 0x7; // bits [14:12]
          this.rs1 = (instr[0] >>> 15) & 0x1f; // bits [19:15]
          this.rs2 = (instr[0] >>> 20) & 0x1f; // bits [24:20]
          this.imm =
            ((instr[0] >> 7) & 0x1e) | // bits [11:8], shifted to [4:1]
            ((instr[0] >> 20) & 0x7e0) | // bits [30:25], shifted to [10:5]
            ((instr[0] << 4) & 0x800) | // bit [7], shifted to [11]
            ((instr[0] >> 19) & 0x1000); // bit [31], shifted to [12]
          // Sign-extend immediate
          if (this.imm & 0x1000) {
            this.imm |= 0xffffe000;
          }

          switch (this.funct3) {
            case 0x0:
              this.instructionType = "BEQ";
              this.assembly = `BEQ x${this.rs1}, x${this.rs2}, ${this.imm}`;
              break;
            case 0x1:
              this.instructionType = "BNE";
              this.assembly = `BNE x${this.rs1}, x${this.rs2}, ${this.imm}`;
              break;
            case 0x4:
              this.instructionType = "BLT";
              this.assembly = `BLT x${this.rs1}, x${this.rs2}, ${this.imm}`;
              break;
            case 0x5:
              this.instructionType = "BGE";
              this.assembly = `BGE x${this.rs1}, x${this.rs2}, ${this.imm}`;
              break;
            case 0x6:
              this.instructionType = "BLTU";
              this.assembly = `BLTU x${this.rs1}, x${this.rs2}, ${this.imm}`;
              break;
            case 0x7:
              this.instructionType = "BGEU";
              this.assembly = `BGEU x${this.rs1}, x${this.rs2}, ${this.imm}`;
              break;
            default:
              this.instructionType = "UNKNOWN";
              this.assembly = "UNKNOWN";
          }
          break;

        case 0x37: // 0110111 in binary, decimal 55
        case 0x17: // 0010111 in binary, decimal 23
          // U-type instructions (lui, auipc)
          this.format = "U";
          this.rd = (instr[0] >>> 7) & 0x1f; // bits [11:7]
          this.imm = instr[0] & 0xfffff000; // bits [31:12]

          // Determine instruction type based on opcode
          if (this.opcode === 0x37) {
            this.instructionType = "LUI";
            this.assembly = `LUI x${this.rd}, ${this.imm}`;
          } else if (this.opcode === 0x17) {
            this.instructionType = "AUIPC";
            this.assembly = `AUIPC x${this.rd}, ${this.imm}`;
          } else {
            this.instructionType = "UNKNOWN";
            this.assembly = "UNKNOWN";
          }
          break;

        case 0x6f: // 1101111 in binary, decimal 111
          // J-type instructions (jal)
          this.format = "J";
          this.rd = (instr[0] >>> 7) & 0x1f; // bits [11:7]
          this.imm =
            (((instr[0] >> 12) & 0xff) << 12) | // bits [19:12]
            (instr[0] & 0x80000000 ? 0xfff00000 : 0) | // Sign extension
            (((instr[0] >> 20) & 0x1) << 11) | // bit [11]
            (((instr[0] >> 21) & 0x3ff) << 1); // bits [10:1]
          // Sign-extend immediate
          if (this.imm & 0x100000) {
            this.imm |= 0xffe00000;
          }
          this.instructionType = "JAL";
          break;

        default:
          this.format = "Unknown";
          this.instructionType = "Unknown";
      }
    } else {
      this.type = assembly;
    }
  }

  getAssembly() {
    // split the assembly string into an array of strings, split in spaces
    const splitAssembly = this.assembly.split(" ");
    let formattedAssembly = "";
    let colorMap = {};
    let idMap = {};
    //color code the assembly string according to the instruction color codes

    //in the case of a R-type instruction (ADD, SUB, SLL, SLT, SLTU, XOR, SRL, SRA, OR, AND)
    switch (this.format) {
      case "R":
        // first element is the instruction type- relates to the opcode
        // second element is the rd register
        // third element is the rs1 register
        // fourth element is the rs2 register
        colorMap = {
          1: "#8FB0D0",
          2: "#E6B8A1",
          3: "#B0B0C8",
          4: "#A0D2A5",
          5: "#E6BC67",
        };

        idMap = {
          1: "opcode",
          2: "rd",
          3: "rs1",
          4: "rs2",
          5: "funct7",
        };

        for (let i = 0; i < splitAssembly.length; i++) {
          formattedAssembly += `<span id="${idMap[i + 1]}"
           style="color: ${colorMap[i + 1]};">${splitAssembly[i]}</span> `;
        }

        return formattedAssembly;
      case "I":
        // first element is the instruction type- relates to the opcode
        // second element is the rd register
        // third element is the rs1 register
        // fourth element is the immediate value

        colorMap = {
          1: "#8FB0D0",
          2: "#E6B8A1",
          3: "#B0B0C8",
          4: "#E6BC67",
        };

        idMap = {
          1: "opcode",
          2: "rd",
          3: "rs1",
          4: "imm",
        };

        for (let i = 0; i < splitAssembly.length; i++) {
          formattedAssembly += `<span id="${idMap[i + 1]}"
           style="color: ${colorMap[i + 1]};">${splitAssembly[i]}</span> `;
        }
        return formattedAssembly;
      case "S":
        // first element is the instruction type- relates to the opcode
        // second element is the rs2 register
        // third element is the immediate value
        // fourth element is the rs1 register

        colorMap = {
          1: "#8FB0D0",
          2: "#A0D2A5",
          3: "#E6BC67",
          4: "#B0B0C8",
        };

        idMap = {
          1: "opcode",
          2: "rs2",
          3: "imm",
          4: "rs1",
        };

        for (let i = 0; i < splitAssembly.length; i++) {
          formattedAssembly += `<span id="${idMap[i + 1]}"
           style="color: ${colorMap[i + 1]};">${splitAssembly[i]}</span> `;
        }
        return formattedAssembly;

      case "B":
        // first element is the instruction type- relates to the opcode
        // second element is the rs1 register
        // third element is the rs2 register
        // fourth element is the immediate value

        colorMap = {
          1: "#8FB0D0",
          2: "#B0B0C8",
          3: "#A0D2A5",
          4: "#E6BC67",
        };

        idMap = {
          1: "opcode",
          2: "rs1",
          3: "rs2",
          4: "imm",
        };

        for (let i = 0; i < splitAssembly.length; i++) {
          formattedAssembly += `<span id="${idMap[i + 1]}"
           style="color: ${colorMap[i + 1]};">${splitAssembly[i]}</span> `;
        }
        return formattedAssembly;

      case "U":
        // first element is the instruction type- relates to the opcode
        // second element is the rd register
        // third element is the immediate value

        colorMap = {
          1: "#8FB0D0",
          2: "#E6B8A1",
          3: "#E6BC67",
        };

        idMap = {
          1: "opcode",
          2: "rd",
          3: "imm",
        };

        for (let i = 0; i < splitAssembly.length; i++) {
          formattedAssembly += `<span id="${idMap[i + 1]}"
           style="color: ${colorMap[i + 1]};">${splitAssembly[i]}</span> `;
        }
        return formattedAssembly;

      case "J":
        // first element is the instruction type- relates to the opcode
        // second element is the rd register
        // third element is the immediate value

        colorMap = {
          1: "#8FB0D0",
          2: "#E6B8A1",
          3: "#E6BC67",
        };

        idMap = {
          1: "opcode",
          2: "rd",
          3: "imm",
        };

        for (let i = 0; i < splitAssembly.length; i++) {
          formattedAssembly += `<span id="${idMap[i + 1]}"
          style="color: ${colorMap[i + 1]};">${splitAssembly[i]}</span> `;
        }
        return formattedAssembly;

      default:
        return this.assembly;
    }
  }

  getDecimal() {
    return this.decimal;
  }

  getBinary() {
    return this.binary;
  }
  getHex() {
    return "0x" + this.decimal.toString(16).padStart(8, "0"); // Padding to ensure 8 digits for 32-bit values
  }

  getFormat() {
    return this.format;
  }

  colorCode(instruction) {
    switch (this.format) {
      case "R":
        return colorCodeR(instruction);
      case "I":
        return colorCodeI(instruction);
      case "S":
        return colorCodeS(instruction);
      case "B":
        return colorCodeB(instruction);
      case "U":
        return colorCodeU(instruction);
      case "J":
        return colorCodeJ(instruction);
      default:
        return "Unknown format";
    }
  }
}

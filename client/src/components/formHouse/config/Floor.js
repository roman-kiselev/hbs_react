class Floors {
  constructor(lines, typeAsr) {
    this.lines = lines;
    this.typeAsr = typeAsr;
    // Внутри массив с линиями
    this.oneFloor = this.createOneFloor();
  }

  createOneFloor() {
    const lines = [];
    for (let i = 0; i < this.lines; i++) {
      lines.push({
        numberLine: i + 1,
        lines: [
          {
            numberKdl: 1,
            numberAsr: 1,
          },
        ],
        typeAsr: this.typeAsr,
      });
    }
  }
}

export default Floors;

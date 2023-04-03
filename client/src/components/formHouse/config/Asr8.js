class Asr8 {
  constructor(dataAsr) {
    this.dataAsr = dataAsr;
  }

  getDataAsr(busyChannel) {
    let newDataAsr = [];
    for (let i = 0; i < 8; i++) {
      if (this.dataAsr[i] === undefined) {
        newDataAsr.push({
          channel: busyChannel + i + 1,
          typeAsr: "ASR8",
          numberMeter: 0,
          typeMeter: 0,
          sumMeter: 0,
        });
      } else {
        newDataAsr.push({
          channel: busyChannel + i + 1,
          typeAsr: "ASR8",
          numberMeter: this.dataAsr[i].numberMeter
            ? this.dataAsr[i].numberMeter
            : 0,
          typeMeter: this.dataAsr[i].typeMeter ? this.dataAsr[i].typeMeter : 0,
          sumMeter: this.dataAsr[i].sumMeter ? this.dataAsr[i].sumMeter : 0,
        });
      }
    }

    return newDataAsr;
  }
}

export default Asr8;

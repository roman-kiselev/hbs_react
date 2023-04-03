import Asr2 from "./Asr2";
import Asr8 from "./Asr8";

class Kdl {
  constructor() {
    this.properties = {
      number: 0,
      channels: 127,
    };
    this.busyChannel = 0;
    this.freeChannels = 127;
    this.typeAsrOnChannels = [];
  }

  addAsr2(dataAsr) {
    const asr = new Asr2(dataAsr);
    this.typeAsrOnChannels.push(
      asr.getDataAsr(this.busyChannel)[0],
      asr.getDataAsr(this.busyChannel)[1]
    );
    this.busyChannel += 2;
    this.freeChannels -= 2;
  }

  addAsr8(dataAsr) {
    const asr = new Asr8(dataAsr);

    for (let i = 0; i < 8; i++) {
      this.typeAsrOnChannels.push(asr.getDataAsr(this.busyChannel)[i]);
    }
    this.busyChannel += 8;
    this.freeChannels -= 8;
  }
  // Возвращает массив занятых каналов
  getTypeAsrOnChannels() {
    return this.typeAsrOnChannels;
  }
  // Возвращает количество занятых каналов
  getBusyChannels() {
    return this.busyChannel;
  }
  // Возвращает количество свободных каналов
  getFreeChannels() {
    return this.freeChannels;
  }
}

export default Kdl;

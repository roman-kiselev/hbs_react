import Sections from "./Sections";

export class ConfigHouse {
  constructor(arrSection) {
    // Принимаем массив с информацией о каждой секции
    this.arrSections = arrSection;
    // Массив с обновлёнными секциями
    this.updateSections = this.addUpdateSections();
  }

  addUpdateSections() {
    const sections = [];
    this.arrSections.map((arr) => {
      const section = new Sections(arr);
      sections.push(section);
    });
    return sections;
  }
}

export default ConfigHouse;

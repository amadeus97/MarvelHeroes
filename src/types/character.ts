export default class Character {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public thumbnail: Image,
  ) {}

  static fromJson(data: any): Character {
    const image = Image.fromJson(data.thumbnail);
    return new Character(data.id, data.name, data.description, image);
  }
}

class Image {
  constructor(public path: string, public extension: string) {}

  get portraitSmall() {
    return `${this.path}/portrait_small.${this.extension}`;
  }

  get landscapeMedium() {
    return `${this.path}/landscape_medium.${this.extension}`;
  }

  static fromJson(data: any) {
    return new Image(data.path, data.extension);
  }
}

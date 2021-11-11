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

  static fromJson(data: any) {
    return new Image(data.path, data.extension);
  }
}

export function getPortraitSmall(image: Image) {
  return `${image.path}/portrait_small.${image.extension}`;
}

export function getLandscapeMedium(image: Image) {
  return `${image.path}/landscape_medium.${image.extension}`;
}

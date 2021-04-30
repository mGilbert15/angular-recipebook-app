export class Recipe {
  public name: String;
  public description: String;
  public imagePath: String;

  constructor(name: string, description: string, imagePath: string) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}

import { DrawableShape as Shape, Circle, Rectangle, Triangle } from './shapes';
import { Subject } from './subject'
import { Observer } from './Observer';


/**
 * The CAD drawing model currently being created
 */
export class Model implements Subject {
  private shapes: Shape[] = [];

  constructor() { }

  getShapes(): Shape[] {
    return this.shapes;
  }

  getShapeAt(x: number, y: number): Shape | null {
    for (let shape of this.shapes) {
      if (shape.contains(x, y)) {
        return shape;
      }
    }
    return null; //return last shape
  }

  addShape(shapeType: string, x: number, y: number) {
    this.shapes.push(this.shapeFactory(shapeType, x, y));
    this.notifyAll();
  }

  removeShape(x: number, y: number): void {
    let selected = this.getShapeAt(x, y)
    if (selected) {
      let index = this.shapes.indexOf(selected);
      this.shapes.splice(index, 1);
    }
    this.notifyAll();
  }

  updateShape(prop:string) {
    let props = prop.split("\n");
    let counter = 0;

    for (let shape of this.shapes) {
      let property = JSON.parse(props[counter]);
      shape.updateProperties(property);
      counter++;
    }

    this.notifyAll();
  }

  moveShape(selected: Shape, x: number, y: number) {
    selected.setPosition(x, y);
    this.notifyAll();
  }

  shapeFactory(shapeType: string, x: number, y: number) {
    if (shapeType === "rectangle") {
      let default_width = 60;
      let default_height = 80;
      return new Rectangle(x, y, default_height, default_width);
    }
    else if (shapeType === "circle") {
      let default_radius = 30;
      return new Circle(x, y, default_radius);
    }
    else {
      let default_height = 60;
      let default_bottom = 80;
      return new Triangle(x - default_bottom / 2, y + default_height / 2,
        x, y - default_height / 2,
        x + default_bottom / 2, y + default_height / 2);
    }
  }

  /* subject stuff */
  private observers: Observer[] = [];

  register(obs: Observer): void {
    this.observers.push(obs);
  }

  unregister(obs: Observer): void {
    let index = this.observers.indexOf(obs);
    this.observers.splice(index, 1)
  }

  notifyAll(): void {
    this.observers.forEach((obs: Observer) => obs.notify());
  }
}
import { DrawableShape } from './shapes';
import { Model } from './model';
import { CanvasController as Controller } from './controller';
/**
 * A class to represent the View. Contains control buttons and an HTML5 canvas.
 */
export class View{

  //constants for easy access
  readonly canvas = document.querySelector('#graphics-view canvas') as HTMLCanvasElement;
  readonly brush = this.canvas.getContext('2d') as CanvasRenderingContext2D;

  private action: string; //what action we are doing (handled by View)
  private selected: DrawableShape | null = null; //selected state is handled by View

  constructor(private model: Model, private ctrl: Controller) {

    //event listeners (DOM for readability/speed)
    this.canvas.addEventListener('mousedown', (e) => { this.handleMouseDown(e) });
    this.canvas.addEventListener('mouseup', (e) => { this.handleMouseUp(e) });
    this.canvas.addEventListener('mousemove', (e) => { this.handleMove(e) });

    let optionButtons = $("#graphics-view input:radio");
    this.action = optionButtons.val() as string; //current (initial) selection
    optionButtons.change((e) => { this.action = $(e.target).val() as string; }); //update action

    //responsive canvas
    $(window).resize(() => { this.resizeCanvas() }); //call function on window resize
    this.resizeCanvas(); //initial sizing
  }

  display() {
    //erase canvas
    this.brush.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let shapes: DrawableShape[] = this.model.getShapes();

    //draw all the shapes!
    for (let shape of shapes) {
      shape.draw(this.brush);
    }
  }

  handleMouseDown(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log("HI")

    if (this.action === 'move') {
      this.selected = this.model.getShapeAt(x, y);
    }
    else if (this.action === 'delete') {
      this.ctrl.removeShape(x, y);
    }
    else { //a creation method
      this.ctrl.addShape(this.action, x, y);
    }
  }

  handleMouseUp(event: MouseEvent) {
    this.selected = null;
  }

  handleMove(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (this.selected) {
      this.ctrl.moveShape(this.selected, x, y);
    }
  }

  //make Canvas responsive (adapted from http://ameijer.nl/2011/08/resizable-html5-canvas/)
  resizeCanvas() {
    const ratio = 1; //4/3;
    let canvasElem = $(this.canvas);
    canvasElem.attr('width', canvasElem.parent().width() as number);
    canvasElem.attr('height', ratio * (canvasElem.width() as number));
    this.display();
  }
}
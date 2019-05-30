import { Model } from './model';
import { View as CanvasView } from './view-canvas';
import { View as TextualView } from './view-text';
import { Observer } from './observer';
import {DrawableShape as Shape, Circle, Rectangle, Triangle} from './shapes';


export class CanvasController implements Observer {
    private  view:CanvasView;

    constructor(private model: Model) {
        this.view = new CanvasView(model,this);
        this.model.register(this);
    }

    addShape(shapeType:string, x:number, y:number){
        return this.model.addShape(shapeType,x,y);
    }
    
    removeShape(x: number, y:number):void{
        return this.model.removeShape(x,y);
    }
    
    moveShape(selected:Shape, x:number, y:number){
        return this.model.moveShape(selected,x,y);
    }

    notify() {
        this.view.display();
    }
}

export class TextualController implements Observer {
    private  view:TextualView;

    constructor(private model: Model) {
        this.view = new TextualView(model,this);
        this.model.register(this);
    }

    update(prop:string){
        this.model.updateShape(prop);
    }

    notify() {
        this.view.display();
    }
}
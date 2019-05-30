import {DrawableShape as Shape, Circle, Rectangle, Triangle} from './shapes';
import {Model} from './model';
import { TextualController as Controller } from './controller';

export class View {
    
    private text = document.getElementById("textarea") as HTMLTextAreaElement;

    constructor(private model: Model, private ctrl: Controller){

        let button = document.getElementById("update");
        if (button){
            button.addEventListener('click', (e) => { this.update(e)});
        }
    }

    update(event:MouseEvent){
        this.ctrl.update(this.text.value);
    }
    
    display():void{
        let shapes:Shape[] = this.model.getShapes();

        let texts:string = "";
        let row = 0

        for (let shape of shapes){
            let prop = shape.getProperties();
            let str = JSON.stringify(prop);
            if(row==0)
                texts = str;
            else
                texts = `${texts}\n${str}`;
            row++;
        }

        if(this.text){
            this.text.rows = row;
            this.text.value = texts;
        }
    }
}
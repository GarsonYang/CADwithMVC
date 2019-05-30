import 'bootstrap'; //bootstrap.js for button toggling

import {Model} from './model';
import { CanvasController, TextualController } from './controller';


let model = new Model();
let canvasCtrl = new CanvasController(model);
let textCtrl = new TextualController(model);
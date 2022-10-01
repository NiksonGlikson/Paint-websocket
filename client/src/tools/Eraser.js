import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas) {
        super(canvas);
    }

    draw(x, y) {
        this.ctx.strokeStyle = 'white';
        //чтобы нарисовать линию надо вызвать эту функцию
        this.ctx.lineTo(x, y);
        //чтобы линия имела цвет
        this.ctx.stroke();
    }
}
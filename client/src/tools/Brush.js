import Tool from './tools';

export default class Brush extends Tool {
    constructor(canvas) {
        // super вызывает конструктор родительского класса
        super(canvas);
        this.listen();
    }
    // эти функции будут навешаны, поэтому их нужно будет удалить
    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }
    // пока кнопка нажата мы рисуем
    mouseUpHandler(e) {
        this.mouseDown = false;
    }
    mouseDownHandler(e) {
        this.mouseDown = true;
        //функция говорит о том, что мы начали рисовать новую линию
        this.ctx.beginPath()
        //Нам надо переместить курсов.
        //из координаты мыши относительно страницы по x мы отнимаем левый отступ канваса от края страницы
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            // получаем координаты курсора мыши
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }
    // чтобы рисовать нам надо знать координаты x и y 
    draw(x, y) {
        //чтобы нарисовать линию надо вызвать эту функцию
        this.ctx.lineTo(x, y)
        //чтобы линия имела цвет
        this.ctx.stroke()
    }
}
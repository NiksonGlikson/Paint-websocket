import Tool from './tools';

export default class Rect extends Tool {
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
        this.ctx.beginPath();
        //запоминаем стартовую позицию по x и y
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        //когда мы начинаем рисовать новую фигуру при нажатии кнопки мыши мы будем сохранять
        //изображение с канваса
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            //когда переместили мышь, надо запоминать текущее положение, для того чтобы высчитать ширину и высоту
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            // получаем координаты курсора мыши
            //мы имеем стартовую координаты по x и y и ширину + высоту
            this.draw(this.startX, this.startY, width, height)
        }
    }
    // чтобы рисовать нам надо знать координаты x и y 
    draw(x, y, w, h) {
        //создаем новый объект IMAGE, создадим переменную в которую положим как раз изображение с канваса которое сохранили
        const image = new Image();
        image.src = this.saved;
        //функция будет отрабатывать когда изображение установилось
        image.onload = () => {
            //дальше очищаем канвас от тех фигур которые мы нарисовали
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //так как мы очищаем весь канвас, нам надо вернуть старые рисунки, принимает параметром рисунок и начальные точки
            //вместе с шириной и высотой
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            //затем рисуем на канвасе изображение или новую фигуру
            this.ctx.beginPath();
            //функция rect принимает параметрами те же функции и просто ее вызываем
            this.ctx.rect(x, y, w, h);
            //чтобы контекст заполнил весь квадрат
            this.ctx.fill();
            //делаем еще обводку каким то другим цветом
            this.ctx.stroke();
        }
    }
}
// будет хранить данные о канвасе и вспомогательных элементах
const { makeAutoObservable } = require("mobx");

// хранит состояние и логику обработки этого состояния связанным с инструментом
class CanvasState {
    canvas = null;
    //создаем для переменные которые содержат массив с данными которые были и которые отменили
    undoList = [];
    redoList = [];

    constructor() {
        // эта функция делает данные которые тут есть отслеживаемыми и каждый раз когда
        // данные меняются, реакт делает рендер
        makeAutoObservable(this)
    }
    // эта функция называется action - как-то изменяет состояние. Параметром передает инструмент
    // и он сохраняется в глобальное хранилище
    setCanvas(canvas) {
        this.canvas = canvas;
    }

    //создаем функции в которые будут прилетать данные из параметров и пушить их в массив
    pushToUndo(data) {
        this.undoList.push(data)
    }

    pushToRedo(data) {
        this.redoList.push(data)
    }
    //логика отмены и возврата
    undo() {
        //получаем контекст канваса
        let ctx = this.canvas.getContext('2d');
        if(this.undoList.length > 0) {
            // если что то есть в массиве то достаем из него один элемент то есть самое последнее действие
            let dataUrl = this.undoList.pop();
            //после каждой отмены действия нам это действия необходимо сохранить во второй массив
            //надо добавлять текущее состояние канваса
            this.redoList.push(this.canvas.toDataURL());
            let img = new Image();
            // положим в свойство src последний снимок канваса
            img.src = dataUrl;
            //слушатель события когда изображение установлено
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            //если массив пустой будет очищать канвас от левого верхнего угла по всей ширине и высоте канваса
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        //получаем контекст канваса
        let ctx = this.canvas.getContext('2d');
        if(this.redoList.length > 0) {
            // если что то есть в массиве то достаем из него один элемент то есть самое последнее действие
            let dataUrl = this.redoList.pop();
            //надо добавлять текущее состояние канваса
            this.undoList.push(this.canvas.toDataURL());
            let img = new Image();
            // положим в свойство src последний снимок канваса
            img.src = dataUrl;
            //слушатель события когда изображение установлено
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState();
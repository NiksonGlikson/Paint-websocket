// хранит состояние и логику обработки этого состояния связанным с инструментом
const { makeAutoObservable } = require("mobx");

class ToolState {
    tool = null;
    constructor() {
        // эта функция делает данные которые тут есть отслеживаемыми и каждый раз когда
        // данные меняются, реакт делает рендер
        makeAutoObservable(this)
    }
    // эта функция называется action - как-то изменяет состояние. Параметром передает инструмент
    // и он сохраняется в глобальное хранилище
    setTool(tool) {
        this.tool = tool;
    }
    setFillColor(color) {
        this.tool.fillColor = color;
    }
    setStrokeColor(color) {
        this.tool.strokeColor = color;
    }
    setLineWidth(width) {
        this.tool.lineWidth = width;
    }
}

export default new ToolState();
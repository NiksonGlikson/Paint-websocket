// хранятся все файлы с интрументами
export default class Tools {
    constructor(canvas) {
        this.canvas = canvas;
        // контекст который позволяет совершать манипуляции на канвасе
        this.ctx = canvas.getContext('2d');
        this.destroyEvents();
    }

    //функция сеттер где кастомно можно изменять значения
    set fillColor(color) {
        this.ctx.fillStyle = color;
    }

    set strokeColor(color) {
        this.ctx.strokeStyle = color;
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width;
    }

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
}
import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import '../styles/canvas.scss';
import { useParams } from 'react-router-dom';

// каждый раз когда меняется состояние в одном из классов это компонент будет это отслеживать
// и вызывать перерендеринг
const Canvas = observer( () => {
    const canvasRef = useRef()
    const params = useParams()
    console.log(params)
    useEffect(() => {
        // console.log(canvasRef.current) = получем сам тег канвас с шириной и высотой
        canvasState.setCanvas(canvasRef.current);
        //при первом запуске как инструмент будет присваивать кисть
        toolState.setTool(new Brush(canvasRef.current))
    }, []);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000/')
        socket.onopen = () => {
            socket.send(JSON.stringify({
                id: params.id,
                method: 'connection'
            }))
        }
        socket.onmessage = (event) => {
            console.log(event.data)
        }
    }, [])

    const mouseDownHandler = () => {
        // грубо говоря делается снимок текущего канваса и добавляем его в состояние 
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }


    return (
        <div className='canvas'>
            {/* у канвас надо напрямую указывать высоту и ширину, onMouse фиксирует что после отпускания мыши, 
            мы массив данных кидаем в наши переменные и сохраняем их */}
            <canvas onMouseDown={mouseDownHandler} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;

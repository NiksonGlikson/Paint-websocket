import React from 'react';
import '../styles/toolbar.scss';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Eraser from '../tools/Eraser';

const Toolbar = () => {
    // внутри функции меняем цвет заливки и обводки
    const changeColor = e => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }

    return (
        <div className='toolbar'>
            <button className='toolbar__button brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas))} />
            <button className='toolbar__button rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}/>
            <button className='toolbar__button circle' />
            <button className='toolbar__button eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}/>
            <button className='toolbar__button line' />
            <input onChange={e => changeColor(e)} style={{marginLeft: 10}} type='color'/>
            <button className='toolbar__button undo' onClick={() => canvasState.undo()}/>
            <button className='toolbar__button redo' onClick={() => canvasState.redo()}/>
            <button className='toolbar__button save' />
        </div>
    );
}

export default Toolbar;

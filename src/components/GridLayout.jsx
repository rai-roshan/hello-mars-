import React , { useState , useEffect , useRef , useContext } from 'react';
import { GridContext } from '../GridContext';
//------------shortset path visualiser----------------



//---------child component-------------------
import Cell from './Cell';
import './GridLayout.css';


//---------------React Functional Component--------------------
const GridLayout = ()=>{
    console.log("GRIDLAYOUT rendered");   //for debug----
    

    const { grid ,  resetPath , resetWalls , handleMouseDown , handleMouseEnter
      , handleMouseLeave , handleMouseUp , handleRefresh } = useContext(GridContext);
    const { handleBfsVisual , handleDijkastraVisual } = useContext(GridContext);
     
    
    //--------------JSX--------------------------
    return(
        <div className="center-layout">
            
            <button 
            onClick={() => handleDijkastraVisual() }>
                Visualize Dijkstra's Algorithm
            </button>
            <button 
            onClick={() => handleBfsVisual() }>
                Visualize BFS Algorithm
            </button>
            <button onClick ={ handleRefresh }>          //for debug 
              render app
            </button>
            <button onClick = { resetPath }>
              Reset
            </button>
            <button onClick={ resetWalls }>
              Reset Walls
            </button>

            <div className="grid">
            {grid.map((row, rowIdx) => {
                return (
                <div key={rowIdx} className="row">
                    {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                        return (
                            <Cell
                            key={nodeIdx}
                            col={col}
                            row={row}
                            isFinish={isFinish}
                            isStart={isStart}
                            isWall={isWall}
                            onMouseDown={ handleMouseDown }
                            onMouseEnter={ handleMouseEnter }
                            onMouseLeave={ handleMouseLeave }
                            onMouseUp={ handleMouseUp }
                            />
                        );
                    })}
                </div>
                );
            })}
            </div>
        </div>
    )
};


export default GridLayout;
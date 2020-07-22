import React , { useState , useEffect , useCallback , useRef } from 'react';
import {
    getInitialGrid,
    getNewGridWithPathReset,
    getNewGridWithStartToggled,
    getNewGridWithWallsReset,
    getNewGridWithWallToggled
  } from './components_utils/gridToggle';

export const GridContext = React.createContext();

const GridProvider = (props) => {

    const START_CELL_ROW = useRef(10);
    const START_CELL_COL = useRef(16);
    const FINISH_CELL_ROW = useRef(10);
    const FINISH_CELL_COL = useRef(35);

    const [grid , setGrid] = useState([]);
    const [refresh , setRefresh] = useState(true);                  //for debug purpose
    
    let mouseIsPressed = false;
    let changeStart = false;
    let changeFinish = false;

    let visitedCellsInOrder = useRef([]);
    let cellsInShortestPathOrder = useRef([]);

        //---------------reset path and walls-----------------------------------
        const resetPath = ()=>{
            console.log("visited : ",visitedCellsInOrder.current);
            for (let i = 0; i < visitedCellsInOrder.current.length; i++) {
              setTimeout(() => {
                const cell = visitedCellsInOrder.current[i];
                document.getElementById(`cell-${cell.row}-${cell.col}`).classList.remove(`cell-visited`);
                document.getElementById(`cell-${cell.row}-${cell.col}`).classList.remove(`cell-shortest-path`);
              }, 2 * i);
            }
            let pathResetGrid = getNewGridWithPathReset(grid,visitedCellsInOrder.current);
            console.log("reset path : ",pathResetGrid);
            setGrid(pathResetGrid);
          };
      
          const resetWalls = ()=>{
            const wallResetGrid = getNewGridWithWallsReset(grid);
            setGrid(wallResetGrid);
          };
      
      
      
          //--------------mouse control utilities-------------------
          const handleMouseDown = useCallback((row, col) => {
      
              if(row === START_CELL_ROW.current && col === START_CELL_COL.current)
              {
                changeStart = true;
              }
              else if(row === FINISH_CELL_ROW.current && col === FINISH_CELL_COL.current)
              {
                changeFinish = true;
              }
              else
              {
                setGrid(prevGrid=>{
                  const newGrid = getNewGridWithWallToggled(prevGrid, row, col);
                  return newGrid;
                });
              }
              mouseIsPressed = true ;
            },[]);
          
          
          const handleMouseEnter = useCallback((row, col) => {
            if (!mouseIsPressed) return;
      
            if(changeStart || changeFinish)
            {
              if(changeStart)
              { 
                START_CELL_ROW.current = row;
                START_CELL_COL.current = col;
              }
              else 
              {
                FINISH_CELL_ROW.current = row;
                FINISH_CELL_COL.current = col;
              }
              setGrid(prevGrid=>{
                const newGrid = getNewGridWithStartToggled(prevGrid, row ,col , changeStart , changeFinish);
                return newGrid;
              })
            }
            else
            {
              setGrid(prevGrid=>{
                const newGrid = getNewGridWithWallToggled(prevGrid, row, col);
                return newGrid;
              });
            }
          },[]);
      
          const handleMouseLeave = useCallback((row,col)=>{
            if(changeStart || changeFinish)
            {
              setGrid(prevGrid=>{
                const newGrid = getNewGridWithStartToggled(prevGrid, row ,col , changeStart , changeFinish);
                return newGrid;
              })
            }
          },[]);
      
          const handleMouseUp = useCallback(() => {
          mouseIsPressed = false;
          changeStart = false;
          changeFinish =  false;
          },[]);
          
          //for debug purpose
          const handleRefresh = ()=> { setRefresh(prevState=>!prevState) };

          useEffect(()=>{
            console.log("--------app is mounted------------");
            const initGrid = getInitialGrid(START_CELL_ROW.current,START_CELL_COL.current,FINISH_CELL_ROW.current,FINISH_CELL_COL.current);
            setGrid(initGrid);
          },[]);

          return(
            <GridContext.Provider value={ { grid , 
              START_CELL_ROW , 
              START_CELL_COL , 
              FINISH_CELL_ROW , 
              FINISH_CELL_COL , 
              visitedCellsInOrder , 
              cellsInShortestPathOrder , 
              resetPath , 
              resetWalls , 
              handleMouseDown , 
              handleMouseEnter , 
              handleMouseLeave , 
              handleMouseUp , 
              handleRefresh } }>
                { props.children }
            </GridContext.Provider>
        );
};

export default GridProvider;

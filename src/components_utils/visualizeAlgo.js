const {dijkstra, getNodesInShortestPathOrder} = require('../Algorithms/dijkstra');
const { bfs, getNodesInShortestPathOrderBfs } = require('../Algorithms/bfs');

    const animateAlgo = (visitedCellsInOrder, cellsInShortestPathOrder) => {
        for (let i = 0; i < visitedCellsInOrder.length; i++) {
          if (i === visitedCellsInOrder.length-1) {
            setTimeout(() => {
              animateShortestPath(cellsInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const cell = visitedCellsInOrder[i];
            if(cell.isStart === false && cell.isFinish === false )
            {
              document.getElementById(`cell-${cell.row}-${cell.col}`).className =
              'cell cell-visited';
            }
          }, 10 * i);
        }
      };

    const animateShortestPath = (cellsInShortestPathOrder) => {
        for (let i = 0; i < cellsInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const cell = cellsInShortestPathOrder[i];
            if(cell.isStart === false && cell.isFinish === false )
            {
              document.getElementById(`cell-${cell.row}-${cell.col}`).className =
              'cell cell-shortest-path';
            }
          }, 50 * i);
        }
      }

    const visualizeDijkstra = (grid,START_CELL_ROW,START_CELL_COL,FINISH_CELL_ROW,FINISH_CELL_COL) => {
        const startCell = grid[START_CELL_ROW][START_CELL_COL];
        const finishCell = grid[FINISH_CELL_ROW][FINISH_CELL_COL];
  
        let visitedCellsInOrder = dijkstra(grid, startCell, finishCell);        
        let cellsInShortestPathOrder = getNodesInShortestPathOrder(finishCell);
        animateAlgo(visitedCellsInOrder, cellsInShortestPathOrder);

        console.log("visited cell : ",visitedCellsInOrder);
        console.log("shortest path : ",cellsInShortestPathOrder);

        return {
            visitedCellsInOrder,
            cellsInShortestPathOrder
        };
      };

      const visualizeBFS = (grid,START_CELL_ROW,START_CELL_COL,FINISH_CELL_ROW,FINISH_CELL_COL) => {
        const startCell = grid[START_CELL_ROW][START_CELL_COL];
        const finishCell = grid[FINISH_CELL_ROW][FINISH_CELL_COL];

        
        let visitedCellsInOrder = bfs(grid, startCell, finishCell);
        let cellsInShortestPathOrder = getNodesInShortestPathOrderBfs(finishCell);
        animateAlgo(visitedCellsInOrder, cellsInShortestPathOrder);

        console.log("visited cell : ",visitedCellsInOrder);
        console.log("shortest path : ",cellsInShortestPathOrder);

        return {
            visitedCellsInOrder,
            cellsInShortestPathOrder
        };
      };


module.exports = {
    visualizeBFS,
    visualizeDijkstra
};
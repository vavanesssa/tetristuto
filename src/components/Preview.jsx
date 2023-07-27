import './Preview.css';
import React from 'react';

import { buildBoard } from '/src/business/Board';
import { transferToBoard } from '/src/business/Puyos';

import BoardCell from '/src/components/BoardCell';

const Preview = ({ puyo, index }) => {
  const { shape, className } = puyo;

  const board = buildBoard({ rows: 1, columns: 2 });

  const style = { top: `${index * 15}vw` };

  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape,
  });

  return (
    <div className="Preview" style={style}>
      <div className="Preview-board">
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          )),
        )}
      </div>
    </div>
  );
};

export default React.memo(Preview);

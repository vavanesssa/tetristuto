import './BoardCell.css';

const BoardCell = ({ cell }) => (
  <div className={`BoardCell ${cell.className}`}>
    <div className="Sparkle">
      <div className="eye">
        <div className="leftEye"></div>

        <div className="rightEye"></div>
      </div>
    </div>
  </div>
);

export default BoardCell;

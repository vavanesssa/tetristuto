import './BoardCell.css';

const BoardCell = ({ cell }) => (
  <div className={`BoardCell ${cell.className}`}>
    <div className="Sparkle">
      <div class="eye">
        <div class="leftEye">
          <div class="leftPupil"></div>
        </div>

        <div class="rightEye">
          <div class="rightPupil"></div>
        </div>
      </div>
    </div>
  </div>
);

export default BoardCell;

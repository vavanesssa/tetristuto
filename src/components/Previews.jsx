import React from 'react';

import Preview from '/src/components/Preview';

const Previews = ({ puyos }) => {
  const previewPuyos = puyos.slice(1 - puyos.length).reverse();

  return (
    <div className="previews">
      {previewPuyos.map((puyo, index) => (
        <Preview puyo={puyo} index={index} key={index} />
      ))}
    </div>
  );
};

export default React.memo(Previews);

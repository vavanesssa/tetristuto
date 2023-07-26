import React from 'react';

import Preview from '/src/components/Preview';

const Previews = ({ puyos }) => {
  // We want everything except the last one
  const previewPuyos = puyos.slice(1 - puyos.length).reverse();

  return (
    <>
      {previewPuyos.map((puyo, index) => (
        <Preview puyo={puyo} index={index} key={index} />
      ))}
    </>
  );
};

export default React.memo(Previews);

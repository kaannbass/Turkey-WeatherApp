import React from 'react';

import cx from 'classnames';

type Props = {
  id: string;
  name: string;
  active?: boolean;
  x: number;
  y: number;
  paths: Array<string>;
  className: string;
  onClick: () => void;
};

const City: React.FC<Props> = ({ id, name, active, x, y, paths, className, onClick }) => {
  return (
    <g
      name={name}
      id={id}
      className={cx(className, {
        active: active,
      })}
      onClick={onClick}
    >
      {paths.map((item, key) => (
        <path d={item} key={`${name}_${key}`} />
      ))}
      <text x={x} y={y} textAnchor="middle" fontSize="10pt">
        {name}
      </text>
    </g>
  );
};

export default City;

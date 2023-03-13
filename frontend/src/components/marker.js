
import React from 'react';

function Marker({ color, name , onClick}){     
    return (
      <div onClick={() => onClick()} className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;
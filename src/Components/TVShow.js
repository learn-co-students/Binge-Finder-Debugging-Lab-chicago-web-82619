import React from 'react';

const tvShow = (props) => {
  return (
    <div>
      <br />
      <img
        src={props.show.image ? props.show.image.medium : null}
        onClick={() => props.selectShow(props.show)}
        alt=""
      />
    </div>
  );
};

export default tvShow;

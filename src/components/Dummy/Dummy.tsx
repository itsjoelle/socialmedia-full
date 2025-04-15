import React from 'react';
import './Dummy.scss';

const Dummy = () => {
  const url = window.location.href;
  const pathname = new URL(url).pathname;
  const currentPath = pathname.split('/')[1];

  return (
    <div className="dummy">
      <div className="container">
        <h1>
          Here will your <span className="path">{currentPath}</span> go...
        </h1>
      </div>
    </div>
  );
};

export default Dummy;

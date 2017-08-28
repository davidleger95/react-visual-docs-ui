import React from 'react';
import { Link } from 'react-router-dom';

export default function FileList({ paths }) {

  const pathsHTML = paths.map((path, key) => {
    return (
      <li className="list-item" key={key}>
        <Link to={`/docs#${path}`}>{path}</Link>
      </li>
    );
  });

  return <ul className="file-list">{pathsHTML}</ul>;
}

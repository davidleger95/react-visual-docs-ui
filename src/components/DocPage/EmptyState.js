import React from 'react';
import { Link } from 'react-router-dom';

import FileList from './FileList';

export default function EmptyState({ missingFile, availableFiles }) {
  return (
    <div className="empty-state">
      <Link className="all-files-link" to="docs">All Files</Link>
      <hr />
      <h2>Error</h2>
      <p>File <code>'{missingFile}'</code> does not exist.</p>
      <hr />
      <h3>Availible Files</h3>
      <FileList paths={availableFiles} />
    </div>
  );
}

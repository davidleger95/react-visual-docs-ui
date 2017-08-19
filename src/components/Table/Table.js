import React from 'react';
import './Table.css';

const Table = ({ data, colNames }) => {
  const rows = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      rows.push(
        <tr key={key}>
          <td className="required">{data[key].required && '*'}</td>
          <td>{key}</td>
          <td>
            <span className={`tag ${data[key].type.name}`}>{data[key].type.name}</span>
          </td>
          <td>{data[key].defaultValue ? data[key].defaultValue.value : '--'}</td>
        </tr>
      );
    }
  }

  const renderHeader = () => {
    const header = colNames.map((name, key) => {
      return <th key={key}>{name}</th>
    })
    return <tr>{header}</tr>
  }

  return (
    <table className="table">
      <tbody>
        {renderHeader()}
        {rows}
      </tbody>
    </table>
  );
}

export default Table;

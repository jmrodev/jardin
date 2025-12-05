import React from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

const Table = ({ data, columns, onSort, pagination }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} onClick={() => onSort && onSort(col.key)} className="cursor-pointer">
                {col.header}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map(col => (
                <td key={`${index}-${col.key}`}>
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
              <td>
                <Button size="sm" variant="ghost">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="pagination">
            <Button disabled={pagination.offset === 0} onClick={() => pagination.onPageChange(pagination.offset - pagination.limit)}>Previous</Button>
            <span>Page {Math.floor(pagination.offset / pagination.limit) + 1}</span>
            <Button disabled={pagination.offset + pagination.limit >= pagination.total} onClick={() => pagination.onPageChange(pagination.offset + pagination.limit)}>Next</Button>
        </div>
      )}
    </div>
  );
};

export default Table;

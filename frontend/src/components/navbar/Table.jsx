import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

function Table() {
    const data = React.useMemo(
        ()=>[
            {
                col1: 'Jan',
                col2: '0',
            },
            {
                col1: 'Feb',
                col2: '10',
            },
            {
                col1: 'Mar',
                col2: '5',
            },
            {
                col1: 'Apr',
                col2: '2',
            },
            {
                col1: 'May',
                col2: '20',
            },
            {
                col1: 'June',
                col2: '30',
            },
            {
                col1: 'Jul',
                col2: '45',
            },
            {
                col1: 'Aug',
                col2: '-1',
            },
            {
                col1: 'Sep',
                col2: '-10',
            },
            {
                col1: 'Oct',
                col2: '50',
            }, 
            {
                col1: 'Nov',
                col2: '111',
            },
            {
                col1: 'Dec',
                col2: '12',
            },
        ],
        []
    )
    const columns = React.useMemo(
        () => [
          {
            Header: 'Month',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Revenue',
            accessor: 'col2',
          },
        ],
        []
    )
   
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data })
   
    return (
        <>
          <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                      <th
                          {...column.getHeaderProps()}
                          style={{
                            color: '#171616',
                            width: '200px',
                            textAlign: 'center',
                            fontFamily: "'Gloock', serif",
                            color: '#E635E4',
                            fontSize: 20,
                          }}
                      >
                        {column.render('Header')}
                      </th>
                  ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                          <td
                              {...cell.getCellProps()}
                              style={{
                                padding: '5px',
                                borderSpacing: '400px 100px',
                                textAlign: 'center',
                                fontFamily: "'Gloock', serif",
                              }}
                          >
                            {cell.render('Cell')}
                          </td>
                      )
                    })}
                  </tr>
              )
            })}
            </tbody>
          </table>
        </>
    );
   }

   export default Table;

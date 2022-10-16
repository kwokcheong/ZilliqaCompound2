import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'

const ZilliqaTable = ({ tableData, headingColumns, title, breakOn = 'medium' }) => {
    let tableClass = 'table-container__table'

    if (breakOn === 'small'){
        tableClass += ' table-container__table--break-sm';
    } else if (breakOn === 'medium'){
        tableClass += ' table-container__table--break-md';
    } else if (breakOn === ' small'){
        tableClass += ' table-container__table--break-sm'
    }

    const data = tableData.map((row, index) => {
        let rowData = [];
        let i = 0;
        for (const key in row) {
            rowData.push({
                key: headingColumns[i],
                val: row[key]
            });
            i++;
        }

        return <tr key={index}>
            {rowData.map((data,index) => <td key={index} data-heading={data.key}>{data.val}</td>)}
        </tr>
    });

    return(
        <div className="table-container">
            <div className="table-container__title">
                <h2>{title}</h2>
            </div>
            <Table striped bordered variant="dark" className={tableClass}>
                <thead>
                    <tr>
                        {headingColumns.map((col,index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </Table>
        </div>
    );
}

export default ZilliqaTable
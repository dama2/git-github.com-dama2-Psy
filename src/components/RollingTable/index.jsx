import { Table, theme } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import './index.scss'


export default function TableRolling(props) {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);

  const { token } = theme.useToken();
  // 有多少列没有设置宽度
  const widthColumnCount = columns.filter(({ width }) => !width).length;
  // 给所有列设置宽度
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }
    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });
  const gridRef = useRef();


  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };
  useEffect(() => resetVirtualGrid, [tableWidth]);
  // 渲染所有的列
  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {

    // 总高度
    const totalHeight = rawData.length * 54;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll?.y && index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={{
              ...style,
              // ...rawData[rowIndex][mergedColumns[5]].style,
              color: `${rawData[rowIndex][mergedColumns[5].dataIndex] === 0 ? 'black' : 'red'}`,
              fontWeight: `${rawData[rowIndex][mergedColumns[5].dataIndex] === 0 ? '' : 'bold'}`,
              boxSizing: 'border-box',
              padding: token.padding,
              borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
              background: token.colorBgContainer,
            }}
          >{
              columnIndex === 5 ? 
                rawData[rowIndex][mergedColumns[5].dataIndex] === 0 ? "正常" : '异常' : 
                rawData[rowIndex][mergedColumns[columnIndex].dataIndex]
            }
          </div>
        )
        }
      </Grid >
    );
  };

  return (
    <ResizeObserver
      onResize={({ width, height }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};


import { useState, useMemo, useRef, useEffect } from 'react';
import './Table.scss'
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export interface TableItem {
  indicator: string;
  currentDay: number;
  yesterday: number;
  dayWeek: number;
  id: number;
};

type TableProps = {
  items: TableItem[];
};

const Table: React.FC<TableProps> = ({ items }) => {
  const [openedRowId, setOpenedRowId] = useState<number | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(evt.target as Node)) {
        setOpenedRowId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRowClick = (id: number) => {
    setOpenedRowId(openedRowId === id ? null : id);
  };

  const processedItems = useMemo(() => {
    return items.map(item => {
      const percentage = Math.round((item.currentDay - item.yesterday) / item.yesterday * 100);
      const total = item.dayWeek - item.currentDay;
      return {
        ...item,
        percentage,
        isYesterdayLess: percentage < 0,
        isYesterdayMore: percentage > 0,
        isTotalLess: total > 0,
        isTotalMore: total < 0,
      };
    });
  }, [items]);

  const demoChartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      height: 200, // уменьшенная высота для вставки в таблицу
    },
    title: {
      text: 'График показателя',
    },
    xAxis: {
      categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    },
    yAxis: {
      title: {
        text: 'Значение',
      },
    },
    series: [{
      name: 'Показатель',
      data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2],
      type: 'line'
    }],
    credits: {
      enabled: false,
    },
  };


  return (
    <div className="table">
      <table className='table__table'>
        <thead>
          <tr className='table__row table__row--header'>
            <th className='table__cell'>Показатель</th>
            <th className='table__cell table__cell--current'>Текущий день</th>
            <th className='table__cell'>Вчера</th>
            <th className='table__cell'>Этот день недели</th>
          </tr>
        </thead>

        <tbody>
          {processedItems.map((item) => (
            <React.Fragment key={item.id}>
              {openedRowId === item.id && (
                <tr
                  className='table__row table__row--new'
                  key={`new-${item.id}`}
                >
                  <td colSpan={4}>
                    <div className="table__new-row-content">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={demoChartOptions}
                      />
                    </div>
                  </td>
                </tr>
              )}

              <tr
                className={`table__row ${openedRowId === item.id ? 'table__row--active' : ''}`}
                key={item.id}
                onClick={() => handleRowClick(item.id)}
              >
                <td className='table__cell'>{item.indicator}</td>
                <td className='table__cell table__cell--current'>{item.currentDay.toLocaleString('ru-RU')}</td>
                <td className={
                  `table__cell ${item.isYesterdayLess ?
                    'is-less' : ''}
                ${item.isYesterdayMore ?
                    'is-more' : ''}`}>
                  <div className='table__yestarday'>
                    <span className='table__yestarday-sum'>
                      {item.yesterday.toLocaleString('ru-RU')}
                    </span>
                    <span className='table__yestarday-persentage'>
                      {`${item.percentage} %`}
                    </span>
                  </div>
                </td>
                <td className={
                  `table__cell ${item.isTotalLess ?
                    'is-less' : ''}
                ${item.isTotalMore ?
                    'is-more' : ''}`}
                >
                  {item.dayWeek.toLocaleString('ru-RU')}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table

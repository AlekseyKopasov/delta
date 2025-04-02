import './App.scss'
import Table from './components/Table'

const tableData = [
  {
    id: 0,
    indicator: 'Выручка, руб',
    currentDay: 500521,
    yesterday: 480521,
    dayWeek: 4805121,
  },
  {
    id: 1,
    indicator: 'Наличные',
    currentDay: 300000,
    yesterday: 300000,
    dayWeek: 300000,
  },
  {
    id: 2,
    indicator: 'Безналичный расчет',
    currentDay: 100000,
    yesterday: 100000,
    dayWeek: 100000,
  },
  {
    id: 3,
    indicator: 'Кредитные карты',
    currentDay: 100521,
    yesterday: 100521,
    dayWeek: 100521,
  },
  {
    id: 4,
    indicator: 'Средний чек, руб',
    currentDay: 1300,
    yesterday: 900,
    dayWeek: 900,
  },
  {
    id: 5,
    indicator: 'Средний гость, руб',
    currentDay: 1200,
    yesterday: 800,
    dayWeek: 800,
  },
  {
    id: 6,
    indicator: 'Удаления из чека (после оплаты), руб',
    currentDay: 1000,
    yesterday: 1100,
    dayWeek: 900,
  },
  {
    id: 7,
    indicator: 'Удаления из чека (до оплаты), руб',
    currentDay: 1300,
    yesterday: 1300,
    dayWeek: 900,
  },
  {
    id: 8,
    indicator: 'Количество чеков',
    currentDay: 34,
    yesterday: 36,
    dayWeek: 34,
  },
  {
    id: 9,
    indicator: 'Количество гостей',
    currentDay: 34,
    yesterday: 36,
    dayWeek: 32,
  },
];

function App() {
  return (
    <Table items={tableData} />
  )
}

export default App

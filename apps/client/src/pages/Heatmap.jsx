import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import HeatMap from '@uiw/react-heat-map'
import dayjs from 'dayjs'
import { apiGetHabitsOfTodo } from '../api/todos';
import { AppContext } from "../App";

// const value = [
//   { date: '2016/01/11', count: 2 },
//   { date: '2016/01/12', count: 20 },
//   { date: '2016/01/13', count: 10 },
//   ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
//   { date: '2016/04/11', count: 2 },
//   { date: '2016/05/01', count: 5 },
//   { date: '2016/05/02', count: 5 },
//   { date: '2022/05/04', count: 11 },
//   { date: '2022/11/04', count: 11 },
// ];



const Heatmap = () => {

  const { id } = useParams()
  const { authDetails } = useContext(AppContext) || {}

  const [ value, setValue ] = useState([])
  const [ info, setInfo ] = useState({})
  const [ darkMode, setDarkMode ] = useState(false)

  const handleMouseover = (data) => {
    setInfo({date: data.date, count: data.count})
  }
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      setDarkMode(true)
    }

    const getHabit = async () => {
      const response = await apiGetHabitsOfTodo(id, authDetails.accessToken)
      console.log(response.data)
      if (response.data.length > 0) {
        const habits = response.data.map(habit => {
          return ({
            date: habit.date,
            count: habit.count
          })
        })
        console.log(habits)
        setValue(habits)
      }
      
    }

    getHabit()
  }, [])
  
  const firstColor = darkMode ? '#334155' : '#EBEDF0'
  // console.log(dayjs(dayjs().subtract(1, 'year')).toDate())
  // console.log(new Date())
  return (
    <>
    <div className='text-xl my-3'>Habit</div>
    <div className=''>
      <HeatMap 
        value={value} 
        // endDate={(dayjs().subtract(1, 'year')).toDate()} 
        startDate={(dayjs().subtract(1, 'year')).toDate()} 
        width={725}
        style={darkMode ? { color: '#EBEDF0' } : { color: '#1e293b'}}
        panelColors={{ 0: `${firstColor}`, 1: '#7BC96F', 2: '#C6E48B', 4: '#239A3B', 6: '#196127' }}
        rectRender={(props, data) => {
          // if (!data.count) return <rect {...props} />;
          // console.log(props)
          return (
            
              <rect 
                onMouseEnter={() => handleMouseover(data)} 
                key={props.key}
                {...props} />
            
          );
        }}
        />
    </div>
    <div className=''>
      Date: {dayjs(info.date).format('D MMM YYYY')}
    </div>
    <div className=''>
      Count: {info.count ?? 0}
    </div>
    </>
  )
};

export default Heatmap
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import HeatMap from '@uiw/react-heat-map'
import dayjs from 'dayjs'
import { apiGetHabitsOfTodo } from '../api/todos';
import { AppContext } from "../App";

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
      // console.log(response.data)
      if (response.data.length > 0) {
        const habits = response.data.map(habit => {
          return ({
            date: habit.date,
            count: habit.count
          })
        })
        // console.log(habits)
        setValue(habits)
      }
      
    }

    getHabit()
  }, [])
  
  const firstColor = darkMode ? '#1e293b' : '#cbd5e1'
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
        rectSize={12}
        width={775}
        style={darkMode ? { color: '#e2e8f0' } : { color: '#1e293b'}}
        panelColors={{ 0: `${firstColor}`, 1: '#4ade80', 2: '#22c55e', 4: '#16a34a', 6: '#15803d' }}
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
    <div className='visible md:invisible ml-6'>
      Heatmap is better viewed in landscape mode
    </div>
    <div className='invisible md:visible text-left sm:ml-10 md:ml-72'>
      Date: {dayjs(info.date).format('D MMM YYYY')}
    </div>
    <div className='invisible md:visible text-left sm:ml-10 md:ml-80'>
      Count: {info.count ?? 0}
    </div>
    </>
  )
};

export default Heatmap
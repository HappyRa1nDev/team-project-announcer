import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  isSameDay,
  isAfter,
  isBefore,
} from 'date-fns';
import { ru } from 'date-fns/esm/locale';
import { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
};

const Calendar = (props) => {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const handleDateClick = (day) => {
    if (isToday(day) || isAfterToday(day)) {
      setSelectedDay(day);
      props.setFormData((prevState) => ({
        ...prevState,
        date: day.toLocaleDateString("ru-RU")
      }));
    }
  }

  const isAfterToday = (day) => {
    return isSameDay(day, today) || isAfter(day, today);
  }

  return (
          <div className="bg-[#0F0C0C] rounded-3xl p-[24px] w-[300px] relative">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-[#f5f5fa] uppercase">
                {
								format(
									firstDayCurrentMonth, 
									'MM yyyy',
									{
										locale: ru,
										weekStartsOn: 0
									}
									)
								}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-[#f5f5fa]">
                <a className="material-icons" aria-hidden="true">chevron_left</a>
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-[#f5f5fa]">
                <span className="sr-only">Next month</span>
                <a className="material-icons" aria-hidden="true">chevron_right</a>
              </button>
              <button
                onClick={() => props.setShowCalendar(false)}
                type="button"
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-[#f5f5fa]">
                <a className="material-icons" aria-hidden="true">close</a>
              </button>
            </div>
            <div className="grid grid-cols-7 mt-5 text-xs text-center text-[#f5f5fa]">
              <div>ПН</div>
              <div>ВТ</div>
              <div>СР</div>
              <div>ЧТ</div>
              <div>ПТ</div>
              <div>СБ</div>
              <div>ВС</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
              type="button"
              onClick={() => handleDateClick(day)}
              className={classNames(
                isBefore(day, today) && 'text-[#333333]',
                isEqual(day, selectedDay) && 'text-[#0f0c0c]',
                !isEqual(day, selectedDay) &&
                  isToday(day) &&
                  'text-[#394770]',
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  'text-[#f5f5fa]',
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  'text-gray-400',
                isEqual(day, selectedDay) && isToday(day) && 'bg-[#394770]',
                isEqual(day, selectedDay) &&
                  !isToday(day) && isAfterToday(day) &&
                  'bg-[#f5f5fa] text-[#0f0c0c]',
                !isEqual(day, selectedDay) && !isBefore(day, today) && 'hover:bg-[#f5f5fa] hover:text-[#0f0c0c]',
                (isEqual(day, selectedDay) || isToday(day)) &&
                  'font-semibold',
                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
              )}
              disabled={!isAfterToday(day)}>
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
  )
};

let colStartClasses = [
  '',
  'col-start-1',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
]

export {Calendar};
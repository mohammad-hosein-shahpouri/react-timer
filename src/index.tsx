import React, { CSSProperties, useLayoutEffect, useRef, useState } from 'react'
import moment, { Moment } from 'moment'

interface IBaseProps {
  showSeconds?: 'never' | 'always' | 'onlyIfIsNotZero' | 'ifOnStartisNotZero'
  showMinutes?: 'never' | 'always' | 'onlyIfIsNotZero' | 'ifOnStartisNotZero'
  showHours?: 'never' | 'always' | 'onlyIfIsNotZero' | 'ifOnStartisNotZero'
  showDays?: 'never' | 'always' | 'onlyIfIsNotZero' | 'ifOnStartisNotZero'
  secondsText?: string
  minutesText?: string
  hoursText?: string
  daysText?: string
  seperatorChar?: string
  pluralSymbol?: string
  id?: string
  className?: string
  style?: CSSProperties
  onFinish?: (element: HTMLSpanElement) => void
}

export interface TimerProps extends IBaseProps {}

export interface StopWatchProps extends IBaseProps {
  end?: Date | string | Moment
  onEachSecond?: (
    element: HTMLSpanElement,
    secondsPassed: number,
    minutesPassed: number,
    hoursPassed: number,
    daysPassed: number
  ) => void
}

export function Timer({ className }: TimerProps) {
  return <div className={className}>Example Component: </div>
}

export function StopWatch({
  id,
  className,
  style,
  seperatorChar = ',',
  showSeconds = 'always',
  showMinutes = 'always',
  showHours = 'always',
  showDays = 'always',
  daysText = 'Day',
  hoursText = 'Hour',
  minutesText = 'Minute',
  secondsText = 'Second',
  pluralSymbol = 's',
  onEachSecond,
  onFinish,
  end
}: StopWatchProps) {
  const [second, setSecond] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)
  const [hour, setHour] = useState<number>(0)
  const [day, setDay] = useState<number>(0)
  const [finished, setFinished] = useState<boolean>(false)

  const holderRef = useRef<HTMLSpanElement>(null)

  const timeout = 1000
  useLayoutEffect(() => {
    var endTime = moment(end)

    var interval = setInterval(() => {
      if (!finished) {
        if (second == 59) {
          setSecond(0)
          if (minute == 59) {
            setMinute(0)
            if (hour == 23) {
              setDay((state) => ++state)
              setHour(0)
            } else setMinute((state) => ++state)
          } else setMinute((state) => ++state)
        } else setSecond((state) => ++state)

        if (onEachSecond)
          onEachSecond(holderRef.current!, second, minute, hour, day)

        if (end) {
          var now = moment(new Date())

          if (endTime.isBefore(now)) {
            clearInterval(interval)
            setFinished(true)
            if (onFinish) onFinish(holderRef.current!)
          }
        }
      }
      console.log('object')
    }, timeout)

    return () => {
      clearInterval(interval)
    }
  })

  const isPlural = (status: number) => (status >= 2 ? pluralSymbol : '')

  const dayInfo = () => {
    switch (showDays) {
      case 'always':
        return `${day} ${daysText}${isPlural(day)}`
      case 'onlyIfIsNotZero':
        return day ? `${day} ${daysText}${isPlural(day)}` : ''
      case 'ifOnStartisNotZero':
        return `${day} ${daysText}${isPlural(day)}`
      default:
        return ''
    }
  }

  const hourInfo = () => {
    switch (showHours) {
      case 'always':
        return `${hour} ${hoursText}${isPlural(hour)}`
      case 'onlyIfIsNotZero':
        return day ? `${hour} ${hoursText}${isPlural(hour)}` : ''
      case 'ifOnStartisNotZero':
        return `${hour} ${hoursText}${isPlural(hour)}`
      default:
        return ''
    }
  }

  const minuteInfo = () => {
    switch (showMinutes) {
      case 'always':
        return `${minute} ${minutesText}${isPlural(minute)}`
      case 'onlyIfIsNotZero':
        return day ? `${minute} ${minutesText}${isPlural(minute)}` : ''
      case 'ifOnStartisNotZero':
        return `${minute} ${minutesText}${isPlural(minute)}`
      default:
        return ''
    }
  }

  const secondInfo = () => {
    switch (showSeconds) {
      case 'always':
        return `${second} ${secondsText}${isPlural(second)}`
      case 'onlyIfIsNotZero':
        return day ? `${second} ${secondsText}${isPlural(second)}` : ''
      case 'ifOnStartisNotZero':
        return `${second} ${secondsText}${isPlural(second)}`
      default:
        return ''
    }
  }

  var text = `${dayInfo()}${seperatorChar} ${hourInfo()}${seperatorChar} ${minuteInfo()}${seperatorChar} ${secondInfo()}`

  return (
    <span ref={holderRef} className={className} style={style} id={id}>
      {text}
    </span>
  )
}

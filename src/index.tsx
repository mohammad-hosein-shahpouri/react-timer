import React, { CSSProperties, useLayoutEffect, useRef, useState } from 'react'
import moment, { Moment } from 'moment'

interface IBaseProps {
  showSeconds?: 'never' | 'always' | 'onlyIfIsNotZero' //| 'ifOnStartisNotZero'
  showMinutes?: 'never' | 'always' | 'onlyIfIsNotZero' //| 'ifOnStartisNotZero'
  showHours?: 'never' | 'always' | 'onlyIfIsNotZero' //| 'ifOnStartisNotZero'
  showDays?: 'never' | 'always' | 'onlyIfIsNotZero' //| 'ifOnStartisNotZero'
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

export interface ITimerProps extends IBaseProps {
  end: Date | string | Moment
  onEachSecond?: (
    element: HTMLSpanElement,
    secondsLeft: number,
    minutesLeft: number,
    hoursLeft: number,
    daysLeft: number
  ) => void
}

export interface IStopWatchProps extends IBaseProps {
  end?: Date | string | Moment
  onEachSecond?: (
    element: HTMLSpanElement,
    secondsPassed: number,
    minutesPassed: number,
    hoursPassed: number,
    daysPassed: number
  ) => void
}

export function Timer({
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
  end,
  onEachSecond,
  onFinish
}: ITimerProps) {
  const [seconds, setSeconds] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  const [hours, setHours] = React.useState(0)
  const [days, setDays] = React.useState(0)
  const [finished, setFinished] = useState<boolean>(false)

  const holderRef = useRef<HTMLSpanElement>(null)

  const timeOut = 1000

  useLayoutEffect(() => {
    const now = moment(new Date())
    var difference = moment.duration(moment(end).diff(now))

    setDays(difference.get('days'))
    setHours(difference.get('hours'))
    setMinutes(difference.get('minutes'))
    setSeconds(difference.get('seconds'))
  }, [])

  useLayoutEffect(() => {
    var interval = setInterval(() => {
      if (end) {
        var now = moment(new Date())
        if (moment(end).add(-1,"second").isSameOrBefore(now)) {
          clearInterval(interval)
          setFinished(true)
          if (onFinish) onFinish(holderRef.current!)
        }
      }

      if (!finished) {
        if (!seconds) {
          setSeconds(59)
          if (!minutes) {
            setMinutes(59)
            if (!hours && days) {
              setDays((state) => --state)
              setHours(23)
            } else setMinutes((state) => --state)
          } else setMinutes((state) => --state)
        } else setSeconds((state) => --state)

        if (onEachSecond)
          onEachSecond(holderRef.current!, seconds, minutes, hours, days)
      }
    }, timeOut)

    return () => clearInterval(interval)
  })

  const isPlural = (status: number) => (status >= 2 ? pluralSymbol : '')

  const dayInfo = () => {
    switch (showDays) {
      case 'always':
        return `${days} ${daysText}${isPlural(days)}${seperatorChar}`
      case 'onlyIfIsNotZero':
        return days ? `${days} ${daysText}${isPlural(days)}${seperatorChar}` : ''
      // case 'ifOnStartisNotZero':
      //   return `${days} ${daysText}${isPlural(days)}${seperatorChar}`
      default:
        return ''
    }
  }

  const hourInfo = () => {
    switch (showHours) {
      case 'always':
        return `${hours} ${hoursText}${isPlural(hours)}${seperatorChar}`
      case 'onlyIfIsNotZero':
        return hours ? `${hours} ${hoursText}${isPlural(hours)}${seperatorChar}` : ''
      // case 'ifOnStartisNotZero':
      //   return `${hours} ${hoursText}${isPlural(hours)}${seperatorChar}`
      default:
        return ''
    }
  }

  const minuteInfo = () => {
    switch (showMinutes) {
      case 'always':
        return `${minutes} ${minutesText}${isPlural(minutes)}${seperatorChar}`
      case 'onlyIfIsNotZero':
        return minutes ? `${minutes} ${minutesText}${isPlural(minutes)}${seperatorChar}` : ''
      // case 'ifOnStartisNotZero':
      //   return `${minutes} ${minutesText}${isPlural(minutes)}${seperatorChar}`
      default:
        return ''
    }
  }

  const secondInfo = () => {
    switch (showSeconds) {
      case 'always':
        return `${seconds} ${secondsText}${isPlural(seconds)}`
      case 'onlyIfIsNotZero':
        return seconds ? `${seconds} ${secondsText}${isPlural(seconds)}` : ''
      // case 'ifOnStartisNotZero':
      //   return `${seconds} ${secondsText}${isPlural(seconds)}`
      default:
        return ''
    }
  }

  var text = `${dayInfo()} ${hourInfo()} ${minuteInfo()} ${secondInfo()}`

  return (
    <span className={className} style={style} id={id}>
      {text}
    </span>
  )
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
}: IStopWatchProps) {
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
      // case 'ifOnStartisNotZero':
      //   return `${day} ${daysText}${isPlural(day)}`
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
      // case 'ifOnStartisNotZero':
      //   return `${hour} ${hoursText}${isPlural(hour)}`
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
      // case 'ifOnStartisNotZero':
      //   return `${minute} ${minutesText}${isPlural(minute)}`
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
      // case 'ifOnStartisNotZero':
      //   return `${second} ${secondsText}${isPlural(second)}`
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

import { CSSProperties } from 'react';
interface IBaseProps {
    showSeconds?: 'never' | 'always' | 'onlyIfIsNotZero' | 'ifOnStartisNotZero';
    showMinutes?: 'never' | 'always' | 'onlyIfIsNotZero' | 'ifOnStartisNotZero';
    showHours?: 'never' | 'always' | 'onlyIfIsNotZero' | 'ifOnStartisNotZero';
    showDays?: 'never' | 'always' | 'onlyIfIsNotZero' | 'ifOnStartisNotZero';
    secondsText?: string;
    minutesText?: string;
    hoursText?: string;
    daysText?: string;
    seperatorChar?: string;
    pluralSymbol?: string;
    className?: string;
    style?: CSSProperties;
    onFinish?: () => void;
}
export interface TimerProps extends IBaseProps {
}
export interface StopWatchProps extends IBaseProps {
    end?: Date | string;
    onEachSecond?: (secondsPassed: number, minutesPassed: number, hoursPassed: number, daysPassed: number) => void;
}
export declare function Timer({ className }: TimerProps): JSX.Element;
export declare function StopWatch({ className, style, seperatorChar, showSeconds, showMinutes, showHours, showDays, daysText, hoursText, minutesText, secondsText, pluralSymbol, onEachSecond, onFinish, end }: StopWatchProps): JSX.Element;
export {};

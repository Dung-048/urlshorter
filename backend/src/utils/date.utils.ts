import dayjs, {Dayjs} from "dayjs";
import {StatPeriod} from "../modules/stat/domain/stat-period";


export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]!;
}

export function calculateAge(birthDate: Date): number {
    const today = new Date();

    const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    const age = today.getFullYear() - birthDate.getFullYear();
    return (today < thisYearBirthday) ? age - 1 : age;
}

export function getToday(): Date {
    return dayjs().startOf('day').toDate();
}

export function getTomorrow(): Date {
    return dayjs().startOf('day').add(1, 'day').toDate();
}

function findStartDate(period: StatPeriod): Dayjs {
    const today = dayjs().startOf('day');

    if (period === StatPeriod.WEEK) {
        return today.add(-1, 'week')
    }

    if (period === StatPeriod.MONTH) {
        return today.add(-1, 'month')
    }

    if (period === StatPeriod.THREE_MONTH) {
        return today.add(-3, 'month')
    }

    if (period === StatPeriod.SIX_MONTH) {
        return today.add(-6, 'month')
    }

    // YEAR
    return today.add(-1, 'year')
}

export function findDates(period: StatPeriod) {
    const today = dayjs().startOf('day');

    return {
        endDate: today,
        startDate: findStartDate(period),
    }
}

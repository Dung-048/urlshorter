import dayjs from "dayjs";


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
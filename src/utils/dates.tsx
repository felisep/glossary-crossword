// utils/getWeekNumber.ts

export function getWeekNumber(date: Date): number {
    // Copy the date to avoid modifying the original
    const currentDate = new Date(date.getTime());

    // Set the time to noon to avoid DST issues
    currentDate.setHours(12, 0, 0, 0);

    // Set to nearest Thursday: current day + 4 - current day number
    // Make Sunday (0) -> 7
    const dayOfWeek = (currentDate.getDay() + 6) % 7;
    currentDate.setDate(currentDate.getDate() - dayOfWeek + 3);

    // January 4 is always in week 1 (ISO week date system)
    const startOfYear = new Date(currentDate.getFullYear(), 0, 4);

    // Adjust to nearest Thursday
    const startDayOfWeek = (startOfYear.getDay() + 6) % 7;
    startOfYear.setDate(startOfYear.getDate() - startDayOfWeek + 3);

    // Calculate full weeks to nearest Thursday
    const weekNumber = 1 + Math.round(((currentDate.getTime() - startOfYear.getTime()) / 86400000 - 3) / 7);

    return weekNumber;
}

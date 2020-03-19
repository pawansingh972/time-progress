let DateTimeUtils = {};

DateTimeUtils.isLeapYear = (year=new Date().getFullYear()) => {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

DateTimeUtils.getTotalDaysOfYear = (year=new Date().getFullYear()) => {
    return DateTimeUtils.isLeapYear(year) ? 366 : 365;
}

DateTimeUtils.getMonthWiseDatesForYear = (year = new Date().getFullYear()) => {
    const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeapYear = DateTimeUtils.isLeapYear(year);
    if (isLeapYear) {
        return monthDays;
    }
    monthDays[1] = 28;
    return  monthDays;
}

DateTimeUtils.getDayName = (date = new Date()) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[date.getDay()].substring(0, 3);
}

DateTimeUtils.getMonthName = (date = new Date()) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()].substring(0, 3);
}

DateTimeUtils.getAMorPM = (date=new Date()) => {
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    return ampm;
}

DateTimeUtils.getTimeInAmPmFormat = (date = new Date()) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be 12

    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
}

DateTimeUtils.getTodaysDate = () => {
    return new Date().getDate();
}

DateTimeUtils.getTodaysDescription = () => {
    const dayName = DateTimeUtils.getDayName();
    const monthName = DateTimeUtils.getMonthName();
    const todaysDate = DateTimeUtils.getTodaysDate();
    const timeInAmPmFormat = DateTimeUtils.getTimeInAmPmFormat();    
    return `${dayName}, ${monthName} ${todaysDate}, ${timeInAmPmFormat}`;
}


DateTimeUtils.isoWeekday = (date=new Date()) => {
    const day = date.getDay();
    return day === 0 ? 7 : day;
}

DateTimeUtils.getDaysSpentTillDate = () => {
    const monthWiseDates = DateTimeUtils.getMonthWiseDatesForYear();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const prevMonthDays = monthWiseDates.slice(0, currentMonth).reduce((acc, curr) => { return acc + curr } , 0);
    return prevMonthDays + currentDate.getDate() - 1;
}

// Based on CurrentTimeStamp and Year start date TimeStamp
DateTimeUtils.getYearProgress = (date=new Date()) => {
    const yearStartDate = new Date(date.getFullYear(), 0, 1);
    const totalDaysThisYear = DateTimeUtils.getTotalDaysOfYear();
    const daysSpentThisYear = Number((date - yearStartDate) / (1000 * 60 * 60 * 24)).toFixed(2);
    const percentYearSpent = Number((daysSpentThisYear / totalDaysThisYear) * 100).toFixed(2);
    return percentYearSpent;
}


// Based on Days spent out of total days
DateTimeUtils.getDaysSpentInYearPercentage = () => {
    const totalDaysThisYear = DateTimeUtils.getTotalDaysOfYear();
    const daysSpentThisYear = DateTimeUtils.getDaysSpentTillDate();
    return ((daysSpentThisYear * 100) / totalDaysThisYear);
}



DateTimeUtils.getMonthProgress = (date=new Date()) => {
    const month = date.getMonth();
    const monthStartDate = new Date(date.getFullYear(), month, 1);
    const monthWiseDatesThisYear = DateTimeUtils.getMonthWiseDatesForYear();
    
    const totalDaysThisMonth = monthWiseDatesThisYear[month];
    const daysSpentThisMonth = date.getDate();
    const percentMonthSpent = Number((daysSpentThisMonth / totalDaysThisMonth) * 100).toFixed(2);
    return percentMonthSpent;
}

DateTimeUtils.getWeekProgress = () => {
    const weekDay = DateTimeUtils.isoWeekday();
    const percentWeekSpent = Math.floor((weekDay / 7) * 100);
    return percentWeekSpent;
}


// Own Method 
// TODO: Needs to be looked at
DateTimeUtils.getDayProgress = (date=new Date(), unit='minutes') => {
    const totalDayMinutes = 1440;
    const totalDaySeconds = 86400;

    if (unit === 'minutes') {
        let minutesSpentToday = (date.getHours() * 60) + date.getMinutes();    
        return Number((minutesSpentToday * 100) / totalDayMinutes ).toFixed(2);
    }

    if (unit === 'seconds') {
        let secondsSpentToday = (((date.getHours() * 60) + date.getMinutes()) * 60) + date.getSeconds();    
        return Number((secondsSpentToday * 100) / totalDaySeconds ).toFixed(5);
    }
}



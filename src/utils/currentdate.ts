export const getCurrentDate = () => {
    const newDate = new Date();
    const date = newDate.getDate();
    const day = Day.get(newDate.getDay());
    const month = Month.get(newDate.getMonth()+1);
    const year = newDate.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


export const getDate = (_date : Date) => {
    const date = _date.getDate();
    const day = Day.get(_date.getDay());
    const month = Month.get(_date.getMonth()+1);
    const year = _date.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

const Day : Map<number, string> = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
]);


const Month : Map<number, string> = new Map([
    [1, "January"],
    [2, "February"],
    [3, "March"],
    [4, "April"],
    [5, "May"],
    [6, "June"],
    [7, "July"],
    [8, "August"],
    [9, "September"],
    [10, "October"],
    [11, "November"],
    [12, "December"],

])

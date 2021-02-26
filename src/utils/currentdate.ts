


const getCurrentDate = (separator = "") => {
    const newDate = new Date();
    const date = newDate.getDate();
    const day = Day.get(newDate.getDay());
    const month = Month.get(newDate.getMonth()+1);

    return `${day} ${date} ${month}`;
    // return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

const Day : Map<number, string> = new Map([
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
    [7, "Sunday"],
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

export default getCurrentDate()
const formatDate = function(date){
    //short month + day with ending, full year + 'at' + time with 2 digits (hours and minutes) + am/pm
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    let hour = date.getHours();
    let amPm='';
    if(hour>=12){
        amPm='pm';
        if(hour>12){
            // if not noon, remove 12
            hour-=12;
        }
    } else {
        amPm='am';
        if(hour===0){
            // if midnight, add 12
            hour=12;
        }
    }
    if(hour<10){
        hour='0'+hour;
    }
    let minute = date.getMinutes();
    if(minute<10){
        minute='0'+minute;
    }
    return `${month} ${date.getDate()}${daySuffix(date.getDate())}, ${date.getFullYear()} at ${hour}:${minute} ${amPm}`;
}
const daySuffix = (day) => {
    // 1st, 21st, 31st
    // 2nd, 22nd
    // 3rd, 23rd
    // evrything else is th
    switch (day) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
    }
};
module.exports = {formatDate};
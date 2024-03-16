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
    return `${month} ${date.getDate()}${nth(date.getDate())}, ${date.getFullYear()} at ${hour}:${minute} ${amPm}`;
}
const nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
};
module.exports = {formatDate};
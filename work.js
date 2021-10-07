let message;
let login = prompt("LOGIN:")
switch(login){
    case 'Employee':message='hello'; break;
    case 'Director':message='greetings'; break;
    case '':message='no login'; break;
    default:message='';break;
}
alert(message)
//business check
let date = prompt("day");
if(weekdays.has(date) && time>=9 && time<=17 || !weekdays.has(date)){
    alert("we're open");
}
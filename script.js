let introText= `The 4-4-5 calendar is a method of managing accounting periods, and is a common calendar structure for some industries such as retail and manufacturing.

The 4-4-5 calendar divides a year into four quarters of 13 weeks grouped into two 4-week "months" and one 5-week "month". The grouping of 13 weeks may also be set up as 5–4–4 weeks or 4–5–4.

When this type of calendar is in use, reports with month-by-month comparisons or trends are flawed as one month is 25% longer than the other two. It could still compare a period to the same period in the prior year, or use week by week data comparisons.

Its major advantage over a regular calendar is that the end date of the period is always the same day of th      e week, which is useful for shift or manufacturing planning as every period is the same length.

A disadvantage of the 4-4-5 calendar is that it has only 364 days (7 days x 52 weeks), meaning a 53rd week will need to be added every five or six years: this can make year-on-year comparison difficult.

`

let introPara = document.createElement('div');
introPara.innerHTML=introText
introPara.setAttribute("id","intro-para")
document.getElementById('body').appendChild(introPara);

let inputYear=2022
let startMonth="Feb"

let monthArray= [
    {monthIndex: 1,month: "Jan", days: 31},
    {monthIndex: 2,month: "Feb", days: inputYear%4===0?29:28}, 
    {monthIndex: 3,month: "Mar", days: 31 },
    {monthIndex: 4,month: "Apr", days: 30},
    {monthIndex: 5,month: "May", days: 31 },
    {monthIndex: 6,month: "Jun", days: 30}, 
    {monthIndex: 7,month: "Jul", days: 31 },
    {monthIndex: 8,month: "Aug", days: 31},
    {monthIndex: 9,month: "Sep", days: 30},
    {monthIndex: 10,month: "Oct", days: 31 },
    {monthIndex: 11,month: "Nov", days: 30},
    {monthIndex: 12,month: "Dec", days: 31},
]


let dayArray = ["S","M","T","W","T","F","S"]

let startMonthIndex= monthArray.findIndex(monthVal=> monthVal.month===startMonth)
startMonthIndex=startMonthIndex/10 < 1? `0${startMonthIndex+1}`:startMonthIndex+1

console.log(startMonthIndex)

monthArray.push.apply(monthArray, monthArray.splice(0, startMonthIndex-1));
console.log(monthArray)

let calendarBeginning = new Date(`${startMonthIndex}-01-${inputYear}`).getDay()%6===0
?`${startMonthIndex}-01-${inputYear}`:
new Date(new Date(`${startMonthIndex}-01-${inputYear}`).getTime()+((7-new Date(`${startMonthIndex}-01-${inputYear}`).getDay())*24*60*60*1000))



let finalYearArray=[], dateCounter= calendarBeginning.getDate(), monthCounter=0

let currentMonth=startMonthIndex

while(monthCounter<12){ 


    //make a copy of object of month
    let monthObject= {...monthArray[monthCounter]}


    //create table for each month
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    document.getElementById('table-body').appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);
    let weekdayRow = document.createElement('tr');
    let monthHeading = document.createElement('th');
    monthHeading.innerHTML = monthObject.month;
    monthHeading.setAttribute("id","month-name");
    weekdayRow.appendChild(monthHeading);

    //set day headings to the month table
    for (const day of dayArray) {
        let heading = document.createElement('th');
        heading.innerHTML = day;
        heading.setAttribute("id","day-name")
        weekdayRow.appendChild(heading);
    }
    thead.appendChild(weekdayRow);


   
    let numberOfWeeks= (monthCounter+1)%3===0?5:4
    let maxDateArray= numberOfWeeks*7
    let weekCounter=1
    let weekArray=new Array(numberOfWeeks)
    let dateArray=[]
    let monthDaysCompleted= 0
    let dayCounter=0
    currentMonth=monthCounter
    let dayRow = document.createElement('tr');
    let weekRowData = document.createElement('td');
    weekRowData.innerHTML=weekCounter
    weekRowData.setAttribute("id","week-row")
    dayRow.appendChild(weekRowData)
    while(monthDaysCompleted<maxDateArray){

        if(dateCounter>monthObject.days){
            dateCounter=1
            currentMonth++
        }
        // console.log(maxDateArray,monthDaysCompleted,dateCounter,monthObject.days,monthObject.month)
        
        if(dayCounter>6){
            dayCounter=0
        }

        dateArray.push({date: `${dateCounter/10<1?`0${dateCounter}`:`${dateCounter}`}/${monthObject.monthIndex/10<1?`0${monthObject.monthIndex}`:`${monthObject.monthIndex}`}/${inputYear}`, day: dayArray[dayCounter]})


        let dayRowData = document.createElement('td');
        dayRowData.innerHTML=dateCounter
        dayRowData.setAttribute("id","day-cells")
        dayRow.appendChild(dayRowData)

        if(dayCounter===6){
            let weekObject = {
                weekNumber: `Week ${weekCounter}`,
                days: [...dateArray]
            }
            weekArray[weekCounter-1]={...weekObject}
            dateArray=[]
            weekCounter++
            tbody.appendChild(dayRow);
            dayRow = document.createElement('tr');
            weekRowData = document.createElement('td');
            weekRowData.setAttribute("id","week-row")
            weekRowData.innerHTML=weekCounter
            dayRow.appendChild(weekRowData)
        }
        

        
        dateCounter++
        dayCounter++
        monthDaysCompleted++
 
    }
    
    monthObject={fiscalMonth:monthObject.month, numberOfWeeks, weeks: [...weekArray]}
    finalYearArray.push(monthObject)
    monthCounter++
}


console.log({fiscalYear:inputYear, months:[...finalYearArray]})











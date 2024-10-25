const btn = document.getElementById("calcAgeBtn")
document.querySelector("#yearInput").setAttribute("max",`${parseInt(new Date().getFullYear())}`)

btn.addEventListener("click", (click) => 
{
    click.preventDefault();
    let dayInput = document.querySelector("#dayInput");
    let monthInput = document.querySelector("#monthInput");
    let yearInput = document.querySelector("#yearInput");
    let errMessageArr = document.querySelectorAll(".errMessage");
    let dayValue = parseInt(dayInput.value);
    let monthValue = parseInt(monthInput.value);
    let yearValue = parseInt(yearInput.value);
    let maxLimit = parseInt(new Date().getFullYear());
    let maxMonth = parseInt(new Date().getMonth());
    let correctYear = true;
    let correctMonth = true;
    let correctDay = true;

    // console.log(dayValue + "-" + monthValue + "-" + yearValue);

    if(isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue) || (yearValue > maxLimit ) || (monthValue >= 12))
    {
        if(isNaN(dayValue))
        {
            errMessageArr[0].innerHTML = `This field is required`;
            errMessageArr[0].parentElement.firstElementChild.style.color = "hsl(0, 100%, 67%)"
            dayInput.classList.add("errInput");
            correctDay = false;
        }

        if(isNaN(monthValue))
        {
            errMessageArr[1].innerHTML = `This field is required`;
            errMessageArr[1].parentElement.firstElementChild.style.color = "hsl(0, 100%, 67%)"
            monthInput.classList.add("errInput");
            correctMonth = false;
        }

        if(isNaN(yearValue))
        {
            errMessageArr[2].innerHTML = `This field is required`
            errMessageArr[2].parentElement.firstElementChild.style.color = "hsl(0, 100%, 67%)"
            yearInput.classList.add("errInput");
            correctYear = false;
        }

        if(yearValue == maxLimit && monthValue > maxMonth)
        {
            errMessageArr[1].innerHTML = `Must be in the past`
            errMessageArr[1].parentElement.firstElementChild.style.color = "hsl(0, 100%, 67%)"
            monthInput.classList.add("errInput");
            correctMonth = false;
        }

        if((yearValue > maxLimit ))
        {
            errMessageArr[2].innerHTML = `Must be in the past`
            errMessageArr[2].parentElement.firstElementChild.style.color = "hsl(0, 100%, 67%)"
            yearInput.classList.add("errInput");
            correctYear = false;
        }

        if(monthValue > 12)
        {
            errMessageArr[1].innerHTML = `Must be a valid month`
            errMessageArr[1].parentElement.firstElementChild.style.color = "hsl(0, 100%, 67%)"
            monthInput.classList.add("errInput");
            correctMonth = false;
        }
    }

    if(correctMonth && correctYear)
    {
        correctDay = CheckDay(dayValue , monthValue , yearInput);
    }

    if((dayValue > 31 || !correctDay && !isNaN(dayInput)))
    {
        errMessageArr[0].innerHTML = `Must be a valid day`
        errMessageArr[0].parentElement.firstElementChild.style.color = "hsl(0, 100%, 67%)"
        dayInput.classList.add("errInput");
        correctDay = false;
    }

    if(correctDay)
    {
        errMessageArr[0].innerHTML = ``
        errMessageArr[0].parentElement.firstElementChild.style.color = "hsl(0, 1%, 44%)"
        dayInput.classList.remove("errInput");
    }

    if(correctMonth)
    {
        errMessageArr[1].innerHTML = ``
        errMessageArr[1].parentElement.firstElementChild.style.color = "hsl(0, 1%, 44%)"
        monthInput.classList.remove("errInput");
    }

    if(correctYear)
    {
        errMessageArr[2].innerHTML = ``
        errMessageArr[2].parentElement.firstElementChild.style.color = "hsl(0, 1%, 44%)"
        yearInput.classList.remove("errInput");
    }

    if(correctDay && correctMonth && correctYear)
    {
        // console.log(maxLimit + " " + yearValue)

        const age = calculateAge(yearValue + "-" + monthValue + "-" + dayValue);
        // errMessageArr.forEach(err =>{
        //     err.innerHTML ='';
        //     err.parentElement.firstElementChild.style.color = "hsl(0, 1%, 44%)"
        // })
        // dayInput.classList.remove("errInput");
        // monthInput.classList.remove("errInput");
        // yearInput.classList.remove("errInput");

        document.querySelector("#daySpan").innerHTML = `${age.days}`
        document.querySelector("#monthSpan").innerHTML = `${age.months}`
        document.querySelector("#yearSpan").innerHTML = `${age.years}`
        // console.log(age);
    }
})


function calculateAge(birthDate) {
    const today = new Date();
    birthDate = new Date(birthDate); // Convert the input to a Date object

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        // console.log(new Date(today.getFullYear(), today.getMonth(), 0));
        // console.log(new Date(today.getFullYear(), today.getMonth(), 0).getDate());

        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Get last day of previous month
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    return {
        years: years,
        months: months,
        days: days
    };
}

function CheckDay(dayValue , monthValue , yearValue)
{
    let isYearLeap = false;
    if(yearValue % 100 == 0)
    {
        if(yearValue % 400 == 0)
        {
            isYearLeap = true;
        }
    }
    else
    {
        if(yearValue % 4 == 0)
        {
            isYearLeap = true;
        }
    }
    
    if((isYearLeap && monthValue == 2 && dayValue < 30 ) || (!isYearLeap && monthValue == 2 && dayValue < 29))
    {
        return true;
    }

    if((monthValue == 1 || monthValue == 3 || monthValue == 5 || monthValue == 7 || monthValue == 10 || monthValue == 12 || monthValue == 8) && dayValue < 32)
    {
        return true;
    }
        
    if((monthValue == 4 || monthValue == 6 || monthValue == 9 || monthValue == 11) && dayValue < 31)
    {
        return true;
    }

    return false;
}

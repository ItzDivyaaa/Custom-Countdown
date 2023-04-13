const inputContainer=document.getElementById('input-container');
const countdownform=document.getElementById('countdownform');
const dateEl=document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements=document.querySelectorAll('span');

const completeEl=document.getElementById('complete');
const completeElInfo=document.getElementById('complete-info');
const completeBtn=document.getElementById('complete-button');

let countdownTitle='';
let countdownDate='';
let countdownValue=Date;
let countdownActive;
let savedCountdown;

const second =1000;
const minute=second*60;
const hour =minute*60;
const day=hour*24;

//set date input min with today's date

const today=new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today)


//Populate CountDown / complete UI
function updateDOM()
{
    countdownActive=setInterval(()=>{
        const now=new Date().getTime();
        const distance=countdownValue-now;
        //console.log('distance',distance);
    
        const days=Math.floor(distance/day);
        const hours =Math.floor((distance%day)/hour);
        const minutes =Math.floor((distance%hour)/minute);
        const seconds =Math.floor((distance%minute)/second);
        //console.log(days, hours, minutes, seconds);
    
        //Hide Input
        inputContainer.hidden=true;

        //If the countdown has ended,show complete
        if(distance < 0){
            countdownEl.hidden=true;
            clearInterval(countdownActive);
            completeElInfo.textContent= `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden=false;
        }
        else {
            //Else, show the countdown in progress
            
        countdownElTitle.textContent=`${countdownTitle}`;
        timeElements[0].textContent=`${days}`;
        timeElements[1].textContent=`${hours}`;
        timeElements[2].textContent=`${minutes}`;
        timeElements[3].textContent=`${seconds}`;
        completeEl.hidden=true;
        countdownEl.hidden=false;

        }
 
    },second );
}
//Take values from Form Input

//Take values from form input
function updateCountdown(e)
{
    e.preventDefault();
    countdownTitle=e.srcElement[0].value;
    countdownDate=e.srcElement[1].value;
    savedCountdown={
        title:countdownTitle,
        date:countdownDate,
    };
    console.log(savedCountdown);
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));




    //console.log(countdownTitle,countdownDate);
    //Check if no date entered
    if(countdownDate===''){
        alert('Please select a date for the countdown');
    }
    else {
        //Get number version of current date, updateDOM  
        countdownValue=new Date(countdownDate).getTime();
        //console.log ('countdownValue:',countdownValue);
        updateDOM();
    }

    
    

}

//Reset All values
function reset() {
    //Hide countdowns, show input
    countdownEl.hidden=true;
    completeEl.hidden=true;
    inputContainer.hidden=false;
    //Stop the countdown
    clearInterval(countdownActive);
    //Reset Values
    countdownTitle='';
    countdownDate='';
}

//Event Listener
countdownForm.addEventListener('submit',updateCountdown);
countdownButton.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);
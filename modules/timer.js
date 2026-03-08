let minute = 0;
let second = 0;

const countDown = () => {
    if 
}

//for passage setting, timer starts at zero and continues to go up
const countUp = () => {
    if (second < 59){
        second++;
    } else {
        second = 0;
        minute++;
    }

    if(second < 10){
        console(`${minute}:0${second}`)
    } else {
        console.log(`${minute}:${second}`)
    }
}

setInterval(countUp, 1000)
const display = document.createElement("div");
display.className = "display";
document.body.appendChild(display);

const cronometro = document.createElement("p");
cronometro.textContent = "";
cronometro.className = "cronometro";
display.appendChild(cronometro)

const btnContainer = document.createElement("div");
btnContainer.className = "btnContainer";
display.appendChild(btnContainer)

const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset";
btnContainer.appendChild(resetBtn)

const playPauseBtn = document.createElement("button");
playPauseBtn.textContent = "▶︎";
btnContainer.appendChild(playPauseBtn);

updateDisplay(0);

function updateDisplay(time) { 
  let minutes = ""; 
  let seconds = ""; 
  let milliseconds = "";

  let rawMinutes = Math.floor(time / 60000); 
  let rawSeconds = Math.floor((time % 60000) / 1000);
  let rawMilliseconds = Math.floor(((time % 60000) % 1000) / 10)

  if(rawMinutes < 10) { 
    minutes = "0" + rawMinutes; 
  } else { 
    minutes = rawMinutes; 
  }

  if(rawSeconds < 10) { 
    seconds = "0" + rawSeconds 
  } else { 
    seconds = rawSeconds; 
  }

  if(rawMilliseconds < 10) {
    milliseconds = "0" + rawMilliseconds
  } else {
    milliseconds = rawMilliseconds
  }

  cronometro.textContent = `${minutes}:${seconds}:${milliseconds}`
}

let time = 0;
let isRunning = false;
let interval;
let startTime;
let elapsedTime = 0;

playPauseBtn.addEventListener("click", function(){
  if(!isRunning) {
    isRunning = true
    playPauseBtn.textContent = "⏸";
    startTime = Date.now()-elapsedTime
    interval = setInterval(() => {
      time = Date.now() - startTime;
      updateDisplay(time)
    }, 10);
  } else {
    clearInterval(interval)
    time = Date.now() - startTime;
    elapsedTime = time;
    isRunning = false
    playPauseBtn.textContent = "▶︎";
  }
})

resetBtn.addEventListener("click", function(){
  clearInterval(interval);
  isRunning = false;
  time = 0;
  elapsedTime = 0;
  updateDisplay(time)
  playPauseBtn.textContent = "▶︎";
});
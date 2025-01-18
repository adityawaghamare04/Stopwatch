
    let startTime = 0;
    let elapsedTime = 0;
    let intervalId = null;
    let running = false;

    function formatTime(ms) {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
      return `${minutes}:${seconds}:${milliseconds}`;
    }

    function updateDisplay() {
      const now = new Date().getTime();
      if (running) {
        elapsedTime = now - startTime;
      }

      document.getElementById('time-display').textContent = formatTime(elapsedTime);

      const hand = document.getElementById('hand');
      const rotation = (elapsedTime / 1000) * 6; 
      hand.style.transform = `rotate(${rotation}deg)`;
    }

    function startStopwatch() {
      if (!running) {
        startTime = new Date().getTime() - elapsedTime;
        running = true;
        intervalId = setInterval(updateDisplay, 10);
      }
    }

    function pauseStopwatch() {
      running = false;
      clearInterval(intervalId);
    }
    function resetStopwatch() {
      pauseStopwatch();
      elapsedTime = 0;
      updateDisplay();
      document.getElementById('lap-times').innerHTML = '';
      lapCounter = 1; 
    }
    let lapCounter = 1; 
    function recordLap() {
      const lapTimes = document.getElementById('lap-times');
      const lap = document.createElement('div');
      lap.textContent = `Lap ${lapCounter}: ${formatTime(elapsedTime)}`; 
      lapTimes.appendChild(lap);
      lapCounter++; 
    }

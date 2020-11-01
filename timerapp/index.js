const durationInput = document.getElementById('duration');
const startButton = document.querySelector('#start');
const pauseButton = document.getElementById('pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * Math.PI * 2;
circle.setAttribute('stroke-dasharray', perimeter);

let currentOffset = 0;
const timer = new Timer(durationInput, startButton, pauseButton, {
	onStart(totalDuration) {
		duration = totalDuration;
	},
	onTick(timeRemaining) {
		let offset = perimeter * timeRemaining / duration - perimeter;
		circle.setAttribute('stroke-dashoffset', offset);
		//console.log(offset);
	},
	onComplete() {
		console.log('completed');
	}
});
//timer.start();

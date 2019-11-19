let isRaceBegin = false;
let isAFinished = false;
let isBFinished = false;

let finishedTeamCount = 0;

let loop;

//waktu hitung mundur di set disini dalam milisecond 
let prepDuration=5*1000;

 //waktu hitung maju di set disini dalam milisecond, contoh : saya ingin mengeset 5 detik jadi   (detik yg diinginkan)*(1 detik dalam milisecond) = 5*1000 = 5000 miliseconds
let raceDuration=10*1000;

let isMuted = false;




function checkPressedKey(e)
{
	// Debug untuk memastikan keyCode yang ditekan pada keyboard.
	// console.log(e.keyCode);
	switch(e.keyCode)
	{
		//Keymap, untuk mengeset key masukan kode ascii nya.
		//info kode ascii lihat disini http://www.theasciicode.com.ar/
		case 65:								//65 = a => untuk TIM A
			if(!isAFinished && isRaceBegin) {
				finishing("A")
			};
			break; 								
		case 66:								//66 = b => untuk TIM B
			if(!isBFinished && isRaceBegin) {
				finishing("B")
			};
			break; 								
		case 32:								//32 = Spasi
			prepTimerStart();
			break;
		case 77:
			mute(isMuted = !isMuted);
			break;								//77 = M
	}
}

//starting preparation timer
const prepTimerStart = () => 
{
	let limit = new Date().getTime()+(prepDuration);

	loop = setInterval(() => {
		let now = new Date().getTime();
		let remaining = limit - now;
		
		toDisplayHtml(formatTime(remaining));
			
		if (remaining <= 0) {
			toDisplayHtml(["00", "00", "00"]);
			clearInterval(loop);
			raceTimerStart();
		};
	}, 10);	
}

//starting race timer
const raceTimerStart = () => 
{
	document.getElementById('mode').innerHTML="";
	document.getElementById("prepare").play();

	setTimeout(() => {
		document.getElementById("start").play();
		isRaceBegin = true;
		let beginTime = new Date().getTime();

		//looping sampai elapsedTime >= raceDuration
		loop = setInterval(() => {
			let nowTime = new Date().getTime();
			let elapsedTime = nowTime - beginTime;

			toDisplayHtml(formatTime(elapsedTime));

			if(elapsedTime >= raceDuration)
			{ 
				document.getElementById("limit").play();
				toDisplayHtml(formatTime(raceDuration));
				
				if(!isAFinished) {
					toTeamDisplayHtml("A");
				}
				
				if(!isBFinished) {
					toTeamDisplayHtml("B");
				}

				clearInterval(loop);
			};
		}, 10);
	}, 7000); //7000ms adala durasi dari musik prepare
}


//finishing team
const finishing = (team) =>
{
	finishedTeamCount++;
	if(finishedTeamCount == 2) {
		clearInterval(loop);
	}

	document.getElementById("win").play();
	
	switch(team)
	{
		case "A":
			isAFinished = true;
			win = (win === 1) ? 2 : 1;
			break;
		case "B":
			isBFinished = true;
			win = (win === 1) ? 2 : 1;
			break;
	}

	toTeamDisplayHtml(team);
	document.getElementById("winTeam"+team)
		.setAttribute('class', (finishedTeamCount == 1) ? 'winner' : 'lose');
	document.getElementById("winTeam"+team)
		.innerHTML = (finishedTeamCount == 1) ? 'WINNER' : 'LOSE';
}

//fungsi untuk muted suara audio
const mute = (isMuted) => {
	document.getElementById('prepare').muted = isMuted;
	document.getElementById('win').muted = isMuted;
	document.getElementById('start').muted = isMuted;
	document.getElementById('limit').muted = isMuted;
}


//for displaying main timer
const toDisplayHtml = (formatedTime) => {
	document.getElementById('disp').innerHTML = formatedTime[0] + ":" + formatedTime[1];
	document.getElementById('dispMs').innerHTML = formatedTime[2];
}

//for displaying team time record
const toTeamDisplayHtml = (team) =>
{
	let minsec = document.getElementById('disp').innerHTML;
	let ms = document.getElementById('dispMs').innerHTML
	document.getElementById("fin" + team).innerHTML = minsec + '.' + ms;
}

//formating from number ms to min, sec, ms
const formatTime = (nMs) => 
{
	//fungsi ini untuk menambahkan "0" pada angka yang dibawah 10
	const addPrefix = (n) => 
	{
		if(n < 10) {
			n = "0" + n
		};

		return n;
	}

	min = Math.floor(nMs/60000);
	sec = Math.floor((nMs-min*60000)/1000);
	ms = Math.floor((nMs-sec*1000-min*60000)/10);
	
	min = addPrefix(min);
	sec = addPrefix(sec);
	ms = addPrefix(ms);

	return [min, sec, ms];
}
const sfx = {
	checkpoint: document.getElementById("checkpointSound"),
	raceEndAudio: document.getElementById("raceEndAudio"),
	timesUpAudio: document.getElementById("timesUpAudio"),
	prepare: document.getElementById("prepare"),
	start: document.getElementById("start"),
	mainThemeAudio: document.getElementById('mainThemeAudio'),
	applauseAudio: document.getElementById('applauseAudio'),
}



//fungsi untuk muted suara audio
const toggleBgm = (isMuted) => {
	sfx.mainThemeAudio.muted = isMuted
}

const toggleSfx = (isMuted) => {
	sfx.checkpoint.muted = isMuted
	sfx.raceEndAudio.muted = isMuted
	sfx.timesUpAudio.muted = isMuted
	sfx.start.muted = isMuted
	sfx.applauseAudio.muted = isMuted
	sfx.prepare.muted = isMuted
}

// global dynamic var list
let isIdle,
	isTimerStart,
	isRaceBegin,
	isPrepBegin,

	isAFinished,
	isBFinished,

	remainTime,
	elapsedTime,
	teamTimes


const initVarState = () => {
	isIdle = false;
	isTimerStart = false;
	isRaceBegin = false;
	isPrepBegin = false;

	isAFinished = false;
	isBFinished = false;


	remainTime = undefined
	elapsedTime = undefined

	teamTimes = {
		a: [],
		b: []
	}
}


const setting = getSetting()

//waktu hitung mundur di set disini dalam milisecond
const prepDuration = setting.prep_time * 1000;

//waktu hitung maju di set disini dalam milisecond, contoh : saya ingin mengeset 5 detik jadi   (detik yg diinginkan)*(1 detik dalam milisecond) = 5*1000 = 5000 miliseconds
const raceDuration = setting.race_duration * 1000;

let theInterval

initVarState()
toggleSfx(!setting.isSfxEnabled)
toggleBgm(!setting.isBgmEnabled)
sfx.applauseAudio.volume = 0.5
sfx.mainThemeAudio.loop = true


function checkPressedKey(e) {
	// Debug untuk memastikan keyCode yang ditekan pada keyboard.
	// console.log(e.keyCode);

	switch (e.keyCode) {
		//Keymap, untuk mengeset key masukan kode ascii nya.
		//info kode ascii lihat disini http://www.theasciicode.com.ar/
		case 65: //65 = a => untuk TIM A
			if (!isAFinished && isRaceBegin) {
				checkpointTeam('a')
			}
			break

		case 66: // b => untuk TIM B
			if (!isBFinished && isRaceBegin) {
				checkpointTeam('b')
			}
			break

		case 32: // == Spasi
			if (!isTimerStart) {
				isTimerStart = true

				if (isRaceBegin) {
					sfx.mainThemeAudio.play()

					console.log('race');
					//resume race
					const beginTime = new Date().getTime() - elapsedTime
					theInterval = setInterval(() => raceInterval(beginTime), 10)
				} else if (isPrepBegin) {
					sfx.mainThemeAudio.play()

					console.log('prep');

					// resume prep
					limitTime = new Date().getTime() + remainTime
					theInterval = setInterval(() => prepInterval(limitTime), 10)
				} else {
					console.log('begin');

					// start from begining
					startPrepTime()
				}
			} else {
				// pause()
				if (!isIdle) {
					isTimerStart = false
					clearInterval(theInterval)
					sfx.mainThemeAudio.pause()
				}
			}
			break

		case 79: // == o
			setting.isSfxEnabled = !setting.isSfxEnabled
			toggleSfx(!setting.isSfxEnabled)
			localStorage.setItem('krc_timer_setting', JSON.stringify(setting))
			break

		case 80: // == p
			setting.isBgmEnabled = !setting.isBgmEnabled
			toggleBgm(!setting.isBgmEnabled)
			localStorage.setItem('krc_timer_setting', JSON.stringify(setting))
			break

		case 82: //82 = R
			// reset()
			if (!isIdle && !isTimerStart) {
				sfx.mainThemeAudio.pause()
				sfx.mainThemeAudio.currentTime = 0

				clearInterval(theInterval)
				initVarState()
				toDisplayHtml(msToArrTime(prepDuration))
				printAllLaps()
				break
			}
	}

}


const printAllLaps = () => {
	const aTimeLap = document.getElementById('aTimeLap')
	const midLapNo = document.getElementById('midLapNo')
	const bTimeLap = document.getElementById('bTimeLap')

	aTimeLap.innerHTML = ''
	midLapNo.innerHTML = ''
	bTimeLap.innerHTML = ''

	for (let i = 0; i < setting.nLap; i++) {
		if (!teamTimes.a[i] && !teamTimes.b[i]) {
			midLapNo.innerHTML += "<p>" + (i + 1) + "</p>"
		} else if (teamTimes.a[i] && !teamTimes.b[i]) {
			midLapNo.innerHTML += "<p>&lt;&lt; " + (i + 1) + "</p>"
		} else if (!teamTimes.a[i] && teamTimes.b[i]) {
			midLapNo.innerHTML += '<p>' + (i + 1) + ' &gt;&gt;</p>'
		} else {
			if (teamTimes.a[i] < teamTimes.b[i]) {
				midLapNo.innerHTML += "<p>&lt;&lt; " + (i + 1) + "</p>"
			} else {
				midLapNo.innerHTML += '<p>' + (i + 1) + ' &gt;&gt;</p>'
			}
		}


		if (teamTimes.a[i]) {
			const aTime = msToArrTime(teamTimes.a[i])
			aTimeLap.innerHTML += '<p>' + aTime[0] + ':' + aTime[1] + ' ' + aTime[2] + ' </p>'
		} else {
			aTimeLap.innerHTML += '<p>--:--</p>'
		}

		if (teamTimes.b[i]) {
			const bTime = msToArrTime(teamTimes.b[i])
			bTimeLap.innerHTML += '<p>' + bTime[0] + ':' + bTime[1] + ' ' + bTime[2] + ' </p>'
		} else {
			bTimeLap.innerHTML += '<p>--:--</p>'
		}
	}
}


const prepInterval = limitTime => {
	const now = new Date().getTime()
	remainTime = limitTime - now

	toDisplayHtml(msToArrTime(remainTime))

	if (remainTime <= 0) {
		toDisplayHtml(["00", "00", "00"])
		clearInterval(theInterval)
		raceStart()
	}
}


const startPrepTime = () => {
	isPrepBegin = true
	sfx.mainThemeAudio.volume = 0.8

	sfx.mainThemeAudio.play()
	const limit = new Date().getTime() + (prepDuration)

	theInterval = setInterval(() => prepInterval(limit), 10)
}


const raceInterval = beginTime => {
	const nowTime = new Date().getTime()
	elapsedTime = nowTime - beginTime

	toDisplayHtml(msToArrTime(elapsedTime))

	if (elapsedTime >= raceDuration) {
		sfx.timesUpAudio.play()
		sfx.mainThemeAudio.pause()
		toDisplayHtml(msToArrTime(raceDuration))
		clearInterval(theInterval)
		isTimerStart = false
	}
}

const raceStart = () => {
	isIdle = true
	document.getElementById('mode').innerHTML = ""
	sfx.mainThemeAudio.pause()
	sfx.prepare.play()
	
	setTimeout(() => {
		sfx.start.play()
		sfx.mainThemeAudio.currentTime = 0
		sfx.mainThemeAudio.volume = 0.4
		sfx.mainThemeAudio.play()
		isIdle = false

		isRaceBegin = true
		const beginTime = new Date().getTime()

		//looping sampai elapsedTime >= raceDuration
		theInterval = setInterval(() => raceInterval(beginTime), 10)

	}, 6989) //6989ms adala durasi dari musik prepare
}

const teamReachFinish = (teamName) => {
	sfx.applauseAudio.play()

	switch (teamName) {
		case "a":
			isAFinished = true;
			break;
		case "b":
			isBFinished = true;
			break;
	}

	if (isAFinished && isBFinished) {
		sfx.mainThemeAudio.pause()
		sfx.applauseAudio.pause()
		sfx.raceEndAudio.play()
		clearInterval(theInterval)
		isTimerStart = false

	}
}

const checkpointTeam = (teamName) => {
	sfx.checkpoint.pause()
	sfx.checkpoint.currentTime = 0
	sfx.checkpoint.play()

	teamTimes[teamName].push(elapsedTime)
	printAllLaps()

	if (teamTimes[teamName].length === parseInt(setting.nLap)) {
		teamReachFinish(teamName)
	}
}

//for displaying main timer
const toDisplayHtml = (formatedTime) => {
	document.getElementById('disp').innerHTML = formatedTime[0] + ":" + formatedTime[1];
	document.getElementById('dispMs').innerHTML = formatedTime[2];
}


//formating from number ms to min, sec, ms
const msToArrTime = (nMs) => {
	//fungsi ini untuk menambahkan "0" pada angka yang dibawah 10
	const addPrefix = (n) => {
		if (n < 10) {
			n = "0" + n
		}

		return n
	}

	min = Math.floor(nMs / 60000)
	sec = Math.floor((nMs - min * 60000) / 1000)
	ms = Math.floor((nMs - sec * 1000 - min * 60000) / 10)

	min = addPrefix(min)
	sec = addPrefix(sec)
	ms = addPrefix(ms)

	return [min, sec, ms]
}
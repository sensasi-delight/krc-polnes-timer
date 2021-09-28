const sfx = {
	checkpoint: document.getElementById("checkpointSound"),
	raceEndAudio: document.getElementById("raceEndAudio"),
	timesUpAudio: document.getElementById("timesUpAudio"),
	prepare: document.getElementById("prepare"),
	start: document.getElementById("start"),
	mainThemeAudio: document.getElementById('mainThemeAudio'),
	applauseAudio: document.getElementById('applauseAudio'),
}

sfx.applauseAudio.volume = 0.8

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






let setting = getSetting()

let isRaceBegin = false;
let isAFinished = false;
let isBFinished = false;

let loop;

//waktu hitung mundur di set disini dalam milisecond
let prepDuration = setting.prep_time * 1000;

//waktu hitung maju di set disini dalam milisecond, contoh : saya ingin mengeset 5 detik jadi   (detik yg diinginkan)*(1 detik dalam milisecond) = 5*1000 = 5000 miliseconds
let raceDuration = setting.race_duration * 1000;


let beginTime = undefined

const teamTimes = {
	a: [],
	b: []
}



toggleSfx(setting.isSfxEnabled)
toggleBgm(setting.isBgmEnabled)


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
			if (!isRaceBegin) {
				prepTimerStart()
			}
			break

		case 79: // == o
			toggleSfx(setting.isSfxEnabled = !setting.isSfxEnabled)
			localStorage.setItem('krc_timer_setting', JSON.stringify(setting))
			break

		case 80: // == p
			toggleBgm(setting.isBgmEnabled = !setting.isBgmEnabled)
			localStorage.setItem('krc_timer_setting', JSON.stringify(setting))
			break

		case 82: //82 = R
			reset()
			break
	}
}

const reset = () => {
	window.location.reload()
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



//starting preparation timer
const prepTimerStart = () => {
	sfx.mainThemeAudio.currentTime = 0
	sfx.mainThemeAudio.volume = 0.8
	sfx.mainThemeAudio.loop = true

	sfx.mainThemeAudio.play()
	const limit = new Date().getTime() + (prepDuration)

	loop = setInterval(() => {
		const now = new Date().getTime()
		const remaining = limit - now

		toDisplayHtml(msToArrTime(remaining))

		if (remaining <= 0) {
			toDisplayHtml(["00", "00", "00"])
			clearInterval(loop)
			raceStart()
		}
	}, 10)
}




//starting race timer
const raceStart = () => {
	document.getElementById('mode').innerHTML = ""
	sfx.mainThemeAudio.currentTime = 0
	sfx.mainThemeAudio.pause()
	sfx.prepare.play()

	setTimeout(() => {
		sfx.start.play()
		sfx.mainThemeAudio.volume = 0.4
		sfx.mainThemeAudio.play()

		isRaceBegin = true
		beginTime = new Date().getTime()

		//looping sampai elapsedTime >= raceDuration
		loop = setInterval(() => {
			const nowTime = new Date().getTime()
			const elapsedTime = nowTime - beginTime

			toDisplayHtml(msToArrTime(elapsedTime))

			if (elapsedTime >= raceDuration) {
				sfx.timesUpAudio.play()
				sfx.mainThemeAudio.pause()
				toDisplayHtml(msToArrTime(raceDuration))
				clearInterval(loop)
			}
		}, 10)
	}, 6989) //6989ms adala durasi dari musik prepare
}


const checkpointTeam = (teamName) => {
	sfx.checkpoint.pause()
	sfx.checkpoint.currentTime = 0
	sfx.checkpoint.play()

	teamTimes[teamName].push(new Date().getTime() - beginTime)
	printAllLaps()

	if (teamTimes[teamName].length === parseInt(setting.nLap)) {
		teamReachFinish(teamName)
	}
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
		clearInterval(loop)
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
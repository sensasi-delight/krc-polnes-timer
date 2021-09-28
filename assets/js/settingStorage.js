const defaultSetting = {
	'prep_time': 5, //second
	'race_duration': 15, //second
	'comp_year': new Date().getFullYear(),
	'team_a_name': 'Tim A',
	'team_b_name': 'Tim B',
	'midText': 'VS / Laps / Checkpoint',
	'nLap': 3,
	'isBgmEnabled': true,
	'isSfxEnabled': true
};


const inputPrepTime = document.getElementById('prep_time')
const inputCompYear = document.getElementById('comp_year')
const inputRaceDuration = document.getElementById('race_duration')
const aTeam = document.getElementById('a_team_input')
const bTeam = document.getElementById('b_team_input')
const nLapInput = document.getElementById('nLapInput')
const midTextInput = document.getElementById('midTextInput')


function getSetting() {
	if (typeof (Storage) !== 'undefined') {
		const storage = localStorage.getItem('krc_timer_setting');
		if (!storage) {
			localStorage.setItem('krc_timer_setting', JSON.stringify(defaultSetting));
		}
	}

	//get Item from locaStorage
	const settings = JSON.parse(localStorage.getItem('krc_timer_setting'));

	//set
	document.getElementById('title').innerHTML = `KRC POLNES ${settings.comp_year}`;
	document.getElementById('midText').innerHTML = settings.midText;
	document.getElementById('team_a_name').innerHTML = settings.team_a_name;
	document.getElementById('team_b_name').innerHTML = settings.team_b_name;

	//

	inputPrepTime.value = settings.prep_time
	inputCompYear.value = settings.comp_year
	inputRaceDuration.value = settings.race_duration
	aTeam.value = settings.team_a_name
	bTeam.value = settings.team_b_name
	nLapInput.value = settings.nLap
	midTextInput.value = settings.midText


	return settings
}

function setSettings() {
	const setting = {
		prep_time: inputPrepTime ? inputPrepTime.value : defaultSetting.prep_time,
		comp_year: inputCompYear ? inputCompYear.value : defaultSetting.comp_year,
		race_duration: inputRaceDuration ? inputRaceDuration.value : defaultSetting.race_duration,
		team_a_name: aTeam ? aTeam.value : defaultSetting.team_a_name,
		team_b_name: bTeam ? bTeam.value : defaultSetting.team_b_name,
		nLap: nLapInput ? nLapInput.value : defaultSetting.nLap,
		midText: midTextInput ? midTextInput.value : defaultSetting.midText
	}

	localStorage.setItem('krc_timer_setting', JSON.stringify(setting))

	window.location.reload();
}
function getSetting()
{
    if(typeof(Storage) !== 'undefined')
    {
        //set Item to localStorage
        let setting = {
            'prep_time' : 5, //second
            'race_duration' : 15, //second
            'comp_year' : new Date().getFullYear(),
			'team_a_name': 'Tim A',
			'team_b_name': 'Tim B',
        };

        let storage = localStorage.getItem('krc_timer_setting');
        if(!storage){
            localStorage.setItem('krc_timer_setting', JSON.stringify(setting));
        }
    }

    //get Item from locaStorage
    const settings = JSON.parse(localStorage.getItem('krc_timer_setting'));
    
    //set prep_time
    document.getElementById('title').innerHTML = `KRC POLNES ${settings.comp_year}`;
    document.getElementById('prep_time').value = settings.prep_time;
    document.getElementById('race_duration').value = settings.race_duration;
    document.getElementById('comp_year').value = settings.comp_year;

	//Team
    document.getElementById('team_a_name').innerHTML = settings.team_a_name;
    document.getElementById('team_b_name').innerHTML = settings.team_b_name;
	document.getElementById('a_team_input').value = settings.team_a_name;
    document.getElementById('b_team_input').value = settings.team_b_name;

	return settings
}

function setSettings()
{
    const inputPrepTime = document.getElementById('prep_time').value;
    const inputCompYear = document.getElementById('comp_year').value;
    const inputRaceDuration = document.getElementById('race_duration').value;
    const inputLogo     = document.getElementById('logo');
    
    let settings = localStorage.getItem('krc_timer_setting');
    settings = settings ? JSON.parse(settings) : {};

    settings.prep_time = (inputPrepTime.length == 0) ? 5 : inputPrepTime;
    settings.comp_year = (inputCompYear.length == 0) ? new Date().getFullYear() : inputCompYear;
    settings.race_duration = (inputRaceDuration.length == 0) ? 15 : inputRaceDuration;

    localStorage.setItem('krc_timer_setting', JSON.stringify(settings));

    window.location.reload();
}
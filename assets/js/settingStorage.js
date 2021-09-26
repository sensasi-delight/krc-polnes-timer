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
	//GET INPUT VALUE
	//
	//
    // const inputLogo     = document.getElementById('logo');
    const inputPrepTime = document.getElementById('prep_time').value;
    const inputCompYear = document.getElementById('comp_year').value;
    const inputRaceDuration = document.getElementById('race_duration').value;
	const aTeam = document.getElementById('a_team_input').value
    const bTeam = document.getElementById('b_team_input').value
    
	const setting = {
		prep_time: inputPrepTime || 5,
		comp_year: inputCompYear || new Date().getFullYear(),
		race_duration: inputRaceDuration || 15,
		team_a_name: aTeam || 'Tim A',
		team_b_name: bTeam || 'Tim B'
	}

    localStorage.setItem('krc_timer_setting', JSON.stringify(setting))

    window.location.reload();
}
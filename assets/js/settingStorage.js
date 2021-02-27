initSettingStorage();

function initSettingStorage()
{
    if(typeof(Storage) !== 'undefined')
    {
        //set Item to localStorage
        let setting = {
            'prep_time' : 5,
            'comp_year' : 2014,
        };

        let storage = localStorage.getItem('setting');
        if(!storage){
            localStorage.setItem('setting', JSON.stringify(setting));
        }
    }

    //get Item from locaStorage
    const settings = JSON.parse(localStorage.getItem('setting'));
    
    //set prep_time
    prep_time = settings.prep_time;
    document.getElementById('title').innerHTML = `KRC POLNES ${settings.comp_year}`;
    document.getElementById('prep_time').value = settings.prep_time;
    document.getElementById('comp_year').value = settings.comp_year;
}

function setSettings()
{
    const inputPrepTime = document.getElementById('prep_time').value;
    const inputCompYear = document.getElementById('comp_year').value;
    const inputLogo     = document.getElementById('logo');
    
    let settings = localStorage.getItem('setting');
    settings = settings ? JSON.parse(settings) : {};

    settings.prep_time = (inputPrepTime.length == 0) ? 0 : inputPrepTime;
    settings.comp_year = (inputCompYear.length == 0) ? 2014 : inputCompYear;

    localStorage.setItem('setting', JSON.stringify(settings));

    window.location.reload();
}
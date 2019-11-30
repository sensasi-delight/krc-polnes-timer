initTeamStorage();

function initTeamStorage()
{
    if(typeof(Storage) !== 'undefined')
    {
        //set Item to localStorage
        let teams = [];

        let storage = localStorage.getItem('teams');
        if(!storage){
            localStorage.setItem('teams', JSON.stringify(teams));
        }
    }

    //get Item from locaStorage
    const teams = JSON.parse(localStorage.getItem('teams'));
    teams.map(team => {
        const ul = document.getElementById('teams');
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${team.red} VS ${team.blue}`));
        li.setAttribute("id", team.id);
        ul.appendChild(li);
    });
}

function storeTeams(data=null, action)
{
    switch(action)
    {
        case 'ADD_TEAM':
            const red = document.getElementById('input-red-team').value;
            const blue = document.getElementById('input-blue-team').value;

            const teams = JSON.parse(localStorage.getItem('teams'));
            const newData = {
                id: uuid(),
                red,
                blue
            };
            
            localStorage.setItem('teams', JSON.stringify([...teams, newData]));
            console.log(teams);
            window.location.reload();
            break;
    }
}
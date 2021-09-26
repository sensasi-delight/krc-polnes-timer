const routeToPage = (page) => {
    switch (page){
        case 'stopWatch':
            showPage('stopwatch', 'bgImage1');
            break;
        // case 'listTeam':
        //     showPage('list-team', 'bgImage2');
        //     break;
        case 'settings':
            showPage('setting', 'bgImage3');
            break;
    }
}

const showPage = (page, bgImage) => {
    //page
    // const ListTeamPage = document.getElementById('ListTeamPage');
    const StopWatchPage = document.getElementById('StopWatchPage');
    const Settings = document.getElementById('settingPage');
    
    // ListTeamPage.style.display  = (page == 'list-team') ? 'block' : 'none';
    StopWatchPage.style.display = (page == 'stopwatch') ? 'block' : 'none';
    Settings.style.display      = (page == 'setting') ? 'block' : 'none';

    //background
    const bgImage1 = document.getElementById('bg-image1');
    const bgImage2 = document.getElementById('bg-image2');
    const bgImage3 = document.getElementById('bg-image3');
    
    bgImage1.style.display = (bgImage == 'bgImage1') ? 'block' : 'none';
    bgImage2.style.display = (bgImage == 'bgImage2') ? 'block' : 'none';
    bgImage3.style.display = (bgImage == 'bgImage3') ? 'block' : 'none';
    
}
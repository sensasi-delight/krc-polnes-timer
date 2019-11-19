const handleChange = e => {

}

const routeToPage = (page) => {
    console.log(page);
    switch (page){
        case 'listTeam':
            pageListTeam();
            break;
        case 'stopWatch':
            pageStopWatch();
            break;
    }
}

const pageListTeam = () => {
    const ListTeamPage = document.getElementById('ListTeamPage');
    const StopWatchPage = document.getElementById('StopWatchPage');
    const bgImage1 = document.getElementById('bg-image1');
    const bgImage2 = document.getElementById('bg-image2');
    
    bgImage1.style.display = 'none'
    StopWatchPage.style.display = 'none';
    
    bgImage2.style.display = 'block'
    ListTeamPage.style.display = 'block';
}

const pageStopWatch = () => {
    const ListTeamPage = document.getElementById('ListTeamPage');
    const StopWatchPage = document.getElementById('StopWatchPage');
    const bgImage1 = document.getElementById('bg-image1');
    const bgImage2 = document.getElementById('bg-image2');

    bgImage1.style.display = 'block'
    StopWatchPage.style.display = 'block';
    
    bgImage2.style.display = 'none'
    ListTeamPage.style.display = 'none';
}
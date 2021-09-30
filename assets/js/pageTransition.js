const routeToPage = (page) => {
  switch (page) {
    case "stopWatch":
      window.addEventListener("keyup", checkPressedKey);

      showPage("stopwatch", "bgImage2");
      break;

    // case 'listTeam':
    //     showPage('list-team', 'bgImage2');
    //     break;

    case "informationPage":
      window.removeEventListener("keyup", checkPressedKey);
      showPage("informationPage", "bgImage4");
      break;

    case "settings":
      window.removeEventListener("keyup", checkPressedKey);
      showPage("setting", "bgImage4");
      break;
  }
};

const showPage = (page, bgImage) => {
  //page
  // const ListTeamPage = document.getElementById('ListTeamPage');
  const StopWatchPage = document.getElementById("StopWatchPage");
  const Settings = document.getElementById("settingPage");
  const informationPage = document.getElementById("informationPage");

  // ListTeamPage.style.display  = (page == 'list-team') ? 'block' : 'none';
  StopWatchPage.style.display = page == "stopwatch" ? "flex" : "none";
  Settings.style.display = page == "setting" ? "flex" : "none";
  informationPage.style.display = page == "informationPage" ? "flex" : "none";

  //background
  const bgImage1 = document.getElementById("bg-image1");
  const bgImage2 = document.getElementById("bg-image2");
  // const bgImage3 = document.getElementById('bg-image3');
  const bgImage4 = document.getElementById("bg-image4");

  bgImage1.style.display = bgImage == "bgImage1" ? "block" : "none";
  bgImage2.style.display = bgImage == "bgImage2" ? "block" : "none";
  // bgImage3.style.display = (bgImage == 'bgImage3') ? 'block' : 'none';
  bgImage4.style.display = bgImage == "bgImage4" ? "block" : "none";
};

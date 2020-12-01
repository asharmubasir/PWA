document.addEventListener("DOMContentLoaded", function() {
  let page = window.location.href
  if (!page.includes('favorite')){
    getTeamStandings();
  }
});

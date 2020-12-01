document.addEventListener("DOMContentLoaded", function() {
  let urlParams = new URLSearchParams(window.location.search);
  let isFav = urlParams.get("saved");
  let favorite = document.getElementById("favorite");
  let deleteFav = document.getElementById("delete");

  if (isFav) {
    favorite.classList.add("btnDisable")
    getFavTeamById();
  } else {
    var item = getTeamById();
  }

  let teamId = urlParams.get("id");
  let isTeamStored = getById(teamId);
  isTeamStored.then(function(storedTeam){
    if (storedTeam !== undefined){
      favorite.classList.add("btnDisable")
    } else {
      deleteFav.classList.add("btnDisable")
    }
  })

  favorite.addEventListener('click', function(){
    item.then(function(team){
      favoriteTeam(team)
      location.href = window.location.origin + "/#favorite"
    })
  })

  deleteFav.addEventListener('click', function(){
    deleteById(teamId);
    location.href = window.location.origin + "/#favorite"
  })

});

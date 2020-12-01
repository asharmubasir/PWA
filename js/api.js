const base_url = "https://api.football-data.org/v2/";
const token = 'e0d15fd9a0554458aed878141bcd6c82';

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getTeamStandings() {
  if ('caches' in window) {
    caches.match(base_url + "competitions/2021/standings")
    .then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let teamStandingsHTML = "";
          data.standings[0].table.forEach(function(response){
            teamStandingsHTML += `
                                <tr>
                                  <td> ${response.position} </td>
                                  <td> 
                                    <img src="${response.team.crestUrl}" alt="Team" width="15" height="20"></img>
                                    <a href="./team.html?id=${response.team.id}">${response.team.name}</a>
                                  </td>
                                  <td> ${response.points} </td>
                                  <td> ${response.playedGames} </td>
                                  <td> ${response.won} </td>
                                  <td> ${response.draw} </td>
                                  <td> ${response.lost} </td>
                                </tr>
                                `;
          });
            document.getElementById("classement").innerHTML = teamStandingsHTML;
        })
      }
    })
  }

  fetch(base_url + "competitions/2021/standings", {
    headers: {
      'X-Auth-Token': token
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      let teamStandingsHTML = "";
      data.standings[0].table.forEach(function(response){
        teamStandingsHTML += `
                              <tr>
                                <td> ${response.position} </td>
                                <td> 
                                  <img src="${response.team.crestUrl}" alt="Team" width="15" height="20"></img>
                                  <a href="./team.html?id=${response.team.id}">${response.team.name}</a>
                                </td>
                                <td> ${response.points} </td>
                                <td> ${response.playedGames} </td>
                                <td> ${response.won} </td>
                                <td> ${response.draw} </td>
                                <td> ${response.lost} </td>
                              </tr>
                            `;
      })
      document.getElementById("classement").innerHTML = teamStandingsHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam)
      .then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let teamHTML = `
                <div class="card">
                  <div class="card-content">
                    <span class="card-title center-align">${data.name}</span>
                  </div>
                  <div class="card-image waves-effect waves-block waves-light">
                    <img id="teamImage" src="${data.crestUrl}" />
                  </div>
                </div>
              `;
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, {
      headers: {
        'X-Auth-Token': token
      }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        let teamHTML = `
            <div class="card">
              <div class="card-content">
                <span class="card-title center-align">${data.name}</span>
              </div>
              <div class="card-image waves-effect waves-block waves-light">
                <img id="teamImage" src="${data.crestUrl}"/>
              </div>
            </div>
          `;
        document.getElementById("body-content").innerHTML = teamHTML;
      });
  })
}

function favoriteTeams() {
  getAll().then(function(data) {
    let teamHTML = "";
    data.forEach(function(team){
      teamHTML += `
          <div class="col s4">
            <div class="card">
              <a href="./team.html?id=${team.id}&saved=true">
                <div class="card-image waves-effect waves-block waves-light">
                  <img id="favImage" src="${team.crestUrl}" />
                </div>
              </a>
              <div class="card-content">
                <span class="card-title truncate">${team.name}</span>
              </div>
            </div>
          </div>
        `;
    })
    if (data.length > 0) {
      document.getElementById("favoriteTeams").innerHTML = teamHTML;
    } else {
      document.getElementById("favoriteTeams").innerHTML = `
          <div class="col s12">
            <div class="card">
              <div class="card-content centered">
                <span class="card-title truncate">There is no favorite team</span>
              </div>
            </div>
          </div>
      `
    }
  });
}

function getFavTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  
  getById(idParam).then(function(data) {
    let favTeamHTML = `
        <div class="card">
          <div class="card-content">
            <span class="card-title center-align">${data.name}</span>
          </div>
          <div class="card-image waves-effect waves-block waves-light">
            <img id="teamImage" src="${data.crestUrl}"/>
          </div>
        </div>
    `;

    document.getElementById("body-content").innerHTML = favTeamHTML;

  });
}

const dbPromised = idb.open("epl2", 1, function(upgradeDb) {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", { unique: false });
});

function favoriteTeam(team) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team)
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Team successfully saved");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function deleteById(id) {
  dbPromised.
    then(function(db) {
    let tx = db.transaction('teams', 'readwrite');
    let store = tx.objectStore('teams');
    store.delete(parseInt(id));
    return tx.complete;
  }).then(function() {
    console.log('Team deleted');
  });
}

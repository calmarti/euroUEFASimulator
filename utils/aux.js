
export const nthPlaces = function(groups, n){
    const listNthPlaces = [];
    for (let group of groups){
        listNthPlaces.push(group.teams[n]); 
    }
    
    return listNthPlaces;
}

export const sortTeams = function(teams) {      
    teams.sort((teamA, teamB) => {
        if (teamB.points !== teamA.points) {
            return teamB.points - teamA.points;
        }
        else if (teamA.goalsDiff !== teamB.goalsDiff) {
            return teamB.goalsDiff - teamA.goalsDiff
        }
        else {
            if (teamA.name < teamB.name) {
                return -1;
                   
            }
        }

    })
}

export const bestThirdPlaces = function (groups, thirdPlaces, sortTeams){
    sortTeams(thirdPlaces);
    let bestThirdPlaces = thirdPlaces.slice(0,4);
    return bestThirdPlaces;
}



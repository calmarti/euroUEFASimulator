
export const thirdPlaces = function(groups){
    const arrThirdPlaces = [];
    for (let group of groups){
        arrThirdPlaces.push(group.teams[2]); 
    }
    
    return arrThirdPlaces;
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
    let arrThirdPlaces =  thirdPlaces(groups);
    sortTeams(arrThirdPlaces);
    let bestThirdPlaces = arrThirdPlaces.slice(0,4);
    return bestThirdPlaces;
}




export const thirdPlaces = function thirdPlaces(){
    arrThirdPlaces = [];
    for (group of groups){
        arrThirdPlaces.push(group.teams[2]); 
    }
    
    return arrThirdPlaces;
}

export const sortTeams = function sortTeams(teams) {      
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

export const bestThirdPlaces = function bestThirdPlaces(thirdPlaces, sortTeams){
    let arrThirdPlaces =  thirdPlaces();
    sortTeams(arrThirdPlaces);
    let bestThirdPlaces = arrThirdPlaces.slice(0,4);
    return bestThirdPlaces;
}



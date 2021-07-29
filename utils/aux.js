export const scoreGoals = function () {
    const goals = Math.floor(Math.random() * 5);
    return goals;
    
}

export const playMatch = function (local, visitor, localGoals, visitorGoals) {

    let winner = undefined;
    let loser = undefined;
    let draw = false;


    if (localGoals > visitorGoals) {
        return winner = local;

        /* loser = visitor; */

    }
    else if (localGoals < visitorGoals) {
        return winner = visitor;

        /* loser = local; */

    }
    else {
       
        return winner;
       
    }
}


export const playRound = function(arrayOfMatches,matchId){  //TODO: PONER LOS 'Q' DE DONDE PROVIENE CADA EQUIPO (DE OCTAVOS) Y NO UN 'Q' NUEVO
    const roundWinners= [];
    for (let i=0; i < arrayOfMatches.length; i++){
        const local = arrayOfMatches[i].local;
        const visitor = arrayOfMatches[i].visitor;
        let localGoals = scoreGoals();
        let visitorGoals = scoreGoals();
        let roundWinner = playMatch(local, visitor, localGoals, visitorGoals);
        console.log(`${matchId}${i+1}: ${local} ${localGoals}  -  ${visitorGoals} ${visitor} ==> ${roundWinner  || 'No winner yet!'}`); 

        while (roundWinner ===undefined){
            console.log('A rematch will be played!');
            localGoals = scoreGoals();
            visitorGoals = scoreGoals();
            roundWinner = playMatch(local,visitor, localGoals, visitorGoals);
            console.log(`${matchId}${i+1}: ${local} ${localGoals}  -  ${visitorGoals} ${visitor} ==> ${roundWinner  || 'No winner yet!'}`); 
        }
        roundWinners.push(roundWinner);
    }
    return roundWinners;
}

export const nthPlaces = function (groups, n) {
    const listNthPlaces = [];
    for (let group of groups) {
        listNthPlaces.push(group.teams[n]);
    }

    return listNthPlaces;
}

export const sortTeams = function (teams) {
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

export const sortAndSlice = function (groups, thirdPlaces, sortTeams) {
    sortTeams(thirdPlaces);
    let bestThirdPlaces = thirdPlaces.slice(0, 4);
    return bestThirdPlaces;
}



export const inSameGroup = function (team, arrayOfTeams) {
    let result = false;
    for (let i = 0; i < arrayOfTeams.length; i++) {
        if (team.group === arrayOfTeams[i].group) {
            result = true;
            break;
        }
    }
    return result;
}


export const splitSecondPlaces = function (slice, arrayA, arrayB, inSameGroup) {

    let newArrayA1 = [];
    let newArrayA2 = [];
    if (slice == 'fromNoBestThirdPlaceGroup') {
        for (let i in arrayA) {
            if (inSameGroup(arrayA[i], arrayB) === false) {
                newArrayA1.push(arrayA[i]);
            }
        }
        return newArrayA1;
    }


    else if (slice == 'rest') {
        for (let i in arrayA) {
            if (inSameGroup(arrayA[i], arrayB) === true) {
                newArrayA2.push(arrayA[i]);
            }
        }
        return newArrayA2;
    }
}


export const randomIndex = function (array) {
    return Math.floor(Math.random() * (array.length));
}



























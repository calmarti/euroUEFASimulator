export const scoreGoals = function () {
    const goals = Math.floor(Math.random() * 5);
    return goals;

}

export const playMatch = function (local, visitor, localGoals, visitorGoals) {

    let winner = undefined;
 


    if (localGoals > visitorGoals) {
        return winner = local;


    }
    else if (localGoals < visitorGoals) {
        return winner = visitor;

 
    }
    else {

        return winner;

    }
}


export const playRound = function (arrayOfMatches, matchId) {
    const roundWinners = [];
    for (let i = 0; i < arrayOfMatches.length; i++) {
        const local = arrayOfMatches[i].local;
        const visitor = arrayOfMatches[i].visitor;
        let localGoals = scoreGoals();
        let visitorGoals = scoreGoals();
        let roundWinner = playMatch(local, visitor, localGoals, visitorGoals);
        if (matchId === 'T' || matchId ==='F'){
            console.log(`\n${local} ${localGoals} -  ${visitorGoals} ${visitor}  ==> ${roundWinner || 'No winner yet!'}\n`);
        }
        else{
        console.log(`\n${matchId}${i + 1}: ${local} ${localGoals} -  ${visitorGoals} ${visitor}  ==> ${roundWinner || 'No winner yet!'}\n`);
        }
        while (roundWinner === undefined) {
            console.log('A rematch will be played!');
            localGoals = scoreGoals();
            visitorGoals = scoreGoals();
            roundWinner = playMatch(local, visitor, localGoals, visitorGoals);
            if (matchId === 'T' || matchId ==='F'){
                console.log(`\n${local} ${localGoals} -  ${visitorGoals} ${visitor}  ==> ${roundWinner || 'No winner yet!'}\n`);
            }
            else{
            console.log(`\n${matchId}${i + 1}: ${local} ${localGoals}  -  ${visitorGoals} ${visitor} ==> ${roundWinner || 'No winner yet!'}\n`);
            }
        }
        roundWinners.push(roundWinner);
    }
    return roundWinners;
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




















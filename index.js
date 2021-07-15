
let teamPool = [
    'Albania', 'Austria',
    'Belgium', 'Croatia',
    'Czech Republic', 'Denmark',
    'England', 'Finland',
    'France', 'Germany',
    'Hungary', 'Ireland',
    'Italy', 'Netherlands',
    'Poland', 'Portugal',
    'Rusia', 'Scotland',
    'Slovakia', 'Spain',
    'Sweeden', 'Switzerland',
    'Turkey', 'Ukraine'
];



/*selección aleatoria de los 16 finalistas*/

let teams = [];

for (let i = 0; i < 16; i++) {

    index = Math.floor(Math.random() * (teamPool.length));
    teams.push(teamPool[index]);
    /*   console.log(index, teamPool[index]); */
    firstHalf = teamPool.slice(0, index);
    secondHalf = teamPool.slice(index + 1);
    teamPool = firstHalf.concat(secondHalf);

}


console.log(`Sorteo de los 16 finalistas: \n ${teams}\n`);

/*emparejamientos de octavos de final*/

let eightPairs = [];


for (let i = 0; i < 8; i++) {

    pair = [];

    for (let j = 0; j < 2; j++) {

        index = Math.floor(Math.random() * (teams.length));

        /* console.log(index, teams[index]); */
        pair.push(teams[index]);

        firstHalf = teams.slice(0, index);
        secondHalf = teams.slice(index + 1);
        teams = firstHalf.concat(secondHalf);
        eightPairs[i] = pair;
    }

}

/* console.log(eightPairs); */
//TODO: pintar los enfrentamientos ('Q1: Equipo A vs. Equipo B', etc.)





class Match {
    
    constructor(local, visitor, matchNames=[]) {
        
        this.local = local;
        this.visitor = visitor;
        this.winner = undefined;
        this.matchNames = matchNames
    }
    
    

  /*   get matchName() {
        return this.name;
    } */

    scoreGoal() {
        let goal = Math.floor(Math.random() * 7);
        return goal;
    }


    playMatch(scoreGoal) {
        let localGoals = this.scoreGoal();
        let visitorGoals = this.scoreGoal();
        /* console.log(localGoals, visitorGoals); */

        switch (true) {
            case localGoals > visitorGoals:
                console.log(`${this.local} ${localGoals}  -  ${visitorGoals} ${this.visitor} -> ${this.local}`);
                console.log(`${this.local} wins\n`);
                this.winner = this.local;
                break;
            case localGoals < visitorGoals:
                console.log(`${this.local} ${localGoals}  -  ${visitorGoals} ${this.visitor} -> ${this.visitor}`);
                console.log(`${this.visitor} wins\n` );
                this.winner = this.visitor;
                break;
            default:
                console.log(`${this.local} ${localGoals}  -  ${visitorGoals} ${this.visitor}`);
                console.log('It\'s a draw, There will be another match!\n');
                while (this.winner === undefined) {
                    this.playMatch(scoreGoal);
                }

        }

    }

}



eightNames = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];



    for (i in eightPairs) {
        let match = new Match(eightPairs[i][0], eightPairs[i][1]);
        match.playMatch();
    }
   


//Emparejamientos de cuartos de final

//Q1 - Q8
//Q7 - Q2
//Q3 - Q6
//Q5 - Q4




/*   console.log(Q1.name);
  Q1.playMatch();
  console.log(Q1);  */


/*   let match = new Match('Q1', eightPairs[0][0], eightPairs[0][1]);
  console.log(match.playMatch()); */

//usar Object.assign para convertir el array en objeto


//TODO: PINTAR: comienza el torneo
//TODO: Mostra a los 16 equipos finalistas
//TODO: Emparejar a los equipos, esto es: crear los 8 partidos
//TODO: Jugar cada partido



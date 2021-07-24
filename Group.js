
export default class Group {

    constructor(name, teams = [], config = {}) {
        this.name = name;
        this.schedule = [];
        this.setup(config);
        this.setupTeams(teams);
        this.setup(config);
        this.local = ''
        this.visitor = ''
    }

    setup(config) {

        const defaultConfig = {
            numberOfTeams: 4,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLoss: 0,
            matchDays:3,
            rounds: 1
        }

        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teamNames) {
        this.teams = [];
        for (const teamName of teamNames) {
            const team = this.customizeTeam(teamName);
            this.teams.push(team);
        }
    }

    customizeTeam(teamName) {
        return {

            name: teamName,
            points: 0,
            wins: 0,
            draws: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalsDiff: 0
        }
    }

    setupSchedule() {
        this.initSchedule(); // crea la tabla con las celdas vacías (template {home: 'Home', away: 'Away'})
        this.setLocalTeams(); // hace un set de cada partido.home
        this.setAwayTeams(); //PETA
    }

    initSchedule() {
        const numberOfMatchDays = this.teams.length - 1; // numero de jornadas
        const numberOfMatchesPerMatchDay = this.teams.length / 2; // numero de partidos por jornada

        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = []; // matchDay ===> jornada
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = { home: 'Home', away: 'Away' }; // match ===> partido
                matchDay.push(match);


            }
            // ya tenemos todos los partidos de una jornada
            this.schedule.push(matchDay) // añadimos la jornada a la planificación
        }


    }

    setLocalTeams() {
        const teamNames = this.teams.map(team => team.name); // array de nombres de los equipos ['A', 'B', 'C', 'D', 'E', 'F']
        let teamIndex = 0;
        const maxHomeTeams = this.teams.length - 1 - 1; // ['A', 'B', 'C', 'D', 'E', 'F'].length === 6
        this.schedule.forEach(matchDay => { // para cada jornada de la liga
            matchDay.forEach(match => {             // para cada partido de la jornada
                match.home = teamNames[teamIndex];
                teamIndex++;
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0;
                }
            })
        })
    }

    setAwayTeams() {  //arreglar el atributo local/away de uno de los partidos
        const teamNames = this.teams.map(team => team.name);
        let fourthTeam = this.teams.length - 1;
        let index = fourthTeam;
        for (let i = 0; i < 3; i++) {
            this.schedule[i][0]['away'] = teamNames[index];
        }
        for (let i = 0; i < 3; i++) {
            this.schedule[i][1]['away'] = teamNames[--index];

        }


    }

    showGroupSchedule() {

        console.log(`\nGroup ${this.name}`);
        console.log('-------');
        const teamNames = this.teams.map(team => team.name);
        for (const teamName of teamNames) {
            console.log(teamName);
        }


        for (let i = 0; i < this.schedule.length; i++) {
            console.log(`\nMatchday ${i + 1}\n`);
            for (let j = 0; j < 2; j++) {
                console.log(`${this.schedule[i][j]['home']} vs. ${this.schedule[i][j]['away']}`);
            }

        }


    }

    scoreGoals() {
        const goals = Math.floor(Math.random() * Math.floor((Math.random() * 5)));
        return goals;
    }

    playMatch(matchDay, match) {
    
        const local = this.schedule[matchDay][match]['home'];
        const visitor = this.schedule[matchDay][match]['away'];
        const localGoals = this.scoreGoals();
        const visitorGoals = this.scoreGoals();

        let winner = undefined;
        let loser = undefined;
        let draw = false;

        if (localGoals > visitorGoals) {
            winner = local;
            loser = visitor;

        }
        else if (localGoals < visitorGoals) {
            winner = visitor;
            loser = local;

        }
        else {
            draw = true;
        }

        this.updateTeams(local, visitor, localGoals, visitorGoals, winner);
        const result = `${local} ${localGoals} - ${visitor} ${visitorGoals} --> ${winner|| 'It\'s a draw'}`;
        return result;

    }

    updateTeams(local, visitor, localGoals, visitorGoals, winner) {
        this.teams.forEach(team => {
           
            if (team.name === local) {
                team.goalsFor += localGoals
                team.goalsAgainst += visitorGoals
                team.goalsDiff += localGoals - visitorGoals;

                switch (winner) {
                    case local:
                        team.wins += 1;
                        team.points += this.config.pointsPerWin;
                        break;
                    case visitor:
                        team.lost += 1;
                        team.points += this.config.pointsPerLoss;
                        break;
                    default:
                        team.draws += 1;
                        team.points += this.config.pointsPerDraw;
                }
            }

            if (team.name === visitor) {
                team.goalsFor += visitorGoals;
                team.goalsAgainst += localGoals;
                team.goalsDiff += visitorGoals - localGoals;
                switch (winner) {
                    case local:
                        team.lost += 1;
                        team.points += this.config.pointsPerLoss;
                        break;
                    case visitor:
                        team.wins += 1;
                        team.points += this.config.pointsPerWin;
                        break;
                    default:
                        team.draws += 1;
                        team.points += this.config.pointsPerDraw;
                }
            }
        })
    }

      sortTeams() {      //DE MOMENTO PARECE QUE ORDENA SEGÚN LOS 3 CRITERIOS
        this.teams.sort((teamA, teamB) => {
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

        /* console.log(this.teams); */
    } 



    showMatchDayResults(){
        this.sortTeams();
        console.table(this.teams);
        }
    

}



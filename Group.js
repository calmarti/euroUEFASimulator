import { sortTeams } from "./utils/aux.js";
import { scoreGoals } from "./utils/aux.js";
import { playMatch } from "./utils/aux.js";

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
            group: this.name,
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
        this.setVisitorTeams(); 
    }

    initSchedule() {
        const numberOfMatchDays = this.teams.length - 1; // numero de jornadas
        const numberOfMatchesPerMatchDay = this.teams.length / 2; // numero de partidos por jornada

        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = []; // matchDay ===> jornada
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = { local: 'local', visitor: 'visitor' }; // match ===> partido
                matchDay.push(match);


            }
            // ya tenemos todos los partidos de una jornada
            this.schedule.push(matchDay) // añadimos la jornada a la planificación
        }


    }

    setLocalTeams() {
        const teamNames = this.teams.map(team => team.name); // array de nombres de los equipos ['A', 'B', 'C', 'D', 'E', 'F']
        let teamIndex = 0;
        const maxLocalTeams = this.teams.length - 1 - 1; // ['A', 'B', 'C', 'D', 'E', 'F'].length === 6
        this.schedule.forEach(matchDay => { // para cada jornada de la liga
            matchDay.forEach(match => {             // para cada partido de la jornada
                match.local = teamNames[teamIndex];
                teamIndex++;
                if (teamIndex > maxLocalTeams) {
                    teamIndex = 0;
                }
            })
        })
    }

    setVisitorTeams() {  //TODO Arreglar el atributo local/away de uno de los partidos
        const teamNames = this.teams.map(team => team.name);
        let fourthTeam = this.teams.length - 1;
        let index = fourthTeam;
        for (let i = 0; i < 3; i++) {
            this.schedule[i][0]['visitor'] = teamNames[index];
        }
        for (let i = 0; i < 3; i++) {
            this.schedule[i][1]['visitor'] = teamNames[--index];

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
                console.log(`${this.schedule[i][j]['local']} vs. ${this.schedule[i][j]['visitor']}`);
            }

        }


    }


    playMatchDay(matchDay, match) {
    
        const local = this.schedule[matchDay][match]['local'];
        const visitor = this.schedule[matchDay][match]['visitor'];
        
        const localGoals = scoreGoals();
        const visitorGoals = scoreGoals();
        
        const winner = playMatch(local, visitor, localGoals, visitorGoals);


        this.updateTeams(local, visitor, localGoals, visitorGoals, winner);
        const result = `${local} ${localGoals} - ${visitor} ${visitorGoals} --> ${winner || 'It\'s a draw'}`;
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

 
    showMatchDayResults(){
        sortTeams(this.teams);
        console.table(this.teams);
        }
    

}



import { sortTeams } from "../utils/aux.js";
import { scoreGoals } from "../utils/aux.js";
import { playMatch } from "../utils/aux.js";

export default class Group {

    constructor(name, teams = [], config = {}) {
        this.name = name;
        this.schedule = [];
        this.setup(config);
        this.setupTeams(teams);
        this.setup(config);
 
    }

    setup(config) {

        const defaultConfig = {
            numberOfTeams: 4,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLoss: 0,
            matchDays: 3,
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
        this.initSchedule();
        this.setLocalTeams();
        this.setVisitorTeams();
        this.setLastTeam(); 
    }

    initSchedule() {
        const numberOfMatchDays = this.teams.length - 1;
        const matchesPerMatchDay = this.teams.length / 2;

        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = [];
            for (let j = 0; j < matchesPerMatchDay; j++) {
                const match = { local: 'local', visitor: 'visitor' };
                matchDay.push(match);
            }
            this.schedule.push(matchDay)
        }
    }


    setLocalTeams() {
        const teamNames = this.teams.map(team => team.name);
        let teamIndex = 0;
        const maxLocalTeams = this.teams.length - 2;
        this.schedule.forEach((matchDay, matchDayIndex) => {
            matchDay.forEach((match , matchIndex) => {
                match.local = teamNames[teamIndex];
                teamIndex++;
                if (teamIndex > maxLocalTeams) {
                    teamIndex = 0;
                }
            })
        })
    }
    
    setVisitorTeams() {
        const numberOfMatchDays = this.teams.length - 1;
        const matchesPerMatchDay = this.teams.length / 2;
        
        const teamNames = this.teams.map(team => team.name);
        let index = this.teams.length - 2;
        
        for (let i=0; i < numberOfMatchDays; i++) {
            for (let j=1; j < matchesPerMatchDay; j++) {
                    
                    this.schedule[i][j].visitor = teamNames[index];
                    index--;

                }
            }
                    
    
        for (let i=0; i < this.schedule.length; i++){
            if ((this.schedule[i][0]) && (i % 2 === 0));
            {
                this.schedule[i][0].visitor = this.schedule[i][0].local;  
            }
        }
    }
                
        
    setLastTeam() {
        const numberOfMatchDays = this.teams.length - 1;
        const teamNames = this.teams.map(team => team.name);
        const index = this.teams.length - 1;
        for (let i = 0; i < numberOfMatchDays; i++) {
            if (i % 2 === 0) {
                this.schedule[i][0].visitor = teamNames[index];
            }
            else {
                this.schedule[i][0].local = teamNames[index];
            }
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


    showMatchDayResults() {
        sortTeams(this.teams);
        console.table(this.teams);
    }


}




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


let randomTeams = teamPool.sort( () => {return 0.5 - Math.random()} );
/* console.log(randomTeams); */

let teamsA = randomTeams.slice(0,4);
let teamsB = randomTeams.slice(4,8);
let teamsC = randomTeams.slice(8,12);
let teamsD = randomTeams.slice(12,16);
let teamsE = randomTeams.slice(16,20);
let teamsF = randomTeams.slice(20,24);

console.log(teamsA, '\n' , teamsB, '\n' , teamsC, '\n' , teamsD,  '\n' , teamsE,  '\n' , teamsF)





class Group {

    constructor(name, teams = [], config = {})
    {
        this.name = name;
        this.schedule = [];
        this.setup(config);
        this.setupTeams(teams);
    }

    setup(config) {
        
        const defaultConfig = {
            numberOfTeams: 4,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLose: 0,
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
            matchesWon: 0,
            matchesDraw: 0,
            matchesLost: 0
        }
    }

    setupSchedule() {
        this.initSchedule(); // crea la tabla con las celdas vacías (template {home: 'Home', away: 'Away'})
        /* this.setLocalTeams(); // hace un set de cada partido.home */
    }

    initSchedule() {
        const numberOfMatchDays = this.teams.length - 1; // numero de jornadas
        const numberOfMatchesPerMatchDay = this.teams.length / 2; // numero de partidos por jornada

        for ( let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = []; // matchDay ===> jornada
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = {home: 'Home', away: 'Away'}; // match ===> partido
                matchDay.push(match);
                
                
            }
            // ya tenemos todos los partidos de una jornada
            this.schedule.push(matchDay) // añadimos la jornada a la planificación
        }
       

    }

 /*    setLocalTeams() {
        const teamNames = this.teams.map(team => team.name); // array de nombres de los equipos ['A', 'B', 'C', 'D', 'E', 'F']
        let teamIndex = 0;
        const maxHomeTeams = this.teams.length - 1 - 1; // ['A', 'B', 'C', 'D', 'E', 'F'].length === 6
        this.matchDaySchedule.forEach(matchDay => { // para cada jornada de la liga
            matchDay.forEach(match => {             // para cada partido de la jornada
                match.home = teamNames[teamIndex];
                teamIndex++;
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0;
                }
            })
        })
    } */

}

let groupA = new Group('A', teamsA);

console.log(groupA.teams);
/* console.log(groupA.config); */
groupA.setupSchedule();
console.log(groupA.schedule);
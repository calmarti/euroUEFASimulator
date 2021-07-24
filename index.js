import Group from './Group.js';
import teamPool from './utils/teamPool.js'
import { nthPlaces } from './utils/aux.js';
import { sortTeams } from './utils/aux.js';
import { bestThirdPlaces } from './utils/aux.js';




const tournament = {
    matchDays:3
};


//DISTRIBUYE ALEATORIAMENTE LOS EQUIPOS POR GRUPO
let randomTeams = teamPool.sort(() => { return 0.5 - Math.random() });
/* console.log(randomTeams); */

let teamsA = randomTeams.slice(0, 4);
let teamsB = randomTeams.slice(4, 8);
let teamsC = randomTeams.slice(8, 12);
let teamsD = randomTeams.slice(12, 16);
let teamsE = randomTeams.slice(16, 20);
let teamsF = randomTeams.slice(20, 24);

//console.log(teamsA, '\n', teamsB, '\n', teamsC, '\n', teamsD, '\n', teamsE, '\n', teamsF) 




console.log(`Groups and teams
============`);



//CREA LOS GRUPOS Y LOS GUARDA EN UN ARRAY
function createGroups() {

    const groups = [];
    
    let groupA = new Group('A', teamsA);
    groups.push(groupA);
    let groupB = new Group('B', teamsB);
    groups.push(groupB);
    let groupC = new Group('C', teamsC);
    groups.push(groupC);
    let groupD = new Group('D', teamsD);
    groups.push(groupD);
    let groupE = new Group('E', teamsE);
    groups.push(groupE);
    let groupF = new Group('F', teamsF);
    groups.push(groupF);

    return groups;
}

let groups = createGroups();

/* console.log(groups); */


 function showTournamentSchedule(groups){

    for (let group of groups){
        group.setupSchedule();
        group.showGroupSchedule();     
    }

}


//MUESTRA LOS GRUPOS Y EL SCHEDULE: JORNADAS CON SUS PARTIDOS GRUPO POR GRUPO
showTournamentSchedule(groups);



//JUGAMOS LOS PARTIDOS JORNADA A JORNADA Y TRAS ACABAR CADA JORNADA MOSTRAMOS TABLA 



console.log(`================================
======THE EUROCUP STARTS!======\n================================\n`);

for (let i=0; i < tournament.matchDays; i++){    //MUESTRA EL RESULTADO DE LOS PARTIDOS DE CADA JORNADA ORDENADOS POR GRUPO
    
    console.log(`=== Matchday ${i+1}===`);

    for (let group of groups){
        console.log(`Group ${group.name}`);
        console.log(group.playMatch(i,0));
        console.log(group.playMatch(i,1));
        group.showMatchDayResults();
        
    }
    
} 



//TODO Array de segundos lugares de grupo vinculado a la regla de mejores terceros
//TODO Emparejamientos aleatorios de octavos de final (restricción: no pueden cruzarse equipos del mismo grupo)

//TODO Jugar los octavos de final
//TODO Jugar los cuartos de final segun emparejamientos predeterminados
//TODO Jugar las semis
//TODO Jugar terer y cuarto lugar
//TODO Jugar la final
//TODO Mostrar el campeón, subcampeón, tercer y cuarto lugar





//Primeros de grupo
let firstPlaces = nthPlaces(groups,0);

//Terceros de grupo
let thirdPlaces = nthPlaces(groups,2);

//Escoger los 4 mejores terceros de grupo
console.log(bestThirdPlaces(groups, thirdPlaces, sortTeams));


//Segundos de grupo
let secondPlaces = nthPlaces(groups,1);












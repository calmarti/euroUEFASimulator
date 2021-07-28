import Group from './Group.js';
import teamPool from './utils/teamPool.js'
import { nthPlaces } from './utils/aux.js';
import { sortTeams } from './utils/aux.js';
import { sortAndSlice } from './utils/aux.js';
import { inSameGroup } from './utils/aux.js';
import { splitSecondPlaces } from './utils/aux.js';
import { randomIndex } from './utils/aux.js';



const tournament = {
    matchDays: 3
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


function showTournamentSchedule(groups) {

    for (let group of groups) {
        group.setupSchedule();
        group.showGroupSchedule();
    }

}


//MUESTRA LOS GRUPOS Y EL SCHEDULE: JORNADAS CON SUS PARTIDOS GRUPO POR GRUPO
showTournamentSchedule(groups);



//JUGAMOS LOS PARTIDOS JORNADA A JORNADA Y TRAS ACABAR CADA JORNADA MOSTRAMOS TABLA 



console.log(`================================
======THE EUROCUP STARTS!======\n================================\n`);

for (let i = 0; i < tournament.matchDays; i++) {    //MUESTRA EL RESULTADO DE LOS PARTIDOS DE CADA JORNADA ORDENADOS POR GRUPO

    console.log(`=== Matchday ${i + 1}===`);

    for (let group of groups) {
        console.log(`Group ${group.name}`);
        console.log(group.playMatchDay(i, 0));
        console.log(group.playMatchDay(i, 1));
        group.showMatchDayResults();

    }

}


//Primeros de grupo
let firstPlaces = nthPlaces(groups, 0);
console.log('Primeros', firstPlaces)
//Terceros de grupo
let thirdPlaces = nthPlaces(groups, 2);

//Escoger los 4 mejores terceros de grupo
let bestThirdPlaces = sortAndSlice(groups, thirdPlaces, sortTeams);

//Segundos de grupo
let secondPlaces = nthPlaces(groups, 1);

//Segundos de grupo donde no se ha clasificado el tercero


/* console.log(inSameGroup(secondPlaces[0],bestThirdPlaces)); */

let secondPlacesFromNoBestThirdPlaceGroup = splitSecondPlaces('fromNoBestThirdPlaceGroup', secondPlaces, bestThirdPlaces, inSameGroup);
let restOfSecondPlaces = splitSecondPlaces('rest', secondPlaces, bestThirdPlaces, inSameGroup);

console.log('Mejores terceros:', bestThirdPlaces);
//console.log(secondPlaces);   
//console.log(secondPlacesFromNoBestThirdPlaceGroup);
//console.log(restOfSecondPlaces);  


//COMIENZA LA FASE DE ELIMINATORIAS!

console.log('==========OCTAVOS DE FINAL==========');



function setRoundOf16(firstPlaces, secondPlacesFromNoBestThirdPlaceGroup, bestThirdPlaces, restOfSecondPlaces) {
    let localTeams = firstPlaces.concat(secondPlacesFromNoBestThirdPlaceGroup)
    /* let visitorTeams = bestThirdPlaces.concat(restOfSecondPlaces); */
    let matches = [];
    let roundOf16 = [];
    /* console.log('Locales', localTeams); */
    //Primeros vs. mejores terceros
    for (let i = 0; i < localTeams.length - 4; i++) {
        let index = randomIndex(bestThirdPlaces);
        let visitor = bestThirdPlaces[index];
        
        while (visitor.group === localTeams[i].group  /* || bestThirdPlaces.includes(visitor) === false */)   //TODO Arreglar bug de while loop
        
        {
            index = randomIndex(bestThirdPlaces);
            visitor = bestThirdPlaces[index];
        }
        
        console.log('Local: ' , localTeams[i], 'Visitor :' , visitor);
        matches.push(`{Q${i+1}: {${localTeams[i].name}, ${visitor.name}}`);
        roundOf16.push({local:`${localTeams[i].name}`, visitor:`${visitor.name}`});
        
        bestThirdPlaces.splice(index,1)       
        
        
        
        
    }
    console.log(roundOf16);
    
    //Primeros y segundos de grupos sin terceros clasificados vs. resto de segundos
    for (let i = 4; i < localTeams.length; i++) {
        let index = randomIndex(restOfSecondPlaces);
        let visitor = restOfSecondPlaces[index];
        
        while (visitor.group === localTeams[i].group /* || restOfSecondPlaces.includes(visitor) === false */)  //TODO Arreglar bug de while loop
        
        {
            index = randomIndex(restOfSecondPlaces);
            visitor = restOfSecondPlaces[index];
        }
        
        console.log('Local: ' , localTeams[i], 'Visitor :' , visitor);
        matches.push(`{Q${i+1}: {${localTeams[i].name}, ${visitor.name}}`);
        roundOf16.push({local:`${localTeams[i].name}`, visitor:`${visitor.name}`});
        restOfSecondPlaces.splice(index,1)   
    } 
    console.log(roundOf16);
    console.log(matches);
} 


setRoundOf16(firstPlaces, secondPlacesFromNoBestThirdPlaceGroup, bestThirdPlaces, restOfSecondPlaces);





//TODO JUGAR EL PARTIDO Y MOSTRAR RESULTADO EN UNA SOLA LÍNEA

//TODO Jugar los octavos de final
//TODO Emparajamiento y juego de los cuartos de final segun regla establecida
//TODO Emparejamiento y juego de las semis segun regla establecida
//TODO Jugar tercer y cuarto lugar 
//TODO Jugar la final 
//TODO Mostrar el campeón, subcampeón, tercer y cuarto lugar























import Group from './Group.js';
import teamPool from './utils/teamPool.js'
import { nthPlaces } from './utils/aux.js';
import { sortTeams } from './utils/aux.js';
import { sortAndSlice } from './utils/aux.js';
import { inSameGroup } from './utils/aux.js';
import { splitSecondPlaces } from './utils/aux.js';
import { randomIndex } from './utils/aux.js';
import { scoreGoals } from './utils/aux.js';
import { playMatch } from './utils/aux.js';
import { playRound } from './utils/aux.js';
import { avoidSameGroup } from './utils/aux.js';

const tournament = {
    matchDays: 3
};


//Distribución aleatoria de los equipos en 6 grupos de 4 equipos cada uno

const randomTeams = teamPool.sort(() => { return 0.5 - Math.random() });
/* console.log(randomTeams); */

const teamsA = randomTeams.slice(0, 4);
const teamsB = randomTeams.slice(4, 8);
const teamsC = randomTeams.slice(8, 12);
const teamsD = randomTeams.slice(12, 16);
const teamsE = randomTeams.slice(16, 20);
const teamsF = randomTeams.slice(20, 24);

//console.log(teamsA, '\n', teamsB, '\n', teamsC, '\n', teamsD, '\n', teamsE, '\n', teamsF) 




console.log(`Groups and teams
============`);



//Creación de los 6 grupos y de un array de grupos 'groups'
function createGroups() {

    const groups = [];

    const groupA = new Group('A', teamsA);
    groups.push(groupA);
    const groupB = new Group('B', teamsB);
    groups.push(groupB);
    const groupC = new Group('C', teamsC);
    groups.push(groupC);
    const groupD = new Group('D', teamsD);
    groups.push(groupD);
    const groupE = new Group('E', teamsE);
    groups.push(groupE);
    const groupF = new Group('F', teamsF);
    groups.push(groupF);

    return groups;
}

const groups = createGroups();

/* console.log(groups); */


function showTournamentSchedule(groups) {

    for (let group of groups) {
        group.setupSchedule();
        group.showGroupSchedule();
    }

}


//Mostrar los grupos y su schedule: jornadas y sus partidos grupo por grupo 
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
const firstPlaces = nthPlaces(groups, 0);
console.log('Primeros', firstPlaces)
//Terceros de grupo
const thirdPlaces = nthPlaces(groups, 2);

//Escoger los 4 mejores terceros de grupo
const bestThirdPlaces = sortAndSlice(groups, thirdPlaces, sortTeams);

//Segundos de grupo
const secondPlaces = nthPlaces(groups, 1);

//Segundos de grupo donde no se ha clasificado el tercero


/* console.log(inSameGroup(secondPlaces[0],bestThirdPlaces)); */

const secondPlacesFromNoBestThirdPlaceGroup = splitSecondPlaces('fromNoBestThirdPlaceGroup', secondPlaces, bestThirdPlaces, inSameGroup);
const restOfSecondPlaces = splitSecondPlaces('rest', secondPlaces, bestThirdPlaces, inSameGroup);

console.log('Mejores terceros:', bestThirdPlaces);
//console.log(secondPlaces);   
//console.log(secondPlacesFromNoBestThirdPlaceGroup);
//console.log(restOfSecondPlaces);  


//COMIENZA LA FASE DE ELIMINATORIAS!

console.log('==========ROUND OF SIXTEEN==========');


const setRoundOf16 = function (firstPlaces, secondPlacesFromNoBestThirdPlaceGroup, bestThirdPlaces, restOfSecondPlaces) {
    const roundOf16 = [];

    //Primeros vs. mejores terceros
    const first4Locals = firstPlaces.slice(0, 4);
    let first4Visitors = bestThirdPlaces;


    //Evita los cruces de equipos del mismo grupo

    first4Visitors = avoidSameGroup(first4Locals, first4Visitors);
    console.log(first4Visitors);

    for (let i = 0; i < first4Locals.length; i++) {
        roundOf16.push({ local: `${first4Locals[i].name}`, visitor: `${first4Visitors[i].name}` });
    }

    console.log(roundOf16);


    //Primeros y segundos de grupos sin terceros clasificados vs. resto de segundos
    const last4Locals = firstPlaces.slice(4).concat(secondPlacesFromNoBestThirdPlaceGroup);
    let last4Visitors = restOfSecondPlaces;

    last4Visitors = avoidSameGroup(last4Locals, last4Visitors);
    console.log(last4Visitors);

    for (let i = 0; i < last4Locals.length; i++) {
        roundOf16.push({ local: `${last4Locals[i].name}`, visitor: `${last4Visitors[i].name}` });
    }

    return roundOf16;
}


const roundOf16 = setRoundOf16(firstPlaces, secondPlacesFromNoBestThirdPlaceGroup, bestThirdPlaces, restOfSecondPlaces);
console.log(roundOf16);

    

/*

const roundOf16Winners = playRound(roundOf16,'Q');
console.log(roundOf16Winners);


console.log('==========QUARTER-FINALS==========');

//Q1 - Q8
//Q2 - Q7
//Q3 - Q6
//Q4 - Q5




//Emparejamientos de cuartos de final

const setQuarterFinals = function(roundOf16Winners){

const quarterFinals = [];
quarterFinals.push({local:`${roundOf16Winners[0]}`, visitor: `${roundOf16Winners[7]}`});
quarterFinals.push({local:`${roundOf16Winners[1]}`, visitor: `${roundOf16Winners[6]}`});
quarterFinals.push({local:`${roundOf16Winners[2]}`, visitor: `${roundOf16Winners[5]}`});
quarterFinals.push({local:`${roundOf16Winners[3]}`, visitor: `${roundOf16Winners[4]}`});

return quarterFinals;

}

const quarterFinals = setQuarterFinals(roundOf16Winners);
console.log(quarterFinals);

//Jugar los cuartos de final


const quarterFinalsWinners = playRound(quarterFinals,'QF');
console.log(quarterFinalsWinners);



console.log('==========SEMIFINALS==========');





//Emparejamientos de las semifinales

const setSemiFinals = function(quarterFinalsWinners){

    const semiFinals = [];
    semiFinals.push({local:`${quarterFinalsWinners[0]}`, visitor: `${quarterFinalsWinners[2]}`});
    semiFinals.push({local:`${quarterFinalsWinners[1]}`, visitor: `${quarterFinalsWinners[3]}`});

    return semiFinals;

    }

    const semiFinals = setSemiFinals(quarterFinalsWinners);
    console.log(semiFinals);

//Jugar las semifinales

    const semiFinalsWinners = playRound(semiFinals,'SF');
    console.log(semiFinalsWinners);



console.log('==========THIRD AND FOURTH PLACE==========');


//Emparejamientos del partido de tercer y cuarto lugar

let thirdAndFourthPlace=[];

quarterFinalsWinners.forEach((team)=>{
    if (!semiFinalsWinners.includes(team)){
        thirdAndFourthPlace.push(team);
    }
})

thirdAndFourthPlace = {local: thirdAndFourthPlace[0], visitor: thirdAndFourthPlace[1]};

console.log(thirdAndFourthPlace);

//Jugar el partido por el tercer lugar
const thirdPlaceMatch = function (thirdAndFourthPlace){

    let local = thirdAndFourthPlace.local;
    let visitor = thirdAndFourthPlace.visitor;
    let localGoals = scoreGoals();
    let visitorGoals = scoreGoals();
    let thirdPlaceWinner = playMatch(local, visitor, localGoals, visitorGoals);
    console.log(`${local} ${localGoals}  -  ${visitorGoals} ${visitor} ==> ${thirdPlaceWinner  || 'No winner yet!'}`);
    while(thirdPlaceWinner === undefined){
        console.log('A rematch will be played!');
        localGoals = scoreGoals();
        visitorGoals = scoreGoals();
        thirdPlaceWinner = playMatch(thirdAndFourthPlace[0], thirdAndFourthPlace[1], localGoals, visitorGoals)
        console.log(`${local} ${localGoals}  -  ${visitorGoals} ${visitor} ==> ${thirdPlaceWinner  || 'No winner yet!'}`);
    }

    return thirdPlaceWinner;
}
const thirdPlaceWinner = thirdPlaceMatch(thirdAndFourthPlace);


console.log('==========FINAL==========');

//Los ganadores de las semifinales juegan la final

const final = function(){
    const local = semiFinalsWinners[0];
    const visitor = semiFinalsWinners[1];
    let localGoals = scoreGoals();
    let visitorGoals = scoreGoals();
    let champion = playMatch(local,visitor, localGoals, visitorGoals);
    console.log(`${local} ${localGoals}  -  ${visitorGoals} ${visitor} ==> ${champion|| 'No winner yet!'}`);

    while (champion  === undefined){
        console.log('A rematch will be played!');
        localGoals = scoreGoals();
        visitorGoals = scoreGoals();
        champion = playMatch(local,visitor, localGoals, visitorGoals);
        console.log(`${local} ${localGoals}  -  ${visitorGoals} ${visitor} ==> ${champion || 'No winner yet!'}`);
    }

    return champion;
}

*/

//const champion = final(semiFinalsWinners);
//console.log(`======================================`);
//console.log(`${champion} is the new Euro Cup Champion!`);

//TODO Mostrar el campeón





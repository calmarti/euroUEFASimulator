
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

console.log(teamPool.length);

/*selección aleatoria de los 16 finalistas*/

const teams=[];

for (let i=0; i < 16; i++) {

    index = Math.floor(Math.random()*(teamPool.length));
    teams.push(teamPool[index]);
  /*   console.log(index, teamPool[index]); */
    firstHalf = teamPool.slice(0, index);
    secondHalf = teamPool.slice(index+1);
    teamPool = firstHalf.concat(secondHalf); 
     
}

console.log(teams.length, teams);




/* function randomGoals() {
    goal = Math.floor(Math.random()*7);
    return goal;
}
 */


/* console.log(randomGoals());  */
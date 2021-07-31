
export const nthPlaces = function (groups, n) {
    const listNthPlaces = [];
    for (let group of groups) {
        listNthPlaces.push(group.teams[n]);
    }

    return listNthPlaces;
}

export const sortAndSlice = function (groups, thirdPlaces, sortTeams) {
    sortTeams(thirdPlaces);
    let bestThirdPlaces = thirdPlaces.slice(0, 4);
    return bestThirdPlaces;
}



export const inSameGroup = function (team, arrayOfTeams) {
    let result = false;
    for (let i = 0; i < arrayOfTeams.length; i++) {
        if (team.group === arrayOfTeams[i].group) {
            result = true;
            break;
        }
    }
    return result;
}


export const splitSecondPlaces = function (slice, arrayA, arrayB, inSameGroup) {

    let newArrayA1 = [];
    let newArrayA2 = [];
    if (slice == 'fromNoBestThirdPlaceGroup') {
        for (let i in arrayA) {
            if (inSameGroup(arrayA[i], arrayB) === false) {
                newArrayA1.push(arrayA[i]);
            }
        }
        return newArrayA1;
    }


    else if (slice == 'rest') {
        for (let i in arrayA) {
            if (inSameGroup(arrayA[i], arrayB) === true) {
                newArrayA2.push(arrayA[i]);
            }
        }
        return newArrayA2;
    }
}



export const avoidSameGroup = function (firstArray, secondArray) {

    for (let i = 0; i < firstArray.length; i++) {


        if (firstArray[i].group === secondArray[i].group) {

            if (i == 0) {
                let swappedTeam = secondArray.splice(i, 1)[0];
                secondArray.splice(3, 0, swappedTeam);
              

            }
            else if (i == 1 | i == 2 | i == 3) {
                let swappedTeam = secondArray.splice(i, 1)[0];
                secondArray.unshift(swappedTeam);
              

            }
        }
    }

        //Comprobación extra en caso de que el reordenamiento anterior cause otro cruce de equipos del mismo grupo

        const localGroups = [];
        const visitorGroups = [];
        
        for (let i = 0; i < firstArray.length; i++) {

            localGroups.push(firstArray[i].group);
            visitorGroups.push(secondArray[i].group);
        }

      
        const sameGroup = (group, i) => { return group === localGroups[i] };

        if (visitorGroups.some(sameGroup)) {

            return avoidSameGroup(firstArray, secondArray);

        }
            

        else {
            return secondArray;
        }

    }
            




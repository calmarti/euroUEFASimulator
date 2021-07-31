# Simulacion de Eurocopa en Javascript
### Ivan Martínez Calcaño
---
    Este programa simula el desarrollo de las distintas etapas de una eurocopa de 24 equipos distribuidos aleatoriamente en 6 grupos. 


---

1. **Liguilla de grupos** 
    
    -Cada grupo es una instancia de la clase 'Group'
    
    -Simulación del calendario de jornadas y partidos 

    -Simulación aleatoria del resultado de cada partido

    -Actualización de la tabla de clasificación 

    -Criterios de clasificación a la siguiente ronda: puntos, diferencia de goles y orden alfabético del nombre del equipo. 

2. **Fase de eliminatorias directas**
    
    **Octavos de final**

    -Los emparajamientos de los 16 equipos clasificados se realiza con la función setRoundOf16, que devuelve un array de objetos donde cada objeto es un partido con los atributos: 'local' y 'visitor'.

    -Uso de la función avoidSameGroup para evitar cruces de equipos provenientes del mismo grupo de la liguilla. 

    -Simulación del resultado de los partidos con la función 'playRound'

    **Cuartos de final, semifinales, partido por el tercer lugar y partido final**
    
    -Los emparejamientos de cuartos y semifinales se realizan de manera análoga (pero no igual) al caso de octavos, con las funciones setQuarterFinals y setSemiFinals.

    -Simulación del resultado de los partidos con la función 'playRound'

    ---

    **Notas**

    **Clase 'Group'**

    La clase Group instancia un grupo con las propiedades:

    name , team,  schedule y config
    
    Entre los métodos más relevantes de Group están: 

    setUpSchedule

    showGroupSchedule (muestra el calendario de jornadas y partidos)

    playMatchDay (juega los dos partidos de cada jornada y muestra el resultado)

    updateTeams (actualiza las estadísticas de cada equipo tras jugar la jornada)

    showMatchDayResults (actualiza y muestra la tabla de clasificación tras jugar la jornada)

    ---
    **Funciones auxiliares**

    El programa tiene dos modulos auxiliares: aux.js y auxRoundOf16.js
    El primero contiene funciones auxiliares para la simulación de partidos y sus resultados:    

    scoreGoal 
    
    playMatch 
    
    playRound (fase de eliminatorias)

    sortTeams (ordena un array de equipos de acuerdo a los criterios del torneo)

    El modulo **auxRoundOf16.js** contiene funciones usadas para crear los emparejamientos de octavos de final de acuerdo a las reglas del torneo:

    nthPlaces (devuelve un array con los equipos que acabaron en el lugar 'n' de su grupo)

    sortAndSlice (ordena los 6 terceros lugares y devuelve un array con los 4 primeros)

    inSameGroup (devuelve true si el equipo que recibe pertenece al mismo grupo para al menos uno de los equipos del array que recibe)
    
    splitSecondPlaces (divide los segundos lugares en dos grupos: los que no pertenecen a un grupo donde se clasifico un tercero y el resto de los segundos lugares)

    avoidSameGroup (reordena el array de equipos visitantes ahí donde el grupo original del local sea igual al del visitante)






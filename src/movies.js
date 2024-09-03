// const movies = [
//     {
//       title: 'The Shawshank Redemption',
//       year: 1994,
//       director: 'Frank Darabont',
//       duration: '2h 22min',
//       genre: ['Crime', 'Drama'],
//       score: 9.3
//     }];

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    let allDirectors = moviesArray.map((movie) => movie.director);
    let uniqueDirs = [];
    allDirectors.forEach((director) => {if(uniqueDirs.indexOf(director) === -1) uniqueDirs.push(director)});
    return uniqueDirs;
}

// console.log(getAllDirectors(movies));

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    if(!moviesArray.length) return 0;
    return moviesArray.filter( (movie) => {
        if (movie.director === "Steven Spielberg" && movie.genre.includes("Drama")) return movie;
    }).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if(!moviesArray.length) return 0;

    let totalScore = moviesArray.reduce((total, movie) => typeof movie.score === "number" ? total + movie.score : total, 0);

    // console.log(moviesArray,totalScore);
    return parseFloat((totalScore/moviesArray.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    if(!moviesArray.length) return 0;

    return scoresAverage(moviesArray.filter((movie) => movie.genre.includes("Drama")));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    return moviesArray.toSorted((a,b) => {
        if(a.year < b.year) return -1;
        else if (a.year > b.year) return 1;
        else return a.title.localeCompare(b.title);
    });
}

// console.log(orderByYear(movies))

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray.toSorted((a,b) => a.title.localeCompare(b.title)).map( (movie) => movie.title).slice(0,20);
}

// console.log(orderAlphabetically(movies));

function formattedTime(time) {
    let timeArr = time.replace(/[a-zA-Z]/g, "").split(" ");
    let totalTime = 0;
    if(timeArr.length > 0) {
        if(timeArr.length === 1) totalTime = parseInt(timeArr[0])*60;
        else totalTime = parseInt(timeArr[0])*60 + parseInt(timeArr[1]);
    };
    return totalTime;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.map((movie) => {
        if(typeof movie.duration === "string") movie.duration = formattedTime(movie.duration);
        return movie;
    });
}

// console.log(turnHoursToMinutes(movies));


// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if(!moviesArray.length) return null;

    let uniqueYears = []; //List of all unique years
    let scoreAvgYear= []; //List of all scores by year

    let yearsArr = moviesArray.map((movie) => movie.year).sort((a,b) => a<b ? -1 : 1);

    yearsArr.forEach((year) => {
        if(!uniqueYears.includes(year)) {
            uniqueYears.push(year);
            //Filter movies by year
            let moviesByYear = moviesArray
            .filter((movie) => {
                if(movie.year === year) {
                    return movie.score;
                }
            });

            //Get all scores by year
            let scoresByYear = moviesByYear.map((movie) => movie.score);

            //Get average of all scores this year
            let averageTotalByYear = scoresByYear.reduce((total, score) => total + score,0)/scoresByYear.length;
            scoreAvgYear.push(parseFloat(averageTotalByYear.toFixed(2)));
        }
    });

    
    let rate = Math.max(...scoreAvgYear);
    let bestYearIndex = scoreAvgYear.indexOf(rate);

    console.log(`The best year was ${uniqueYears[bestYearIndex]} with an average score of ${rate}`);

    return `The best year was ${uniqueYears[bestYearIndex]} with an average score of ${rate}`;
}

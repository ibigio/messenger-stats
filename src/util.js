
const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const monthToSeason = m => {
    switch (m+1) {
        case 12:
        case 1:
        case 2:
            return 'Winter';
        case 3:
        case 4:
        case 5:
            return 'Spring';
        case 6:
        case 7:
        case 8:
            return 'Summer';
        case 9:
        case 10:
        case 11:
            return 'Fall';
        default:
            console.log(m);
    }
};

const getSeasonOf = date => {
    return monthToSeason(date.getMonth());// + " " + date.getFullYear() % 1000;
};

export { numberWithCommas, monthToSeason, getSeasonOf };
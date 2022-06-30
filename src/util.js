const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const monthToSeason = (m) => {
  switch (m + 1) {
    case 12:
    case 1:
    case 2:
      return "Winter";
    case 3:
    case 4:
    case 5:
      return "Spring";
    case 6:
    case 7:
    case 8:
      return "Summer";
    case 9:
    case 10:
    case 11:
      return "Fall";
    default:
      console.log(m);
  }
};

const getSeasonOf = (date) => {
  return monthToSeason(date.getMonth()); // + " " + date.getFullYear() % 1000;
};

const formatHour = (hour) => {
  let h = hour % 12;
  if (h === 0) h = 12;

  const suffix = hour > 11 ? "pm" : "am";

  return h + "" + suffix;
};

function unpack(str) {
  var ch,
    st,
    re = [];
  for (var i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i); // get char
    st = []; // set up "stack"
    do {
      st.push(ch & 0xff); // push byte to stack
      ch = ch >> 8; // shift value down by 1 byte
    } while (ch);
    // add stack contents to result
    // done because chars have "wrong" endianness
    re = re.concat(st.reverse());
  }
  // return an array of bytes
  return re;
}

// function unpack(str) {
//     var bytes = [];
//     for(var i = 0; i < str.length; i++) {
//         var char = str.charCodeAt(i);
//         bytes.push(char >>> 8);
//         bytes.push(char & 0xFF);
//     }
//     return bytes;
// }

export { numberWithCommas, getSeasonOf, formatHour, unpack };

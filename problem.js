const arr = ["1", "4"];
let anotherArr = ["1", "2", "3", "4", "5", "6", "7"];

filteredArr = anotherArr.filter((i) => !arr.includes(i));
console.log(filteredArr);
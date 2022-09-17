// const arr = ["1", "4"];
// let anotherArr = ["1", "2", "3", "4", "5", "6", "7"];

// filteredArr = anotherArr.filter((i) => !arr.includes(i));
// console.log(filteredArr);

// event loop
const first = () => {
	console.log("i am first");
	setTimeout(fourth, 5000);
	setTimeout(second, 2000);
	third();
};
const second = () => {
	console.log("i am second");
};
const third = () => {
	console.log("i am thrid");
};
const fourth = () => {
	console.log("i am fourth");
};
first();

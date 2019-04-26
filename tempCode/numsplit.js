var x = 12345678910;
var count = 0;
var digits = (""+x).split("").reverse();
var str = "";
digits.forEach(num => {
    if(count%3 != 0 || count ==0){
        str += digits[count];
    }else{
        str += "," + digits[count];
    }
    count++;
});
console.log(str.split("").reverse().join(""));
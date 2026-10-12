/* let para = document.createElement("p")
para.innerText ="Hello World"
document.body.appendChild(para)
document.querySelector("body").prepend(para) */

/* let li = document.createElement("li")
li.innerText = "josfn"
document.querySelector("ul").append(li) */

/* let li = document.createElement("li")
li.innerText = "Mukul"
document.querySelector("li").before(li)
 */

/* let para = document.createElement("li")
para.innerText = "Mukul"
let spara = document.getElementById("second")
spara.parentNode.insertBefore(para,spara) */

/* let afterel = document.createElement("p")
afterel.innerText = "Mukul"
let existel = document.getElementById("second")
existel.after(afterel) */

/* let p = document.createElement("p")
p.innerText ="New test"
let s = document.getElementById("old")
s.replaceWith(p) */

/* document.querySelector("#removeMe").remove() */

/* let last = document.getElementById("list")
last.lastElementChild.remove() */

/* let last = document.getElementById("box")
console.dir(last)
while(last.firstElementChild){
    last.firstElementChild.remove
} */

/* let marks =[85,97,44,37,76,60]
let sum =0 ;

for(let el of marks){
    sum +=el;
}
let avg=sum
console.log(avg/marks.length)
 */

/* let price = [250, 645, 300, 900, 50]
let final =[]
for(let el of price){
    let discount = el*0.1;
    result = el - discount
    final.push(result)
}
console.log(final) */

/* const readline = require('readline-sync')
const n = readline.question("Enter No. Of Companies : ")
let arr = [];
for(let i =0; i<n; i++){
    let g = readline.question("Enter Company Name : ");
    arr.push((g.toUpperCase()))
}
arr.push("amazon")
console.log(arr) */

/* function name(str){
    let count =0;
    let vowels ='aeiouAEIOU'
    for (let i =0; i<str.length; i++){
        if(vowels.includes(str[i])){
            count++;
        }
    }
        return count;
}
let result = name("Mukul")
console.log(result)
 */

/* const countVowels = (name) => {
   let count =0;
   let vowel = 'aeiou'
   let str = name.toLowerCase();
   for (let i = 0; i<str.length; i++){
    if(vowel.includes(str[i])){
        count++;
    }
   }
    return count
}
let counts = countVowels("Mukul")
console.log(counts) */

/*let arr=[1,2,3,4,5]
arr.forEach(function square(val,idx){
    let result = val*val
    arr[idx]=result;
});
 console.log(arr) */

/*  let arr = [1,3,5]
 const calSquare=(arr)=>{
    let r = arr*arr  
    console.log(r)
 }
 arr.forEach(calSquare); */

/*let marks =[86,85,97,90,92,94,55]
let result =marks.filter((val) =>{
    return val>90;
})
console.log(result)
 */

/* const readline = require('readline-sync')
const n = Number(readline.question("Enter Number of array : "))
let arr=[]
for(let i =0; i<n; i++){
    arr[i] = i+1
}

/*const output = arr.reduce((prev,curr) => {
    return prev += curr
})
console.log("Sum :",output)

const output2 = arr.reduce((prev,curr) => {
    return prev *= curr
},1)
console.log('Mult : ',output2) */


    


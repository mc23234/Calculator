const nums = document.querySelectorAll('.num');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const operatorBtn = document.querySelectorAll('.operator');
const backBtn = document.querySelector('.backspace');
const decimal = document.querySelector('.decimal');

let numArray = [];
let operator = '';
let digits = '';
let result = '';

//functions 

function displayNums(){
	nums.forEach((num) => {
		num.addEventListener('click',() => {
					if(digits.length < 10)
						digits += num.textContent;
					display.textContent = digits;
		});
	});
}

function backspace(){
		backBtn.addEventListener('click', () => {
				if(digits.length === 1)
					display.textContent = '0';
				
				else if(digits){
					digits = digits.slice(0,digits.length-1);
					display.textContent = digits;
				}
				else if (digits === ''){
					if(display.textContent === '0')
						display.textContent = '0';
					else{
						digits = display.textContent;
						digits = digits.slice(0,digits.length-1);
						display.textContent = digits;
					}
				}
		});
}

decimal.addEventListener('click', () => {
		
		display.textContent = '.' + digits ;
		digits += '.';
		
		console.log(digits);
});

function displayOperator(){
		operatorBtn.forEach((op) => {
			op.addEventListener('click',() => {
				
				let temp = parseFloat(digits);
				
				if(temp === 0 || temp){
					numArray.push(parseFloat(digits));
					digits = '';
				}
				

				if(numArray.length === 1 && op.textContent === '%')
					result = operateFunction(numArray,op.textContent);
				
				else if(numArray.length === 2 && op.textContent === '=')
					result = operateFunction(numArray,operator);
				
				else if(numArray.length === 2){
					if(operator === '='){
						operator = op.textContent;
						numArray.shift();
					}
							
					result = operateFunction(numArray,operator);
				}
						
				operator = op.textContent;
				displayResult(result);
				
			});
	});
}


function clearDisplay(){
	
	clear.addEventListener('click', () => {
		
		display.textContent = '0';
		numArray = []
		operator = '';
		digits = '';
		result = 0;
	});
}

function displayResult(result){
	if(result){

		numArray = [];
					
		if((result*10)%10 != 0){
						
			if(result.toString().length > 12){
				if(result < 0)
					display.textContent =   Math.abs(result) + '-';
						
				else
					display.textContent = result.toExponential(3);
			}
			
			else{
				if(result < 0)
					display.textContent =   Math.abs(result) + '-';
				else 
					display.textContent = result.toFixed(3);
			}
		}
					
		else{
						
			if(result.toString().length > 10){
				if(result < 0)
					display.textContent =   Math.abs(result) + '-';
				else
					display.textContent = result.toExponential(3);
			}
						
			else{
				if(result < 0)
					display.textContent =   Math.abs(result) + '-';
			    else
			    	display.textContent = result;
			}
						
		}
					
		numArray.push(result);
	}	
}



//function calls

clearDisplay();
displayOperator();
displayNums();
backspace();


// Logic

function add(num1,num2){
	return num1 + num2;
}

function subtract(num1,num2){
	return num1-num2;
}

function multiply(num1,num2){
	return num1*num2;
}

function divide(num1,num2){
	return num1/num2;
}

function percentage(num){
	return num/100;
}



//calling logic functions

function operateFunction(arr,op){
	
	switch(op){
		case '+':
			return add(arr[0],arr[1]);
		case '-':
			return subtract(arr[0],arr[1]);
		case '*':
			return multiply(arr[0],arr[1]);
		case '/':
			return divide(arr[0],arr[1]);
		case '%':
			return percentage(arr[0]);
		default:
			return null;
	}
}

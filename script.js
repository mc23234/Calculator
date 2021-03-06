const nums = document.querySelectorAll('.num');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const operatorBtn = document.querySelectorAll('.operator');
const backBtn = document.querySelector('.backspace');
const decimal = document.querySelector('.decimal');
const plusMinus = document.querySelector('.pm');

let numArray = [];				//Array to store operands and running result max-length = 2
let operator = '';				//Variable to store the operator
let digits = '';				//Variable to store the digits entered
let result = '';				//Variable to store the running result
let screenNums = '';			//Variable to use the numbers across various operations without changing the state of digits and result variable


//Adding digits and displaying it on the screen
nums.forEach((num) => {
	num.addEventListener('click',() => {
		
		if(digits.length < 10)
			digits += num.textContent;
		display.textContent = digits;
		screenNums = digits;
	});
});


//Backspace 
backBtn.addEventListener('click', () => {
		
		if(digits || result){
			digits = display.textContent;
			digits = digits.slice(0,digits.length-1);
			display.textContent = digits;
			screenNums = digits;
		}		
});


//Append a decimal
decimal.addEventListener('click', () => {
	if(screenNums){
		if(!/[.]/.test(screenNums.toString())){
			digits = screenNums.toString() + '.';
			if(digits.length > 12)
				display.textContent = parseFloat(digits).toExponential(3);
			else
				display.textContent = digits;
			screenNums = digits;
		}
	}
});


//Append a plus or minus sign before the number displayed
plusMinus.addEventListener('click', () => {
	if(parseFloat(screenNums) > 0){
		digits = 0 - parseFloat(screenNums);
		display.textContent = digits ;
	}
	else{
		display.textContent = Math.abs(parseFloat(screenNums));
		digits = Math.abs(parseFloat(screenNums));
	}
	screenNums = digits;
});


//Clear the display screen and setting all variables and array to initial value
clear.addEventListener('click', () => {
	
	display.textContent = '';
	screenNums = '';
	numArray = []
	operator = '';
	digits = '';
	result = 0;
});


//Setting the operator and using the numbers entered and running result to perform operation
operatorBtn.forEach((op) => {
	op.addEventListener('click',() => {
		
		let temp = parseFloat(digits);									//Setting a temporary number variable 

		if(temp === 0 || temp){
			numArray.push(temp);										
			digits = '';												//setting digits variable to initial value for taking new number
		}
		
		if(numArray.length === 1 && op.textContent === '%')				//when only 1 operator needed %
			result = operateFunction(numArray,op.textContent);			
		
		else if(numArray.length === 2 && op.textContent === '=')		//when ist operator is +,-,*,/ with 2nd is = 
			result = operateFunction(numArray,operator);
		
		else if(numArray.length === 2){									//Performing operation with no memory of previous operations or result after clicking = 
			if(operator === '='){
				operator = op.textContent;
				numArray.shift();										//removing previous result for no previous memory operation
			}
					
			result = operateFunction(numArray,operator);
		}
				
		operator = op.textContent;
		displayResult(result);
	});
});


//Displaying the running result on the display screen
function displayResult(result){
	if(result){

		numArray = [];
					
		if(result%1 != 0){												//If the running result is float
			result = parseFloat(result.toFixed(5));
						
			if(result.toString().length > 12)							//limiting the size of float result for display
				display.textContent = result.toExponential(3);
			
			else
				display.textContent = parseFloat(result.toFixed(5));
		}
		else{															//If the running result is integer
						
			if(result.toString().length > 10)							//limiting the size of integer result
				display.textContent = result.toExponential(3);
						
			else
			    display.textContent = result;
		}
					
		numArray.push(result);
		screenNums = result;
	}
	else if(result === 0 && numArray.length === 2){					//For displaying result when one operand is 0
		numArray = [result];
		display.textContent = result;
	}
}


//The operation logic
function operateFunction(arr,op){
	
	switch(op){
		case '+':
			return arr[0]+arr[1];
		case '-':
			return arr[0]-arr[1];
		case '*':
			return arr[0]*arr[1];
		case '/':
			return arr[0]/arr[1];
		case '%':
			return arr[0]/100;
		default:
			return null;
	}
}

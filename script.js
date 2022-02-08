const nums = document.querySelectorAll('.num');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const operatorBtn = document.querySelectorAll('.operator');
const backBtn = document.querySelector('.backspace');
const decimal = document.querySelector('.decimal');
const plusMinus = document.querySelector('.pm');

let numArray = [];
let operator = '';
let digits = '';
let result = '';
let screenNums = 0;


nums.forEach((num) => {
	num.addEventListener('click',() => {
		
		if(digits.length < 10)
			digits += num.textContent;
		display.textContent = digits;
		screenNums = digits;
	});
});



backBtn.addEventListener('click', () => {
		
		if(digits || result){
			digits = display.textContent;
			digits = digits.slice(0,digits.length-1);
			display.textContent = digits;
		}		
				
});



decimal.addEventListener('click', () => {
	if(!/[.]/.test(screenNums.toString())){
		digits = screenNums.toString() + '.';
		display.textContent = digits;
		screenNums = digits;
	}
});



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


	
clear.addEventListener('click', () => {
	
	display.textContent = '';
	screenNums = '';
	numArray = []
	operator = '';
	digits = '';
	result = 0;
});


operatorBtn.forEach((op) => {
	op.addEventListener('click',() => {
		
		let temp = parseFloat(digits);

		if(temp === 0 || temp){
			numArray.push(temp);
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


function displayResult(result){
	if(result){

		numArray = [];
					
		if(result%1 != 0){
			result = parseFloat(result.toFixed(5));
						
			if(result.toString().length > 12)				
				display.textContent = result.toExponential(3);
			
			else
				display.textContent = parseFloat(result.toFixed(5));
		}
		else{
						
			if(result.toString().length > 10)				
				display.textContent = result.toExponential(3);
						
			else
			    display.textContent = result;
		}
					
		numArray.push(result);
		screenNums = result;
	}	
}

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

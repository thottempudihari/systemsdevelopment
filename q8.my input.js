const my_input = document.getElementById('my_input');
const button = document.getElementById('submit');
const output = document.getElementById('output');

button.addEventListener("click",function(){
    const userInput = my_input.value;
    if(userInput===""){
        alert('Please enter your interests');
    }else{
        output.innerHTML = ` Thank you for providing your input: <strong>${userInput}<strong> `;
    }
})
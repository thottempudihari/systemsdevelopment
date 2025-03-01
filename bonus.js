const my_input = document.getElementById('my_input');
const button = document.getElementById('submit');
const output = document.getElementById('output');

button.addEventListener("click", function () {
    let userInput = my_input.value.trim();

    if (userInput === "") {
        alert('Please enter your interests.');
        return;
    }
    if (!userInput.includes(",") && userInput.includes(" ")) {
        alert('It looks like you entered multiple words but forgot to separate them with commas. Please format like "sleep,lewis hamilton,ferrari".');
        return;
    }
    const interests = userInput.split(",").map(interest => interest.trim()).filter(interest => interest !== "");

    if (interests.length === 0) {
        alert('Please enter valid interests separated by commas.');
        return;
    }
    output.innerHTML = `<h2>Your Interests</h2>`;
    const list = document.createElement("ul");
    interests.forEach(interest => {
        const listItem = document.createElement("li");
        listItem.textContent = interest;
        list.appendChild(listItem);
    });

    output.appendChild(list);
    console.log(`Thank you for providing your input: ${userInput}`);
});

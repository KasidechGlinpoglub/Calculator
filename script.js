let currentInput = "";
let calculationHistory = [];

function appendToDisplay(value) {
    currentInput += value;
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

function calculateResult() {
    try {
        let result = 0;

        // Check for square root calculation
        if (currentInput.includes("sqrt(")) {
            const number = parseFloat(currentInput.match(/sqrt\((.*?)\)/)[1]);
            if (!isNaN(number)) {
                result = Math.sqrt(number);
                appendToHistory(result, currentInput, true); // Add square root to history
            } else {
                throw new Error("Invalid input for square root calculation");
            }
        } else if (currentInput.includes("^")) {
            const [base, exponent] = currentInput.split("^");
            result = Math.pow(parseFloat(base), parseFloat(exponent));
            appendToHistory(result, currentInput); // Add exponent calculation to history
        } else {
            result = eval(currentInput);
            appendToHistory(result, currentInput); // Add other calculations to history
        }

        document.getElementById("display").value = result;
        currentInput = result.toString();
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}

function clearEntry() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function appendToHistory(result, input, isSquareRoot = false) {
    calculationHistory.push({ result, input, isSquareRoot });
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById("calc-history");
    historyContainer.innerHTML = "";

    calculationHistory.forEach((calculation, index) => {
        const historyItem = document.createElement("div");
        const number = index + 1;
        if (calculation.isSquareRoot) {
            historyItem.innerHTML = `${number}) Square Root of ${calculation.input} = ${calculation.result}`;
        } else {
            historyItem.innerHTML = `${number}) Answer = ${calculation.result}`;
        }
        historyContainer.appendChild(historyItem);
    });
}

// ฟังก์ชันสำหรับคำนวณรูทที่สอง
function calculateSquareRoot() {
    const display = document.getElementById('display');
    const currentValue = parseFloat(display.value);

    if (!isNaN(currentValue) && currentValue >= 0) {
        const result = Math.sqrt(currentValue);
        display.value = result;
        appendToHistory(`√${currentValue} = ${result}`);
    } else {
        display.value = 'Error';
    }
}

function updateDisplay() {
    document.getElementById("display").value = currentInput;
}

function clearHistory() {
    calculationHistory = [];
    updateHistoryDisplay();
}

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (/[\d\.+\-*/]/.test(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        clearEntry();
    }
});

updateHistoryDisplay();


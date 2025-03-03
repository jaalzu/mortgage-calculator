const myForm = document.getElementById("form");
const displayEmpty = document.getElementById("display-empty-results");
const displayResults = document.getElementById("mortgage-show-results");

function validateRadio() {
    let errorRadio = document.getElementById("errorRadio");
    errorRadio.textContent = "";
    let selected = document.querySelector('input[name="mortgage-type"]:checked');
    if (!selected) {
        errorRadio.textContent = "Choose an option";
        errorRadio.style.display = "block";
        return false;
    }
    errorRadio.style.display = "none";
    return true;
}

function validateAmount(value) {
    let errorAmount = document.getElementById("errorAmount");
    errorAmount.textContent = "";
    let amount = parseFloat(String(value).replace(",", "."));
    if (!value || isNaN(amount) || amount <= 0) {
        errorAmount.textContent = "Enter a valid amount";
        errorAmount.style.display = "block";
        return false;
    }
    errorAmount.style.display = "none";
    return true;
}

function validateYears(value) {
    let errorYears = document.getElementById("errorYears");
    errorYears.textContent = "";
    let years = parseFloat(String(value).replace(",", "."));
    if (!value || isNaN(years) || years <= 0) {
        errorYears.textContent = "Enter a valid year";
        errorYears.style.display = "block";
        return false;
    }
    errorYears.style.display = "none";
    return true;
}

function validateInterest(value) {
    let errorInterest = document.getElementById("errorInterest");
    errorInterest.textContent = "";
    let interest = parseFloat(String(value).replace(",", "."));
    if (!value || isNaN(interest) || interest <= 0) {
        errorInterest.textContent = "Enter a valid interest rate";
        errorInterest.style.display = "block";
        return false;
    }
    errorInterest.style.display = "none";
    return true;
}

function calculateMonthlyPayment(amount, interestRate, years, mortgageType) {
    let monthlyRate = (interestRate / 100) / 12;
    let totalPayments = years * 12;
    if (mortgageType === "repayment") {
        if (monthlyRate === 0) {
            return (amount / totalPayments).toFixed(2);
        }
        let monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                             (Math.pow(1 + monthlyRate, totalPayments) - 1);
        return monthlyPayment.toFixed(2);
    } else if (mortgageType === "interest") {
        return (amount * monthlyRate).toFixed(2);
    }
    return "0.00";
}

function calculateMortgage() {
    let amountValue = document.getElementById("mortagage-amount").value.trim();
    let yearsValue = document.getElementById("mortagage-term").value.trim();
    let interestValue = document.getElementById("mortagage-interest").value.trim();
    let resultMonthly = document.getElementById("monthly-repayments");
    let resultRepay = document.getElementById("result-repay");
    let selectedMortgageType = document.querySelector('input[name="mortgage-type"]:checked');

    amountValue = parseFloat(String(amountValue).replace(",", "."));
    yearsValue = parseFloat(String(yearsValue).replace(",", "."));
    interestValue = parseFloat(String(interestValue).replace(",", "."));

    let validAmount = validateAmount(amountValue);
    let validYears = validateYears(yearsValue);
    let validInterest = validateInterest(interestValue);
    let validRadio = validateRadio();

    if (!validAmount || !validYears || !validInterest || !validRadio) {
        return false;
    }

    let mortgageType = selectedMortgageType.value;
    let monthlyPayment = calculateMonthlyPayment(amountValue, interestValue, yearsValue, mortgageType);
    let totalPayment;
    if (mortgageType === "repayment") {
        totalPayment = (monthlyPayment * yearsValue * 12).toFixed(2);
    } else {
        let totalInterestPaid = (monthlyPayment * yearsValue * 12).toFixed(2);
        totalPayment = `${totalInterestPaid} `;
    }
    resultMonthly.textContent = `$${monthlyPayment}`;
    resultRepay.textContent = `$${totalPayment}`;
    return true;
}

myForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = calculateMortgage();
    if (!isValid) {
        return false;
    }
    displayEmpty.style.display = "none";
    displayResults.style.display = "block";
    myForm.reset();
});


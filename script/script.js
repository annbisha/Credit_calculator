document.addEventListener("DOMContentLoaded", function () {

    const calculatorForm = document.querySelector(".calculator_form");
    const loanAmountInput = document.querySelector(".loan_amount");
    const loanPeriodInput = document.querySelector(".loan_period");
    const dailyPayment = document.querySelector(".daily-payment");
    const totalPayment = document.querySelector(".total_payment");
    const calculateButton = document.querySelector(".calculate_button");
    const errorMessage = document.querySelector(".error_message");
    const loanPeriodSlider = document.querySelector(".loan_period_slider");
    const loanAmountSlider = document.querySelector(".loan_amount_slider");

    function syncValues(inputElem, outputElem) {
        outputElem.value = inputElem.value;
    }

    loanAmountSlider.addEventListener("input", () => syncValues(loanAmountSlider, loanAmountInput));
    loanPeriodSlider.addEventListener("input", () => syncValues(loanPeriodSlider, loanPeriodInput));
    loanAmountInput.addEventListener("input", () => syncValues(loanAmountInput, loanAmountSlider));
    loanPeriodInput.addEventListener("input", () => syncValues(loanPeriodInput, loanPeriodSlider));

    loanAmountInput.value = loanAmountSlider.value;
    loanPeriodInput.value = loanPeriodSlider.value;

    calculatorForm.addEventListener("input", function () {

        const loanAmount = parseInt(loanAmountInput.value);
        const loanPeriod = parseInt(loanPeriodInput.value);
        const dailyInterestRate = 0.022;

        if (isNaN(loanAmount) || isNaN(loanPeriod) || loanAmount < 1000 || loanAmount > 50000 || loanPeriod < 7 || loanPeriod > 60) {
            calculateButton.disabled = true;
            errorMessage.textContent = "Помилка:перевірте введені дані";
            dailyPayment.textContent = "0 грн";
            totalPayment.textContent = "0 грн";
            return;
        }

        const dailyRepayment = (loanAmount + (loanAmount * (dailyInterestRate / 100) * loanPeriod)) / loanPeriod;
        const totalRepayment = dailyRepayment * loanPeriod;

        dailyPayment.textContent = dailyRepayment.toFixed(2) + " грн";
        totalPayment.textContent = totalRepayment.toFixed(2) + " грн";
        calculateButton.disabled = false;
        errorMessage.textContent = "";
    });

    calculatorForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Кредит оформлено");
    });
});
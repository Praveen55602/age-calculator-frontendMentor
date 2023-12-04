const calculateAgeButton = document.querySelector("#find-age-button");
const dayInput = document.querySelector("#input-days");
const monthsInput = document.querySelector("#input-months");
const yearsInput = document.querySelector("#input-years");
const resultYears = document.querySelector("#result-years");
const resultMonths = document.querySelector("#result-months");
const resultDays = document.querySelector("#result-days");
const dayError = document.querySelector("#day-error");
const monthError = document.querySelector("#month-error");
const yearError = document.querySelector("#year-error");
const dateLabls = document.getElementsByClassName("date-label");
const color = dateLabls[0].style.color;

function reset() {
  dayError.classList.add("hide");
  monthError.classList.add("hide");
  yearError.classList.add("hide");
  dayInput.classList.remove("error-border");
  monthsInput.classList.remove("error-border");
  yearsInput.classList.remove("error-border");
  dateLabls[0].style.color = color;
  dateLabls[1].style.color = color;
  dateLabls[2].style.color = color;
  resultYears.innerHTML = "--";
  resultDays.innerHTML = "--";
  resultMonths.innerHTML = "--";
}

function calculateAge(birthYear, birthMonth, birthDay) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const currentDay = currentDate.getDate();

  let ageYears = currentYear - birthYear;
  let ageMonths = currentMonth - birthMonth;
  let ageDays = currentDay - birthDay;

  // Adjust negative ageMonths or ageDays
  if (ageDays < 0) {
    const lastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
    ageMonths--;
    ageDays += lastMonth;
  }

  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };
}

function isValidDate(year, month, day) {
  const date = new Date(year, month - 1, day); // Month is zero-based, so subtract 1
  return (
    !isNaN(date) &&
    date.getFullYear() == year &&
    date.getMonth() + 1 == month &&
    date.getDate() == day
  );
}

const currentDate = calculateAgeButton.addEventListener("click", (event) => {
  event.preventDefault();
  reset();
  const birthDay = dayInput.value;
  let isError = false;
  const birthYear = yearsInput.value;
  const birthMonth = monthsInput.value;

  if (birthDay == "") {
    dayError.classList.remove("hide");
    dayError.innerHTML = "This field is required";
    dayInput.classList.add("error-border");
    dateLabls[0].style.color = "red";
    console.log(dateLabls[0]);
    isError = true;
  }

  if (birthYear == "") {
    yearError.classList.remove("hide");
    yearError.innerHTML = "This field is required";
    yearsInput.classList.add("error-border");
    dateLabls[2].style.color = "red";
    isError = true;
  }
  if (birthMonth == "") {
    monthError.classList.remove("hide");
    monthError.innerHTML = "This field is required";
    monthsInput.classList.add("error-border");
    dateLabls[1].style.color = "red";
    isError = true;
  }

  if (birthDay > 31) {
    isError = true;
    dayError.classList.remove("hide");
    dayError.innerHTML = "Must be a valid day";
    dayInput.classList.add("error-border");
    dateLabls[0].style.color = "red";
  }

  if (birthMonth > 12) {
    isError = true;
    monthError.classList.remove("hide");
    monthError.innerHTML = "Must be a valid month";
    monthsInput.classList.add("error-border");
    dateLabls[1].style.color = "red";
  }
  if (birthYear > new Date().getFullYear()) {
    isError = true;
    yearError.classList.remove("hide");
    yearError.innerHTML = "Must be a valid year";
    yearError.classList.add("error-border");
    dateLabls[2].style.color = "red";
  }
  if (isError) return;
  if (!isValidDate(birthYear, birthMonth, birthDay)) {
    dayError.classList.remove("hide");
    monthsInput.classList.add("error-border");
    yearsInput.classList.add("error-border");
    dayInput.classList.add("error-border");
    yearError.classList.add("hide");
    monthError.classList.add("hide");
    dateLabls[0].style.color = "red";
    dateLabls[1].style.color = "red";
    dateLabls[2].style.color = "red";
    dayError.innerHTML = "Must be a valid date";
    return;
  }

  const age = calculateAge(birthYear, birthMonth, birthDay);

  if (age.years < 0) isError = true;
  if (isError) return;
  resultYears.innerHTML = age.years;
  resultDays.innerHTML = age.days;
  resultMonths.innerHTML = age.months;
});

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  //hide results
  document.getElementById('results').style.display = 'none';

  // show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate results
function calculateResults(e) {
  // UI variables
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyears = document.getElementById('years');
  const UImonthlyPayment = document.getElementById('monthly-payment');
  const UItotalPayment = document.getElementById('total-payment');
  const UItotalInterest = document.getElementById('total-interest');

  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  //Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)){
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';

    document.getElementById('loading').style.display = 'none';
  } else {
    showError("Please check your numbers");
  }
}

// Show error
function showError(error) {
  //Hide results and loader
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';

  //Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = "alert alert-danger";

  //Create a test node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error before heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

//Clear error
function clearError() {
  document.querySelector(".alert").remove();
}

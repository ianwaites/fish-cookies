// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
var allLocations = [];
var theTable = document.getElementById('pike');
var hourlyTotals = [];

function CookieStore(locationName, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer) {
  this.locationName = locationName;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDaily = 0;
  allLocations.push(this);
}

CookieStore.prototype.calcCustomersThisHour = function() {
  var reference = [];
  for (var i = 0; i < hours.length; i++) {
    var numberCustomersPerHour = Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1)) + this.minCustomersPerHour;
    reference.push(numberCustomersPerHour);
  }
  this.customersEachHour = reference;
  return numberCustomersPerHour;
};

CookieStore.prototype.calcCookiesThisHour = function() {
  for (var j = 0; j < hours.length; j++) {
    var totalCookieSales = Math.ceil(this.customersEachHour[j] * this.avgCookiesPerCustomer);
    this.cookiesEachHour.push(totalCookieSales);
    this.totalDaily += this.cookiesEachHour[j];
  }
  this.cookiesEachHour.push(this.totalDaily);
};

function calcHourlyTotals() {
  for (var i = 0; i < hours.length; i++){
    var total = 0;
    for (var j = 0; j < allLocations.length; j++){
      total = total + allLocations[j].cookiesEachHour[i];
      // total += allLocations[j].cookiesEachHour[i];
    }
    hourlyTotals.push(total);
  }
};

// Push hours to table header
var renderHeader = function() {
  var trEL = document.createElement('tr');
  var thEL = document.createElement('th');
  thEL.textContent = 'Locations';
  trEL.appendChild(thEL);
  for (var i = 0; i < hours.length; i++) {
    var thEL = document.createElement('th');
    thEL.textContent = hours[i];
    trEL.appendChild(thEL);
  }
  thEL = document.createElement('th');
  thEL.textContent = 'Daily';
  trEL.appendChild(thEL);
  theTable.appendChild(trEL);
};

// Push totals to TD's in DOM
CookieStore.prototype.render = function() {
  var trEL = document.createElement('tr');
  var tdEL = document.createElement('td');
  tdEL.textContent = this.locationName;
  trEL.appendChild(tdEL);

  for (var i = 0; i < hours.length + 1; i++) {
    var tdEL = document.createElement('td');
    tdEL.textContent = this.cookiesEachHour[i];
    trEL.appendChild(tdEL);
  }
  // tdEl = document.createElement('td');
  // tdEL.textContent = this.totalDaily;
  // theTable.appendChild(tdEl);
  theTable.appendChild(trEL);
};

// Footer TOTALLLLL
function renderFooter() {
  var tfootEL = document.createElement('tfoot');
  var trEL = document.createElement('tr');
  var thEL = document.createElement('td');
  thEL.textContent = 'Total';
  tfootEL.appendChild(trEL);
  trEL.appendChild(thEL);
  for (var i = 0; i < hours.length; i++) {
    var thEL = document.createElement('td');
    thEL.textContent = hourlyTotals[i];
    tfootEL.appendChild(trEL);
    trEL.appendChild(thEL);
  }
  theTable.appendChild(tfootEL);
};

var pikePlace = new CookieStore('Pike Place Market', 23, 65, 6.3);
pikePlace.calcCustomersThisHour();
pikePlace.calcCookiesThisHour();

var seaTac = new CookieStore('Seatac', 3, 24, 1.2);
seaTac.calcCustomersThisHour();
seaTac.calcCookiesThisHour();

var seattleCenter = new CookieStore('Seattle Center', 11, 38, 3.7);
seattleCenter.calcCustomersThisHour();
seattleCenter.calcCookiesThisHour();

var capitolHill = new CookieStore('Capitol Hill', 20, 38, 2.3);
capitolHill.calcCustomersThisHour();
capitolHill.calcCookiesThisHour();

var alki = new CookieStore('Alki', 2, 16, 4.6);
alki.calcCustomersThisHour();
alki.calcCookiesThisHour();

renderHeader();
// pikePlace.render();
// seaTac.render();
// seattleCenter.render();
// capitolHill.render();
// alki.render();

for(var i = 0; i < allLocations.length; i++){
  allLocations[i].render();
}

calcHourlyTotals();
renderFooter();

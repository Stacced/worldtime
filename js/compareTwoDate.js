var dateOne = new Date(1980, 6, 31,1);
var dateTwo = new Date(1980, 6, 31,24);

var hoursOne = dateOne.getHours();
var hoursTwo = dateTwo.getHours();



var resultMinus = hoursOne - hoursTwo;

if (resultMinus > 0) {
  document.getElementById("output").innerHTML = "+" + resultMinus;
}else{
  document.getElementById("output").innerHTML = resultMinus;
}

var dateOne = document.getElementById('dateOne').value;
var dateTwo = document.getElementById('dateTwo').value;

if (dateOne > dateTwo) {
  var resultMinus = dateOne - dateTwo;
}else{
  var resultMinus = dateTwo - dateOne;
}

document.getElementById("output").innerHTML = resultMinus;

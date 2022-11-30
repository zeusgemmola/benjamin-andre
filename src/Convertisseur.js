const APIKEY = 123;

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", function () {
  console.log(this.responseText);
});
oReq.open("GET", "https://freecurrencyapi.net/api/v2/latest?apikey={APIKEY}");
oReq.send();

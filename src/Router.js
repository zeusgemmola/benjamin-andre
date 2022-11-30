var oReq = new XMLHttpRequest();
oReq.addEventListener("load", function () {
  console.log(this.responseText);
});
oReq.open("GET", "https://api.currencyapi.com/v3/latest?apikey=YOUR-APIKEY");
oReq.send();

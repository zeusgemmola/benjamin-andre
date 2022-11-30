import React, { useEffect, useState } from "react";
import "./AppBar.css";
import logo from "./AppBar.logo.svg";
import "./App.css";
import "./components/Spinner/Spinner.css";

//import Down from "./404";
import M from "materialize-css";
import Spinner from "./components/Spinner/index";
import Down from "./404";

const App = () => {
  // Init Des Variables
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("CHF");
  const [output, setOutput] = useState(0);
  const [state, setState] = useState(true);

  // Appelle API Lorsque From Ou To Change
  useEffect(() => {
    document.getElementById("Spinner").style.display = "none";
    console.log(input);
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
      if (this.status > 209) {
        setState(false);
      } else {
        setOutput(JSON.parse(this.responseText).data[to].value);
        convert(input, JSON.parse(this.responseText).data[to].value);
      }
    });
    oReq.open(
      "GET",
      "https://ai.currencyapi.com/v3/latest?apikey=GfbJpyCoVKkzL8EFqJuFr8vjN2vI9hN8hjO6zr4B&base_currency=" +
        from +
        "&currencies=" +
        to +
        ""
    );
    oReq.send();
  }, [from, to]);

  useEffect(() => {
    M.updateTextFields();
  }, []);
  /*
  const validateInput = (val) => {
    if (!/^[0-9]+$/.test(val)) {
      alert("Please only enter numeric characters! (Allowed input:0-9)");
      document.getElementById("amount");
      return false;
    }
  };*/

  const writeResult = (val, rate) => {
    if (rate !== 0) {
      document.getElementById("result").textContent = "Resultat: " + val * rate;
    } else {
      document.getElementById("result").textContent =
        "Resultat: " + val * output;
    }
  };

  // Convertion Du Montant
  function convert(value, rate) {
    if (value && value !== 0) {
      document.getElementById("Spinner").style.display = "block";

      setInput(value);
      writeResult(value, rate);

      document.getElementById("Spinner").style.display = "none";
    } else {
      document.getElementById("result").textContent = "Resultat: 0";
    }
  }

  if (state) {
    return (
      <div className="App">
        <header>
          <nav className="AppBar">
            <img
              className="AppBar-logo"
              src={logo}
              aria-label="people"
              alt="People"
            />
          </nav>
        </header>
        <main>
          <div className="container">
            <div className="row">
              <h3>Convertisseur</h3>
              <div className="col s8">
                <div className="row">
                  <div className="col s6">
                    <label>From</label>
                    <select
                      defaultValue="EUR"
                      className="browser-default"
                      name="inputDevises"
                      id="inputDevises"
                      onChange={(e) => {
                        setFrom(e.target.value);
                      }}
                    >
                      <option value="EUR">EUR</option>
                      <option value="CHF">CHF</option>
                      <option value="GBP">GBP</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  <div className="col s6">
                    <label>To</label>
                    <select
                      defaultValue="CHF"
                      className="browser-default"
                      name="outputDevises"
                      id="outputDevises"
                      onChange={(e) => {
                        setTo(e.target.value);
                      }}
                    >
                      <option value="EUR">EUR</option>
                      <option value="CHF">CHF</option>
                      <option value="GBP">GBP</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="amount"
                      type="number"
                      className=""
                      onChange={(e) => {
                        convert(e.target.value, 0);
                      }}
                    />
                    <span
                      className="helper-text"
                      data-error="Erreur"
                      data-success="Valide"
                    ></span>
                    <label htmlFor="amount">Montant</label>
                  </div>
                  <div className="input-field col s12">
                    <h5 id="result">Result : 0</h5>
                    <Spinner />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="Error404">
        <Down />
      </div>
    );
  }
};

export default App;

import "./AppBar.css";
import logo from "./AppBar.logo.svg";
import "./App.css";
import mickey from "./Mickey2.jpg";

const Down = () => (
  <div>
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
          <h3>Error 404</h3>
          <img class="fit-picture" src={mickey} alt="Mickey no problem"></img>
        </div>
      </div>
    </main>
  </div>
);

export default Down;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/sass/static-page.scss";

class Home extends Component {
  render() {
    return (
      <div className="static-page">
        <div id="header">
          <span className="logo icon fa-paper-plane-o" />
          <h1>Skyline Web Solutions</h1>
          <p>
            The dashboard you all been waiting for to ease up your work
            <br />
            and bring up your reputation.
          </p>
        </div>

        <div id="main">
          <header className="major container medium">
            <h2>
              We do the hard work for your
              <br />
              bussiness to up your level
              <br />
              to a whole new level
            </h2>

            <p>Store your employees, clients and services in to a Database</p>
          </header>

          <div className="box alt container">
            <section className="feature left">
              <Link to="/" className="image icon fa-signal">
                <img
                  style={{ width: "400px" }}
                  src="images/garage.jpg"
                  alt=""
                />
              </Link>
              <div className="content">
                <h3>The Best Application Out There</h3>
                <p>
                  The only Application in the market to improve the workspace in
                  your workshop.
                </p>
              </div>
            </section>
            <section className="feature right">
              <Link to="/" className="image icon fa-code">
                <img src="images/mechanicPhoto2.jpg" alt="" />
              </Link>
              <div className="content">
                <h3>Storing everything for your convinience</h3>
                <p>
                  Stote every client and employees for better managment and
                  services.
                </p>
              </div>
            </section>
            <section className="feature left">
              <Link to="/" className="image icon fa-mobile">
                <img
                  style={{ width: "100px" }}
                  src="images/mechanicPhoto3.png"
                  alt=""
                />
              </Link>
              <div className="content">
                <h3>Making your bussiness easier</h3>
                <p>
                  By implementing this technology will improve the pace and time
                  in the workspace.
                </p>
              </div>
            </section>
          </div>

          <footer className="major container medium">
            <h3>Get Our System today and sign up</h3>
            <p>Completly free only today then you will pay.</p>
            <ul className="actions special">
              <li>
                <Link to="/" className="button">
                  Create your online workshop Today
                </Link>
              </li>
            </ul>
          </footer>
        </div>

        <footer style={{ padding: "30px 0" }}>
          Contact us: <Link to="/">contactus@skylinesolutions.com</Link>
          <br />
          Copyright by Skyline Web Solutions
        </footer>
      </div>
    );
  }
}

export default Home;

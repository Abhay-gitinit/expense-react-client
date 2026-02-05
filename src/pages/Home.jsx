import { Link } from "react-router-dom";
import "./home.css";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const animateNumber = (el) => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;

      const interval = setInterval(() => {
        current += 1;
        el.textContent = current.toString().padStart(2, "0");

        if (current >= target) {
          clearInterval(interval);
        }
      }, 120);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("visible");

            const numberEl = entry.target.querySelector(".step-index");
            if (numberEl && numberEl.textContent === "00") {
              setTimeout(() => animateNumber(numberEl), delay);
            }
          }
        });
      },
      { threshold: 0.3 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="py-5 hero-terminal">
        <div className="container text-center">
          <h1 className="terminal-title">
            <span className="terminal-strong">Settle </span>
            <span className="terminal-grey">expenses</span>
            <span className="terminal-muted"> | Smarter</span>
          </h1>

          <p className="terminal-sub mt-3">
            Track shared expenses, see balances clearly, and settle without
            confusion.
          </p>

          <Link to="/login" className="terminal-btn">
            GET STARTED
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="terminal-card">
                <h5>Group Expenses</h5>
                <p>
                  Create groups for trips, roommates, or friends and track
                  expenses together.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="terminal-card">
                <h5>Clear Balances</h5>
                <p>Instantly know who owes money and who should receive it.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="terminal-card">
                <h5>Easy Settlements</h5>
                <p>
                  Settle balances with one action using smart backend logic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-5 how-section">
        <div className="container text-center">
          <h3 className="how-title fade-in">How It Works</h3>

          <div className="how-steps-wrapper">
            <div className="row mt-5 g-4">
              <div className="col-md-4 fade-in" data-delay="0">
                <div className="how-step">
                  <span className="step-index" data-target="1">
                    1
                  </span>
                  <h5>Create a Group</h5>
                  <p>
                    Start by creating a group for a trip, roommates, or shared
                    expenses.
                  </p>
                </div>
              </div>

              <div className="col-md-4 fade-in" data-delay="200">
                <div className="how-step">
                  <span className="step-index" data-target="2">
                    2
                  </span>
                  <h5>Add Expenses</h5>
                  <p>
                    Record who paid and how much. Balances are handled
                    automatically.
                  </p>
                </div>
              </div>

              <div className="col-md-4 fade-in" data-delay="400">
                <div className="how-step">
                  <span className="step-index" data-target="3">
                    3
                  </span>
                  <h5>Settle Smarter</h5>
                  <p>
                    View clear balances and settle with minimal transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

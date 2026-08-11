import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <h1>WalletWise</h1>
      </div>

      <div className="navbar__actions">
        <button
        className="navbar__notification"
        aria-label="Notifications"
        >
        🔔
        </button>

        <div className="navbar__profile">
          <span>Vishruth</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

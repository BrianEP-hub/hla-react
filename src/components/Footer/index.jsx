import "./style.css";

const Footer = () => {
  const date = new Date();
  const fullYear = date.getFullYear();
  return (
    <footer className="footer">
      <div>
      <p>
         Copyright Hartlichtautomatik engineering &copy; {fullYear}
      </p>
      <p>
        Copyright webdevelopment Brian B &copy; {fullYear}
      </p>
      </div>
      <div class="links">
        <a href="#">Terms and conditions</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;

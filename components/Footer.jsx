import { AiOutlineCopyrightCircle } from "react-icons/ai";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-evenly text-sm my-2">
      <div className="flex space-x-1">
        <AiOutlineCopyrightCircle />
        <p>NotOmegle.com</p>
      </div>
      <a href="https://www.omegle.com/static/terms.html" target="_blank" className="text-underline">TOS</a>
      <a href="https://www.omegle.com/static/privacy.html" target="_blank" className="text-underline">Privacy Policy</a>
    </footer>
  );
};

export default Footer;

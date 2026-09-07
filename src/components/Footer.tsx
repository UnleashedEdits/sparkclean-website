import { Instagram, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../data/business";
import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div><Brand light /><p>Detail-first cleaning for your home in and around Walnut Creek. Share your address to confirm current availability.</p></div>
        <div><span>Explore</span><Link to="/services">Services</Link><Link to="/deep-cleaning">Deep cleaning</Link><Link to="/recurring-cleaning">Recurring cleaning</Link><Link to="/service-areas">Service areas</Link></div>
        <div><span>Your next step</span><Link to="/about">About</Link><Link to="/faq">FAQ</Link><Link to="/estimate">Get an estimate</Link><a href={business.instagram} target="_blank" rel="noreferrer">See recent work</a></div>
        <div><span>Connect</span><a href={`tel:${business.phoneHref}`}><Phone size={15} /> {business.phoneDisplay}</a><a href={business.instagram} target="_blank" rel="noreferrer"><Instagram size={15} /> {business.instagramHandle}</a></div>
      </div>
      <div className="footer__bottom"><span>© {new Date().getFullYear()} Sparkclean Cleaning Services</span><span>Built for a cleaner way home</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>
    </footer>
  );
}

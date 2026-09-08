import { Link } from "react-router-dom";
import { assetPath } from "../lib/assets";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? "brand--light" : ""}`} to="/" aria-label="Sparkclean home">
      <span className="brand__mark" aria-hidden="true"><img src={assetPath("/images/sparkclean-instagram-logo.png")} alt="" /></span>
      <span className="brand__words"><strong>Sparkclean</strong><small>Cleaning Services</small></span>
    </Link>
  );
}

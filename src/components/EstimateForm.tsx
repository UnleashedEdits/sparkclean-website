import { CheckCircle2, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { business } from "../data/business";

export function EstimateForm() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={32} />
        <span className="eyebrow">Your next step</span>
        <h2>You’re ready to talk through your clean.</h2>
        <p>Call now to confirm your scope, availability, timing, and price.</p>
        <a className="solid-link" href={`tel:${business.phoneHref}`}><Phone size={18} /> Call for your estimate</a>
        <button type="button" onClick={() => setSubmitted(false)}>Edit your answers</button>
      </div>
    );
  }

  return (
    <form className="estimate-form" onSubmit={submit}>
      <div className="form-intro">
        <span className="eyebrow">Plan your clean</span>
        <h2>Choose what “clean” needs to feel like.</h2>
        <p>Share your home and priorities, then call to confirm your scope, availability, timing, and price.</p>
      </div>
      <div className="form-fields">
        <label><span>Name *</span><input required name="name" autoComplete="name" placeholder="Your name" /></label>
        <label><span>Phone *</span><input required name="phone" type="tel" autoComplete="tel" placeholder="(925) 555-0123" /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
        <label><span>ZIP or city *</span><input required name="location" autoComplete="postal-code" placeholder="Walnut Creek, 94596" /></label>
        <label><span>Home type</span><select name="homeType" defaultValue=""><option value="" disabled>Choose one</option><option>House</option><option>Apartment / condo</option><option>Townhome</option><option>Other</option></select></label>
        <label><span>Approximate size</span><select name="size" defaultValue=""><option value="" disabled>Bedrooms / baths or sq. ft.</option><option>Studio / 1 bed</option><option>2–3 bedrooms</option><option>4+ bedrooms</option><option>I’ll share square footage</option></select></label>
        <label><span>Your cleaning plan *</span><select required name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Deep cleaning</option><option>Biweekly cleaning</option><option>Monthly cleaning</option><option>Move-related request</option><option>Custom request</option></select></label>
        <label><span>Preferred timing</span><input name="timing" placeholder="A week, date, or flexible" /></label>
        <label className="form-wide"><span>Your condition and priorities *</span><textarea required name="priorities" rows={5} placeholder="Share which rooms need the most attention, when your home was last professionally cleaned, and the details that matter most to you." /></label>
        <label className="form-wide"><span>Pets, parking, stairs, or access notes</span><textarea name="access" rows={3} placeholder="Helpful details for planning the visit" /></label>
        <div className="form-submit">
          <button type="submit">Review your cleaning plan</button>
          <p>Your details stay on this device until you call.</p>
        </div>
      </div>
    </form>
  );
}

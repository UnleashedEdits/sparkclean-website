import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Home, RefreshCw, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { getRecommendation, type PlannerState } from "../data/business";
import { ParticleButton } from "./ParticleButton";

const goals = [
  { value: "reset", label: "Reset the whole home", icon: Sparkles },
  { value: "maintain", label: "Keep it feeling fresh", icon: RefreshCw },
  { value: "move", label: "Prepare for a move", icon: Home },
  { value: "custom", label: "I have a priority list", icon: SlidersHorizontal },
] as const;

export function Planner() {
  const [state, setState] = useState<PlannerState>({ goal: "reset", rooms: "medium", detail: "detail" });
  const recommendation = useMemo(() => getRecommendation(state), [state]);
  const reduced = useReducedMotion();
  const update = <K extends keyof PlannerState>(key: K, value: PlannerState[K]) => setState((current) => ({ ...current, [key]: value }));

  return (
    <div className="planner glass-card">
      <div className="planner__questions">
        <fieldset>
          <legend>What should this clean do for you?</legend>
          <div className="option-grid option-grid--goals">
            {goals.map(({ value, label, icon: Icon }) => (
              <button key={value} type="button" aria-pressed={state.goal === value} onClick={() => update("goal", value)}>
                <Icon size={19} /><span>{label}</span>{state.goal === value && <Check size={16} />}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="planner__split">
          <fieldset>
            <legend>Rough home size</legend>
            <div className="segmented">
              {(["compact", "medium", "large"] as const).map((size) => <button key={size} type="button" aria-pressed={state.rooms === size} onClick={() => update("rooms", size)}>{size}</button>)}
            </div>
          </fieldset>
          <fieldset>
            <legend>Current condition</legend>
            <div className="segmented">
              <button type="button" aria-pressed={state.detail === "standard"} onClick={() => update("detail", "standard")}>Mostly kept up</button>
              <button type="button" aria-pressed={state.detail === "detail"} onClick={() => update("detail", "detail")}>Needs detail</button>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="planner__result" aria-live="polite">
        <span className="eyebrow eyebrow--light">Your starting point</span>
        <AnimatePresence mode="wait">
          <motion.div key={`${state.goal}-${state.rooms}-${state.detail}`} initial={reduced ? false : { opacity: 0, transform: "translateY(10px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: 0.22 }}>
            <h3>{recommendation.title}</h3>
            <strong>{recommendation.cadence}</strong>
            <p>{recommendation.note}</p>
          </motion.div>
        </AnimatePresence>
        <ParticleButton to="/estimate" variant="light">Request this clean</ParticleButton>
      </div>
    </div>
  );
}

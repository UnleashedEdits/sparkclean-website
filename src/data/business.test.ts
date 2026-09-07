import { describe, expect, it } from "vitest";
import { getRecommendation } from "./business";

describe("getRecommendation", () => {
  it("recommends recurring care when you want maintenance", () => {
    expect(getRecommendation({ goal: "maintain", rooms: "medium", detail: "standard" }).title).toBe("Recurring clean");
  });

  it("keeps move-related requests distinct", () => {
    expect(getRecommendation({ goal: "move", rooms: "large", detail: "detail" }).title).toBe("Custom move clean request");
  });

  it("recommends a deep clean when your home needs detail", () => {
    expect(getRecommendation({ goal: "reset", rooms: "compact", detail: "detail" }).title).toBe("Deep clean");
  });
});

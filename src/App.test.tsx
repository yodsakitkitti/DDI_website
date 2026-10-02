import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App";

beforeEach(() => {
  window.history.pushState({}, "", "/#/");
});

test("renders the DDI Sandbox page heading", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /where ideas become innovation/i }),
  ).toBeInTheDocument();
});

test("links the primary hero action to the dashboard", () => {
  render(<App />);
  expect(
    screen.getByRole("link", { name: /view group projects/i }),
  ).toHaveAttribute("href", "/#/dashboard");
});

test("renders the dashboard from a direct hash route", () => {
  window.history.pushState({}, "", "/#/dashboard");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /project dashboard/i, level: 1 }),
  ).toBeInTheDocument();
});

test("accepts a trailing slash on the dashboard hash route", () => {
  window.history.pushState({}, "", "/#/dashboard/");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /project dashboard/i, level: 1 }),
  ).toBeInTheDocument();
});

test("reacts to in-app hash navigation without a server rewrite", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("link", { name: /view group projects/i }));
  act(() => window.dispatchEvent(new HashChangeEvent("hashchange")));

  expect(
    screen.getByRole("heading", { name: /project dashboard/i, level: 1 }),
  ).toBeInTheDocument();
});

test("closes a directly linked profile when browser Back returns to the dashboard", async () => {
  window.history.pushState({}, "", "/#/dashboard");
  window.history.pushState({}, "", "/#/dashboard/pace");
  render(<App />);
  expect(screen.getByRole("dialog", { name: "PACE" })).toBeInTheDocument();

  act(() => window.history.back());

  await waitFor(() => {
    expect(window.location.hash).toBe("#/dashboard");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  expect(
    screen.getByRole("heading", { name: /project dashboard/i, level: 1 }),
  ).toHaveFocus();
});

test("clears a closed profile route and allows the same deep link to reopen", async () => {
  const user = userEvent.setup();
  window.history.pushState({}, "", "/#/dashboard/pace");
  render(<App />);

  await user.click(
    screen.getByRole("button", { name: /close project details/i }),
  );

  expect(window.location.hash).toBe("#/dashboard");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /project dashboard/i, level: 1 }),
  ).toHaveFocus();

  act(() => {
    window.location.hash = "/dashboard/pace";
  });

  expect(
    await screen.findByRole("dialog", { name: "PACE" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /close project details/i }),
  ).toHaveFocus();
});

test("returns keyboard focus to search when the clear button disappears", async () => {
  const user = userEvent.setup();
  window.history.pushState({}, "", "/#/dashboard");
  render(<App />);
  const search = screen.getByRole("searchbox", { name: "Search ventures" });
  await user.type(search, "PACE");
  await user.tab();
  expect(screen.getByRole("button", { name: "Clear search" })).toHaveFocus();

  await user.keyboard("{Enter}");

  expect(search).toHaveValue("");
  expect(search).toHaveFocus();
  expect(
    screen.queryByRole("button", { name: "Clear search" }),
  ).not.toBeInTheDocument();
});

test("uses instant about-section scrolling when reduced motion is preferred", () => {
  const originalScrollIntoView = Element.prototype.scrollIntoView;
  const scrollIntoView = vi.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));
  window.history.pushState({}, "", "/#about");

  try {
    render(<App />);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "instant" });
  } finally {
    Element.prototype.scrollIntoView = originalScrollIntoView;
    vi.unstubAllGlobals();
  }
});

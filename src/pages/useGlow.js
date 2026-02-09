export function handleGlow(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  card.style.setProperty("--x", `${x}px`);
  card.style.setProperty("--y", `${y}px`);
}
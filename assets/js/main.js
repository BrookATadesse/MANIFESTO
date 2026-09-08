const button = document.getElementById("flip");
const note = document.getElementById("note");

button.addEventListener("click", () => {
  const flipped = document.body.classList.toggle("is-flipped");

  note.textContent = flipped
    ? "the exploration and production of a new kind of meaning"
    : "manufacturing demand for things that are inessential at best";

  button.textContent = flipped ? "flip it back" : "flip the line";
});

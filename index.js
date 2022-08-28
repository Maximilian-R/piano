import * as Tone from "tone";

const sheat = document.querySelector(".note-sheat");

const piano = document.querySelector("#piano");

const userSynth = new Tone.Sampler({
  urls: {
    A4: "A4.mp3",
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

let mouseDown = false;

const notes = piano.querySelectorAll(".key");
Array.from(notes).forEach((note) => {
  const noteName = note.dataset.note;
  note.addEventListener("mouseenter", () => mouseDown && pressNote(noteName));
  note.addEventListener("mouseleave", () => mouseDown && releaseNote(noteName));
});

piano.addEventListener("mousedown", (e) => {
  const noteName = e.target.dataset.note;
  mouseDown = true;
  pressNote(noteName);
});

piano.addEventListener("mouseup", (e) => {
  const noteName = e.target.dataset.note;
  mouseDown = false;
  releaseNote(noteName);
});

const pressNote = (note, trigger = true) => {
  trigger && userSynth.triggerAttack(note);

  const key = piano.querySelector("div[data-note='" + note + "']");
  key?.classList.add("pressed");

  const no = sheat.querySelector("div[data-note='" + note + "']");
  no?.classList.add("display");
};

const releaseNote = (note, trigger = true) => {
  trigger && userSynth.triggerRelease(note);

  const key = piano.querySelector("div[data-note='" + note + "']");
  key?.classList.remove("pressed");

  const no = sheat.querySelector("div[data-note='" + note + "']");
  no?.classList.remove("display");
};

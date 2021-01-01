// Grab all the elements first, so we don't need to trigger any re-layouts.
const page = document.querySelectorAll(".m-annotated.page")[0];
const allMarginDenizens = document.querySelectorAll(".m-annotated.slice-notes > *");
const header = document.querySelectorAll(".m-annotated.notes-first-header")[0];
const notes = document.querySelectorAll(".m-annotated.note");
const newMargin = document.querySelectorAll(".m-annotated.page-right")[0];
const anchors = document.querySelectorAll(".m-annotated.note-anchor");

const urlParams = new URLSearchParams(window.location.search);


// Start the window with max 928px to disable this entire script, and stick
// with isolated margins.
const jsmargined = window.matchMedia('screen and (min-width: 929px)').matches;

if (jsmargined) {
  page.classList.remove("nojs");
  page.classList.add("jsmargined");
}

function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { y: rect.top + scrollTop, x: rect.left + scrollLeft }
}

function relayoutNotes() {
  const anchorsPageYByNoteId = {};
  for (const anchor of anchors) {
    const noteId = anchor.getAttribute("data-noteId");
    anchorsPageYByNoteId[noteId] = offset(anchor).y;
  }

  // Reset all the tops
  for (const note of notes) {
    note.style.top = "";
  }

  // for (const marginDenizen of allMarginDenizens) {
  //   marginDenizen.remove();
  //   newMargin.appendChild(marginDenizen);
  // }

  const headerY = offset(header).y;
  let nextFreeY = headerY + header.getBoundingClientRect().height;

  let lastNote = null;
  let lastSliceNotesElement = null;
  for (const note of notes) {
    const noteId = note.getAttribute("data-noteId");
    const anchorPageY = anchorsPageYByNoteId[noteId];

    const sliceNotesElement = note.parentElement.parentElement.parentElement;
    console.assert(sliceNotesElement);
    console.assert(sliceNotesElement.classList.contains("slice-notes"));
    const sliceNotesElementY = offset(sliceNotesElement).y;

    const actualY = Math.max(anchorPageY, nextFreeY);
    note.style.top = (actualY - sliceNotesElementY) + "px";

    nextFreeY = actualY + note.getBoundingClientRect().height;
    lastNote = note;
    lastSliceNotesElement = sliceNotesElement;
  }

  if (lastNote) {
    const lastSliceNotesElementY = offset(lastSliceNotesElement).y;

    lastSliceNotesElement.style.height =
        Math.max(
            nextFreeY - lastSliceNotesElementY,
            lastSliceNotesElement.getBoundingClientRect().height) +
        "px";
  }
}

if (jsmargined) {
  window.addEventListener("load", () => {
    let delay = 50;
    (function relayoutNotesAndScheduleNext() {
      relayoutNotes();
      setTimeout(relayoutNotesAndScheduleNext, delay);
      delay = delay * 2;
    })();
  });
}

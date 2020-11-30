function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { y: rect.top + scrollTop, x: rect.left + scrollLeft }
}

const urlParams = new URLSearchParams(window.location.search);

function relayoutNotes() {
  // Grab all the elements first, so we don't need to trigger any re-layouts.
  const page = document.querySelectorAll(".m-annotated.page")[0];
  const allMarginDenizens = document.querySelectorAll(".m-annotated.area-notes > *");
  const header = document.querySelectorAll(".m-annotated.notes-header")[0];
  const notes = document.querySelectorAll(".m-annotated.note");
  const newMargin = document.querySelectorAll(".m-annotated.page-right")[0];
  const pageLeftColumn = document.querySelectorAll(".m-annotated.page-left")[0];
  const pageRightColumn = document.querySelectorAll(".m-annotated.page-right")[0];
  const anchors = document.querySelectorAll(".m-annotated.note-anchor");

  const anchorsPageYByNoteId = {};
  for (const anchor of anchors) {
    const noteId = anchor.getAttribute("data-noteId");
    anchorsPageYByNoteId[noteId] = offset(anchor).y;
  }

  page.classList.remove("isomargined");
  page.classList.add("unimargined");

  for (const marginDenizen of allMarginDenizens) {
    marginDenizen.remove();
    newMargin.appendChild(marginDenizen);
  }

  const pageRightColumnTopY = offset(pageRightColumn).y;
  const headerYRelativeToPageRightColumn = offset(header).y - pageRightColumnTopY;
  let nextFreeY = headerYRelativeToPageRightColumn + header.getBoundingClientRect().height;

  for (const note of notes) {
    const noteId = note.getAttribute("data-noteId");
    const anchorPageY = anchorsPageYByNoteId[noteId];

    const desiredY = anchorPageY - pageRightColumnTopY;
    const actualY = Math.max(desiredY, nextFreeY);
    note.style.top = actualY + "px";

    nextFreeY = actualY + note.getBoundingClientRect().height;
  }

  pageRightColumn.style.height =
      Math.max(nextFreeY, pageLeftColumn.getBoundingClientRect().height) +
      "px";
}

// Add ?isomargined to the url to not do any of the
// re-layouting.
if (urlParams.get('isomargined') == null) {
  window.addEventListener("load", () => {
    let delay = 50;
    (function relayoutNotesAndScheduleNext() {
      relayoutNotes();
      setTimeout(relayoutNotesAndScheduleNext, delay);
      delay = delay * 2;
    })();
  });
}

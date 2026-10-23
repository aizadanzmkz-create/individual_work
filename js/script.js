/* =====================================================================
   Assignment 5 – Part 2 (Individual work)
   Student: Nazymkyzy Aizada, group МТ-2504
   Plain JavaScript, listeners attached with addEventListener()
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initCounter();      // Task 6
  initLivePreview();  // Task 7
  initImageSelect();  // Task 8
  initKeyboard();     // Task 9
  initFocusCard();    // Task 10
});

/* ---------------------------------------------------------------------
   TASK 6. Counter with click events
   --------------------------------------------------------------------- */
function initCounter() {
  const valueEl = document.getElementById("counter-value");
  const msgEl = document.getElementById("counter-msg");
  const btnInc = document.getElementById("btn-increase");
  const btnDec = document.getElementById("btn-decrease");
  const btnReset = document.getElementById("btn-reset");
  let count = 0;

  // ONE function that updates everything shown on the screen
  function updateCounter(message) {
    valueEl.textContent = count;
    btnDec.disabled = count === 0;           // negative values are not allowed
    msgEl.textContent = message || "";
  }

  btnInc.addEventListener("click", function () {
    count++;
    updateCounter();
  });

  btnDec.addEventListener("click", function () {
    if (count > 0) {
      count--;
      updateCounter();
    } else {
      updateCounter("The counter cannot go below 0.");
    }
  });

  btnReset.addEventListener("click", function () {
    count = 0;
    updateCounter("Counter has been reset.");
  });

  updateCounter();
}

/* ---------------------------------------------------------------------
   TASK 7. Live text preview
   --------------------------------------------------------------------- */
function initLivePreview() {
  const input = document.getElementById("preview-input");
  const preview = document.getElementById("preview-text");
  const counter = document.getElementById("char-count");
  const clearBtn = document.getElementById("btn-clear");
  const PLACEHOLDER = "Your text will appear here";

  function updatePreview() {
    const text = input.value;
    if (text === "") {
      preview.textContent = PLACEHOLDER;
      preview.classList.add("empty");
    } else {
      preview.textContent = text;          // textContent: safe, no HTML injection
      preview.classList.remove("empty");
    }
    counter.textContent = text.length;
  }

  // "input" fires on typing, pasting, cutting, drag-and-drop...
  input.addEventListener("input", updatePreview);

  clearBtn.addEventListener("click", function () {
    input.value = "";
    updatePreview();
    input.focus();                         // return keyboard focus to the input
  });

  updatePreview();
}

/* ---------------------------------------------------------------------
   TASK 8. Change an image with a select control
   --------------------------------------------------------------------- */
function initImageSelect() {
  const select = document.getElementById("image-select");
  const img = document.getElementById("landscape-img");
  const caption = document.getElementById("landscape-caption");

  const images = {
    mountains: {
      src: "images/mountains.png",
      alt: "Purple mountain ridges under an orange sunset sky",
      caption: "Mountains at sunset"
    },
    sea: {
      src: "images/sea.png",
      alt: "Blue sea with a small brown boat and a white sail under a clear sky",
      caption: "Sea and sailboat"
    },
    forest: {
      src: "images/forest.png",
      alt: "Dark green pine trees in a forest on a bright morning",
      caption: "Green forest"
    }
  };

  function showImage(key) {
    const item = images[key];
    if (!item) return;
    img.src = item.src;
    img.alt = item.alt;
    caption.textContent = item.caption;
  }

  select.addEventListener("change", function () {
    showImage(select.value);
  });

  showImage(select.value);   // valid initial selection on page load
}

/* ---------------------------------------------------------------------
   TASK 9. Keyboard events
   --------------------------------------------------------------------- */
function initKeyboard() {
  const form = document.getElementById("key-form");
  const input = document.getElementById("key-input");
  const status = document.getElementById("key-status");
  const result = document.getElementById("key-result");
  const EMPTY_RESULT = "Nothing submitted yet";

  function setResult(text) {
    if (text === "") {
      result.textContent = EMPTY_RESULT;
      result.classList.add("empty");
    } else {
      result.textContent = text;
      result.classList.remove("empty");
    }
  }

  // The listener is attached to the input itself, so it works only while the input has focus
  input.addEventListener("keydown", function (event) {
    const keyName = event.key === " " ? "Space" : event.key;
    status.textContent = "Last key pressed: " + keyName;

    if (event.key === "Enter") {
      event.preventDefault();                 // no unintended form submission
      setResult(input.value);
    } else if (event.key === "Escape") {
      input.value = "";
      setResult("");
      status.textContent = "Last key pressed: Escape (input and result cleared)";
    }
  });

  // Safety net: the form can never reload the page
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

/* ---------------------------------------------------------------------
   TASK 10. Mouse and focus events
   --------------------------------------------------------------------- */
function initFocusCard() {
  const card = document.getElementById("focus-card");
  const instruction = document.getElementById("card-instruction");
  const DEFAULT_TEXT = "Hover over the card or press Tab to focus it.";
  const ACTIVE_TEXT = "The card is highlighted! Move away or press Tab to leave.";

  function highlightOn() {
    card.classList.add("highlight");
    instruction.textContent = ACTIVE_TEXT;
  }

  function highlightOff() {
    card.classList.remove("highlight");
    instruction.textContent = DEFAULT_TEXT;
  }

  card.addEventListener("mouseenter", highlightOn);
  card.addEventListener("mouseleave", highlightOff);
  card.addEventListener("focus", highlightOn);
  card.addEventListener("blur", highlightOff);
}

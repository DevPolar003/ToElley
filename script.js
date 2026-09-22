const lockButton = document.getElementById("lockButton");
const lockScreen = document.getElementById("lockScreen");
const music = document.getElementById("bgMusic");
const readingMusic = document.getElementById("readingMusic");
const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;

  cursorGlow.style.transform =
    `translate(${event.clientX}px, ${event.clientY}px)`;
});

lockButton.addEventListener("click", () => {
  music.volume = 0;
  music.play().catch(() => {});

  let volume = 0;

  const fade = setInterval(() => {
    if (volume < 0.12) {
      volume += 0.005;
      music.volume = Math.min(volume, 0.12);
    } else {
      clearInterval(fade);
    }
  }, 120);

  lockButton.classList.add("unlocking");
  lockScreen.classList.add("unlocking");

  setTimeout(() => {
    lockScreen.style.display = "none";
  }, 1500);
});

const typingText = document.getElementById("typingText");
const enterBtn = document.getElementById("enterBtn");

const introMessage = `
I do not know exactly when
you became so important to me.

Maybe it was in the way you talk
about the things you love.

Maybe it was in the little kindness
you carry without even noticing.

Or maybe it happened slowly,
one conversation at a time,
until your name started feeling
like a warm light in my day.

I like you, Ellery.

More than I know how to explain
without making the stars blush.

And somewhere along the way,
you became one of those people
I quietly hope will stay.

So, before I say anything else...

there is one little world
I want to show you.
`;

let index = 0;

function typeEffect() {
  if (index < introMessage.length) {
    const char = introMessage.charAt(index);

    typingText.innerHTML += char === "\n" ? "<br>" : char;

    index++;

    const delay =
      char === "." || char === ","
        ? 180
        : 42;

    setTimeout(typeEffect, delay);
  } else {
    enterBtn.classList.remove("hidden-btn");
    enterBtn.classList.add("show-btn");
  }
}

setTimeout(typeEffect, 800);

enterBtn.addEventListener("click", () => {
  document.getElementById("intro").classList.add("leave");

  music.pause();
  music.currentTime = 0;

  readingMusic.volume = 0;
  readingMusic.play().catch(() => {});

  let volume = 0;

  const readingFade = setInterval(() => {
    if (volume < 0.18) {
      volume += 0.005;
      readingMusic.volume = Math.min(volume, 0.18);
    } else {
      clearInterval(readingFade);
    }
  }, 120);

  setTimeout(() => {
    document.getElementById("intro").style.display = "none";

    const mainSite = document.getElementById("mainSite");

    mainSite.classList.remove("hidden-section");
    mainSite.classList.add("site-enter");

    document.querySelectorAll(".reveal").forEach((element, i) => {
      setTimeout(() => {
        element.classList.add("visible");
      }, 180 + i * 120);
    });
  }, 1000);
});

const noBtn = document.getElementById("noBtn");

function moveNoButton() {
  const container = document.querySelector(".buttons");

  const maxX = Math.max(
    0,
    container.clientWidth - noBtn.offsetWidth
  );

  const maxY = Math.max(
    20,
    container.clientHeight - noBtn.offsetHeight
  );

  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});

document.getElementById("yesBtn").addEventListener("click", () => {
  const questionBox = document.querySelector(".question-box");

  questionBox.classList.add("answered");

  setTimeout(() => {
    questionBox.style.display = "none";

    const finalScreen = document.getElementById("finalScreen");

    finalScreen.classList.remove("hidden-section");
    finalScreen.classList.add("visible");

    createFireflies();
  }, 700);
});

function createFireflies() {
  const container = document.querySelector(".final-screen");

  for (let i = 0; i < 22; i++) {
    const firefly = document.createElement("span");

    firefly.className = "firefly";

    firefly.style.left = `${Math.random() * 100}%`;
    firefly.style.top = `${Math.random() * 100}%`;

    firefly.style.animationDelay =
      `${Math.random() * 3}s`;

    firefly.style.animationDuration =
      `${3 + Math.random() * 4}s`;

    container.appendChild(firefly);
  }
}

document.querySelectorAll(".game-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -6;

    const rotateY =
      ((x / rect.width) - 0.5) * 6;

    card.style.transform =
      `perspective(900px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  });
});
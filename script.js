const nav = document.querySelector(".site-nav");
const timelineRail = document.querySelector(".timeline-rail");
const languageToggle = document.querySelector(".lang-toggle");
const translatableItems = [...document.querySelectorAll("[data-i18n]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const chapterSections = [...document.querySelectorAll("main [data-chapter]")];
const timelineDots = [...document.querySelectorAll(".timeline-dot")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const zoomableImages = [
  ...document.querySelectorAll(
    ".photo img, .arrival-strip img, .office-mosaic img, .phone-strip img, .police-feature > img"
  ),
];
const languageKey = "wedding-story-language";

const copy = {
  zh: {
    "nav.morning": "出發",
    "nav.city": "市政廳",
    "nav.ceremony": "證婚",
    "nav.certificate": "拿到證書",
    "rail.morning": "出發",
    "rail.arrival": "抵達",
    "rail.waiting": "等候",
    "rail.ceremony": "證婚",
    "rail.certificate": "證書",
    "rail.outside": "外面",
    "hero.line": "在波士頓市政廳，和最親近的人一起，把一個普通的早上變成很重要的一天。",
    "hero.scroll": "開始看故事",
    "opening.label": "April 3, 2026",
    "opening.title": "那天早上，我們去登記結婚。",
    "opening.body": "有一點下雨，也有一點冷。大家帶著花、氣球和相機，在市政廳裡外走來走去，最後一起把這件事記下來。",
    "morning.title": "先從家裡出發。",
    "morning.body": "門口的氣球、車上的花束、下車時整理裙擺的手，都是那天早上的開始。",
    "arrival.label": "Arriving downtown",
    "arrival.title": "到市中心了。",
    "arrival.body": "車門一開，紅磚、人行道、Faneuil Hall 和 City Hall 都慢慢進到照片裡。",
    "city.title": "在 City Hall 外面拍照。",
    "city.body": "還沒到證婚時間，我們先在廣場、樓梯和紅磚牆邊走走停停。那時候大家都還在適應這個突然變得很正式的早上。",
    "waiting.title": "先在辦公室裡等一下。",
    "waiting.body": "親友陸續到了，我們等叫號、簽文件，也在辦公室裡拍照、聊天，讓原本很日常的市政廳早上慢慢熱鬧起來。",
    "waiting.edchenCaption": "大家偷偷在外面跟我們自拍",
    "signing.label": "Signing",
    "signing.title": "簽好名字，往證婚室走。",
    "ceremony.title": "證婚開始。",
    "ceremony.body": "房間不大，大家站得很近。宣讀誓詞、交換戒指時，旁邊一直有人拍照、笑、起鬨，熱鬧得剛剛好。",
    "proof.title": "我們真的結婚了。",
    "proof.body": "證書拿在手上時，才突然有一種事情完成了的感覺。",
    "outside.title": "回到市政廳外面。",
    "outside.body": "拍完朋友和家人的合照後，剛好遇到波士頓警察摩托車隊，熱情地加入一起拍照的行列。",
    "outside.police": "這張很意外，也很值得留下。",
    "phone.label": "Selfies",
    "phone.title": "自拍照",
    "phone.body": "",
    "ending.body": "那天最珍貴的，不只是我們簽下名字，而是你們都在。謝謝大家陪我們走完這個早上，我們會永遠記得這一天！",
  },
  en: {
    "nav.morning": "Morning",
    "nav.city": "City Hall",
    "nav.ceremony": "Ceremony",
    "nav.certificate": "Certificate",
    "rail.morning": "Morning",
    "rail.arrival": "Arrival",
    "rail.waiting": "Waiting",
    "rail.ceremony": "Ceremony",
    "rail.certificate": "Papers",
    "rail.outside": "Outside",
    "hero.line": "At Boston City Hall, surrounded by the people closest to us, an ordinary morning became the day we got married.",
    "hero.scroll": "Start the story",
    "opening.label": "April 3, 2026",
    "opening.title": "The morning we got married at Boston City Hall.",
    "opening.body": "It was a little rainy and a little cold. We brought flowers, balloons, cameras, and the people we love, then spent the morning moving between the plaza, the office, and one small ceremony room.",
    "morning.title": "Leaving from home.",
    "morning.body": "Balloons at the doorway, flowers in the car, and everyone adjusting coats and dresses before heading downtown.",
    "arrival.label": "Arriving downtown",
    "arrival.title": "Boston came into the frame.",
    "arrival.body": "The car door opened, and the bricks, sidewalks, Faneuil Hall, and City Hall became part of the day.",
    "city.title": "A few photos outside City Hall.",
    "city.body": "Before the appointment, we walked around the plaza, the steps, and the brick walls, slowly settling into the fact that the morning had become official.",
    "waiting.title": "Waiting inside the office.",
    "waiting.body": "Friends and family arrived one by one. We waited for our number, signed the paperwork, took photos, talked, and let the ordinary City Hall morning slowly become ours.",
    "waiting.edchenCaption": "Everyone sneaking in a selfie with us from outside",
    "signing.label": "Signing",
    "signing.title": "Names on paper, then upstairs.",
    "ceremony.title": "The ceremony began.",
    "ceremony.body": "The room was small, and everyone stood close. The vows came first, then the rings; cameras were up, people were laughing, and the room felt happily alive.",
    "proof.title": "We were married.",
    "proof.body": "Holding the certificate made it feel real in a way the morning had been leading toward.",
    "outside.title": "Back outside City Hall.",
    "outside.body": "After group photos with friends and family, the Boston Police motorcycle unit warmly joined in for a few photos.",
    "outside.police": "Unexpected, and absolutely worth keeping.",
    "phone.label": "Selfies",
    "phone.title": "Selfies",
    "phone.body": "",
    "ending.body": "The most precious part was not only signing our names. It was having you there with us. Thank you for walking through that morning with us. We will remember this day forever.",
  },
};

function getSavedLanguage() {
  try {
    return window.localStorage.getItem(languageKey);
  } catch {
    return null;
  }
}

function saveLanguage(language) {
  try {
    window.localStorage.setItem(languageKey, language);
  } catch {
    // The page still works when opened from a stricter local context.
  }
}

function applyLanguage(language) {
  const dictionary = copy[language] || copy.zh;
  translatableItems.forEach((item) => {
    const text = dictionary[item.dataset.i18n];
    if (text) item.textContent = text;
  });

  document.documentElement.lang = language === "en" ? "en" : "zh-Hant";
  languageToggle.textContent = language === "en" ? "中" : "EN";
  languageToggle.setAttribute(
    "aria-label",
    language === "en" ? "切換成中文" : "Switch to English"
  );
}

let currentLanguage = getSavedLanguage() === "en" ? "en" : "zh";

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "zh" : "en";
  applyLanguage(currentLanguage);
  saveLanguage(currentLanguage);
});

function openLightbox(image) {
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-lightbox-open");
}

zoomableImages.forEach((image) => {
  image.classList.add("zoomable-media");
  image.tabIndex = 0;
  image.addEventListener("click", () => openLightbox(image));
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightbox.addEventListener("click", (event) => {
  if (
    event.target === lightbox ||
    event.target === lightboxImage ||
    event.target === lightboxClose
  ) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.16,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

applyLanguage(currentLanguage);

let ticking = false;

function updateActiveTimeline() {
  const marker = window.scrollY + window.innerHeight * 0.42;
  let activeChapter = chapterSections[0]?.dataset.chapter;

  chapterSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    if (sectionTop <= marker) activeChapter = section.dataset.chapter;
  });

  timelineDots.forEach((dot) => {
    dot.classList.toggle("active", dot.dataset.chapter === activeChapter);
  });
}

function updateScrollState() {
  const scrollY = window.scrollY;
  const heroScale = Math.min(scrollY / 18000, 0.035);
  document.documentElement.style.setProperty("--scroll-scale", heroScale);
  nav.classList.toggle("is-solid", scrollY > window.innerHeight * 0.72);
  timelineRail.classList.toggle("is-visible", scrollY > window.innerHeight * 0.86);
  updateActiveTimeline();
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  },
  { passive: true }
);

function scheduleScrollStateUpdate() {
  window.requestAnimationFrame(updateScrollState);
  window.setTimeout(updateScrollState, 120);
}

updateScrollState();
scheduleScrollStateUpdate();
window.addEventListener("load", scheduleScrollStateUpdate);
window.addEventListener("hashchange", scheduleScrollStateUpdate);

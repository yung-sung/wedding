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
    "opening.body": "有一點下雨，也有一點冷。大家帶著花、氣球和相機，一起來到市政廳。",
    "morning.title": "先從家裡出發。",
    "morning.body": "帶著氣球和花束，我們從家裡出發去結婚！",
    "arrival.label": "Arriving downtown",
    "arrival.title": "到市中心了。",
    "arrival.body": "車門一開，紅磚、人行道、Boston City Hall 映入眼簾。",
    "city.title": "在 City Hall 外面拍照。",
    "city.body": "還沒到證婚時間，我們先在廣場、樓梯和紅磚牆邊拍照。這個早晨開始變得很正式！",
    "waiting.title": "先在辦公室裡等一下。",
    "waiting.body": "親友陸續到了，我們等叫號、簽文件，也在辦公室裡拍照、聊天，市政廳因為我們變得熱鬧起來。",
    "waiting.edchenCaption": "大家偷偷在外面跟我們自拍",
    "signing.label": "Signing",
    "signing.title": "簽好名字，往證婚室走，空檔間跟朋友一一合照。",
    "ceremony.title": "證婚開始。",
    "ceremony.body": "房間不大，大家站得很近。宣讀誓詞、交換戒指、大家專心的拍照錄影紀錄。",
    "proof.title": "我們真的結婚了。",
    "proof.body": "證書拿在手上時，才突然有一種事情完成了的感覺。",
    "outside.title": "回到市政廳外面。",
    "outside.body": "出來市政廳外拍完大合照後，剛好遇到波士頓警察摩托車隊，他們也熱情地加入一起拍照的行列。",
    "phone.label": "Selfies",
    "phone.title": "在辦公室等待時的自拍",
    "phone.body": "",
    "ending.body": "那天最珍貴的，不只是我們簽下名字拿到證書，而是你們都在，我們會永遠記得這一天！",
    "footer.photo": "攝影: Heng-Jui Chang",
    "footer.driver": "司機 & 助理: Ed Chen",
    "footer.credit": "Yung-Sung Chuang & Codex w/ GPT 5.5 Extra High © 2026",
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
    "opening.body": "It was a little rainy and a little cold. Everyone came to City Hall together with flowers, balloons, and cameras.",
    "morning.title": "Leaving from home.",
    "morning.body": "With balloons and flowers in hand, we left home to go get married!",
    "arrival.label": "Arriving downtown",
    "arrival.title": "Boston came into the frame.",
    "arrival.body": "As soon as the car door opened, the red brick, sidewalks, and Boston City Hall came into view.",
    "city.title": "A few photos outside City Hall.",
    "city.body": "Before the ceremony time, we took photos around the plaza, the steps, and the red brick walls. The morning was starting to feel official!",
    "waiting.title": "Waiting inside the office.",
    "waiting.body": "Friends and family arrived one by one. We waited for our number, signed the paperwork, took photos, and talked; City Hall became lively because of us.",
    "waiting.edchenCaption": "Everyone sneaking in a selfie with us from outside",
    "signing.label": "Signing",
    "signing.title": "After signing, we walked to the ceremony room and took photos with friends in between.",
    "ceremony.title": "The ceremony began.",
    "ceremony.body": "The room was small, and everyone stood close. We read our vows, exchanged rings, and everyone focused on photographing and recording the moment.",
    "proof.title": "We were married.",
    "proof.body": "Holding the certificate made it feel real in a way the morning had been leading toward.",
    "outside.title": "Back outside City Hall.",
    "outside.body": "After we came outside City Hall and took the big group photo, we happened to meet the Boston Police motorcycle unit, and they warmly joined us for photos too.",
    "phone.label": "Selfies",
    "phone.title": "Selfies while waiting in the office",
    "phone.body": "",
    "ending.body": "The most precious part of that day was not only signing our names and receiving the certificate. It was that you were all there with us, and we will remember this day forever.",
    "footer.photo": "Photography: Heng-Jui Chang",
    "footer.driver": "Driver & Assistant: Ed Chen",
    "footer.credit": "Yung-Sung Chuang & Codex w/ GPT 5.5 Extra High © 2026",
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

function getRequestedLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  if (requested === "en" || requested === "zh") return requested;

  const pathParts = window.location.pathname.split("/").filter(Boolean);
  return pathParts.includes("en") ? "en" : null;
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

const requestedLanguage = getRequestedLanguage();
let currentLanguage =
  requestedLanguage || (getSavedLanguage() === "en" ? "en" : "zh");

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

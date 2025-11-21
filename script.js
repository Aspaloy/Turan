// Фейковые данные — потом заменишь на реальные

const statuses = [
  {
    title: "Обращение председателя",
    tag: "главное",
    text: "Туран открывает двери для всех, кто хранит культуру, уважает историю и хочет служить добру.",
    date: "2025-11-21",
  },
  {
    title: "Текущий статус",
    tag: "еженедельно",
    text: "Подготовка к мероприятию ко Дню Манаса. Просим всех активно участвовать и помогать.",
    date: "2025-11-20",
  },
];

const events = [
  {
    title: "Мероприятие ко Дню Манаса",
    place: "Turan Sosyal Merkezi",
    date: "2025-12-04",
    time: "18:00",
    description:
      "Боорсок, токоч, бешбармак, выступления, комуз, тёплая атмосфера и общение.",
  },
  {
    title: "Культурный вечер Турана",
    place: "Turan Sosyal Merkezi",
    date: "2025-12-10",
    time: "19:30",
    description: "Поэзия, музыка, обсуждение идей Турана и будущих проектов.",
  },
];

const news = [
  {
    title: "Открыт официальный сайт Турана",
    source: "Turan Yönetimi",
    date: "2025-11-21",
    text: "Запущена первая версия сайта Турана. Теперь все новости, статусы и мероприятия в одном месте.",
  },
  {
    title: "Подготовка к мероприятию 4 декабря",
    source: "Organizasyon Ekibi",
    date: "2025-11-20",
    text: "Идёт подготовка к большому мероприятию ко Дню Манаса. Следите за объявлениями и поддерживайте.",
  },
];

// Рендер статусов
function renderStatuses() {
  const container = document.getElementById("status-list");
  if (!container) return;

  container.innerHTML = "";
  statuses.forEach((s) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <span class="card-title">${s.title}</span>
        <span class="card-tag">${s.tag}</span>
      </div>
      <div class="card-meta">${s.date}</div>
      <div class="card-body">${s.text}</div>
    `;

    container.appendChild(card);
  });
}

// Рендер мероприятий
function renderEvents() {
  const container = document.getElementById("events-list");
  if (!container) return;

  container.innerHTML = "";
  events.forEach((e) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <span class="card-title">${e.title}</span>
        <span class="card-meta">${e.date} · ${e.time}</span>
      </div>
      <div class="card-meta">${e.place}</div>
      <div class="card-body">${e.description}</div>
    `;

    container.appendChild(card);
  });
}

// Рендер новостей
function renderNews() {
  const container = document.getElementById("news-list");
  if (!container) return;

  container.innerHTML = "";
  news.forEach((n) => {
    const item = document.createElement("article");
    item.className = "news-item";

    item.innerHTML = `
      <div class="news-title">${n.title}</div>
      <div class="news-meta">${n.source} · ${n.date}</div>
      <div class="news-body">${n.text}</div>
    `;

    container.appendChild(item);
  });
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// Логика интро-анимации
function setupIntro() {
  const intro = document.getElementById("intro");
  const wrapper = intro?.querySelector(".intro-logo-wrapper");
  const header = document.getElementById("main-header");
  const main = document.getElementById("main-content");
  const footer = document.getElementById("footer");

  if (!intro || !wrapper || !header || !main || !footer) return;

  // маленькая пауза, чтобы пользователь успел увидеть герб
  setTimeout(() => {
    wrapper.classList.add("fly-up");
  }, 700);

  wrapper.addEventListener("animationend", () => {
    // убираем интро
    intro.classList.add("hidden");

    // показываем контент
    header.classList.remove("hidden");
    main.classList.remove("hidden");
    footer.classList.remove("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderStatuses();
  renderEvents();
  renderNews();
  setYear();
  setupIntro();
});

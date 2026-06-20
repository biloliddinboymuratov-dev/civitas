document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.contact-form');
  forms.forEach((form) => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Thank you for reaching out! We will get back to you soon.');
      form.reset();
    });
  });

  const loadLocalContent = () => {
    const hero = window.localStorage.getItem('civitasHero');
    if (hero) {
      try {
        const data = JSON.parse(hero);
        const heroHeading = document.querySelector('.hero-copy h1');
        const heroParagraph = document.querySelector('.hero-copy p');
        if (heroHeading && data.heading) heroHeading.textContent = data.heading;
        if (heroParagraph && data.subtitle) heroParagraph.textContent = data.subtitle;
      } catch (error) {
        console.error('Error loading hero content:', error);
      }
    }

    const newsItems = window.localStorage.getItem('civitasNewsItems');
    if (newsItems) {
      try {
        const items = JSON.parse(newsItems);
        const newsContainer = document.getElementById('news-items');
        if (newsContainer && items.length) {
          newsContainer.innerHTML = items
            .map(
              (item) =>
                `<article class="card"><p class="card-meta">News · ${item.date}</p><h3>${item.title}</h3><p>${item.summary}</p></article>`
            )
            .join('');
        }
      } catch (error) {
        console.error('Error loading news items:', error);
      }
    }

    const blogItems = window.localStorage.getItem('civitasBlogItems');
    if (blogItems) {
      try {
        const items = JSON.parse(blogItems);
        const blogContainer = document.getElementById('blog-items');
        if (blogContainer && items.length) {
          blogContainer.innerHTML = items
            .map(
              (item) =>
                `<article class="card"><p class="card-meta">${item.category}</p><h3>${item.title}</h3><p>${item.summary}</p></article>`
            )
            .join('');
        }
      } catch (error) {
        console.error('Error loading blog items:', error);
      }
    }
  };

  loadLocalContent();
});

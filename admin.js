document.addEventListener('DOMContentLoaded', () => {
  const homeForm = document.getElementById('admin-home-form');
  const newsForm = document.getElementById('admin-news-form');
  const blogForm = document.getElementById('admin-blog-form');
  const clearStorageButton = document.getElementById('clear-storage');
  const status = document.getElementById('admin-status');

  const saveStatus = (message) => {
    if (status) {
      status.textContent = message;
    }
  };

  const setLocalData = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalData = (key, fallback) => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  };

  if (homeForm) {
    const heading = document.getElementById('home-heading');
    const subtitle = document.getElementById('home-subtitle');
    const savedHero = getLocalData('civitasHero', { heading: '', subtitle: '' });

    heading.value = savedHero.heading || 'Civitas Global';
    subtitle.value = savedHero.subtitle || 'Trusted coverage, research collaboration, and policy insight.';

    homeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      setLocalData('civitasHero', {
        heading: heading.value,
        subtitle: subtitle.value,
      });
      saveStatus('Homepage hero text updated.');
    });
  }

  if (newsForm) {
    newsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('news-title').value.trim();
      const summary = document.getElementById('news-summary').value.trim();
      const date = document.getElementById('news-date').value.trim();
      if (!title || !summary || !date) {
        saveStatus('Please complete all news fields.');
        return;
      }
      const items = getLocalData('civitasNewsItems', []);
      items.unshift({ title, summary, date });
      setLocalData('civitasNewsItems', items.slice(0, 6));
      newsForm.reset();
      saveStatus('News item saved and visible on home page.');
    });
  }

  if (blogForm) {
    blogForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('blog-title').value.trim();
      const category = document.getElementById('blog-category').value.trim();
      const summary = document.getElementById('blog-summary').value.trim();
      if (!title || !category || !summary) {
        saveStatus('Please complete all blog fields.');
        return;
      }
      const items = getLocalData('civitasBlogItems', []);
      items.unshift({ title, category, summary });
      setLocalData('civitasBlogItems', items.slice(0, 6));
      blogForm.reset();
      saveStatus('Blog article saved and visible on home page.');
    });
  }

  if (clearStorageButton) {
    clearStorageButton.addEventListener('click', () => {
      window.localStorage.removeItem('civitasHero');
      window.localStorage.removeItem('civitasNewsItems');
      window.localStorage.removeItem('civitasBlogItems');
      saveStatus('Saved site data cleared. Refresh the homepage to reset content.');
    });
  }
});

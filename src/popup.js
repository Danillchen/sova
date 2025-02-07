document.addEventListener('DOMContentLoaded', function() {
  // Обработка переключения темы
  const themeToggleButton = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  // Загружаем сохранённое значение темы (по умолчанию тёмная)
  chrome.storage.sync.get({ darkTheme: true }, function(data) {
    if (data.darkTheme) {
      document.body.classList.add('dark-theme');
      // При тёмной теме показываем иконку для перехода на светлую (sun.svg)
      themeIcon.src = '../icons/sun.svg';
    } else {
      document.body.classList.remove('dark-theme');
      themeIcon.src = '../icons/moon.svg';
    }
  });
  
  themeToggleButton.addEventListener('click', function() {
    const isDark = document.body.classList.toggle('dark-theme');
    chrome.storage.sync.set({ darkTheme: isDark });
    themeIcon.src = isDark ? '../icons/sun.svg' : '../icons/moon.svg';
  });
  
  // Обработка переключателей настроек
  const autoSkipIntroCheckbox = document.getElementById('autoSkipIntro');
  const autoNextEpisodeCheckbox = document.getElementById('autoNextEpisode');
  const autoPlayVideoCheckbox = document.getElementById('autoPlayVideo');

  chrome.storage.sync.get({
    autoSkipIntro: false,
    autoNextEpisode: false,
    autoPlayVideo: false
  }, function(items) {
    autoSkipIntroCheckbox.checked = items.autoSkipIntro;
    autoNextEpisodeCheckbox.checked = items.autoNextEpisode;
    autoPlayVideoCheckbox.checked = items.autoPlayVideo;
  });

  autoSkipIntroCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({ autoSkipIntro: autoSkipIntroCheckbox.checked });
  });

  autoNextEpisodeCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({ autoNextEpisode: autoNextEpisodeCheckbox.checked });
  });

  autoPlayVideoCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({ autoPlayVideo: autoPlayVideoCheckbox.checked });
  });
});

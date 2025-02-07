chrome.storage.sync.get({
    autoSkipIntro: false,
    autoNextEpisode: false,
    autoPlayVideo: false
}, function(settings) {
    function isVisible(elem) {
        return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
    }

    const videoCheckInterval = setInterval(() => {
        const video = document.querySelector('video');
        if (video) {
            clearInterval(videoCheckInterval);
            console.log("Sova: Видео найдено");

            if (settings.autoPlayVideo && video.paused) {
                video.play().then(() => {
                    console.log("Sova: Видео запущено автоматически.");
                }).catch((e) => {
                    console.error("Sova: Не удалось запустить видео автоматически.", e);
                });
            }

            if (settings.autoSkipIntro) {
                const skipIntroInterval = setInterval(() => {
                    const skipButton = document.querySelector('.vjs-overlay-bottom-left.vjs-overlay-skip-intro');
                    if (skipButton && isVisible(skipButton)) {
                        console.log("Sova: Кнопка пропуска заставки найдена, кликаем.");
                        skipButton.click();
                        clearInterval(skipIntroInterval);
                    }
                }, 500);
            }

            if (settings.autoNextEpisode) {
                video.addEventListener('ended', () => {
                    const nextEpisodeInterval = setInterval(() => {
                        const nextButton = document.querySelector('.vjs-overlay-bottom-right.vjs-overlay-skip-intro');
                        if (nextButton && isVisible(nextButton)) {
                            console.log("Sova: Кнопка перехода к следующей серии найдена, кликаем.");
                            clearInterval(nextEpisodeInterval);
                            nextButton.click();
                        }
                    }, 500);
                });
            }
        }
    }, 500);
});

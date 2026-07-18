let scrollInterval = null;
let isWaitingToScroll = false;

function checkAndScroll() {
  chrome.storage.local.get(['scrollingActive', 'stopMinutes', 'startTime'], (data) => {
    if (!data.scrollingActive) return;

    if (data.stopMinutes > 0) {
      const elapsedMinutes = (Date.now() - data.startTime) / 1000 / 60;
      if (elapsedMinutes >= data.stopMinutes) {
        chrome.storage.local.set({ scrollingActive: false });
        clearInterval(scrollInterval);
        return;
      }
    }

    const video = document.querySelector('video');
    
    if (video && !isWaitingToScroll) {
      const isNearlyEnded = video.currentTime >= (video.duration - 0.3);

      if (isNearlyEnded) {
        isWaitingToScroll = true; // Lock the gate

        setTimeout(() => {
          const trueScrollBox = document.getElementById('shorts-container');
          const currentCard = video.closest('.reel-video-in-sequence-new, ytd-reel-video-renderer');

          if (trueScrollBox && currentCard) {
            const cardHeight = currentCard.offsetHeight;
            
            trueScrollBox.scrollBy({
              top: cardHeight,
              behavior: 'smooth'
            });
          } else {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }

          setTimeout(() => {
            isWaitingToScroll = false;
          }, 1000);

        }, 1000); 
      }
    }
  });
}

scrollInterval = setInterval(checkAndScroll, 250);
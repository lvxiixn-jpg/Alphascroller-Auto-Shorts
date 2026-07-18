const themeCheckbox = document.getElementById('themeToggleCheckbox');

chrome.storage.local.get(['lightModeActive'], (data) => {
  if (data.lightModeActive) {
    document.body.classList.add('light-mode');
    themeCheckbox.checked = false; 
  } else {
    document.body.classList.remove('light-mode');
    themeCheckbox.checked = true;  
  }
});

themeCheckbox.addEventListener('change', () => {
  const isDarkNow = themeCheckbox.checked;
  
  if (isDarkNow) {
    document.body.classList.remove('light-mode');
    chrome.storage.local.set({ lightModeActive: false }); 
  } else {
    document.body.classList.add('light-mode');
    chrome.storage.local.set({ lightModeActive: true });  
  }
});

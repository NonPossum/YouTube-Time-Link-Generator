// Funkcja konwertuj¹ca sekundy na format h:m:s
function convertSecondsToTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let sec = Math.floor(seconds % 60);
  return `${hours > 0 ? hours + 'h' : ''}${minutes > 0 ? minutes + 'm' : ''}${sec > 0 ? sec + 's' : ''}`;
}

// Funkcja kopiuj¹ca tekst do schowka bez alertu
function copyToClipboard(text) {
  let tempInput = document.createElement("input");
  tempInput.style = "position: absolute; left: -1000px; top: -1000px";
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

// Funkcja do dodania przycisku
function addButton() {
    let videoPlayer = document.querySelector('.ytp-left-controls'); // Zmienione na lewe kontrolki
    if (videoPlayer && !document.querySelector('#copyLinkButton')) {
        let button = document.createElement("button");
        button.id = "copyLinkButton";
        button.className = "ytp-button";
        button.title = "Kopiuj link z czasem";

        button.innerHTML = `
      <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
        <path d="M22,12 v8 h-8 v-8 h8 M22,10 h-8 c-1.1,0-2,0.9-2,2 v8 c0,1.1,0.9,2,2,2 h8 c1.1,0,2-0.9,2-2 v-8 C24,10.9,23.1,10,22,10 z M26,7 h-2 v2 h2 v12 h-2 v2 h2 c1.1,0,2-0.9,2-2 V9 C28,7.9,27.1,7,26,7 z" fill="#fff"></path>
      </svg>
    `;

        button.style = `
      opacity: 0.9;
      cursor: pointer;
      width: 48px;
      height: 48px;
      padding: 0;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: top;
      margin-top: -4px;
    `;

        button.addEventListener("click", () => {
            let video = document.querySelector("video");
            if (video) {
                let currentTime = video.currentTime;
                let formattedTime = convertSecondsToTime(currentTime);
                let url = new URL(window.location.href);
                url.searchParams.set("t", formattedTime);
                let formattedUrl = url.toString();
                copyToClipboard(formattedUrl);

                button.style.opacity = "1";
                setTimeout(() => button.style.opacity = "0.9", 200);
            }
        });

        // Dodajemy przycisk na koñcu lewych kontrolek
        videoPlayer.appendChild(button);
    }
}

// Obserwator zmian DOM, by upewniæ siê, ¿e przycisk zostanie dodany nawet po zmianie strony
let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      addButton();
    }
  });
});

// Obserwowanie zmian w strukturze DOM
observer.observe(document.body, { childList: true, subtree: true });

// Wywo³aj dodanie przycisku przy ³adowaniu strony
addButton();

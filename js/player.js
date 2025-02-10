const queryParams = new URLSearchParams(window.location.search);
const movieId = queryParams.get("movieid");
const isTV = queryParams.get("tv") === "true";

const videoContainer = document.getElementById("video-container");
const sourceSelector = document.getElementById("source-selector");

function initializePlayer(provider) {
  if (movieId) {
    const iframeElement = document.createElement("iframe");
    iframeElement.allow = "autoplay; fullscreen";
    iframeElement.allowFullscreen = true;

    let baseUrl = ""; 

    switch (provider) {
      case "vidsrc-net":
        baseUrl = "https://vidsrc.net/embed";
        break;
      case "vidsrc-in":
        baseUrl = "https://vidsrc.in/embed";
        break;
      case "vidsrc-pm":
        baseUrl = "https://vidsrc.pm/embed";
        break;
      case "vidbinge":
        baseUrl = "https://vidbinge.dev/embed";
        break;
      case "vidsrc-xyz":
        baseUrl = "https://vidsrc.xyz/embed";
        break;
      case "2embed":
        baseUrl = "https://www.2embed.skin/embed";
        break;
      default:
        baseUrl = "https://vidsrc.net/embed";
    }

    const contentType = isTV ? "tv" : "movie";
    iframeElement.src = `${baseUrl}/${contentType}/${movieId}${provider === "vidlinkpro" ? "?autoplay=false" : ""}`;

    videoContainer.innerHTML = "";
    videoContainer.appendChild(iframeElement);
  } else {
    videoContainer.innerHTML = "<h1>Error: Content not found</h1>";
  }
}

initializePlayer("vidlinkpro");

sourceSelector.addEventListener("change", (event) => {
  initializePlayer(event.target.value);
});

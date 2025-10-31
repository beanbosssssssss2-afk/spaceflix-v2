const queryParams = new URLSearchParams(window.location.search);
let movieId = queryParams.get("movieid");
let isTV = queryParams.get("tv");

if (!movieId) {
  try {
    const cached = JSON.parse(sessionStorage.getItem("selectedContent") || "null");
    if (cached && cached.id) {
      movieId = String(cached.id);
      isTV = String(!!cached.isTV);
    }
  } catch (e) {}
}

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
      case "vidlinkpro":
        baseUrl = "https://vidlink.pro";
        break;
      default:
        baseUrl = "https://vidsrc.net/embed";
    }

    const tv = String(isTV) === "true";
    const contentType = tv ? "tv" : "movie";

    let src = `${baseUrl}/${contentType}/${movieId}`;
    if (provider === "vidlinkpro") {
      src += "?autoplay=false";
    }

    iframeElement.src = src;

    videoContainer.innerHTML = "";
    videoContainer.appendChild(iframeElement);
  } else if (videoContainer) {
    videoContainer.innerHTML = "<h1>Error: Content not found</h1>";
  }
}

initializePlayer("vidlinkpro");

if (sourceSelector) {
  sourceSelector.addEventListener("change", (event) => {
    initializePlayer(event.target.value);
  });
}

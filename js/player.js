const queryParams = new URLSearchParams(window.location.search);
  const movieId = queryParams.get("movieid");

  const videoContainer = document.getElementById("video-container");
  const sourceSelector = document.getElementById("source-selector");

  function initializePlayer(provider) {
    if (movieId) {
      const iframeElement = document.createElement("iframe");
      iframeElement.allow = "autoplay; fullscreen";
      iframeElement.allowFullscreen = true;

      switch (provider) {
        case "Vidlink PRO":
          iframeElement.src = `https://www.vidlink.pro/movie/${movieId}?autoplay=false`;
          break;
        case "Movie Embed":
          iframeElement.src = `https://embed.su/embed/movie/${movieId}`;
          break;
        case "MoviesAPI":
          iframeElement.src = `https://moviesapi.club/movie/${movieId}`;
          break;
        case "VidBinge":
          iframeElement.src = `https://vidbinge.dev/embed/movie/${movieId}`;
          break;
        case "VidSRC.net":
          iframeElement.src = `https://vidsrc.net/embed/${movieId}`;
          break;
        case "2embed":
          iframeElement.src = `https://www.2embed.skin/embed/${movieId}`;
          break;
        default:
          iframeElement.src = "";
      }

      videoContainer.innerHTML = "";
      videoContainer.appendChild(iframeElement);
    } else {
      videoContainer.innerHTML = "<h1>Error: Movie not found</h1>";
    }
  }

  initializePlayer("streaminghub");

  sourceSelector.addEventListener("change", (event) => {
    initializePlayer(event.target.value);
  });
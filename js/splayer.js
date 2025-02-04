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
        case "vidlinkpro":
          iframeElement.src = `https://vidlink.pro/tv/${movieId}/1/1`;
          break;
        case "embed-su":
          iframeElement.src = `https://embed.su/embed/tv/${movieId}/1/1`;
          break;
        case "moviesapiclub":
          iframeElement.src = `https://moviesapi.club/movie/${movieId}-1-1`;
          break;
        case "vidbinge":
          iframeElement.src = `https://vidbinge.dev/embed/tv/${movieId}/1/1`;
          break;
        case "vidsrcnet":
          iframeElement.src = `https://vidsrc.net/embed/${movieId}&season=1&episode=1`;
          break;
        case "2embed":
          iframeElement.src = `https://www.2embed.skin/embed/${movieId}&s=1&e=1`;
          break;
        default:
          iframeElement.src = `https://www.vidlink.pro/movie/${movieId}?autoplay=false`;
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
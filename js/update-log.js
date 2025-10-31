(function(){
  const LOG_URL = 'updatelog.html';
  const STORAGE_KEY = 'updateLogDismissedVersion';

  async function loadUpdateLogDoc(){
    try{
      const res = await fetch(LOG_URL, { cache: 'no-cache' });
      if(!res.ok) return null;
      const html = await res.text();
      const parser = new DOMParser();
      return parser.parseFromString(html, 'text/html');
    }catch(e){
      return null;
    }
  }

  function getStoredVersion(){
    try{ return localStorage.getItem(STORAGE_KEY) || ''; }catch(e){ return ''; }
  }
  function setStoredVersion(v){
    try{ localStorage.setItem(STORAGE_KEY, v); }catch(e){}
  }

  function buildModal(version, contentNode){
    const overlay = document.createElement('div');
    overlay.className = 'update-log-overlay';

    const modal = document.createElement('div');
    modal.className = 'update-log-container';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');

    const header = document.createElement('header');
    header.className = 'update-log-header';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'update-log-title-wrapper';

    const h1 = document.createElement('h1');
    h1.className = 'update-log-title';
    h1.textContent = "What’s new";

    const pill = document.createElement('span');
    pill.className = 'update-log-version-pill';
    pill.textContent = `v ${version}`;

    titleWrap.appendChild(h1);
    titleWrap.appendChild(pill);

    const actions = document.createElement('div');
    actions.className = 'update-log-actions';

    header.appendChild(titleWrap);
    header.appendChild(actions);

    const content = document.createElement('section');
    content.className = 'update-log-content';
    if(contentNode){
      // Import only the inner content
      content.append(...Array.from(contentNode.childNodes).map(n=>n.cloneNode(true)));
    }

    const footer = document.createElement('footer');
    footer.className = 'update-log-footer';

    const link = document.createElement('a');
    link.href = LOG_URL;
    link.target = '_self';
    link.className = 'update-log-btn update-log-btn-secondary';
    link.textContent = 'Read details';

    const dontBtn = document.createElement('button');
    dontBtn.type = 'button';
    dontBtn.className = 'update-log-btn update-log-btn-secondary';
    dontBtn.textContent = "Don’t show again";

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'update-log-btn';
    closeBtn.textContent = 'Close';

    footer.appendChild(link);
    footer.appendChild(dontBtn);
    footer.appendChild(closeBtn);

    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);

    function close(){
      overlay.classList.add('hidden');
      modal.classList.add('hidden');
      setTimeout(()=>{
        try{ document.body.removeChild(overlay); }catch(e){}
        try{ document.body.removeChild(modal); }catch(e){}
      }, 200);
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e){ if(e.key==='Escape') close(); }

    overlay.addEventListener('click', close);
    closeBtn.addEventListener('click', close);
    dontBtn.addEventListener('click', ()=>{ setStoredVersion(version); close(); });
    document.addEventListener('keydown', onKey);

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  }

  async function maybeShowUpdateLog(){
    const doc = await loadUpdateLogDoc();
    if(!doc) return;

    const meta = doc.querySelector('meta[name="update-log-version"]');
    const version = (meta && meta.getAttribute('content')) || '';
    if(!version) return;

    const stored = getStoredVersion();
    if(stored === version) return; // user already dismissed this version

    const content = doc.querySelector('#update-log-content');
    buildModal(version, content);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', maybeShowUpdateLog);
  }else{
    maybeShowUpdateLog();
  }
})();

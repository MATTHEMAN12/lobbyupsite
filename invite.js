(function () {
  function getCodeFromPath(pathname) {
    // Supports /invite/ABC123
    const parts = pathname.split('/').filter(Boolean);
    const inviteIndex = parts.indexOf('invite');
    if (inviteIndex >= 0 && parts[inviteIndex + 1]) {
      return parts[inviteIndex + 1].trim();
    }
    return '';
  }

  function getInviteCode() {
    const url = new URL(window.location.href);
    const fromQuery = (url.searchParams.get('code') || '').trim();
    const fromPath = getCodeFromPath(url.pathname);
    const code = (fromQuery || fromPath || '').toUpperCase();
    return code;
  }

  function buildAppLink(code) {
    if (!code) return 'lobbyup://invite';
    return 'lobbyup://invite?code=' + encodeURIComponent(code);
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function show(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  }

  function attemptOpen(appLink) {
    // Standard deep-link attempt strategy for static pages.
    var start = Date.now();
    window.location.href = appLink;

    setTimeout(function () {
      var elapsed = Date.now() - start;
      // If app did not take focus quickly, show fallback hint.
      if (elapsed < 1600) {
        setText('statusText', 'Could not open automatically. Tap "Open in App" or install LobbyUp.');
      }
    }, 1200);
  }

  var code = getInviteCode();
  var appLink = buildAppLink(code);

  var openBtn = document.getElementById('openAppBtn');
  if (openBtn) {
    openBtn.setAttribute('href', appLink);
  }

  if (code) {
    setText('inviteCode', code);
    show('codeWrap');
  } else {
    setText('statusText', 'No invite code found in this link. Ask your friend to resend the invite.');
  }

  // Auto-open attempt on load.
  attemptOpen(appLink);
})();

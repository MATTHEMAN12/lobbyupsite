# LobbyUp Invite Link Site (`lobbyup.tech`)

This is a standalone static site for deep links + invite redirects (separate from your marketing site).

## What this site does

- Handles invite URLs like:
  - `https://lobbyup.tech/invite?code=ABC123`
  - `https://lobbyup.tech/invite/ABC123`
- Tries to open the app with:
  - `lobbyup://invite?code=ABC123`
- If app is not installed, shows App Store / Play Store fallback buttons.
- Hosts mobile association files for universal links:
  - `/.well-known/apple-app-site-association`
  - `/.well-known/assetlinks.json`

## Folder structure

- `index.html` - small landing page
- `invite/index.html` - invite/deep-link redirect page
- `styles.css` - shared styling
- `invite.js` - invite code parsing + app open logic
- `.well-known/apple-app-site-association` - iOS universal link file
- `.well-known/assetlinks.json` - Android app links file
- `404.html` - GitHub Pages route fallback
- `CNAME` - custom domain

## GitHub Pages setup

1. Push this folder as its own repo (recommended), or serve this folder as Pages root.
2. In repo settings -> Pages:
   - Source: `Deploy from branch`
   - Branch: `main` / root
3. Ensure `CNAME` is `lobbyup.tech`.
4. DNS:
   - Apex/root `lobbyup.tech` -> GitHub Pages A records
   - Optional `www` CNAME -> `<your-username>.github.io`

## Required edits before go-live

### 1) iOS AASA file

Edit `.well-known/apple-app-site-association`:

- Replace `TEAMID.com.lobbyup.app` with your real:
  - Apple Team ID + iOS bundle identifier

### 2) Android asset links file

Edit `.well-known/assetlinks.json`:

- Replace:
  - package name (`com.lobbyup.app`)
  - signing cert SHA256 fingerprints

### 3) Store links

Edit `invite/index.html` and replace placeholder store URLs:

- `https://apps.apple.com/app/id0000000000`
- `https://play.google.com/store/apps/details?id=com.lobbyup.app`

## App config reminder

In your Expo app config, make sure:

- `scheme: "lobbyup"`
- iOS `associatedDomains` includes: `applinks:lobbyup.tech`
- Android `intentFilters` includes host `lobbyup.tech` and path `/invite/*`

## Supabase reminder

Your invite edge function should generate links to:

- `https://lobbyup.tech/invite/<CODE>`

And app should continue saving/consuming pending invite code as already implemented.

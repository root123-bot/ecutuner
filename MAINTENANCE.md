# Maintenance Mode — ECUTUNER Website

How to take the site down for maintenance and bring it back.

---

## TL;DR

Open **`carserv/js/maintenance.js`** and edit **line 17**:

| Goal | Set this |
|---|---|
| Maintenance screen ON (site hidden) | `var MAINTENANCE_MODE = true;` |
| Site back to normal | `var MAINTENANCE_MODE = false;` |

Save, upload that one file to the server, done. Nothing else to change.

---

## How it works

Every page has this as the **first thing inside `<head>`** (right after the
charset meta):

```html
<!-- MAINTENANCE MODE: must stay first in <head>. Toggle in js/maintenance.js -->
<script src="js/maintenance.js"></script>
```

When the flag is `true`, that script immediately sends the visitor to
`maintenance.html` — *before* the browser downloads any of the site's
stylesheets, scripts or images. It uses `location.replace()`, so no history
entry is created and the Back button cannot bounce anyone into a loop.

When the flag is `false`, the script returns on its first line and the page
loads completely normally. The real HTML is never deleted or commented out — it
is always sitting there intact.

**Why it must stay first in `<head>`:** placed lower, the browser would already
have started downloading the whole site (≈39 requests / ~7 MB, including the
665 KB `back.jpg`) before the switch ran. Measured at the top of `<head>` the
maintenance page costs about **2 requests and ~110 KB**.

Pages wired up (all 9):

```
index.html      index-2.html   about.html
service.html    booking.html   team.html
testimonial.html contact.html  404.html
```

`maintenance.html` deliberately does **not** include the script, and the script
also refuses to redirect a page already named `maintenance.html` — two
independent guards against a redirect loop.

---

## Step by step

### Turn maintenance ON

1. Open `carserv/js/maintenance.js`.
2. Line 17 → `var MAINTENANCE_MODE = true;`
3. Save and upload `js/maintenance.js` (and `maintenance.html`, if it isn't on
   the server yet).
4. Hard-refresh the site (`Cmd/Ctrl + Shift + R`) to confirm.

### Turn maintenance OFF

1. Same file, line 17 → `var MAINTENANCE_MODE = false;`
2. Save, upload, hard-refresh.

> **If the old behaviour seems stuck**, it is browser/CDN caching of the JS
> file, not a code problem. Hard-refresh first. To force it for everyone, bump
> the version query in each page's script tag, e.g.
> `<script src="js/maintenance.js?v=2"></script>`.

---

## Changing the wording, phone, email, socials

The maintenance screen is a plain, standalone HTML file:
**`carserv/maintenance.html`**. Open it and edit the text directly — no build
step, no framework, no dependencies except the logo image.

What you will find in the markup:

| Thing to change | Where |
|---|---|
| Headline | `<h1 class="mtn-title">` — the word inside `<span>` gets the red gradient |
| Paragraph | `<p class="mtn-text">` |
| "Expected back" line | `<p class="mtn-eta">` — e.g. change to `Back online: Monday 9 AM` |
| Phone | the `tel:` link **and** the visible number in the *Call us* card |
| WhatsApp | the `https://wa.me/255756144060` link |
| Email | the `mailto:` link and the visible address |
| Address / hours / socials | `<p class="mtn-meta">` and `<div class="mtn-social">` |

Colours and animations are in the `<style>` block at the top of the same file.
Every class is prefixed `mtn-` so nothing can collide with the site's own CSS.

> If you change the phone number, remember it appears in **two** places: the
> `tel:` link and the `wa.me/` link (WhatsApp needs digits only, no `+`).

---

## Adding maintenance mode to a NEW page

If you create another `.html` page in `carserv/`, paste this immediately after
`<meta charset="utf-8">` in its `<head>` and the page is covered:

```html
<!-- MAINTENANCE MODE: must stay first in <head>. Toggle in js/maintenance.js -->
<script src="js/maintenance.js"></script>
```

Putting it lower still works, it just wastes bandwidth.

---

## Good to know

- **JavaScript disabled:** a visitor with JS turned off would still see the real
  site. It is a tiny fraction of traffic. A `<noscript>` redirect was
  deliberately *not* added, because it would keep redirecting even after
  maintenance is switched off — it would break the single-switch design. For an
  airtight block, use the server-level option below.
- **PHP endpoints:** `contact.php` and `send_mail.php` run on the server and are
  *not* affected by this switch. They are unreachable from the UI while
  maintenance is on, but still accept direct POSTs.
- **SEO:** the redirect returns HTTP 200, and `maintenance.html` is marked
  `noindex, nofollow`. Fine for short maintenance windows. For anything longer
  than a day or two, prefer the server-level option, which returns a proper
  `503` and tells search engines to come back later.

### Optional: server-level (Apache) block

Bulletproof version — also catches JS-disabled visitors and returns a correct
503. `maintenance.html` already exists, so just add this to `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REMOTE_ADDR} !^123\.123\.123\.123$      # your own IP, so you can still browse
RewriteCond %{REQUEST_URI} !^/maintenance\.html$
RewriteCond %{REQUEST_URI} !\.(css|js|png|jpg|jpeg|gif|svg|woff2?)$
RewriteRule ^(.*)$ /maintenance.html [R=503,L]
ErrorDocument 503 /maintenance.html
Header always set Retry-After "3600"
```

Delete or comment out that block to bring the site back.

---

## Files involved

| File | Role |
|---|---|
| `carserv/js/maintenance.js` | The on/off switch (that is all it does) |
| `carserv/maintenance.html` | The maintenance screen itself — edit text here |
| `carserv/*.html` | One `<script>` line each, first inside `<head>` |
| `carserv/img/ECUTUNER LOGO.png` | Logo shown on the maintenance screen |

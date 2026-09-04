# Maintenance Mode — ECUTUNER Website

How to take the site down for maintenance and bring it back.

---

## TL;DR

Open **`carserv/js/maintenance.js`** and edit **line 12**:

| Goal | Set this |
|---|---|
| Maintenance screen ON (site hidden) | `var MAINTENANCE_MODE = true;` |
| Site back to normal | `var MAINTENANCE_MODE = false;` |

Save, upload that one file to the server, done. Nothing else to change.

---

## How it works

Every page has this single line just before `</head>`:

```html
<!-- MAINTENANCE MODE: toggle in js/maintenance.js -->
<script src="js/maintenance.js"></script>
```

When the flag is `true`, the script hides the original page immediately (so
visitors never see a flash of the real site), then replaces the page body with
the maintenance screen and changes the tab title to
`Under Maintenance | ECUTUNER`.

When the flag is `false`, the script exits on its first line and the page loads
completely normally. The real HTML is never deleted or commented out — it is
always sitting there intact, just covered up.

Pages wired up (all 9):

```
index.html      index-2.html   about.html
service.html    booking.html   team.html
testimonial.html contact.html  404.html
```

---

## Step by step

### Turn maintenance ON

1. Open `carserv/js/maintenance.js`.
2. Line 12 → `var MAINTENANCE_MODE = true;`
3. Save and upload `js/maintenance.js` to the server.
4. Hard-refresh the site (`Cmd/Ctrl + Shift + R`) to confirm.

### Turn maintenance OFF

1. Same file, line 12 → `var MAINTENANCE_MODE = false;`
2. Save, upload, hard-refresh.

> **If the old version seems stuck**, it is browser/CDN caching of the JS file,
> not a code problem. Hard-refresh first. To force it for everyone, bump the
> version query on the script tag in each page, e.g.
> `<script src="js/maintenance.js?v=2"></script>`.

---

## Changing the wording, phone, email, socials

Everything editable lives in the `CONFIG` block near the top of
`carserv/js/maintenance.js` (lines 14–25). No CSS knowledge needed:

```js
var CONFIG = {
    logo:     "img/ECUTUNER LOGO.png",
    title:    "We&rsquo;ll Be Back Soon",   // keep the word "Soon" to keep the red gradient
    message:  "Our website is currently getting a tune-up. ...",
    eta:      "Expected back: very soon",   // e.g. "Back online: Monday 9 AM"
    phone:    "+255756144060",              // also builds the WhatsApp link automatically
    email:    "mwamalekela@gmail.com",
    address:  "Kariakoo, Dar es Salaam, TZ",
    hours:    "Mon - Fri : 09.00 AM - 09.00 PM",
    facebook: "https://www.facebook.com/...",
    instagram:"https://www.instagram.com/ecutuner/"
};
```

Notes:
- `title` — the word **Soon** is what gets the red gradient. Rename the headline
  freely, but if you drop that word the gradient just won't apply (harmless).
- `phone` — used for the *Call us* card **and** the WhatsApp link; non-digits are
  stripped automatically, so `+255756144060` becomes `wa.me/255756144060`.
- Use HTML entities for curly punctuation (`&rsquo;` for `'`).

The colours, animations and layout are in the `CSS` string below `CONFIG`, all
class names prefixed `mtn-` so they can never collide with the site's own CSS.

---

## Adding maintenance mode to a NEW page

If you create another `.html` page in `carserv/`, paste this before its
`</head>` and it is covered too:

```html
<!-- MAINTENANCE MODE: toggle in js/maintenance.js -->
<script src="js/maintenance.js"></script>
```

---

## Good to know

- **Failsafe:** if the script errors for any reason, it removes its own
  hide-style in a `finally` block — so a visitor can never be left staring at a
  blank white page. Worst case they see the normal site.
- **JavaScript disabled:** a visitor with JS turned off would still see the real
  site. This is a tiny fraction of traffic. For an airtight block, use the
  server-level option below.
- **PHP endpoints:** `contact.php` and `send_mail.php` run on the server and are
  *not* affected by this switch. They are unreachable from the UI while
  maintenance is on, but still accept direct POSTs.
- **SEO:** this is a client-side overlay, so search engines still get HTTP 200
  and may see the original HTML. Fine for short maintenance windows. For
  anything longer than a day or two, prefer the server-level option, which can
  return a proper `503`.

### Optional: server-level (Apache) block

Bulletproof version — catches JS-disabled visitors and returns a correct 503.
Create a `maintenance.html` page, then put this in `.htaccess`:

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
| `carserv/js/maintenance.js` | The switch + the whole maintenance screen |
| `carserv/*.html` | One `<script>` line each, before `</head>` |
| `carserv/img/ECUTUNER LOGO.png` | Logo shown on the maintenance screen |

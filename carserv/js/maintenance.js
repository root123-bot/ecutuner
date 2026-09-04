/* =========================================================
   ECUTUNER - Site-wide Maintenance Mode
   ---------------------------------------------------------
   HOW TO USE
     Turn maintenance ON  ->  MAINTENANCE_MODE = true
     Turn maintenance OFF ->  MAINTENANCE_MODE = false
   That's it. No other file needs to change.
   ========================================================= */
(function () {
    "use strict";

    var MAINTENANCE_MODE = true;                     // <-- master switch

    var CONFIG = {
        logo:     "img/ECUTUNER LOGO.png",
        title:    "We&rsquo;ll Be Back Soon",
        message:  "Our website is currently getting a tune-up. We&rsquo;re upgrading our systems to serve you better and will be back online shortly.",
        eta:      "Expected back: very soon",
        phone:    "+255756144060",
        email:    "mwamalekela@gmail.com",
        address:  "Kariakoo, Dar es Salaam, TZ",
        hours:    "Mon - Fri : 09.00 AM - 09.00 PM",
        facebook: "https://www.facebook.com/profile.php?id=100090816591204&mibextid=2JQ9oc",
        instagram:"https://www.instagram.com/ecutuner/"
    };

    if (!MAINTENANCE_MODE) return;

    /* --- 1. Hide the original page instantly (no flash of old content) --- */
    var hide = document.createElement("style");
    hide.id = "mtn-hide";
    hide.textContent = "html{visibility:hidden!important}";
    (document.head || document.documentElement).appendChild(hide);

    /* --- 2. Styles for the maintenance screen --- */
    var CSS = ''
    + '#mtn-root{--mtn-primary:#D81324;--mtn-secondary:#0B2154;--mtn-dark:#050d20;--mtn-light:#F2F2F2;'
    + 'position:fixed;inset:0;z-index:2147483647;overflow-y:auto;'
    + 'background:radial-gradient(1200px 700px at 15% -10%,#123071 0%,transparent 60%),'
    + 'radial-gradient(1000px 600px at 100% 110%,#5c0a12 0%,transparent 60%),'
    + 'linear-gradient(160deg,#0B2154 0%,#050d20 100%);'
    + 'color:#fff;font-family:Ubuntu,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;'
    + '-webkit-font-smoothing:antialiased;display:flex;align-items:center;justify-content:center;padding:40px 20px}'

    /* moving grid + glow */
    + '#mtn-root::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.20;'
    + 'background-image:linear-gradient(rgba(255,255,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.09) 1px,transparent 1px);'
    + 'background-size:52px 52px;animation:mtn-drift 22s linear infinite;'
    + '-webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 25%,transparent 78%);'
    + 'mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 25%,transparent 78%)}'
    + '@keyframes mtn-drift{to{background-position:52px 52px}}'

    + '.mtn-wrap{position:relative;width:100%;max-width:760px;min-width:0;text-align:center;padding:8px 0 4px}'

    /* logo */
    + '.mtn-logo{width:190px;max-width:62%;height:auto;margin:0 auto 28px;display:block;'
    + 'filter:drop-shadow(0 8px 26px rgba(0,0,0,.55));animation:mtn-in .7s .05s both}'

    /* gear cluster */
    + '.mtn-gears{position:relative;width:150px;height:110px;margin:0 auto 26px;animation:mtn-in .7s .15s both}'
    + '.mtn-gears svg{position:absolute;fill:none;stroke-linecap:round;stroke-linejoin:round}'
    + '.mtn-g1{width:96px;height:96px;left:0;top:0;stroke:var(--mtn-primary);stroke-width:1.5;'
    + 'animation:mtn-spin 7s linear infinite;filter:drop-shadow(0 0 14px rgba(216,19,36,.55))}'
    + '.mtn-g2{width:62px;height:62px;right:0;bottom:0;stroke:#7fa4ff;stroke-width:1.7;'
    + 'animation:mtn-spin 5s linear infinite reverse;filter:drop-shadow(0 0 12px rgba(127,164,255,.45))}'
    + '@keyframes mtn-spin{to{transform:rotate(360deg)}}'

    /* badge */
    + '.mtn-badge{display:inline-flex;align-items:center;gap:9px;padding:8px 20px;margin-bottom:22px;'
    + 'border:1px solid rgba(216,19,36,.5);border-radius:50px;background:rgba(216,19,36,.12);'
    + 'font-size:12px;font-weight:500;letter-spacing:2.4px;text-transform:uppercase;color:#ffb3ba;'
    + 'animation:mtn-in .7s .2s both}'
    + '.mtn-dot{width:9px;height:9px;border-radius:50%;background:var(--mtn-primary);'
    + 'box-shadow:0 0 0 0 rgba(216,19,36,.75);animation:mtn-pulse 1.8s infinite}'
    + '@keyframes mtn-pulse{70%{box-shadow:0 0 0 12px rgba(216,19,36,0)}100%{box-shadow:0 0 0 0 rgba(216,19,36,0)}}'

    /* type */
    + '#mtn-root *{box-sizing:border-box}'
    + '.mtn-title{color:#fff;font-family:Barlow,Ubuntu,Arial,sans-serif;font-weight:700;line-height:1.1;margin:0 0 18px;'
    + 'font-size:clamp(34px,6.4vw,60px);letter-spacing:-.5px;animation:mtn-in .7s .28s both}'
    + '.mtn-title span{background:linear-gradient(90deg,#ff4d5e,#D81324);-webkit-background-clip:text;'
    + 'background-clip:text;-webkit-text-fill-color:transparent;color:var(--mtn-primary)}'
    + '.mtn-text{margin-top:0;font-size:clamp(15px,2.1vw,18px);line-height:1.75;color:rgba(255,255,255,.72);'
    + 'max-width:560px;margin:0 auto 30px;animation:mtn-in .7s .36s both}'

    /* progress */
    + '.mtn-bar{position:relative;height:7px;width:min(420px,88%);margin:0 auto 14px;border-radius:50px;'
    + 'background:rgba(255,255,255,.11);overflow:hidden;animation:mtn-in .7s .44s both}'
    + '.mtn-bar i{position:absolute;top:0;bottom:0;width:42%;border-radius:50px;'
    + 'background:linear-gradient(90deg,transparent,#ff4d5e,var(--mtn-primary),transparent);'
    + 'animation:mtn-slide 2.1s cubic-bezier(.65,0,.35,1) infinite}'
    + '@keyframes mtn-slide{0%{left:-45%}100%{left:100%}}'
    + '.mtn-eta{font-size:13px;letter-spacing:1.6px;text-transform:uppercase;color:rgba(255,255,255,.45);'
    + 'margin:0 0 34px;animation:mtn-in .7s .5s both}'

    /* contact cards */
    + '.mtn-cards{display:flex;flex-wrap:wrap;max-width:100%;gap:14px;justify-content:center;margin-bottom:30px;'
    + 'animation:mtn-in .7s .58s both}'
    + '.mtn-card{display:flex;align-items:center;gap:13px;text-decoration:none;color:#fff;text-align:left;'
    + 'padding:14px 22px;border-radius:12px;background:rgba(255,255,255,.06);'
    + 'border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);'
    + 'transition:transform .25s ease,background .25s ease,border-color .25s ease}'
    + '.mtn-card:hover,.mtn-card:focus{transform:translateY(-4px);background:rgba(216,19,36,.16);'
    + 'border-color:rgba(216,19,36,.55);color:#fff}'
    + '.mtn-card .mtn-ico{flex:0 0 38px;height:38px;border-radius:9px;display:flex;align-items:center;'
    + 'justify-content:center;background:var(--mtn-primary);box-shadow:0 6px 16px rgba(216,19,36,.4)}'
    + '.mtn-card .mtn-ico svg{width:18px;height:18px;fill:#fff}'
    + '.mtn-card b{display:block;font-size:10px;letter-spacing:1.8px;text-transform:uppercase;'
    + 'font-weight:500;color:rgba(255,255,255,.5);margin-bottom:3px}'
    + '.mtn-card span{font-size:15px;font-weight:500;white-space:nowrap}'

    /* footer */
    + '.mtn-foot{border-top:1px solid rgba(255,255,255,.1);padding-top:22px;animation:mtn-in .7s .66s both}'
    + '.mtn-social{display:flex;gap:11px;justify-content:center;margin-bottom:16px}'
    + '.mtn-social a{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;'
    + 'justify-content:center;border:1px solid rgba(255,255,255,.2);color:#fff;'
    + 'transition:background .25s ease,border-color .25s ease,transform .25s ease}'
    + '.mtn-social a svg{width:17px;height:17px;fill:currentColor}'
    + '.mtn-social a:hover{background:var(--mtn-primary);border-color:var(--mtn-primary);transform:translateY(-3px)}'
    + '.mtn-meta{font-size:13px;color:rgba(255,255,255,.42);line-height:1.9;margin:0}'
    + '.mtn-meta em{font-style:normal;color:rgba(255,255,255,.28);padding:0 8px}'

    + '@keyframes mtn-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}'
    + '@media(max-width:560px){.mtn-card{width:100%;justify-content:flex-start;padding:13px 16px}'
    + '.mtn-card span{white-space:normal;overflow-wrap:anywhere}'
    + '.mtn-cards{gap:11px}'
    + '.mtn-meta em{display:none}.mtn-meta span{display:block}}'
    + '@media(prefers-reduced-motion:reduce){#mtn-root *,#mtn-root::before{animation:none!important}}';

    /* --- 3. Markup --- */
    var GEAR = function (cls) {
        return '<svg class="' + cls + '" viewBox="0 0 24 24" aria-hidden="true">'
             + '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>'
             + '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
             + '</svg>';
    };
    var I_PHONE = '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z"/></svg>';
    var I_MAIL  = '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2-8 4.8-8-4.8V6l8 4.8L20 6v2.2z"/></svg>';
    var I_WHATS = '<svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.1-.7.2-.7 1-.9 1.2-.4.2-.7 0a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-.9-2.2c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4a3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.8 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 1 1 12 20.3z"/></svg>';
    var I_FB    = '<svg viewBox="0 0 24 24"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg>';
    var I_IG    = '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.3-.2-4.8-1.7-4.9-4.9-.1-1.3-.1-1.7-.1-4.9s0-3.5.1-4.8C2.3 4 3.8 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 5.1a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6.1 3 3 0 0 1 0 6.1zm4.9-8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/></svg>';

    var wa = CONFIG.phone.replace(/[^0-9]/g, "");

    var HTML = ''
    + '<div class="mtn-wrap">'
    +   '<img class="mtn-logo" src="' + CONFIG.logo + '" alt="ECUTUNER" onerror="this.style.display=\'none\'">'
    +   '<div class="mtn-gears">' + GEAR("mtn-g1") + GEAR("mtn-g2") + '</div>'
    +   '<div class="mtn-badge"><span class="mtn-dot"></span> Under Maintenance</div>'
    +   '<h1 class="mtn-title">' + CONFIG.title.replace("Soon", "<span>Soon</span>") + '</h1>'
    +   '<p class="mtn-text">' + CONFIG.message + '</p>'
    +   '<div class="mtn-bar"><i></i></div>'
    +   '<p class="mtn-eta">' + CONFIG.eta + '</p>'
    +   '<div class="mtn-cards">'
    +     '<a class="mtn-card" href="tel:' + CONFIG.phone + '"><span class="mtn-ico">' + I_PHONE + '</span>'
    +       '<span><b>Call us</b><span>' + CONFIG.phone + '</span></span></a>'
    +     '<a class="mtn-card" href="https://wa.me/' + wa + '" target="_blank" rel="noopener"><span class="mtn-ico">' + I_WHATS + '</span>'
    +       '<span><b>WhatsApp</b><span>Chat with us</span></span></a>'
    +     '<a class="mtn-card" href="mailto:' + CONFIG.email + '"><span class="mtn-ico">' + I_MAIL + '</span>'
    +       '<span><b>Email</b><span>' + CONFIG.email + '</span></span></a>'
    +   '</div>'
    +   '<div class="mtn-foot">'
    +     '<div class="mtn-social">'
    +       '<a href="' + CONFIG.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + I_FB + '</a>'
    +       '<a href="' + CONFIG.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + I_IG + '</a>'
    +     '</div>'
    +     '<p class="mtn-meta"><span>' + CONFIG.address + '</span><em>|</em><span>' + CONFIG.hours + '</span></p>'
    +     '<p class="mtn-meta">&copy; ' + new Date().getFullYear() + ' ECUTUNER. All rights reserved.</p>'
    +   '</div>'
    + '</div>';

    /* --- 4. Swap the page --- */
    function render() {
        try {
            document.title = "Under Maintenance | ECUTUNER";

            var style = document.createElement("style");
            style.textContent = CSS;
            document.head.appendChild(style);

            var root = document.createElement("div");
            root.id = "mtn-root";
            root.innerHTML = HTML;

            document.body.innerHTML = "";
            document.body.style.cssText = "margin:0;padding:0;overflow:hidden;background:#050d20";
            document.body.appendChild(root);
        } catch (e) {
            /* never leave the page invisible */
        } finally {
            var h = document.getElementById("mtn-hide");
            if (h && h.parentNode) h.parentNode.removeChild(h);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", render);
    } else {
        render();
    }
})();

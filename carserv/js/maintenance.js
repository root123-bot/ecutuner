/* =========================================================
   ECUTUNER - Site-wide Maintenance Switch
   ---------------------------------------------------------
   Maintenance ON   ->  MAINTENANCE_MODE = true
   Maintenance OFF  ->  MAINTENANCE_MODE = false

   When ON, every page sends the visitor straight to
   maintenance.html before any of the site's CSS, JavaScript
   or images are downloaded.

   The maintenance screen itself (wording, phone, email,
   socials, colours) lives in  maintenance.html.
   ========================================================= */
(function () {
    "use strict";

    var MAINTENANCE_MODE = true;          // <-- master switch
    var MAINTENANCE_PAGE = "maintenance.html";

    if (!MAINTENANCE_MODE) return;

    /* Never redirect the maintenance page onto itself. */
    if (location.pathname.split("/").pop() === MAINTENANCE_PAGE) return;

    /* replace() instead of href: leaves no history entry, so the browser's
       Back button cannot bounce the visitor into a redirect loop. */
    location.replace(MAINTENANCE_PAGE);
})();

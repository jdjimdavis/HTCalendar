/**************************************************************************
 * Holy Trinity Meeting Signage - Version 2
 *
 * File: Main.gs
 *
 * Application entry point, calendar retrieval, caching,
 * and high-level processing flow.
 **************************************************************************/


/**
 * Web app entry point.
 *
 * Xibo loads this URL on the configured refresh interval.
 */
function doGet(e) {
  try {
    const html = PropertiesService.getScriptProperties().getProperty("TODAY_HTML");

    if (!html) {
      return HtmlService.createHtmlOutput(renderErrorPage("No calendar data yet — waiting for first refresh."))
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }

    return HtmlService.createHtmlOutput(html)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  catch (err) {
    return HtmlService.createHtmlOutput(renderErrorPage(err.message))
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}


/**************************************************************************
 * Retrieve ICS feed with caching.
 **************************************************************************/

function fetchCalendarWithCache(url) {


  const cache =
    CacheService.getScriptCache();


  const cacheKey =
    "HOLY_TRINITY_ICS";


  const cached =
    cache.get(cacheKey);


  if (cached) {

    return cached;

  }


  const response =
    UrlFetchApp.fetch(
      url,
      {
        muteHttpExceptions:true
      }
    );


  const status =
    response.getResponseCode();


  if (status !== 200) {

    throw new Error(
      "Calendar feed returned HTTP " + status
    );

  }


  const text =
    response.getContentText();



  /*
   * Cache size limits can occasionally
   * be exceeded by very large calendars.
   * If that happens, continue without caching.
   */

  try {

    cache.put(
      cacheKey,
      text,
      SETTINGS.cacheSeconds
    );

  }

  catch(err) {

    // Ignore cache failure.

  }


  return text;

}


/**************************************************************************
 * Error page shown inside Xibo if something fails.
 **************************************************************************/

function renderErrorPage(message) {


return `

<!DOCTYPE html>

<html>

<head>

<style>

body {

background:#10233f;

color:white;

font-family:Arial,sans-serif;

padding:50px;

text-align:center;

}

h1 {

color:#ff8080;

}

</style>

</head>


<body>

<h1>
Holy Trinity Signage Error
</h1>


<p>
${escapeHtml(message)}
</p>


</body>

</html>

`;

}
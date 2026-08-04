function refreshTodayData() {
  const icsUrl = PropertiesService.getScriptProperties().getProperty("MIO_ICS_URL");

  if (!icsUrl) {
    Logger.log("Refresh skipped: MIO_ICS_URL not configured.");
    return;
  }

  try {
    const response = UrlFetchApp.fetch(icsUrl, { muteHttpExceptions: true });
    const status = response.getResponseCode();

    if (status !== 200) {
      Logger.log("Refresh failed: HTTP " + status);
      return; // leave last good data in place
    }

    SETTINGS.logoUrl = PropertiesService.getScriptProperties().getProperty("LOGO_URL") || "";

    const events = parseIcs(response.getContentText());
    const todaysEvents = filterToToday(events);
    const html = renderHtml(todaysEvents);

    PropertiesService.getScriptProperties().setProperty("TODAY_HTML", html);
    PropertiesService.getScriptProperties().setProperty("TODAY_HTML_UPDATED", new Date().toISOString());

    Logger.log("Refresh succeeded at " + new Date().toISOString());
  }
  catch (err) {
    Logger.log("Refresh error: " + err.message); // leave last good data in place
  }
}

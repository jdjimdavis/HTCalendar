/**************************************************************************
 * Holy Trinity Meeting Signage - Version 2
 *
 * File: Helpers.gs
 *
 * Utility functions shared by parser and renderer.
 **************************************************************************/


/**
 * Build the display model used by the renderer.
 *
 * This converts raw event data into presentation-ready data.
 */
function buildDisplayModel(events) {


  const density =
    getDensityProfile(events.length);


  const layout =
    determineLayout(
      events.length
    );

    const currentEvent = events.find(e => e.current);
    const nextEvent = events.find(e => e.next);

    return {
      layout: layout,
      density: density,
      eventCount: events.length,
      events: events.map(buildEventDisplayModel),
      current: currentEvent ? buildEventDisplayModel(currentEvent) : null,
      next: nextEvent ? buildEventDisplayModel(nextEvent) : null
    };

}



/**
 * Convert one event into display data.
 */
function buildEventDisplayModel(ev) {


  return {


    title:
      escapeHtml(
        ev.summary
      ),


    room:
      escapeHtml(
        ev.room
      ),


    start:
      ev.start,


    end:
      ev.end,


    timeLabel:
      formatTimeRange(
        ev.start,
        ev.end
      ),


    current:
      Boolean(
        ev.current
      ),


    next:
      Boolean(
        ev.next
      ),


    startingSoon:
      Boolean(
        ev.startingSoon
      ),


    minutesUntil:
      ev.minutesUntil || 0


  };

}



/**
 * Automatically select the best layout.
 */
function determineLayout(count) {


  if (
    SETTINGS.layout !== "auto"
  ) {

    return SETTINGS.layout;

  }


  if (
    count <=
    SETTINGS.autoLayout.cardsMaximum
  ) {

    return "cards";

  }


  return "table";

}



/**
 * Determine display density.
 */
function getDensityProfile(count) {


  const d =
    SETTINGS.density;



  if (
    count <=
    d.comfortable.maxEvents
  ) {

    return d.comfortable;

  }



  if (
    count <=
    d.normal.maxEvents
  ) {

    return d.normal;

  }



  if (
    count <=
    d.compact.maxEvents
  ) {

    return d.compact;

  }



  return d.dense;

}



/**
 * Generate font and spacing values.
 */
function getDisplaySettings(count) {


  const density =
    getDensityProfile(count);



  return {


    titleFont:
      scaleValue(
        3.8,
        density.titleScale
      ) + "vw",

    bodyFont:
      scaleValue(
        2.3,
        density.bodyScale
      )
      + "vw",


    headerFont:
      scaleValue(
        1.5,
        density.bodyScale
      )
      + "vw",


    padding:
      Math.round(
        22 *
        density.paddingScale
      )
      + "px"


  };

}



/**
 * Scale numeric values.
 */
function scaleValue(value, scale) {


  return (
    Math.round(
      value *
      scale *
      100
    )
    /
    100
  );

}



/**
 * Format meeting time range.
 */
function formatTimeRange(start,end) {


  return (

    Utilities.formatDate(
      start,
      SETTINGS.timeZone,
      "h:mm a"
    )

    +

    " – "

    +

    Utilities.formatDate(
      end,
      SETTINGS.timeZone,
      "h:mm a"
    )

  );

}



/**
 * Get the currently active meeting.
 */
function getCurrentMeeting(events) {


  return events.find(
    e => e.current
  );

}



/**
 * Get next scheduled meeting.
 */
function getNextMeeting(events) {


  return events.find(
    e => e.next
  );

}



/**
 * HTML escape utility.
 */
function escapeHtml(value) {


  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    );

}
/**************************************************************************
 * Holy Trinity Meeting Signage - Version 2
 *
 * File: Parser.gs
 *
 * ICS calendar parsing and event filtering.
 **************************************************************************/


/**
 * Parse raw ICS calendar text.
 */
function parseIcs(icsText) {


  const unfolded =
    unfoldIcs(icsText);


  const lines =
    unfolded.split(/\r?\n/);


  const events = [];

  let current = null;


  for (const line of lines) {


    if (line === "BEGIN:VEVENT") {

      current = {};

      continue;

    }


    if (line === "END:VEVENT") {


      if (current) {

        events.push(current);

      }


      current = null;

      continue;

    }


    if (!current) {

      continue;

    }


    const idx =
      line.indexOf(":");


    if (idx === -1) {

      continue;

    }


    const rawKey =
      line.substring(0, idx);


    const value =
      line.substring(idx + 1);


    const key =
      rawKey.split(";")[0];



    switch(key) {


      case "SUMMARY":

        current.summary =
          unescapeIcsText(value);

        break;


      case "DESCRIPTION":

        current.description =
          unescapeIcsText(value);

        break;


      case "DTSTART":

        current.start =
          parseIcsDate(value);

        break;


      case "DTEND":

        current.end =
          parseIcsDate(value);

        break;


    }

  }


  return events.filter(ev =>

    ev.start &&
    ev.end &&
    ev.summary

  );

}



/**
 * ICS line unfolding.
 *
 * RFC 5545:
 * A line beginning with space/tab continues
 * the previous line.
 */
function unfoldIcs(text) {


  return text.replace(
    /\r?\n[ \t]/g,
    ""
  );

}



/**
 * Clean ICS escaped text.
 */
function unescapeIcsText(value) {


  return value

    .replace(/\\,/g,",")
    .replace(/\\;/g,";")
    .replace(/\\n/g,", ")
    .replace(/\\\\/g,"\\")

    .trim();

}



/**
 * Convert ICS date format:
 *
 * 20260731T090000
 *
 * into JavaScript Date.
 */
function parseIcsDate(value) {


  const match =
    value.match(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/
    );


  if (!match) {

    return null;

  }


  const [
    ,
    year,
    month,
    day,
    hour,
    minute,
    second

  ] = match;



  const iso =
    `${year}-${month}-${day}T${hour}:${minute}:${second}`;



  return new Date(iso);

}



/**
 * Filter events for today's display.
 */
function filterToToday(events) {


  const now =
    new Date();



  const today =
    Utilities.formatDate(
      now,
      SETTINGS.timeZone,
      "yyyy-MM-dd"
    );



  const filtered = [];


  for (const ev of events) {



    const eventDate =
      Utilities.formatDate(
        ev.start,
        SETTINGS.timeZone,
        "yyyy-MM-dd"
      );



    if (eventDate !== today) {

      continue;

    }



    const durationHours =
      (ev.end - ev.start)
      /
      (1000 * 60 * 60);



    /*
     * Remove setup/storage blocks
     * and multi-day events.
     */

    if (
      durationHours >=
      SETTINGS.allDayThresholdHours
    ) {

      continue;

    }



    /*
     * Remove meetings already finished.
     */

    if (
      SETTINGS.hidePastEvents &&
      ev.end <= now
    ) {

      continue;

    }



    filtered.push({

      summary: ev.summary,

      description: ev.description || "",

      start: ev.start,

      end: ev.end,

      room:
        extractRoom(ev.description)

    });


  }



  filtered.sort(
    (a,b)=>
      a.start-b.start
  );



  applyEventStatus(filtered, now);



  return filtered;

}



/**
 * Add current/next/starting soon status.
 */
function applyEventStatus(events, now) {


  let nextFound = false;


  events.forEach(ev => {



    ev.current =
      now >= ev.start &&
      now < ev.end;



    ev.next = false;



    ev.startingSoon = false;



    ev.minutesUntil = 0;



    if (
      !ev.current &&
      !nextFound &&
      ev.start > now
    ) {


      ev.next = true;


      nextFound = true;



      ev.minutesUntil =
        Math.max(
          0,
          Math.round(
            (ev.start-now)
            /
            60000
          )
        );



      if (
        ev.minutesUntil <=
        SETTINGS.startingSoonMinutes
      ) {

        ev.startingSoon = true;

      }

    }


  });


}



/**
 * Extract room from MIO description.
 */
function extractRoom(description) {


  if (!description) {

    return "TBD";

  }



  const lines =
    description.split(/\r?\n/);



  for (const line of lines) {


    const match =
      line.match(
        /^Location:\s*(.+)$/i
      );



    if (match) {

      return match[1].trim();

    }


  }



  return description.trim() || "TBD";

}

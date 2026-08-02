/**************************************************************************
 * Holy Trinity Meeting Signage - Version 2
 *
 * File: Config.gs
 *
 * Central configuration for the Xibo signage application.
 *
 * Change settings here rather than modifying rendering code.
 **************************************************************************/


/**
 * Main application settings.
 */
const SETTINGS = {

  /**********************************************************************
   * Branding
   **********************************************************************/

  churchName: "Holy Trinity Catholic Church",

  title: "Today's Meetings",


  /**********************************************************************
   * Display Behavior
   **********************************************************************/

  // auto:
  //   1-8 meetings  -> cards
  //   9+ meetings   -> table
  //
  // cards:
  //   always use card layout
  //
  // table:
  //   always use table layout
  //
  layout: "auto",


  // Intended monitor orientation.
  //
  // portrait:
  //   optimized for vertical displays
  //
  // landscape:
  //   optimized for horizontal displays
  //
  orientation: "landscape",


  /**********************************************************************
   * Features
   **********************************************************************/

  hidePastEvents: true,

  highlightCurrentMeeting: true,

  highlightNextMeeting: true,

  showClock: true,

  showLogo: false,

  adaptiveSizing: true,

  showFooter: true,


  /**********************************************************************
   * Calendar / Timing
   **********************************************************************/

  timeZone: "America/New_York",

  allDayThresholdHours: 18,

  cacheSeconds: 300,


  // Minutes before start time where a meeting becomes
  // "Starting Soon"
  startingSoonMinutes: 15,


/**********************************************************************
   * Branding Assets
   **********************************************************************/

  // Optional logo URL.
  //
  // Example:
  // logoUrl:
  // "https://drive.google.com/uc?id=xxxxx"
  //

  showLogo: true,

  logoUrl: "https://drive.google.com/uc?id=xxxxx",   // <-- put your real logo URL here

  // Height of footer logo (recommended 5–8)
  logoHeightPercent: 10,

  // Background plate behind the logo, so it stays visible
  // regardless of theme background color.
  logoBackground: "#ffffff",

  // Padding around the logo inside its background plate.
  logoPadding: "10px",

  /**********************************************************************
   * Display Text
   **********************************************************************/

  noMeetingsMessage:
      "No More Meetings Today",

  footerText:
      "Schedule updates automatically",


  /**********************************************************************
   * Theme
   **********************************************************************/

  theme: {

    background:
        "#10233f",

    primary:
        "#ffffff",

    secondary:
        "#9fb3d1",

    accent:
        "#ffd34d",

    current:
        "#008f4c",

    next:
        "#245a96",

    startingSoon:
        "#c58a00",

    border:
        "#24406b"

  },


  /**********************************************************************
   * Layout Thresholds
   **********************************************************************/

  autoLayout: {

    cardsMaximum:
        8

  },


  /**********************************************************************
   * Density Settings
   *
   * These values control how aggressively the display
   * compresses as the number of meetings increases.
   **********************************************************************/

  density: {

    comfortable: {

      maxEvents: 5,

      titleScale: 1.00,

      bodyScale: 1.00,

      paddingScale: 1.00

    },


    normal: {

      maxEvents: 10,

      titleScale: 0.90,

      bodyScale: 0.90,

      paddingScale: 0.85

    },


    compact: {

      maxEvents: 15,

      titleScale: 0.80,

      bodyScale: 0.80,

      paddingScale: 0.70

    },


    dense: {

      maxEvents: 999,

      titleScale: 0.70,

      bodyScale: 0.70,

      paddingScale: 0.55

    }

  }

};

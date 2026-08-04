/**************************************************************************
 * Holy Trinity Meeting Signage - Version 2
 *
 * File: Styles.gs
 *
 * Generates all CSS used by the Xibo display.
 **************************************************************************/


/**
 * Generate page CSS.
 */
function renderStyles(display) {


  const settings =
    getDisplaySettings(
      display.eventCount
    );


  return `


:root {

  --background:
    ${SETTINGS.theme.background};

  --primary:
    ${SETTINGS.theme.primary};

  --secondary:
    ${SETTINGS.theme.secondary};

  --accent:
    ${SETTINGS.theme.accent};

  --current:
    ${SETTINGS.theme.current};

  --next:
    ${SETTINGS.theme.next};

  --startingSoon:
    ${SETTINGS.theme.startingSoon};

  --border:
    ${SETTINGS.theme.border};

  --logoBackground:
    ${SETTINGS.logoBackground || "transparent"};

  --logoPadding:
    ${SETTINGS.logoPadding || "0px"};

  --titleSize:
    ${settings.titleFont};

  --bodySize:
    ${settings.bodyFont};

  --headerSize:
    ${settings.headerFont};

  --padding:
    ${settings.padding};

}



* {

  box-sizing:border-box;

}



html,
body {

  width:100%;

  height:100%;

  margin:0;

  padding:0;

  overflow:hidden;

  background:
    var(--background);

  color:
    var(--primary);

  font-family:
    "Segoe UI",
    Arial,
    sans-serif;

}



body {

  padding:40px;

}



.page {

  width:100%;

  height:100%;

  display:flex;

  flex-direction:column;

}



.header {

    display:flex;

    align-items:flex-start;

    justify-content:space-between;

    margin-bottom:18px;

}

.headerLogo {
    width:auto;
    max-height:7vh;
    max-width:22vw;
    object-fit:contain;
    flex:0 1 auto;
    min-width:0;
    background:var(--logoBackground);
    padding:var(--logoPadding);
    border-radius:8px;
}

.headerCenter {
    flex:1;
    min-width:0;             /* NEW: lets title/date wrap or shrink instead of overflow-pushing */
    text-align:center;
}



h1 {

  margin:6px 0;

  text-align:center;

  font-size:
    calc(var(--titleSize) * .88);

  font-weight:
    700;

}


.date {

  text-align:center;

  color:
    var(--secondary);

  font-size:
    var(--headerSize);

}


.clock {

    flex:0 0 auto;

    font-size:calc(var(--titleSize) * .88);

    font-weight:700;

    color:var(--primary);

    white-space:nowrap;

}



.status {

  margin-top:25px;

  padding:18px;

  border-radius:14px;

  text-align:center;

  font-size:
    var(--headerSize);

  font-weight:
    700;

}



.status.current {

  background:
    var(--current);

}



.status.next {

  background:
    var(--next);

}



.status.starting {

  background:
    var(--startingSoon);

}



.status.empty {

  background:#555;

}



.content {

  flex:1;

  overflow:hidden;

}

.footerLogo {

    display:block;

    margin:0 auto 10px;

    width: ${model.settings.logoWidth}px; }

    max-height:${SETTINGS.logoHeightPercent}vh;

    object-fit:contain;

    background:var(--logoBackground);

    padding:var(--logoPadding);

    border-radius:8px;

}

.footer {

    text-align:center;

    margin-top:14px;

    padding-top:6px;

    color:var(--secondary);

    font-size:.90vw;

}



/**********************************************************************
 * TABLE STYLE
 **********************************************************************/


table {

  width:100%;

  border-collapse:collapse;

  table-layout:fixed;

  font-size:
    var(--bodySize);

}



thead th {

  padding:18px;

  background:
    rgba(255,255,255,.08);

  color:
    var(--secondary);

  text-align:center;

  text-transform:
    uppercase;

  letter-spacing:
    .08em;

  font-size:
    var(--headerSize);

}



tbody td {

  padding:
    var(--padding);

  text-align:center;

  border-bottom:
    1px solid var(--border);

}



tbody tr:nth-child(even) {

  background:
    rgba(255,255,255,.04);

}



tbody tr.current {

  background:
    var(--current);

  color:white;

}



tbody tr.next {

  background:
    rgba(36,90,150,.35);

}



.time {

  width:22%;

  color:#8fd0ff;

}



.name {

  width:56%;

  font-weight:600;

}



.room {

  width:22%;

  color:
    var(--accent);

  font-weight:700;

}



/**********************************************************************
 * CARD STYLE
 **********************************************************************/


.cards {

  display:flex;

  flex-direction:column;

  gap:18px;

}



.card {

  background:
    rgba(255,255,255,.06);

  border-radius:18px;

  padding:
    var(--padding);

  border-left:
    8px solid var(--accent);

}



.card.current {

  border-left-color:
    var(--current);

  background:
    rgba(0,143,76,.25);

}



.card.next {

  border-left-color:
    var(--next);

}



.card.starting {

  border-left-color:
    var(--startingSoon);

}



.badge {

  display:inline-block;

  padding:
    7px 18px;

  border-radius:25px;

  font-size:
    .95vw;

  font-weight:700;

  margin-bottom:10px;

}



.badge.current {

  background:
    var(--current);

}



.badge.next {

  background:
    var(--next);

}



.badge.starting {

  background:
    var(--startingSoon);

}



.cardTime {

  color:#8fd0ff;

  font-size:
    var(--bodySize);

  font-weight:700;

}



.cardTitle {

  margin-top:10px;

  font-size:
    calc(var(--bodySize) + .4vw);

  font-weight:700;

}



.cardRoom {

  margin-top:10px;

  color:
    var(--accent);

  font-size:
    var(--bodySize);

}



.footer {

  text-align:center;

  margin-top:20px;

  color:
    var(--secondary);

  font-size:
    1vw;

}



@media (orientation:portrait) {

  body {
    padding:30px;
  }

  .headerLogo {
    max-height:5vh;      /* slightly smaller in portrait */
    max-width:18vw;      /* tighter cap since width is scarcer */
  }

  .card {
    padding:
      calc(var(--padding) * .9);
  }

}



@media (orientation:landscape) {


  body {

    padding:50px;

  }


}



`;

}
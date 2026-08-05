/**************************************************************************
 * Holy Trinity Meeting Signage - Version 2
 *
 * File: Renderer.gs
 *
 * HTML rendering engine.
 **************************************************************************/


/**
 * Main HTML generator.
 */
function renderHtml(events) {


  const model =
    buildDisplayModel(events);



  return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1">

<title>
${escapeHtml(SETTINGS.title)}
</title>


<style>

${renderStyles(model)}

</style>


</head>


<body>


<div class="page">


${renderHeader(model)}



${

model.layout === "cards"

?
renderCard(model)

:

renderTable(model)

}



${renderFooter(model)}


</div>


${renderClientScripts()}


</body>


</html>

`;

}



/**************************************************************************
 * Header
 **************************************************************************/

function renderHeader(model) {

  const now = new Date();

   
    const logo =
    (SETTINGS.showLogo && SETTINGS.logoUrl)
      ? `<img class="headerLogo"
              src="${escapeHtml(SETTINGS.logoUrl)}"
              alt="Church Logo">`
      : "";


  return `

<div class="header">

    <div>

        ${logo}

    </div>

    <div class="headerCenter">

        <h1>${escapeHtml(SETTINGS.title)}</h1>

        <div class="date">

            ${Utilities.formatDate(
                now,
                SETTINGS.timeZone,
                "EEEE, MMMM d, yyyy"
            )}

        </div>

    </div>

    ${
        SETTINGS.showClock
        ?

        `<div class="clock" id="clock">

            ${formatClock(now)}

        </div>`

        :

        ""
    }

</div>

`;

}


/**************************************************************************
 * Footer
 **************************************************************************/

function renderFooter(model) {

  if (!SETTINGS.showFooter)
    return "";

  const hasMeetingsLeft = Boolean(model.current || model.next);

  const message = hasMeetingsLeft
    ? SETTINGS.footerText
    : "No more meetings scheduled today, have a blessed day!";

  return `

<div class="footer">

${escapeHtml(message)}

</div>

`;

}

/**************************************************************************
 * Status banner
 **************************************************************************/

function renderStatusBanner(model) {


const current =
  model.current;


const next =
  model.next;



if (current) {


return `


<div class="status current">


NOW IN PROGRESS

<br><br>


<strong>

${escapeHtml(current.summary)}

</strong>


<br>


${escapeHtml(current.room)}


</div>


`;

}



if (next) {


const minutes =
  next.minutesUntil;



const type =
  next.startingSoon
    ?
    "starting"
    :
    "next";



return `


<div class="status ${type}">


${

next.startingSoon

?

"STARTING SOON"

:

"UP NEXT"

}


<br><br>


<strong>

${escapeHtml(next.summary)}

</strong>


<br>


${escapeHtml(next.room)}


<br>


Starts in ${minutes} minutes


</div>


`;

}



return `


<div class="status empty">

${escapeHtml(SETTINGS.noMeetingsMessage)}

</div>


`;

}



/**************************************************************************
 * Table Layout
 **************************************************************************/

function renderTable(model) {


return `


<div class="content">

<table>


<thead>

<tr>

<th>
Time
</th>

<th>
Meeting
</th>

<th>
Room
</th>

</tr>

</thead>



<tbody>


${

model.events.map(renderTableRow).join("")

}


</tbody>


</table>


</div>


`;

}



function renderTableRow(ev) {


let classes = "";


if(ev.current)
 classes="current";

else if(ev.startingSoon)
 classes="next";


return `


<tr class="${classes}">


<td class="time">

${ev.timeLabel}

</td>



<td class="name">

${ev.title}

</td>



<td class="room">

${ev.room}

</td>


</tr>


`;

}



/**************************************************************************
 * Card Layout
 **************************************************************************/

function renderCard(ev) {

let badge="";
let statusClass="";

if(ev.current) {
  badge = `<span class="badge current">NOW IN PROGRESS</span>`;
  statusClass="current";
}
else if(ev.startingSoon) {
  badge = `<span class="badge starting">STARTING SOON</span>`;
  statusClass="starting";
}
else if(ev.next) {
  badge = `<span class="badge next">UP NEXT</span>`;
  statusClass="next";
}

return `

<div class="card ${statusClass}">

<div class="cardTopRow">
${badge}
<div class="cardTime">${ev.timeLabel}</div>
</div>

<div class="cardTitle">
${ev.title}
</div>

<div class="cardRoom">
${ev.room}
</div>

</div>

`;

}




/**************************************************************************
 * Client-side JavaScript
 *
 * Keeps clock alive between Xibo refreshes.
 **************************************************************************/

function renderClientScripts() {

return `

<script>

function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;
  const now = new Date();
  clock.innerHTML = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

updateClock();
setInterval(updateClock, 1000);

</script>

`;

}


/**************************************************************************
 * Clock formatting helper
 **************************************************************************/

function formatClock(date) {


return Utilities.formatDate(

date,

SETTINGS.timeZone,

"h:mm a"

);

}
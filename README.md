# Holy Trinity Meeting Signage

A Google Apps Script web application that displays today's scheduled meetings from a MinistryOne (MIO) iCalendar (ICS) feed. The application is designed for unattended display on digital signage systems such as Xibo but can also be viewed in any modern web browser.

---

## Features

- Displays today's meetings only
- Automatically hides completed meetings
- Highlights:
  - Current meeting
  - Next meeting
  - Meetings starting soon
- Automatically switches between:
  - Card layout (1–8 meetings)
  - Table layout (9+ meetings)
- Responsive sizing based on the number of meetings
- Live updating clock
- Automatic calendar caching
- Optional church logo
- Configurable colors and branding
- Optimized for landscape and portrait displays

---

## Project Structure

| File | Description |
|------|-------------|
| **Config.gs** | Application configuration, branding, colors, display settings |
| **Main.gs** | Web app entry point, calendar retrieval, caching |
| **Parser.gs** | Parses the ICS calendar feed and filters today's events |
| **Helpers.gs** | Utility functions and display model generation |
| **Renderer.gs** | Generates all HTML |
| **Styles.gs** | Generates all CSS styling |

---

## Script Properties

The application uses Google Apps Script Script Properties for configuration.

### Required

| Property | Description |
|----------|-------------|
| `MIO_ICS_URL` | MinistryOne public ICS calendar URL |

### Optional

| Property | Description |
|----------|-------------|
| `LOGO_URL` | Public URL of the church logo (GitHub Raw URL, Google Drive direct link, etc.) |

Example:

```
LOGO_URL
https://raw.githubusercontent.com/username/repository/main/logo.png
```

---

## Configuration

Most settings are located in **Config.gs**.

Examples include:

```javascript
layout: "auto"

orientation: "landscape"

showClock: true

showLogo: true

showFooter: true

logoHeightPercent: 6
```

### Layout Modes

```
auto
```

Automatically selects:

- Cards for 1–8 meetings
- Table for 9 or more meetings

or force:

```
cards
```

or

```
table
```

---

## Display Features

### Current Meeting

The active meeting is highlighted using a green accent.

### Next Meeting

The next meeting is highlighted using a blue accent.

### Starting Soon

Meetings beginning within the configured threshold (default 15 minutes) receive a "Starting Soon" badge.

---

## Caching

The MinistryOne calendar feed is cached using Apps Script CacheService.

Default cache time:

```
300 seconds
```

This value can be changed in `Config.gs`.

---

## Deployment

1. Create a new Google Apps Script project.

2. Add all project files.

3. Open **Project Settings**.

4. Add the required Script Properties.

5. Deploy as:

```
Web App
```

Recommended settings:

- Execute as:
  - Me

- Access:
  - Anyone

6. Configure Xibo (or another signage system) to display the Web App URL.

---

## Customization

The following can be customized without modifying rendering code:

- Church name
- Display title
- Theme colors
- Logo
- Footer text
- Layout mode
- Clock visibility
- Highlight colors
- Adaptive sizing
- Cache duration

---

## Theme Colors

Configured in:

`Config.gs`

```javascript
theme: {

    background: "#10233f",

    primary: "#ffffff",

    secondary: "#9fb3d1",

    accent: "#ffd34d",

    current: "#008f4c",

    next: "#245a96",

    startingSoon: "#c58a00",

    border: "#24406b"

}
```

---

## Browser Support

- Google Chrome
- Microsoft Edge
- Firefox
- Safari
- Xibo Embedded Browser

---

## Notes

- Multi-day events are automatically ignored.
- Events longer than the configured threshold are treated as all-day events and hidden.
- Only today's meetings are displayed.
- Meetings are automatically sorted chronologically.
- The page is intended for unattended digital signage and refreshes automatically based on the Xibo schedule.

---

## Version History

### Version 2.1

- Removed redundant status banner
- Moved logo to header
- Simplified header layout
- Enlarged live clock
- Improved responsive spacing
- Optional logo loaded from Script Properties
- Cleaner meeting card presentation
- Adaptive typography improvements

---

## License

Developed for Holy Trinity Catholic Church.

This project may be freely modified and reused for other churches and organizations.

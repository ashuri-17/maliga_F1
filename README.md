# Maliga_F1 - Navbar with Lights

A static front-end web project featuring an interactive navbar with two activities: a **Lightbulb Toggle** and a **Traffic Light Simulator**, built with vanilla HTML, CSS, and JavaScript.

---

## Project Structure

```
Maliga_F1.7z          # Compressed archive of the project source
extracted/
  Maliga_F1/
    html/
      home.html       # Main page with navbar and iframe
      lightbulb.html  # Lightbulb on/off activity
      traffic.html    # Traffic light simulator activity
    css/
      home.css        # Styles for the navbar and layout
      lightbulb.css   # Styles for the lightbulb page
      traffic.css     # Styles for the traffic light page
    js/
      home.js         # Logic to show/hide the iframe
      lightbulb.js    # Toggle between bulb on/off images
      traffic.js      # Cycle through red/yellow/green lights
    img/
      bulb_off.gif    # Lightbulb off image
      bulb_on.gif     # Lightbulb on image
```

---

## Prerequisites

| Requirement | Purpose |
|---|---|
| **7-Zip** (or any `.7z` extractor) | Extract the `Maliga_F1.7z` archive |
| **A modern web browser** (Chrome, Firefox, Edge, etc.) | View and interact with the pages |
| **A local HTTP server** | Serve files so that absolute paths (`/css/...`, `/js/...`, `/img/...`) resolve correctly |

> **Why a local server?**  
> The HTML files reference assets using root-relative paths (e.g., `/css/home.css`, `/img/bulb_on.gif`). Opening the files directly with `file://` will break these references. A local HTTP server whose document root is the `Maliga_F1/` folder is required.

---

## Setup & Run Steps

### 1. Clone the Repository

```bash
git clone https://github.com/ashuri-17/maliga_F1.git
cd maliga_F1
```

### 2. Extract the Archive

**Linux / macOS (using `7z` CLI):**

```bash
# Install 7-Zip if not already available
# Ubuntu/Debian:
sudo apt-get install -y p7zip-full
# macOS (Homebrew):
# brew install p7zip

7z x Maliga_F1.7z
```

**Windows:**

- Right-click `Maliga_F1.7z` and select **Extract Here** (requires [7-Zip](https://www.7-zip.org/) or WinRAR).

After extraction you will have a `Maliga_F1/` directory containing `html/`, `css/`, `js/`, and `img/` folders.

### 3. Start a Local HTTP Server

The server's document root must be the **`Maliga_F1/`** folder so that root-relative paths resolve correctly.

**Option A - Python (built-in, no install needed):**

```bash
cd Maliga_F1
# Python 3
python3 -m http.server 8000
# Python 2 (legacy)
# python -m SimpleHTTPServer 8000
```

**Option B - Node.js (`http-server` or `live-server`):**

```bash
# Install globally (one-time)
npm install -g http-server

cd Maliga_F1
http-server -p 8000
```

**Option C - PHP built-in server:**

```bash
cd Maliga_F1
php -S localhost:8000
```

**Option D - VS Code Live Server Extension:**

1. Open the `Maliga_F1/` folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `html/home.html` and select **Open with Live Server**.
4. Note: You may need to adjust the root path setting so that `/css/`, `/js/`, and `/img/` resolve from the `Maliga_F1/` directory.

### 4. Open in Browser

Navigate to the main page:

```
http://localhost:8000/html/home.html
```

---

## How It Works

### Home Page (`home.html`)
- Displays a responsive **navigation bar** with four items: HOME, ACTIVITIES, ARTICLES, INSPIRATION.
- Hovering over **ACTIVITIES** reveals a dropdown menu with two links: **LIGHTS** and **TRAFFIC LIGHTS**.
- Clicking either link loads the corresponding page inside an `<iframe>`.

### Lightbulb Activity (`lightbulb.html`)
- Shows a lightbulb image (initially off).
- **Turn on** button switches the image to `bulb_on.gif` (lit bulb).
- **Turn off** button switches the image to `bulb_off.gif` (unlit bulb).

### Traffic Light Activity (`traffic.html`)
- Simulates a traffic light that cycles through **red**, **yellow**, and **green** every 8 seconds automatically.
- Uses CSS classes (`col1`, `col2`, `col3`) to apply glowing color effects.

---

## Configuration Notes

- **No build step required** - This is a purely static project with no bundler, transpiler, or package manager.
- **No external dependencies** - All code is vanilla HTML, CSS, and JavaScript with no third-party libraries.
- **No environment variables** - The project does not require any `.env` file or configuration.
- **No database** - There is no back-end or data persistence.
- **Responsive design** - The navbar includes a `@media` query for screens narrower than 768px, collapsing to a vertical layout.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| CSS/JS/images not loading | Make sure you are using a local HTTP server with the document root set to the `Maliga_F1/` directory. Do **not** open files directly via `file://`. |
| Dropdown menu not appearing | Hover over the **ACTIVITIES** nav item. The dropdown is CSS-driven (`:hover`). |
| Iframe not showing | Click one of the dropdown links (**LIGHTS** or **TRAFFIC LIGHTS**) to display the iframe. |
| Traffic lights not cycling | Wait ~8 seconds; the interval is set to 8000 ms in `traffic.js`. |

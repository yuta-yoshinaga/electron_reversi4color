# GEMINI.md
This file provides guidance to GEMINI when working with code in this repository.

## High-level Code Architecture and Structure

This repository contains an Electron application for a Reversi game.

*   **Frontend (Web Technologies):** The user interface and core game logic are implemented using standard web technologies (HTML, CSS, JavaScript) and are located within the `docs/` directory. This serves as the renderer process for the Electron application.
*   **Electron Framework:** Electron provides the desktop application shell, enabling the web-based frontend to run as a native desktop application and access system-level functionalities.
*   **Build Process:** The application is packaged for different operating systems using `electron-packager`.
*   **Installer Generation:** A Gulp task is used to create a Windows installer for the built application.

## Commonly Used Commands

### Build Commands

To build the Electron application for various platforms, `electron-packager` is used. It is assumed that Node.js and npm are installed, and `electron-packager` is available (either globally or as a local dependency).

*   **Windows Build:**
    ```bash
    node win-build.js
    ```
    This script internally uses `electron-packager` to create the Windows executable.

*   **Linux Build:**
    ```bash
    electron-packager docs Reversi4Color --platform=linux --arch=x64 --overwrite --electron-version=1.4.15
    ```
    This command is found in `linux-build.bat`.

*   **macOS Build:**
    ```bash
    electron-packager docs Reversi4Color --platform=darwin --arch=x64 --overwrite --electron-version=1.4.15
    ```
    This command is found in `mac-build.bat`.

### Installer Generation (Windows)

After building the Windows executable, an installer can be created using Gulp:

*   **Windows Installer:**
    ```bash
    gulp create_windows_installer
    ```

### Running Tests and Linting

No explicit commands or configurations for running tests or linting were found in the repository.

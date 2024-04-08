<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->

# Installing `ffmpeg`

You're gonna need `ffmpeg` to acquire the dataset.

### Windows
Download [this MSI installer](https://github.com/icedterminal/ffmpeg-installer/releases/download/6.1.1.20240201/FFmpeg_Essentials.msi),
it may complain about viruses, but rest assured there are none.

### Mac OSX with Homebrew
Run this command:
```
brew install ffmpeg
```

### Linux: Ubuntu/Debian
```
sudo apt install ffmpeg
```
Use your package manager to install ffmpeg (differs distro to distro).

# Installing the Python `yt-dlp` Package
Assuming you have Python installed on your OS, open a terminal in this directory and run:
```
`pip install -r data_processing/requirements.txt`
```
This will automatically download the Python package required.

# Downloading the Data
Open a terminal in this directory and run:
```
`python3 data_processing/download.py`
```
Wait for the download to complete, and you now have the dataset.

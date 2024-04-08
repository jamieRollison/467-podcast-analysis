import yt_dlp
import os
import shutil

from urls import genre_urls


def download_audio(yt_url, path):
    ydl_opts = {
        "format": "bestaudio/best",
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ],
        "outtmpl": f"{path}/%(title)s.%(ext)s",  # Use the pathname argument here
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([yt_url])


def main():
    out_dir = "data"
    if os.path.exists(out_dir):
        shutil.rmtree(out_dir)
    os.mkdir(out_dir)

    for genre, urls in genre_urls.items():
        genre_path = os.path.join(out_dir, genre)
        os.mkdir(genre_path)
        for url in urls:
            download_audio(url, genre_path)


if __name__ == "__main__":
    main()

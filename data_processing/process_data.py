import librosa
import numpy as np
import os


def calc_pitch(file):
    genres = [
        "gaming",
        "true_crime",
        "business",
        "science",
        "self_help",
        "comedy",
        "sports",
    ]

    for genre in genres:
        file_names = os.listdir("data/" + genre + "/")
        totals = np.zeros(21)

        for file_name in file_names:
            y, sr = librosa.load("data/" + genre + "/" + file_name)
            pitches, _ = librosa.piptrack(y=y, sr=sr)

            nonzero_mask = pitches != 0
            # average the pitches over time
            column_averages = np.nanmean(
                np.where(nonzero_mask, pitches, np.nan), axis=0
            )
            pitches_processed = np.nan_to_num(column_averages, nan=0)

            # grab the pitches at 0, 5, 10, ..., 100 percent
            final_pitches = []
            n = len(pitches_processed) - 1
            for percent in range(0, 105, 5):
                ind = int(np.floor(n * (percent / 100)))
                # data is in the form [pitch, percent] where percent is the time in the audio
                final_pitches.append(pitches_processed[ind])

            file.write(genre + ", " + file_name + ", " + str(final_pitches) + "\n")

            final_pitches = np.array(final_pitches)
            totals += final_pitches[:]

        # calculate the average pitch for the current genre
        totals = totals / 5
        i = 0
        averages_percents = []
        for percent in range(0, 105, 5):
            averages_percents.append(totals[i])
            i += 1

        # with open("processed_data/pitch_averages.txt", "a") as file:
        #     file.write(genre + ", " + str(averages_percents) + "\n")

    return


def calc_volume(file):
    genres = [
        "gaming",
        "true_crime",
        "business",
        "science",
        "self_help",
        "comedy",
        "sports",
    ]

    for genre in genres:
        file_names = os.listdir("data/" + genre + "/")
        totals = np.zeros(21)

        for file_name in file_names:
            y, _ = librosa.load("data/" + genre + "/" + file_name)
            volume = librosa.feature.rms(y=y)

            # grab the volumes at 0, 5, 10, ..., 100 percent
            final_volumes = []
            n = volume.shape[1] - 1
            for percent in range(0, 105, 5):
                ind = int(np.floor(n * (percent / 100)))
                # data is in the form [volume, percent] where percent is the time in the audio
                final_volumes.append(np.sqrt(volume[0][ind]))

            file.write(genre + ", " + file_name + ", " + str(final_volumes) + "\n")

            final_volumes = np.array(final_volumes)
            totals += final_volumes[:]

        # calculate the average volume for the current genre
        totals = totals / 5
        i = 0
        averages_percents = []
        for percent in range(0, 105, 5):
            averages_percents.append(totals[i])
            i += 1

    return


with open("processed_data/pitch.txt", "a") as file:
    file.write("genre,podcast,frequency\n")
    calc_pitch(file)

with open("processed_data/volume.txt", "a") as file:
    calc_volume(file)

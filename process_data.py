import librosa
import numpy as np
import os

def calc_pitch():
    genres = ['gaming',
              'true_crime',
              'business',
              'science',
              'self_help',
              'comedy',
              'sports']

    for genre in genres:
        file_names = os.listdir("data/" + genre + "/")
        totals = np.zeros(21)
        
        for file_name in file_names:
            y, sr = librosa.load("data/" + genre + "/" + file_name)
            pitches, _ = librosa.piptrack(y=y, sr=sr)

            # Mask non-zero elements
            nonzero_mask = (pitches != 0)

            # Calculate the average for each column using masked array
            column_averages = np.nanmean(np.where(nonzero_mask, pitches, np.nan), axis=0)
            pitches_processed = np.nan_to_num(column_averages, nan=0)
            
            final_pitches = []
            n = len(pitches_processed) - 1
            for percent in range(0, 105, 5):
                ind = int(np.floor(n * (percent/100)))
                final_pitches.append([pitches_processed[ind], percent])

            with open('processed_data/pitch.txt', 'a') as file:
                file.write(genre + ", " + file_name + ", " + str(final_pitches) + "\n")

            final_pitches = np.array(final_pitches)
            totals += final_pitches[:, 0]

        totals = totals/5
        i = 0
        averages_percents = []
        for percent in range(0, 105, 5):
            averages_percents.append([totals[i], percent])
            i += 1

        print(averages_percents)
        with open('processed_data/pitch_averages.txt', 'a') as file:
            file.write(genre + ", " + str(averages_percents) + "\n")

    return

def calc_volume():
    genres = ['gaming',
                'true_crime',
                'business',
                'science',
                'self_help',
                'comedy',
                'sports']

    for genre in genres:
        file_names = os.listdir("data/" + genre + "/")
        
        for file_name in file_names:
            y, _ = librosa.load("data/" + genre + "/" + file_name)
            volume = librosa.feature.rms(y=y)

            final_volumes = []
            n = volume.shape[1] - 1
            for percent in range(0, 105, 5):
                ind = int(np.floor(n * (percent/100)))
                final_volumes.append([np.sqrt(volume[0][ind]), percent])

            with open('processed_data/volume.txt', 'a') as file:
                file.write(genre + ", " + file_name + ", " + str(final_volumes) + "\n")

            final_volumes = np.array(final_volumes)
            totals += final_volumes[:, 0]

        totals = totals/5
        i = 0
        averages_percents = []
        for percent in range(0, 105, 5):
            averages_percents.append([totals[i], percent])
            i += 1

        with open('processed_data/volume_averages.txt', 'a') as file:
            file.write(genre + ", " + str(averages_percents) + "\n")

    return

calc_pitch()
calc_volume()

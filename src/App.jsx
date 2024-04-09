import { useState } from "react";
import "./App.css";
import * as data_module from "./data/all_data_lists.json";
import * as averages_module from "./data/averages_list.json";
import * as podcast_name_lists from "./data/name_lists.json";
import * as timeless_averages_module from "./data/avg_over_time.json";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Label,
  BarChart,
  Bar,
} from "recharts";

function App() {
  const data = data_module.default;
  const averages = averages_module.default;
  console.log(data);
  const podcast_names = podcast_name_lists.default;
  const timeless_averages = timeless_averages_module.default;

  const [overviewCategory, setOverviewCategory] = useState("pitch");
  const [detailsCategory, setDetailsCategory] = useState("pitch");
  const genres = [
    "gaming",
    "true_crime",
    "business",
    "science",
    "self_help",
    "comedy",
    "sports",
  ];

  const [active_genres, setGenres] = useState(genres);
  const [detail_genre, setDetailGenre] = useState(genres[0]);
  const [active_episodes, setEpisodes] = useState(podcast_names[detail_genre]);

  const genre_name_map = {
    gaming: "Gaming",
    true_crime: "True Crime",
    business: "Business",
    science: "Science",
    self_help: "Self Help",
    comedy: "Comedy",
    sports: "Sports",
  };
  const genre_color_map = {
    gaming: "#ff7f0e",
    true_crime: "#d62728",
    business: "#9467bd",
    science: "#2ca02c",
    self_help: "#8c564b",
    comedy: "#e377c2",
    sports: "#7f7f7f",
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center">
        <h1 className="text-xl font-bold">
          {`Differences in Pitch and Volume by Podcast Genre`}
        </h1>
        <BarChart
          width={800}
          height={400}
          data={timeless_averages}
          margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
          title="Differences in Pitch and Volume by Podcast Genre"
        >
          <Legend style={{ marginTop: 10 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis yAxisId="left">
            <Label value={"Pitch (Hz)"} angle={-90} position="insideLeft" />
          </YAxis>
          <YAxis yAxisId="right" orientation="right">
            <Label
              value={"Volume (RMS)"}
              angle={-90}
              offset={-10}
              position="insideRight"
            />
          </YAxis>
          <XAxis dataKey="genre">
            <Label value="Genre" offset={-5} position="insideBottom" />
          </XAxis>
          <Tooltip />
          <Bar yAxisId="left" dataKey={"pitch"} fill="#8884d8" />
          <Bar yAxisId="right" dataKey={"volume"} fill="#9467bd" />
        </BarChart>
      </div>

      <div className="flex justify-between pr-10">
        <div>
          <h1 className="text-xl font-bold">
            {`Differences in ${overviewCategory === "pitch" ? "Pitch" : "Volume"} by Podcast Genre Over Time`}
          </h1>
          <LineChart
            width={800}
            height={400}
            data={averages[overviewCategory]}
            margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
          >
            <Legend style={{ marginTop: 10 }} />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis>
              <Label
                value={
                  overviewCategory === "pitch" ? "Pitch (Hz)" : "Volume (RMS)"
                }
                angle={-90}
                position="insideLeft"
              />
            </YAxis>
            <XAxis dataKey="idx">
              <Label
                value="% of Total Runtime"
                offset={-5}
                position="insideBottom"
              />
            </XAxis>
            <Tooltip />
            {active_genres.map((genre, idx) => {
              return (
                <Line
                  key={idx}
                  type="monotone"
                  dataKey={genre_name_map[genre]}
                  stroke={genre_color_map[genre]}
                  activeDot={{ r: 8 }}
                />
              );
            })}
          </LineChart>
        </div>

        <div className="flex items-start flex-col w-full">
          <h1 className="text-xl font-bold">Select a Category</h1>
          <select
            className="border border-black rounded-md p-1"
            value={overviewCategory}
            onChange={(e) => setOverviewCategory(e.target.value)}
          >
            <option value="pitch">Pitch</option>
            <option value="volume">Volume</option>
          </select>

          <h1 className="text-xl font-bold">Select Genres</h1>
          {genres.map((genre, idx) => {
            return (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  id={genre}
                  name={genre}
                  checked={active_genres.includes(genre)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setGenres([...active_genres, genre]);
                    } else {
                      setGenres(active_genres.filter((g) => g !== genre));
                    }
                  }}
                />
                <label htmlFor={genre} style={{ marginLeft: "5px" }}>
                  {genre_name_map[genre]}
                </label>
              </div>
            );
          })}
          <div className="space-x-3">
            <button
              className="border-2 border-black rounded-md hover:background-gray-200 p-1"
              onClick={() => setGenres(genres)}
            >
              Select All
            </button>
            <button
              className="border-2 border-black rounded-md hover:background-gray-200 p-1"
              onClick={() => setGenres([])}
            >
              Deselect All
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between pr-10 mt-10">
        <div>
          <h1 className="text-xl font-bold">
            {`Differences in ${detailsCategory === "pitch" ? "Pitch" : "Volume"} in Popular Episodes of ${genre_name_map[detail_genre]} Podcasts`}
          </h1>
          <LineChart
            width={800}
            height={400}
            data={data[detail_genre][detailsCategory]}
            margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
          >
            <Legend style={{ marginTop: 10 }} />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis>
              <Label
                value={
                  detailsCategory === "pitch" ? "Pitch (Hz)" : "Volume (RMS)"
                }
                angle={-90}
                position="insideLeft"
              />
            </YAxis>
            <XAxis dataKey="idx">
              <Label
                value="% of Total Runtime"
                offset={-5}
                position="insideBottom"
              />
            </XAxis>
            <Tooltip
              formatter={(value, name) => [value, name.slice(0, 10) + "..."]}
            />
            {active_episodes.map((podcast, idx) => {
              return (
                <Line
                  key={idx}
                  type="monotone"
                  dataKey={podcast}
                  stroke={Object.values(genre_color_map)[idx]}
                  activeDot={{ r: 8 }}
                />
              );
            })}
          </LineChart>
        </div>

        <div className="flex items-start flex-col">
          <h1 className="text-xl font-bold">Select a Category</h1>
          <select
            className="border border-black rounded-md p-1"
            value={detailsCategory}
            onChange={(e) => setDetailsCategory(e.target.value)}
          >
            <option value="pitch">Pitch</option>
            <option value="volume">Volume</option>
          </select>

          <h1 className="text-xl font-bold">Select Genre</h1>

          <select
            className="border border-black rounded-md p-1"
            value={detail_genre}
            onChange={(e) => {
              setDetailGenre(e.target.value);
              setEpisodes(podcast_names[e.target.value]);
            }}
          >
            {genres.map((genre, idx) => {
              return (
                <option key={idx} value={genre}>
                  {genre_name_map[genre]}
                </option>
              );
            })}
          </select>
          <h1 className="text-xl font-bold">Select Genres</h1>
          {podcast_names[detail_genre].map((ep, idx) => {
            return (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  id={ep}
                  name={ep}
                  checked={active_episodes.includes(ep)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEpisodes([...active_episodes, ep]);
                    } else {
                      setEpisodes(active_episodes.filter((g) => g !== ep));
                    }
                  }}
                />
                <label htmlFor={ep} style={{ marginLeft: "5px" }}>
                  {ep}
                </label>
              </div>
            );
          })}
          <div className="space-x-3">
            <button
              className="border-2 border-black rounded-md hover:background-gray-200 p-1"
              onClick={() => setGenres(genres)}
            >
              Select All
            </button>
            <button
              className="border-2 border-black rounded-md hover:background-gray-200 p-1"
              onClick={() => setGenres([])}
            >
              Deselect All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

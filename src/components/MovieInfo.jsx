export default function MovieInfo({ video, onClick, data }) {
  if (!video) return null;
  const {
    title,
    original_language: lang,
    overview,
    release_date,
    adult,
    vote_average,
  } = data;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500/50 z-100">
      <div className="bg-dark-100 p-8 rounded-2xl shadow-inner shadow-light-100/10 w-[700px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="">Official Trailer</h2>
          <button
            className="px-4 py-2 bg-[#030014] rounded-lg shadow-inner shadow-light-100/30 text-white hover:shadow-light-100/70 hover:scale-105"
            onClick={onClick}
          >
            Close
          </button>
        </div>

        <div className="gap-2">
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-2xl shadow-amber-50/30 w-fit">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                title="YouTube Trailer"
                allow="accelerometer; autoplay; clipboard-write;"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <h2 className="text-3xl font-bold my-5">{title}</h2>

          <div className="flex gap-5 text-white">
            <p>
              Language : <span className="text-gray-100 uppercase">{lang}</span>
            </p>
            <p>
              Release Year:{" "}
              <span className="text-gray-100">
                {release_date ? release_date.split("-")[0] : "N/A"}
              </span>
            </p>
            <div className="flex items-center gap-2 text-gray-100">
              <span className="text-white">Rating: </span>
              <img src="star.svg" alt="Star Icon" />
              <p>{vote_average ? `${vote_average.toFixed(1)} / 10` : "N/A"}</p>
            </div>
          </div>

          {/* overview */}
          <div className="">
            <h3 className="text-white text-2xl my-5">Overview</h3>
            <p className="text-gray-100 text-wrap">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

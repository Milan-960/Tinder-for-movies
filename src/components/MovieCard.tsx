interface MovieCardProps {
  id: string;
  imageURL: string;
  title: string;
  summary: string;
  rating: number;
  onAccept: () => void;
  onReject: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  imageURL,
  title,
  summary,
  rating,
  onAccept,
  onReject,
}) => {
  return (
    <>
      <div className="movie-card">
        <p>Rating: ({rating}/10)</p>
        <img src={imageURL} alt={title} />
        <h3>Movie: {title}</h3>
        <p>{summary}</p>
        <div className="movie-actions">
          <button className="accept-button" onClick={onAccept}>
            ✔️ Accept
          </button>
          <button className="reject-button" onClick={onReject}>
            ❌ Reject
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieCard;

const Rating = ({ onRatingChange }) => {
  const handleRatingChange = (e) => {
    const selectedRating = e.target.value;
    onRatingChange(selectedRating);
  };

  return (
    <div>
      <div className="rating rating-2">
        <input
          type="radio"
          name="rating"
          value="1"
          className="mask mask-star-2 bg-orange-400"
          onChange={handleRatingChange}
          defaultChecked
        />
        <input
          type="radio"
          name="rating"
          value="2"
          className="mask mask-star-2 bg-orange-400"
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name="rating"
          value="3"
          className="mask mask-star-2 bg-orange-400"
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name="rating"
          value="4"
          className="mask mask-star-2 bg-orange-400"
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name="rating"
          value="5"
          className="mask mask-star-2 bg-orange-400"
          onChange={handleRatingChange}
        />
      </div>
    </div>
  );
};

export default Rating;

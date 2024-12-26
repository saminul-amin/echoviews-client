import { useState } from "react";

export default function Categories({ categories, onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const hanldeCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  //   console.log(selectedCategory);
  onCategoryChange(selectedCategory);

  return (
    <div className="text-right">
      <select
        value={selectedCategory}
        onChange={hanldeCategoryChange}
        className="select select-bordered w-1/4 shadow-lg bg-base-200"
      >
        {categories.map((category, idx) => (
          <option key={idx} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

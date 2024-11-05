import { useState, useEffect } from "react";

const initialCategories = [
  "Any",
  "Programming",
  "Misc",
  "Dark",
  "Pun",
  "Spooky",
  "Christmas",
];

export default function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [categories, setCategories] = useState(["Any"]);
  const [joke, setJoke] = useState("");

  async function fetchJoke() {
    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/${categories.join(",")}`
      );

      const result = await response.json();

      if (result && result.setup && result.delivery) {
        setJoke([result.setup, result.delivery]);
      } else if (result && result.joke) {
        setJoke(result.joke);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (isGenerating) {
      fetchJoke();
    }
    setIsGenerating(false);
  }, [isGenerating]);

  return (
    <div className="text-center">
      <h1 className="text-2xl">JOKE GENERATOR</h1>
      <div className="flex justify-center items-center flex-col gap-3 py-2 border">
        <p>Categories:</p>
        <div className="flex justify-center gap-4 ">
          {initialCategories.map((el) => (
            <div className="flex gap-2" key={el}>
              <input
                type="checkbox"
                checked={categories.includes(el)}
                onChange={() =>
                  categories.includes(el)
                    ? setCategories((prev) =>
                        prev.length === 1
                          ? [el]
                          : prev.filter((elem) => elem !== el)
                      )
                    : setCategories((prev) =>
                        prev.length > 0 && prev.includes("Any")
                          ? [...prev.filter((el) => el !== "Any"), el]
                          : prev.length > 0 && el === "Any"
                          ? [el]
                          : [...prev, el]
                      )
                }
              />
              <label>{el}</label>
            </div>
          ))}
        </div>
        <button
          className="border px-3 py-1 rounded-lg"
          onClick={() => setIsGenerating(true)}
        >
          Generate
        </button>
      </div>
      <div className="py-4">
        <p>{Array.isArray(joke) ? joke[0] + " " + joke[1] : joke}</p>
      </div>
    </div>
  );
}

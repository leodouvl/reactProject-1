import { useState } from "react";
import { tools } from "../proxy/tools";

interface SearchProps {
  onResult: (result: unknown) => void; // callback fournie par le parent
}

export function Search({ onResult }: SearchProps) {
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  async function search() {
    const result = await tools(`http://omdbapi.com/?apikey=eb198056&s=${name}`);
    console.log(result.Search);
    onResult(result.Search);
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await search();
      }}
    >
      <label htmlFor="film">Nom du film :</label>
      <input
        type="text"
        id="film"
        name="film"
        placeholder="Entrez le nom d’un film..."
        onChange={handleChange}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export const genres = [
  { id: "1", name: "Action" },
  { id: "2", name: "Fiction" },
  { id: "3", name: "Thriller" },
  { id: "4", name: "Memoir" },
  { id: "5", name: "Autobiography" }
];

export function getGenres() {
  return genres.filter(g => g);
}

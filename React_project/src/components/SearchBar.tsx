type Props = {
  query: string;
  onChange: (next: string) => void;
  placeholder?: string;
  id?: string;
};

export default function SearchBar({ query, onChange, placeholder = "Rechercher...", id = "search" }: Props) {
  return (
    <div className="search-bar">
      <label htmlFor={id} className="visually-hidden"></label>
      <input className="search"
        id={id}
        type="search"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Rechercher des utilisateurs"
        autoComplete="off"
      />
    </div>
  );
}

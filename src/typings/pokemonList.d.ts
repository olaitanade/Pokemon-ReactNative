type PokemonsResponse = {
  count: number;
  next: string;
  previous: null;
  results: Result[];
};

type Result = {
  name: string;
  url: string;
};

type PokemonCustom = {
  id: string;
  name: string;
  picture: string;
  color?: string;
};

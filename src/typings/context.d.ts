type StoreProps = {
  state: StateProps;
  dispatch: React.Dispatch<ActionProps>;
};

type ProviderProps = {
  children: React.ReactNode;
};

type StateProps = {
  theme: string;
  initialroute: string;
  pokemons: PokemonCustom[];
  pokemon: {
    about: About;
    stats: Stat[];
    evolution: Evolution | null;
    moves: Move[];
  };
};

type About =
  | ({
      flavorText: string;
    } & Pick<Species, 'egg_groups' | 'habitat'> &
      Pick<Pokemon, 'weight' | 'height' | 'abilities'>)
  | null;

type ActionProps =
  | {type: 'SET_INITIALROUTE'; payload: string}
  | {type: 'SET_POKEMONS'; payload: PokemonCustom[]}
  | {type: 'SET_ABOUT'; payload: About}
  | {type: 'SET_STATS'; payload: Stat[]}
  | {type: 'SET_EVOLUTION'; payload: Evolution | null}
  | {type: 'SET_MOVES'; payload: Move[]};

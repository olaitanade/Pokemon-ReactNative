type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: SpeciesCustom[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: SpeciesCustom;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
};

type Ability = {
  is_hidden: boolean;
  slot: number;
  ability: SpeciesCustom;
};

type SpeciesCustom = {
  name: string;
  url: string;
};

type GameIndex = {
  game_index: number;
  version: SpeciesCustom;
};

type HeldItem = {
  item: SpeciesCustom;
  version_details: VersionDetail[];
};

type VersionDetail = {
  rarity: number;
  version: SpeciesCustom;
};

type Move = {
  move: SpeciesCustom;
  version_group_details: VersionGroupDetail[];
};

type VersionGroupDetail = {
  level_learned_at: number;
  version_group: SpeciesCustom;
  move_learn_method: SpeciesCustom;
};

type Sprites = {
  back_female: string;
  back_shiny_female: string;
  back_default: string;
  front_female: string;
  front_shiny_female: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  other: Other;
  versions: Versions;
};

type Other = {
  dream_world: DreamWorld;
  'official-artwork': DreamWorld;
};

type DreamWorld = {};

type Versions = {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': {[key: string]: DreamWorld};
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
};

type GenerationI = {
  'red-blue': DreamWorld;
  yellow: DreamWorld;
};

type GenerationIi = {
  crystal: DreamWorld;
  gold: DreamWorld;
  silver: DreamWorld;
};

type GenerationIii = {
  emerald: DreamWorld;
  'firered-leafgreen': DreamWorld;
  'ruby-sapphire': DreamWorld;
};

type GenerationIv = {
  'diamond-pearl': DreamWorld;
  'heartgold-soulsilver': DreamWorld;
  platinum: DreamWorld;
};

type GenerationV = {
  'black-white': DreamWorld;
};

type GenerationVii = {
  icons: DreamWorld;
  'ultra-sun-ultra-moon': DreamWorld;
};

type GenerationViii = {
  icons: DreamWorld;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: SpeciesCustom;
};

type Type = {
  slot: number;
  type: SpeciesCustom;
};

import { DUNGEONS } from '../../../public/dungeons';
export interface Games {
  name: string;
  description: string;
  developer: string;
  publisher: string;
  released_date: string;
  id: number;
}

export interface Char {
  appearances: string[];
  name: string;
  description: string;
  gender: string;
  race: string;
  id: number;
  appearanceGames?: Games[];
}

export interface Monsters {
  appearances: string[];
  name: string;
  description: string;
  id: number;
  appearanceGames?: Games[];
}

export interface Dungeons {
  appearances: string[];
  name: string;
  description: string;
  id: number;
  appearanceGames?: Games[];
}

export interface Bosses {
  appearances: string[];
  dungeons: string[];
  name: string;
  description: string;
  id: number;
  appearanceGames?: Games[];
  dungeonList?: Dungeons[];
}

export interface Places {
  appearances: string[];
  inhabitants: string[];
  name: string;
  description: string;
  id: number;
  appearanceGames?: Games[];
  inhabitList?: Char[];
}
export interface Items {
  appearances: string[];
  name: string;
  description: string;
  id: number;
  appearanceGames?: Games[];
}

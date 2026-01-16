import type {
  IMarvelHeroesDataTable,
  MarvelHeroFilterValues
} from 'src/pages/MaterialUI/interfaces';

export const initialFiltersData: MarvelHeroFilterValues = {
  name: [],
  citizenship: [],
  creator: [],
  gender: [],
  memberOf: [],
  occupation: [],
  skills: [],
};

export const initialMarvelHero: IMarvelHeroesDataTable = {
  actions: null,
  citizenship: null,
  creator: null,
  id: null,
  gender: null,
  memberOf: null,
  name: null,
  occupation: null,
  skills: null,
};

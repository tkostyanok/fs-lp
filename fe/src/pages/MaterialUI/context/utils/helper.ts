import type {
  IMarvelHeroesDataTable,
  MarvelHeroFilterValues
} from 'src/pages/MaterialUI/interfaces';

export const initialFiltersData: MarvelHeroFilterValues = {
  name: [],
  citizenship: [],
  creator: [],
  gender: [],
  id: [],
  memberOf: [],
  occupation: [],
  skills: [],
};

export const initialMarvelHero: IMarvelHeroesDataTable = {
  canDelete: null,
  canEdit: null,
  citizenship: null,
  creator: null,
  gender: null,
  id: null,
  memberOf: null,
  name: null,
  occupation: null,
  skills: null,
};

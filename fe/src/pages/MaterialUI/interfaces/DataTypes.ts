export type Gender = 'male' | 'female';
export type Order = 'asc' | 'desc';
export type DataUsage = 'local' | 'remote';

export type MarvelHeroFilterValues = {
  [K in keyof IMarvelHeroesData]: string[];
};

export interface IMarvelHeroesData {
  name: string | null;
  citizenship: string | null;
  creator: string | null;
  gender: Gender | null;
  memberOf: string | null;
  occupation: string | null;
  skills: string | null;
}

export interface IMarvelHeroesDataTable extends IMarvelHeroesData {
  actions: React.ReactNode | null;
  id: string | null;
}
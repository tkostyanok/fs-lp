export type Gender = 'male' | 'female';

export interface IMarvelHeroesData {
  name: string | null;
  citizenship: string | null;
  creator: string | null;
  gender: Gender | null;
  memberOf: string | null;
  occupation: string | null;
  skills: string | null;
}

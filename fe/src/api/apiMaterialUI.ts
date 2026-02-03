import type {
  IMarvelHeroesData, IMarvelHeroesDataTable 
} from 'src/pages/MaterialUI/interfaces';

import axiosInstance from './axiosInstance';

const MARVEL_HEROES_URL = axiosInstance.defaults.baseURL + '/api/heroes';

// TODO: Implement error handling and logging
// TODO: Add pagination support for fetching heroes
// TODO: Implement filtering and sorting options
// TODO: Add caching mechanism to reduce redundant API calls
// TODO: Add notifications for success and error cases
// TODO: Add unit tests for each function

const getAllHeroes = async () => {
  return await axiosInstance
    .get(MARVEL_HEROES_URL)
    .then((response) => response.data as Omit<IMarvelHeroesDataTable, 'actions'>[])
    .catch((error) => {
      console.error('Error fetching heroes:', error);
      throw error;
    });
};

const createHero = async (newHero: Partial<IMarvelHeroesData>) => {
  return await axiosInstance
    .post(MARVEL_HEROES_URL, newHero)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error creating hero:', error);
      throw error;
    });
};

const deleteHero = async (id: string) => {
  return await axiosInstance
    .delete(`${MARVEL_HEROES_URL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error deleting hero:', error);
      throw error;
    });
};

const updateHero = async (id: string, updatedHero: Partial<IMarvelHeroesData>) => {
  return await axiosInstance
    .put(`${MARVEL_HEROES_URL}/${id}`, updatedHero)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error updating hero:', error);
      throw error;
    });
};

export default {
  getAllHeroes,
  createHero,
  deleteHero,
  updateHero,
};

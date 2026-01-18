import Grid from '@mui/material/Grid';

import {
  BasicInput, BasicSelect 
} from 'src/pages/MaterialUI/components/Atoms';
import type { IMarvelHeroesData } from 'src/pages/MaterialUI/interfaces';

import type { MarvelHeroInfoProps } from './MarvelHeroInfoProps';

export const MarvelHeroInfo = ({
  data, isLoading = false, onChange 
}: MarvelHeroInfoProps) => {
  // TODO: Optimize with add translation
  const LABELS: {[key in keyof IMarvelHeroesData]: string } = {
    name: 'Name',
    gender: 'Gender',
    citizenship: 'Citizenship',
    skills: 'Skills',
    occupation: 'Occupation',
    memberOf: 'Member of',
    creator: 'Creator',
  } as const;

  const GENDER_OPTIONS = [
    {
      title: 'female',
      value: 'female',
    },
    {
      title: 'male',
      value: 'male',
    },
  ];

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid size={12}>
        <BasicInput
          isLoading={isLoading}
          label={LABELS['name']}
          name='name'
          onChange={onChange}
          value={data?.name || ''}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <BasicSelect
          label={LABELS['gender']}
          name='gender'
          onChange={onChange}
          value={data?.gender || ''}
          options={GENDER_OPTIONS}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <BasicInput
          isLoading={isLoading}
          label={LABELS['citizenship']}
          name='citizenship'
          onChange={onChange}
          value={data?.citizenship || ''}
        />
      </Grid>
      {([ 'skills', 'occupation', 'memberOf', 'creator' ] as const).map((field) => (
        <Grid
          size={12}
          key={field}
        >
          <BasicInput
            isLoading={isLoading}
            label={LABELS[field]}
            name={field}
            onChange={onChange}
            value={data?.[field] || ''}
          />
        </Grid>
      ))}
    </Grid>
  );
};

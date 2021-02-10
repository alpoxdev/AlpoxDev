import React from 'react';

// stores
import { MSTProps } from 'stores';

// components
import {} from 'components';

export const SeriesListContainer = ({ store }: MSTProps): JSX.Element => {
  const { seriesStore } = store;
  const { seriesList } = seriesStore;

  return <>{JSON.stringify(seriesList.toJSON())}</>;
};

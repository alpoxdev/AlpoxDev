import React, { useCallback, useEffect } from 'react';
// import { useRouter } from 'next/router';

// stores
import { inject, observer } from 'mobx-react';
import { initializeStore, MSTProps } from 'stores';

// helmet
import { Helmet } from 'components';
import { customHelmet as helmet } from 'common/helmet';

// containers
import { SeriesListContainer } from 'containers';

// utils
import { deleteUndefinedInStore } from 'utils';

const SeriesListPage = ({ store }: MSTProps): JSX.Element => {
  const { seriesStore } = store;

  const onGetSeries = useCallback(() => {
    seriesStore.onGetSeriesList({});
  }, []);

  useEffect(() => {
    onGetSeries();
  }, [onGetSeries]);

  return (
    <>
      <Helmet
        helmet={helmet({
          title: '시리즈 - AlpoxDev',
        })}
      />
      <SeriesListContainer store={store} />
    </>
  );
};

export async function getServerSideProps() {
  const store = initializeStore();
  const { seriesStore } = store;

  await seriesStore.onGetSeriesList({});

  return { props: { initialState: deleteUndefinedInStore(store) } };
}

export default inject('store')(observer(SeriesListPage));

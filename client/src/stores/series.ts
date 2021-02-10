import { types, Instance } from 'mobx-state-tree';
import { SeriesRepository } from 'repository';

import { seriesList, series, createSeries, deleteSeries, updateSeries } from 'common/models';

export const SeriesStore = types
  .model('SeriesStore', {
    seriesList,
    series,
    createSeries,
    deleteSeries,
    updateSeries,
  })
  .actions((self) => ({
    onGetSeriesList: (props?) =>
      self.seriesList.onGetAll(() => SeriesRepository.onGetSeriesList(props), 'series'),
    onGetMoreSeriesList: (props?) =>
      self.seriesList.onGetAll(() => SeriesRepository.onGetSeriesList(props), 'series', true),
    onGetSeries: (props?) =>
      self.series.onGetOne(() => SeriesRepository.onGetSeries(props), 'series'),
  }));

const seriesStore = SeriesStore.create();

export type ISeriesStore = Instance<typeof seriesStore>;

export default seriesStore;

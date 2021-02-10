import { Instance, types } from 'mobx-state-tree';
import { createAsyncModel, createAsyncModels, EmptyModel } from 'common/mst';

export const Series = types.model('Series', {
  id: types.maybe(types.number),
});

export const seriesList = createAsyncModels('SeriesList', Series);
export const series = createAsyncModel('Series', Series);
export const createSeries = createAsyncModel('create', EmptyModel);
export const deleteSeries = createAsyncModel('delete', EmptyModel);
export const updateSeries = createAsyncModel('update', EmptyModel);

export type ISeries = Instance<typeof Series>;

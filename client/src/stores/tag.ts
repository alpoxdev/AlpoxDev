import { types, Instance } from 'mobx-state-tree';
import { TagRepository } from 'repository';

import { tags, tag, createTag, deleteTag, updateTag } from 'common/models';

export const TagStore = types
  .model('TagStore', {
    tags,
    tag,
    createTag,
    deleteTag,
    updateTag,
  })
  .actions((self) => ({
    onGetTags: (props?) => self.tags.onGetAll(() => TagRepository.onGetTags(props), 'tags'),
    onGetTag: (props?) => self.tag.onGetOne(() => TagRepository.onGetTag(props), 'tag'),
  }));

const tagStore = TagStore.create();

export type ITagStore = Instance<typeof tagStore>;

export default tagStore;

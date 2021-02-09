import { types, Instance } from 'mobx-state-tree';
import { PostRepository } from 'repository';

import { posts, post, createPost, deletePost, updatePost } from 'common/models';

export const PostStore = types
  .model('PostStore', {
    posts,
    post,
    createPost,
    deletePost,
    updatePost,
  })
  .actions((self) => ({
    onGetPosts: (props?) => self.posts.onGetAll(() => PostRepository.onGetPosts(props), 'posts'),
    onGetMorePosts: (props?) =>
      self.posts.onGetAll(() => PostRepository.onGetPosts(props), 'posts', true),
    onGetPost: (props?) => self.post.onGetOne(() => PostRepository.onGetPost(props), 'post'),
  }));

const postStore = PostStore.create();

export type IPostStore = Instance<typeof postStore>;

export default postStore;
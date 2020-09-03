import {
    ApickPost,
    ApickUser,
    ApickImage,
    ApickProduct,
    ApickTag
} from '../../entities';
import { In } from 'typeorm';

export const onGetApickPosts = async(page: any, take: any) => {
    const skip = (page * take);

    const posts = await ApickPost.find({
        relations : ['user', 'tags'],
        skip,
        take : parseInt(take, 10),
        order: {
            id: "DESC"
        }
    });
    return posts || [];
}

export const onGetApickPost = async(id : string | number) => {
    const post = await ApickPost.findOne({
        where : { id },
        relations : ['images', 'user', 'products', 'tags']
    });

    return post ? post : null;
}

export const onGetApickUserByInstagram = async(instagramId: string) => {
    const user = await ApickUser.findOne({
        where : { instagramId }
    });

    return user ? user : null;
}

export const onGetApickProduct = async(link: string) => {
    const product = await ApickProduct.findOne({
        where : { link },
        relations : ['posts']
    });
    return product ? product : null;
}

export const onGetApickTags = async() => {
    const tags = await ApickTag.find();
    return tags || [];
}

export const onGetApickTagById = async(name: string) => {
    const tag = await ApickTag.findOne({
        where : { tag : name }
    });

    return tag ? tag : null;
}

export const onGetApickTagListById = async(tagList : Array<number>) => {
    const tags = await ApickTag.find({
        where : { id : In(tagList)}
    });

    return tags || [];
}

export const onCreateImage = async(url, post: ApickPost) => {
    const newImage = new ApickImage();
    newImage.url = url;
    newImage.post = post;
    await ApickImage.save(newImage);

    return newImage;
}
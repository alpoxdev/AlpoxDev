import { Request, Response, NextFunction } from 'express';
import { ApickPost, ApickUser, ApickProduct } from '../../entities';
import { onGetApickUserByInstagram, onGetApickTagListById, onCreateImage, onGetApickProduct } from './apick';

import { CREATE_APICK_POST as route } from '../routes';

export const createApickPost = async(req : Request, res : Response, next : NextFunction) => {
    const isError = errorHandler(req, res, next);
    if(isError) return isError;
    
    try{
        return await tryCreateApickPost(req, res, next);
    }catch(error){
        console.log(error);
        next({ route });
    }
}

const tryCreateApickPost = async(req : Request, res: Response, next : NextFunction) => {
    const{
        thumbnail,
        link,
        picker_comment,
        tags = [],
        user = null,
        images = [],
        products = [],
    } = req.body;

    const newPost = new ApickPost();
    newPost.thumbnail = thumbnail;
    newPost.link = link;
    newPost.pickerComment = picker_comment;
    newPost.tags = tags.length !== 0 ? await onGetApickTagListById(tags) : [];
    newPost.user = await findOrCreateUser(user);
    await ApickPost.save(newPost);

    // console.log(`image...`);
    await createAndSaveImage(images, newPost);
    // console.log(`products...`);
    await findOrCreateProduct(products, newPost);    
    
    res.status(201).json({ post : newPost });
}

const createAndSaveImage = async(urlList: Array<string>, post : ApickPost) => {
    let images = [];
    for await (let url of urlList){
        const image = await onCreateImage(url, post);
        images.push(image);
    }

    return images;
}

const findOrCreateProduct = async(productList: ApickProduct[], post : ApickPost) => {
    let products = [];
    for await (let product of productList){
        const findProduct = await onGetApickProduct(product.link);
        // console.log(findProduct);

        if(findProduct){
            findProduct.posts.push(post);
            await ApickProduct.save(findProduct);
            
            products.push(findProduct);
        }else{
            const newProduct = await createAndSaveProduct(product, post);
            products.push(newProduct);
        }
    }

    return products;
}

const createAndSaveProduct = async(product : ApickProduct, post: ApickPost) => {
    const newProduct = new ApickProduct();
    newProduct.type = product.type;
    newProduct.name = product.name;
    newProduct.price = product.price;
    newProduct.link = product.link;
    newProduct.posts = [post];
    await ApickProduct.save(newProduct);
    
    return newProduct;
}

const findOrCreateUser = async(user : ApickUser) => {
    const instagramId = user?.instagramId;
    
    if(instagramId){
        const findUser = await onGetApickUserByInstagram(instagramId);
        if(findUser){
            return findUser;
        }else{
            return await createAndSaveUser(user);
        }
    }else{
        return null;
    }
}

const createAndSaveUser = async(user : ApickUser) => {
    const newUser = new ApickUser();
    newUser.height = user.height || null;
    newUser.weight = user.weight || null;
    newUser.bodyForm = user.bodyForm || null;
    newUser.instagramId = user.instagramId || null;
    newUser.instagramLink = user.instagramLink || null;

    await ApickUser.save(newUser);
    return newUser;
}

const errorHandler = (req : Request, res : Response, next : NextFunction) => {
    const {

    } = req.body;

    return false;
}
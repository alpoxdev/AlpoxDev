import { Request, Response, NextFunction } from 'express';
import { YourFaceHistory, YourFaceStar, YourFaceStory } from '../../entities';

import { ErrorHandler } from '../../utils';
import { GET_YOURFACE_RESULT as route } from '../routes';

const YOURFACE_COUNT = 20;
const YOURFACE_TYPE = 7;

export const getResult = async(req : Request, res : Response, next : NextFunction) => {
    const isError = errorHandler(req, res, next);
    if(isError) return isError;

    try{
        return await tryGetResult(req, res, next);
    }catch(error){
        next({
            status : 500,
            route 
        })
    }
}

const tryGetResult = async(req : Request, res : Response, next : NextFunction) => {
    const face = await createFace(req, res, next);
    const stars = await getStars(face);
    const stories = await getStories(face);

    return res.status(200).json({
        face,
        stars,
        stories
    })
}

const createFace = async(req : Request, res : Response, next : NextFunction) => {
    const {
		face_type,
		eye_type,
		nose_type,
		mouth_type,
		cheek_type,
		chin_type
    } = req.body;

    const face = new YourFaceHistory();
    face.FaceType = face_type;
    face.EyeType = eye_type;
    face.NoseType = nose_type;
    face.MouthType = mouth_type;
    face.CheekType = cheek_type;
    face.ChinType = chin_type;

    await YourFaceHistory.save(face);
    return face;
}

const getStories = async(face : YourFaceHistory) => {
	const storyIdType = ['face', 'eye', 'nose', 'mouth', 'cheek', 'chin'];
	const storyIdList = storyIdType.map((storyType : string)=>{
		const storyId = getStoryId(face, storyType);
		return { storyId };
	});
	
	const stories = await YourFaceStory.find({
		where : storyIdList
	});
	
	return stories;
}

const getStoryId = (face : YourFaceHistory, storyType : string) => {
	if(storyType === 'face'){
		const typeId = typeof face.FaceType === 'string' ? parseInt(face.FaceType) : face.FaceType;
		return typeId;
	}
	if(storyType === 'eye'){
		const typeId = typeof face.EyeType === 'string' ? parseInt(face.EyeType) : face.EyeType;
		return typeId + (YOURFACE_COUNT);
	}
	if(storyType === 'nose'){
		const typeId = typeof face.NoseType === 'string' ? parseInt(face.NoseType) : face.NoseType;
		return typeId + (YOURFACE_TYPE + YOURFACE_COUNT);
	}
	if(storyType === 'mouth'){
		const typeId = typeof face.MouthType === 'string' ? parseInt(face.MouthType) : face.MouthType;
		return typeId + (YOURFACE_TYPE * 2 + YOURFACE_COUNT);
	}
	if(storyType === 'cheek'){
		const typeId = typeof face.CheekType === 'string' ? parseInt(face.CheekType) : face.CheekType;
		return typeId + (YOURFACE_TYPE * 3 + YOURFACE_COUNT);
	}
	if(storyType === 'chin'){
		const typeId = typeof face.ChinType === 'string' ? parseInt(face.ChinType) : face.ChinType;
		return typeId + (YOURFACE_TYPE * 4 + YOURFACE_COUNT);
	}
	
	return null;
}

const getStars = async(face : YourFaceHistory) => {
	const stars = await YourFaceStar.find({
		where : { FaceType : face.FaceType },
		take : 50
	});

	return stars;
}

const errorHandler = (req : Request, res : Response, next : NextFunction) => {
    const {
		face_type,
		eye_type,
		nose_type,
		mouth_type,
		cheek_type,
		chin_type
	} = req.body;
	
	const isRequired = ErrorHandler.isRequiredExist({
		face_type,
		eye_type,
		nose_type,
		mouth_type,
		cheek_type,
		chin_type
	});
	
	if(isRequired.length > 0){
		return next({
			status : 400,
			route : 'POST /yourface/result',
			message : { isRequired }
		});
	}
	
	return false;
}
import {User} from './user';
import {Tag} from './tag';

export class Roost{
    id : number;
    shouts: number;
    listeners: number;
    comments: number;
    user: User;
    tags:  any;
    isShout: boolean;
    isListened: boolean;
    created_at: string;
    updated_at: string;
    title: string;
    text: string;
    location: string;
    lat: number;
    lng: number;
    video: string;
    audio: string;
    image: string;
    media_type: string;
    type: string;
    real_type: number;
    roost_media: File;
}
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {RoostService} from '../services/roost.service';
import {Roost} from '../shared/roost';
import {DisplayModal} from '../shared/displayModal.component';



export class UserActions{

    constructor(private _roostService: RoostService){

    }

    toggleShout(feed: Roost){
        this._roostService.shout(feed.id)
            .subscribe(roosts => {
                feed.isShout = true;
                feed.shouts = feed.shouts + 1;
                if(feed.isListened == true){
                    feed.isListened = false;
                    feed.listeners = feed.listeners - 1;
                }
            });
    }

    toggleListen(feed: Roost){
        this._roostService.listen(feed.id)
            .subscribe(roosts => {
                feed.isListened = true;
                feed.listeners = feed.listeners + 1;
                if(feed.isShout == true){
                    feed.isShout = false;
                    feed.shouts = feed.shouts - 1;
                }
            });
    }

    displayShoutsList(feed: Roost, modal: DisplayModal){ 
        this._roostService.listShouts(feed.id)
            .subscribe(lists => {
               console.log(lists);
               modal.displayHeader = "Reached"
               modal.displayList = lists.results;
            });
    }

    displayListenersList(feed: Roost, modal: DisplayModal){
        this._roostService.listListeners(feed.id)
            .subscribe(lists => {
               modal.displayHeader = "Spoke up";
               modal.displayList = lists.results;
            });
    }
}

import { Pipe } from "@angular/core";

import {Feed} from './feed';

@Pipe({
  name: "dateSort"
})
export class SortDatePipe {
 transform(feeds: Feed[], args: string): Feed[] {
   if(feeds != null)
      feeds.sort((a: Feed, b: Feed) => {
        if (new Date(a.created_at) < new Date(b.created_at)) {
          return 1;
        } else if (new Date(a.created_at) > new Date(b.created_at)) {
          return -1;
        } else {
          return 0;
        }
      });
    return feeds;
  }
}
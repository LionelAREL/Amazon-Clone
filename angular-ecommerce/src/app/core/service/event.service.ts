import { Injectable } from '@angular/core';
import { filter, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

    eventSubject = new Subject<any>();

    constructor() {
    }

    emmitEvent(event:any){
        this.eventSubject.next(event);
    }
    
    event(eventName:string){
        return this.eventSubject.pipe(
            filter(event => {
                return event.name == eventName
            })
        )
    }
}

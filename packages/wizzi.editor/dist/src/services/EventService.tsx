/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\services\EventService.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import EventEmitter, {ListenerFn} from 'eventemitter3';
import {TimedService} from './TimedService';

class EventService {
    constructor() {
        this.eventEmitter = new EventEmitter();
    }
    eventEmitter: EventEmitter;
    timedServices: { 
        [k: string]: TimedService;
    } = {};
    on(eventName: string, listener: ListenerFn) {
        this.eventEmitter.on(eventName, listener);
    }
    off(eventName: string, listener: ListenerFn) {
        this.eventEmitter.removeListener(eventName, listener);
    }
    emit(event: string, payload: any, error = false) {
        this.eventEmitter.event_emit(event, payload, error);
    }
    setTimed(event: string, onOff: boolean, payload?: any, frequence?: number) {
        let ts = this.timedServices[event];
        if (ts) {
            if (!onOff) {
                ts.setFrequence(0);
            }
            else {
                payload && ts.setPayload(payload)
                frequence && ts.setFrequence(frequence)
            }
        }
        else {
            this.timedServices[event] = new TimedService(payload, frequence || 1000, (payload: any) => 
            
                this.emit(event, payload)
            );
            ;
        }
    }
    getEventEmitter() {
        return this.eventEmitter;
    }
}

let _eventService: EventService;

export function getEventServiceInstance():  EventService {

    if (!_eventService) {
        _eventService = new EventService();
    }
    return _eventService;
}

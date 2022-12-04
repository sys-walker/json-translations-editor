import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsManagerService {
  public event: BehaviorSubject<any> = new BehaviorSubject(undefined);
  constructor() {}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class LoaderService {

  loading: boolean = true;

  public isLoading = new BehaviorSubject(false);
  constructor() {

  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class LocalStoreService {

  constructor() { }
  
  get(key)// key -> 'userTokken' for access tokken & 'userDetail' for user detail
  {
    return localStorage.getItem(key);
  }
  set(key,value)
  {
    localStorage.setItem(key,value);
  }
  remove(key)
  {
    localStorage.removeItem(key);
  }
}

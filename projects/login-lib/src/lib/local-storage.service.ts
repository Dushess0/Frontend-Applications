import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;
  private offineModeKey = "offlineMode";

  constructor() {
    this.localStorage = window.localStorage;
  }


  set OffLineMode(value: boolean) {
    this.set(this.offineModeKey, value);
  }
  get OffLineMode(): boolean {
    return this.get(this.offineModeKey) as boolean;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      const item = this.localStorage.getItem(key);
      if (item != null)
        return JSON.parse(item);
      else
        return null;
    }
    return null;
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }
  public get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}

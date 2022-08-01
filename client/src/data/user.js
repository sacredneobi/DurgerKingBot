import { makeAutoObservable } from "mobx";

export default class DrawerStore {
  constructor() {
    this._isUser = true;
    makeAutoObservable(this);
  }

  get isUser() {
    return this._isUser;
  }

  setIsUser(value) {
    this._isUser = value;
  }
}

import { makeAutoObservable } from "mobx";

export default class DrawerStore {
  constructor() {
    this._isShowDelete = false;
    this._isShowEdit = false;
    this._isShowCreate = false;
    makeAutoObservable(this);
    this._data;
  }

  get isShowDelete() {
    return this._isShowDelete;
  }

  get isShowEdit() {
    return this._isShowEdit;
  }

  get isShowCreate() {
    return this._isShowCreate;
  }

  get data() {
    return this._data;
  }

  setIsShowDelete(value, data) {
    this._isShowDelete = value;
    this._data = data;
  }

  setIsShowEdit(value) {
    this._isShowEdit = value;
  }

  setIsShowCreate(value) {
    this._isShowCreate = value;
  }
}

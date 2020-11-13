import { action, computed, observable } from 'mobx';

export default class HomeStore {
  @observable isAppLoading: boolean = true;
}

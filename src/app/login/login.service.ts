import {Injectable} from '@angular/core';
import * as SenBird from 'SendBird';
import config from '../chat.config';
import {User} from "../model/user";


@Injectable()
export class LoginService {
  private sb: any;
  handlerIds: Array<any>;

  constructor() {
    this.sb = new SenBird(Object.assign({}, config));
  }

  isConnected() {
    return !!this.sb.currentUser;
  }

  getSendBirdInstance() {
    return this.sb;
  }

  login(user: User): Promise<User> {

    return new Promise((resolve, reject) => {

      this.sb.connect(user.userId, (user, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });

    });

  }

  logout() {
    return new Promise((resolve, reject) => {
      try {
        this.sb.disconnect(() => {
          this.handlerIds.forEach(handlerId => {
            this.sb.removeChannelHandler(handlerId);
          });

          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

}

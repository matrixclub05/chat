import { Injectable } from '@angular/core';
import {LoginService} from "../login/login.service";

@Injectable()
export class ChatService {
  private sb: any;
  private userListQuery: any;
  private handlerIds: any[] = [];
  constructor(private loginService: LoginService) {
    this.sb = loginService.getSendBirdInstance();
  }

  fetchConversationList() {
    return new Promise((resolve, reject) => {
      try {
        let conversationListQuery = this.sb.OpenChannel.createOpenChannelListQuery();
        conversationListQuery.includeEmpty = true;
        conversationListQuery.limit = 100;

        if (conversationListQuery.hasNext) {
          conversationListQuery.next((conversationList, error) => {
            if (error) {
              reject(error);
            } else {
              debugger;
              resolve(conversationList);
            }
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  getCurrentUser() {
    return this.sb.currentUser;
  }

  getUserList(){

    return new Promise((resolve, reject) => {
      try {
        if (!this.userListQuery) {
          this.userListQuery = this.sb.createUserListQuery();
        }
        if (this.userListQuery.hasNext && !this.userListQuery.isLoading) {
          this.userListQuery.next((userList: any[], error) => {
            if (error) {
              reject(error);
            } else {
              resolve(userList);
            }
          });
        }
      } catch (e) {
        reject(e);
      }
    });


  }
  sendMessage(conversationUrl, messageText) {
    return new Promise((resolve, reject) => {
      try {
        this.sb.GroupChannel.getChannel(conversationUrl, (conversation, error) => {
          if (error) {
            reject(error);
          } else {
            conversation.sendUserMessage(
              messageText,
              '',
              '',
              (message, error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(message);
                }
              }
            );
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  createSession(userId) {
    return new Promise((resolve, reject) => {
      try {
        this.sb.GroupChannel.createChannelWithUserIds(
          [userId],
          true,
          `Conversation between "${userId}" and "${this.sb.currentUser.userId}"`,
          '',
          '',
          '',
          (createdConversation: any = {url: ''}, error) => {
            if (error) {
              reject(error);
            } else {
              resolve(createdConversation);
            }
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  getMessageList(conversationUrl) {
    return new Promise((resolve, reject) => {
      try {
        this.sb.GroupChannel.getChannel(conversationUrl, (conversation, error) => {
          if (error) {
            reject(error);
          } else {
            const messageListQuery = conversation.createPreviousMessageListQuery();

            messageListQuery.load(100, true, (messageList, error) => {
              if (error) {
                reject(error);
              } else {
                resolve(messageList);
              }
            });
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  subscribeForMessageReceived(id, callback) {
    const conversationHandler = new this.sb.ChannelHandler();
    const handlerId = id + new Date().getTime();

    conversationHandler.onMessageReceived = callback;

    this.sb.addChannelHandler(handlerId, conversationHandler);

    this.handlerIds.push(handlerId);
  }

}

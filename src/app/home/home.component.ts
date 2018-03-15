import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {ChatService} from "../services/chat.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  messageList: any[];
  userList: any[];
  selectedUser: any;
  url: string;
  message: string;
  currentUser: any;

  constructor(private chatService: ChatService) {
    this.messageList = [];
    this.userList = [];
  }

  ngOnInit() {

    this.chatService.getUserList().then((list)=>{
      this.userList = this.processUsers(list);
    });
    this.currentUser = this.chatService.getCurrentUser();

    this.chatService.subscribeForMessageReceived(this.currentUser.userId, this.onMessageReceived.bind(this))

  }
  onMessageReceived (data) {
    this.messageList.push(data.lastMessage);
  }
  private processUsers(userList): Array<any> {
    let list = Array.prototype.slice.call(userList);
    return list.filter((user) => {
      return user.userId !== this.currentUser.userId;
    });
  }

  private processMessages(messages): Array<any> {
    let ms = Array.prototype.slice.call(messages);
    return  ms.reverse();
  }

  onUserSelect(user: any){
    this.selectedUser = user;
    this.chatService.createSession(user.userId).then((conversation)=>{

      this.url = conversation['url'];

      this.chatService.getMessageList(this.url).then((data)=>{
        this.messageList = this.processMessages(data);
      });

    })
  }

  onMessageSubmit(){
    this.chatService.sendMessage(this.url, this.message).then((data)=>{
      this.messageList.push(data);
    });
  }

}

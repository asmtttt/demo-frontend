import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { Profile } from 'src/app/core/models/profile.model';
import { Message } from 'src/app/core/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messageList') messageList!: ElementRef;

  users: Profile[] = [];
  selectedUser: Profile | null = null;
  messages: Message[] = [];
  newMessage = '';
  loading = false;
  showSidebar = false;
  private realtimeChannel: any;

  constructor(public authService: AuthService, private messageService: MessageService) {}

  async ngOnInit() {
    const allUsers = await this.authService.getAllProfiles();
    this.users = allUsers.filter(u => u.id !== this.authService.currentUser?.id);
    this.subscribeRealtime();
  }

  async selectUser(user: Profile) {
    this.selectedUser = user;
    this.loading = true;
    const myId = this.authService.currentUser!.id;
    this.messages = await this.messageService.getConversation(myId, user.id);
    await this.messageService.markAsRead(user.id, myId);
    this.loading = false;
    setTimeout(() => this.scrollToBottom(), 50);
  }

  async sendMessage() {
    if (!this.newMessage.trim() || !this.selectedUser) return;
    const myId = this.authService.currentUser!.id;
    const content = this.newMessage.trim();
    this.newMessage = '';

    const { data } = await this.messageService.sendMessage(myId, this.selectedUser.id, content);
    if (data) {
      this.messages.push(data as Message);
      setTimeout(() => this.scrollToBottom(), 50);
    }
  }

  private subscribeRealtime() {
    const myId = this.authService.currentUser!.id;
    this.realtimeChannel = this.messageService.subscribeToMessages(myId, msg => {
      if (this.selectedUser?.id === msg.sender_id) {
        this.messages.push(msg);
        setTimeout(() => this.scrollToBottom(), 50);
      }
    });
  }

  private scrollToBottom() {
    const el = this.messageList?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  isMyMessage(msg: Message): boolean {
    return msg.sender_id === this.authService.currentUser?.id;
  }

  formatTime(dateStr: string): string {
    return new Date(dateStr).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  ngOnDestroy() {
    this.realtimeChannel?.unsubscribe();
  }
}

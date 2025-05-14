import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './error-message.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {
  message: string = '';
  @ViewChild('infoModal', { static: true }) modal!: ElementRef;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe(message => {
      this.message = message;
      if (message) {
        this.showModal();
      }
    });
  }

  showModal(): void {
  }

  closeModal(): void {
  }
}

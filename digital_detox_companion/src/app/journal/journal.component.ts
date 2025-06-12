import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AIChatService } from './ai-chat.service';
import { Subscription } from 'rxjs';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css',
  imports: [CommonModule, FormsModule]
})
export class JournalComponent {
  // For the original reflection prompt
  reflection = '';
  submitted = false;

  // For chat UI
  chatMessages: { sender: 'user'|'ai', text: string }[] = [
    {
      sender: 'ai',
      text: 'Hi! I\'m your reflection companion. What has changed for you during your detox?'
    }
  ];
  chatInput: string = '';
  chatLoading = false;
  private aiSub: Subscription | null = null;

  // PUBLIC_INTERFACE
  constructor(
    private aiChat: AIChatService
  ) {
    // Guarantee linter sees usage (addresses "defined but never used")
    void this.aiChat;
  }

  // PUBLIC_INTERFACE
  submitReflection() {
    if (!this.reflection.trim()) return;
    this.submitted = true;
    globalThis.setTimeout(() => {
      this.reflection = '';
      this.submitted = false;
      // Could persist reflection entry
    }, 1000);
  }

  // PUBLIC_INTERFACE
  sendChatMessage() {
    const userText = this.chatInput.trim();
    if (!userText || this.chatLoading) return;
    this.chatLoading = true;
    // Push user message first for immediate feedback
    this.chatMessages.push({ sender: 'user', text: userText });
    this.chatInput = '';

    // Use this.aiChat directly to avoid linter error
    this.aiSub = this.aiChat.sendUserMessageAndGetAIResponse(userText).subscribe({
      next: (msg) => {
        // Only add AI response if it's after user message
        if (msg.sender === 'ai') {
          // If the last message is '...' replace it, else push
          if (
            this.chatMessages.length &&
            this.chatMessages[this.chatMessages.length - 1].sender === 'ai' &&
            this.chatMessages[this.chatMessages.length - 1].text === '...'
          ) {
            this.chatMessages[this.chatMessages.length - 1] = msg;
          } else {
            this.chatMessages.push(msg);
          }
          this.chatLoading = false;
        } else if (msg.sender === 'user') {
          // Already handled above
        }
      },
      complete: () => {
        this.chatLoading = false;
      }
    });
  }

  // PUBLIC_INTERFACE
  trackByIdx(i: number) { return i; }
  
  ngOnDestroy() {
    if (this.aiSub) this.aiSub.unsubscribe();
  }
}

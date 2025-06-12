import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';

/**
 * Service to handle the AI chat logic for the Journal.
 * For now, it simulates real-time AI responses and supports easy upgrade to real API integration.
 */
// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class AIChatService {
  private motivationalReplies: string[] = [
    "That's a wonderful reflection! 🌟 How did you notice those positive changes in your daily habits?",
    "Keep going – every small mindful step makes a difference. What has surprised you most so far?",
    "Fantastic! Is there one habit you want to strengthen further this week?",
    "Great insight. How does screen-free time affect your mood or relationships?",
    "You're doing amazing! What helps you stay on track during tough days?",
    "Love this! Think of one offline activity to repeat tomorrow."
  ];

  // PUBLIC_INTERFACE
  sendUserMessageAndGetAIResponse(userText: string): Observable<{ sender: 'user'|'ai', text: string }> {
    // This simulates a streaming AI: echoes user, then after a short delay, shows a motivational AI reply
    const aiReply = this.motivationalReplies[
      Math.floor(Math.random() * this.motivationalReplies.length)
    ];

    // Explicitly casting sender type
    return of(
      { sender: 'user' as 'user', text: userText },
      // Simulating "thinking/typing..." from AI
      { sender: 'ai' as 'ai', text: '...' }
    ).pipe(
      concatMap(msg =>
        msg.sender === 'ai'
          ? timer(650).pipe(concatMap(() =>
                of({
                  sender: 'ai' as 'ai',
                  text: aiReply,
                })
            ))
          : of(msg)
      )
    );
  }
}

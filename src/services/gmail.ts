import { Email } from '../types/email';

export async function fetchEmails(accessToken: string): Promise<Email[]> {
  try {
    const response = await fetch(
      'https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    const data = await response.json();
    const emails: Email[] = [];

    for (const message of data.messages) {
      const emailData = await fetch(
        `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      const fullEmail = await emailData.json();
      const headers = fullEmail.payload.headers;
      
      emails.push({
        id: message.id,
        subject: headers.find((h: any) => h.name === 'Subject')?.value || 'No Subject',
        sender: headers.find((h: any) => h.name === 'From')?.value || '',
        recipients: [headers.find((h: any) => h.name === 'To')?.value || ''],
        content: decodeEmailContent(fullEmail.payload),
        timestamp: new Date(parseInt(fullEmail.internalDate)),
        priority: 'normal',
        read: !(fullEmail.labelIds || []).includes('UNREAD'),
      });
    }

    return emails;
  } catch (error) {
    console.error('Error fetching emails:', error);
    return [];
  }
}

function decodeEmailContent(payload: any): string {
  if (payload.body.data) {
    return atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
  }
  
  if (payload.parts) {
    return payload.parts
      .filter((part: any) => part.mimeType === 'text/plain')
      .map((part: any) => atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/')))
      .join('\n');
  }
  
  return '';
}
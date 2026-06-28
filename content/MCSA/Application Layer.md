---
title: Application Layer
tags:
  - OCSA
  - OSI
draft:
---
# Port number (2^16)
 > used to identify specific application or services on a device
 
 ---
## Well-Known Ports (0-1023)
> reserved for standardized network services and core operating system processes

---

## Registered Ports (1024–49151)
> assigned by IANA to specific vendor application and user services

---
## Dynamic/Private Ports (49152–65535)
> temporarily assigned for client connections

---
# Email Protocols    
  
| Protocol | Purpose                     | Default Port |
| -------- | --------------------------- | -----------: |
| SMTP     | Send email                  |           25 |
| POP3     | Receive (Download) email    |          110 |
| IMAP     | Receive (Synchronize) email |          143 |
  
> **Remember:**  
> - **SMTP = Send**  
> - **POP3 = Pull (Download)**  
> - **IMAP = Sync**  
  
---  
  
# SMTP (Simple Mail Transfer Protocol)  
  
## Default Port  
  
- **25/TCP** → Mail Server to Mail Server communication  
- **587/TCP** → Mail Client Submission (Recommended)  
- **465/TCP** → SMTPS (Legacy SSL)  
  
> SMTP is used to **send email** only.  
  
---  
  
## Purpose  
  
SMTP is responsible for:  
  
- Sending email from a client to a mail server.  
- Sending email between mail servers.  
- Relaying email across the Internet.  
  
SMTP **does not retrieve emails**.   
  
---  
  
## SMTP Commands  
  
| Command   | Description                                   |
| --------- | --------------------------------------------- |
| HELO      | Introduces the client                         |
| EHLO      | Extended HELO (supports modern SMTP features) |
| MAIL FROM | Specifies the sender                          |
| RCPT TO   | Specifies the recipient                       |
| DATA      | Begins the email message                      |
| QUIT      | Ends the session                              |

  
---  
  
## SMTP Security  
  
SMTP originally sends data in plain text.  
  
Secure methods include:  
  
- SSL/TLS  
- STARTTLS  
- SMTP Authentication (Username & Password)  
  
  
---  
  
# POP3 (Post Office Protocol v3)  
  
## Default Ports  
  
- **110/TCP** → POP3  
- **995/TCP** → POP3 over SSL/TLS  
  
## Purpose  
  
POP3 downloads emails from the mail server to the local computer.  
  
After downloading, emails are usually removed from the server.  
  
Best for:  
  
- One device  
- Offline access  
  
---  
  
# IMAP (Internet Message Access Protocol)  
  
## Default Ports  
  
- **143/TCP** → IMAP  
- **993/TCP** → IMAPS (SSL/TLS)  
  
## Purpose  
  
IMAP synchronizes emails between the mail server and multiple devices.  
  
Emails remain stored on the server.  
  
Best for:  
  
- Multiple devices  
- Phones + Laptops  
- Tablets  
- Webmail  
  
---  
  
# SMTP vs POP3 vs IMAP  
  
| Feature | SMTP | POP3 | IMAP |  
|---------|------|------|------|  
| Send Email | ✅ | ❌ | ❌ |  
| Receive Email | ❌ | ✅ | ✅ |  
| Synchronization | ❌ | ❌ | ✅ |  
| Keeps Mail on Server | N/A | Usually No | Yes |  
| Multiple Devices | ❌ | Limited | Excellent |  
  
---  
  
# Common Mail Server Applications  
  
- Microsoft Exchange Server  
- Lotus Domino (IBM/HCL Domino)  
- Postfix  
- Sendmail  
  
--- 
# Mail Client Applications  
  
Common email clients include:  
  
- Microsoft Outlook  
- Mozilla Thunderbird  
- Apple Mail  
- Windows Mail  
- Gmail (Web)  
- Outlook Web App (OWA)  

---

# FTP (File Transfer Protocol)
  > Used to transfer files between client and server over a network

  ---
## Default Ports 
  - **21/TCP** → Control connection (commands)
  - **20/TCP** → Data connection
---
## FTP allows users to:  
- Upload files to a server  
- Download files from a server
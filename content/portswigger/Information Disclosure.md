---
title: Information Disclosure
tags:
  - PortSwigger
  - WebSecurity
draft: false
---

# What is Information Disclosure?

**Information Disclosure** is a class of security vulnerability where a system *unintentionally reveals sensitive information* to unauthorized users.  

This leaked information may include:  
- Technical details about the system (e.g., error messages, stack traces)  
- Software and framework versions  
- User data or session id
- Configuration files or backup files  
- API keys, tokens, or credentials  

Even seemingly minor leaks can help attackers **fingerprint the system**, identify potential weaknesses, and combine them with other vulnerabilities to launch more targeted attacks.  

---

## Common Causes of Information Disclosure

- **Verbose error messages** → Exposing stack traces, SQL errors, or debugging details.  
- **Misconfigured servers** → Directory listing enabled, public access to hidden files.  
- **Excessive information in HTTP headers** → Server type and version banners.  
- **Insecure code practices** → Hardcoded credentials, exposed API keys in frontend code.  
- **Backup and config file exposure** → `.bak`, `.env`, or old source code left accessible.  
- **Improper access controls** → Sensitive resources not properly restricted.  
- **Third-party integrations** → Leaking tokens or details in logs and responses.  

---

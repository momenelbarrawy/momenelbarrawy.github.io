---
title: Authentication vulnerabilities
draft: false
tags:
  - web
  - basic
  - portswigger
---
# What is Authentication
> Authentication : Proving **who you are**
## Types of Authentication
- Something You **know** : Knowledge factors (password, PIN, secret question).
- Something You **have** : Physical object (phone,smartcard).
- Something You **are** : Fingerprint, face, voice.
## Authentication vs Authorization
- Authentication : Proving **who you are**.
- Authorization = Deciding **what you can do**.

# How do authentication vulnerabilities arise?
## Weak Systems
- weak passwords (e.g., 123456).
- No brute force protection (`unlimited guesses`).
- Username enumeration : error messages reveal which usernames exist.
- Passwords stored insecurely : saved in plaintext or weakly hashed.

## 
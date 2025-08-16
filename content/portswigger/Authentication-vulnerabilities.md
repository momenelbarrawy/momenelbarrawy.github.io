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
---
# How do authentication vulnerabilities arise?

- weak passwords (e.g., 123456).
- No brute force protection (`unlimited guesses`).
- 2FA is checked incorrectly or can be avoided.
- Remember me or reset links are badly designed.
---
# Brute-force attacks
> Attackers use trial-and-error to guess usernames and passwords using wordlists.
## Brute-forcing usernames

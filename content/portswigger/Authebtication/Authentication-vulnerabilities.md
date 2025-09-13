---
title: Authentication vulnerabilities
draft: false
tags:
  - Authentication
  - PortSwigger
---
# What is Authentication
Authentication : Proving **who you are**
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
Attackers use trial-and-error to guess usernames and passwords using wordlists.
## Brute-forcing usernames
- Username can be gussed or have a pattern (firstname.lastname@company.com, admin).
- leak usernames

## Brute-Forcing Passwords
- Password policies (uppercase, special characters, numbers).
- weak passwords.

## Username Enumeration
Detecting valid usernames based on differences in the site’s behavior.
- Common signs:
  - Status codes
  - Error messages
  - Response times

[Lab 1](./Username-enumeration-via-different-responses)
---
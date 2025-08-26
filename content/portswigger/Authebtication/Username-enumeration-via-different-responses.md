---
title: Username Enumeration via Different Responses
draft: false
tags:
  - PortSwigger
  - Authentication
  - Username Enumeration
  - Write-up
---
# Lab Description

This lab is vulnerable to **username enumeration** and **password brute-force** attacks.  
It contains an account with a predictable username and password, which can be found in the following wordlists:

- [Candidate usernames](https://portswigger.net/web-security/authentication/auth-lab-usernames)  
- [Candidate passwords](https://portswigger.net/web-security/authentication/auth-lab-passwords)

**Objective:** Enumerate a valid username, brute-force the password for this user, and then access their account page.

---

# Steps

## Step 1: Identifying the Vulnerability
Attempt to log in with any username:  

![a](/portswigger/Authebtication/Username-enumeration-via-different-responsess/1.png)  

![a](/portswigger/Authebtication/Username-enumeration-via-different-responsess/2.png)  

Here, we can see the **username enumeration vulnerability**.  

---

## Step 3: Username Enumeration
Now, we need to enumerate the username list.  

1. Send the login request to **Intruder**:  
![a](/portswigger/Authebtication/Username-enumeration-via-different-responsess/3.png)  

---

2. Configure a **Sniper attack** → Set the username value → Load payloads from the username list → Start the attack:  
![a](/portswigger/Authebtication/Username-enumeration-via-different-responsess/4.png)  

---

3. All status codes are **200**. However, if we compare response lengths, we can see only one with a different length:  
![a](/portswigger/Authebtication/Username-enumeration-via-different-responsess/5.png)  

The response:  
![a](/portswigger/Authebtication/Username-enumeration-via-different-responsess/9.png)  

---

## Step 4: Password Brute-Force
1. Set up Burp for the attack:  
Configure a **Sniper attack** → Set the password value → Load payloads from the password list → Start the attack.  

![a](/portswigger/Authebtication/Username-enumeration-via-different-responsess/6.png)  

---

2. Filter results by **status code**:  
![a](/portswigger/Authebtication/Username-enumeration-via-different-responsess/7.png)  

---

## Step 5: Successful Login
Finally, log in with the discovered **username and password**:  

![a](/portswigger/Authebtication/Username-enumeration-via-different-responsess/8.png)

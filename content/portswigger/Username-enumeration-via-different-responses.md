---
title: Username enumeration via different responsess
draft: false
tags:
  - PortSwigger
  - Authentication
  - Username Enumeration
  - Write-up
---
# Lab Description

 This lab is vulnerable to username enumeration and password brute-force attacks. It has an account with a predictable username and password, which can be found in the following wordlists:

  [Candidate usernames](https://portswigger.net/web-security/authentication/auth-lab-usernames)

  [Candidate passwords](https://portswigger.net/web-security/authentication/auth-lab-passwords)

To solve the lab, enumerate a valid username, brute-force this user's password, then access their account page. 

---

# Steps

## Step 1 (where is the vulnerability)
try to login as any user
![a](/portswigger/images4Username%20enumeration%20via%20different%20responsess/1.png)

![a](/portswigger/images4Username%20enumeration%20via%20different%20responsess/2.png)

there is the username enumeration vulnerability 

---

## Step 3 (username enumeration)
in this step we need to enumerate username list i got it 
1. take login request to intruder
![a](/portswigger/images4Username%20enumeration%20via%20different%20responsess/3.png)

---

2. set sniper attack => set username value => set payload from username list => start attack
![a](/portswigger/images4Username%20enumeration%20via%20different%20responsess/4.png)

---

3. all status code is 200 . we can try a length , we can see there is only one with different length.
![a](/portswigger/images4Username%20enumeration%20via%20different%20responsess/5.png)

the respose :
![a](/portswigger/images4Username%20enumeration%20via%20different%20responsess/9.png)

---

## Step 4 (password brute-force)
1. setup burp for the attack
set sniper attack => set password value => set payload from password list => start attack
![a](/portswigger/images4Username%20enumeration%20via%20different%20responsess/6.png)

---

2. filter by status code 
![a](/portswigger/images4Username%20enumeration%20via%20different%20responsess/7.png)

##
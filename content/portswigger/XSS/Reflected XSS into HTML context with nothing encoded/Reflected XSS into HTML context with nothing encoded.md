---
title: Reflected XSS into HTML context with nothing encoded
draft: false
tags:
  - PortSwigger
  - WebSecurity
  - XSS
---

# Table of Contents
1. [Steps](#steps)
   1. [Search for input](#search-for-input)
   2. [Test input](#test-input)
   3. [Show source code](#show-source-code)
   4. [Try to inject JS](#try-to-inject-js)
   5. [Done](#done)

# Steps
1. [Search for input](#search-for-input)

## Search for input
![Input field screenshot](/portswigger/XSS/Reflected%20XSS%20into%20HTML%20context%20with%20nothing%20encoded/images/input.png)

## Test input
![Testing the input](/portswigger/XSS/Reflected%20XSS%20into%20HTML%20context%20with%20nothing%20encoded/images/try%20input.png)

## Show source code
![Reflected input in source code](/portswigger/XSS/Reflected%20XSS%20into%20HTML%20context%20with%20nothing%20encoded/images/input%20reflact%20source.png)

## Try to inject JS
The input is reflected inside an HTML tag, so we will try to open a `<script>` tag:
```html
<script>alert(50)</script>
```
![a](/portswigger/XSS/Reflected%20XSS%20into%20HTML%20context%20with%20nothing%20encoded/images/try%20to%20open%20script%20tag.png)

## Done
![a](/portswigger/XSS/Reflected%20XSS%20into%20HTML%20context%20with%20nothing%20encoded/images/done.png)

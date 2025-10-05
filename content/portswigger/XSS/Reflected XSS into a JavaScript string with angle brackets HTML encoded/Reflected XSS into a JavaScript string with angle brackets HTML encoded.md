---
title: Reflected XSS into a JavaScript string with angle brackets HTML encoded
draft: false
tags:
  - PortSwigger
  - WebSecurity
  - XSS
---

# Table of Contents
  1. [Search for input](#search-for-input)
  2. [Test input](#test-input)
  3. [Show source code](#show-source-code)
  4. [Try to inject JS](#try-to-inject-js)
  5. [Done](#done)

## Search for input
![Input field screenshot](/portswigger/XSS/Reflected%20XSS%20into%20a%20JavaScript%20string%20with%20angle%20brackets%20HTML%20encoded/images/input.png)

## Test input
![Testing the input](/portswigger/XSS/Reflected%20XSS%20into%20a%20JavaScript%20string%20with%20angle%20brackets%20HTML%20encoded/images/test-input.png)

## Show source code
![Reflected input in source code](/portswigger/XSS/Reflected%20XSS%20into%20a%20JavaScript%20string%20with%20angle%20brackets%20HTML%20encoded/images/test-input-source-code.png)

![Reflected input in source code](/portswigger/XSS/Reflected%20XSS%20into%20a%20JavaScript%20string%20with%20angle%20brackets%20HTML%20encoded/images/test-input-source-code2.png)

## Try to inject JS
The input is reflected inside an HTML tag, so we will try to open a `<script>` tag:
```html
<script>alert(50)</script>
```
![a](/portswigger/XSS/Reflected%20XSS%20into%20a%20JavaScript%20string%20with%20angle%20brackets%20HTML%20encoded/images/test-open-tag.png)

![a](/portswigger/XSS/Reflected%20XSS%20into%20a%20JavaScript%20string%20with%20angle%20brackets%20HTML%20encoded/images/test-open-tag-source.png)

The input is also reflected inside an js variable. We will try to close the variable and add a new js code :

```js
';alert(50);//
```

![a](/portswigger/XSS/Reflected%20XSS%20into%20a%20JavaScript%20string%20with%20angle%20brackets%20HTML%20encoded/images/test-js-variable.png)

## Done
![a](/portswigger/XSS/Reflected%20XSS%20into%20a%20JavaScript%20string%20with%20angle%20brackets%20HTML%20encoded/images/done.png)

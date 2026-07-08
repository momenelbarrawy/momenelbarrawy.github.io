# User Delegation and Custom Management Tool

> **Delegation** allows administrators to assign specific administrative tasks to users without giving them full administrative privileges.

---

# What is Delegation?

Delegation is the process of granting a user or group permission to perform specific administrative tasks on selected Active Directory objects.

Instead of making someone a **Domain Admin**, you can delegate only the permissions they need.

---

# Benefits

- Follows the **Principle of Least Privilege**
- Improves security
- Reduces administrative workload
- Allows departments to manage their own resources
- Prevents unnecessary administrative permissions

---

# Common Delegation Tasks

- Create user accounts
- Delete user accounts
- Reset user passwords
- Unlock user accounts
- Join computers to the domain
- Manage Organizational Units (OUs)
- Manage groups

---

# Delegation Example

| User               | Permission                          |
| ------------------ | ----------------------------------- |
| HR Manager         | Create and manage user accounts     |
| Help Desk          | Reset passwords and unlock accounts |
| IT Support         | Join computers to the domain        |
| Department Manager | Manage users inside a specific OU   |

---

# Delegate Control Wizard

The **Delegate Control Wizard** is used to assign permissions on an **Organizational Unit (OU)**.

---
## Step 1 — Open Delegate Control

![[MCSA/delegation/Pasted image 20260708150118.png]]


---

## Step 6 — Select Delegated Tasks

Choose one of the predefined tasks.

Examples:

- Create, delete, and manage user accounts
- Reset user passwords
- Read all user information
- Modify group membership


![[MCSA/delegation/Pasted image 20260708150353.png]]

---

# Delete Delegation

![[MCSA/delegation/Pasted image 20260708150638.png]]

![[MCSA/delegation/Pasted image 20260708150702.png]]

![[MCSA/delegation/Pasted image 20260708150826.png]]

![[MCSA/delegation/Pasted image 20260708150919.png]]

---
# ADD Delegation from properties

![[MCSA/delegation/Pasted image 20260708151029.png]]

![[MCSA/delegation/Pasted image 20260708151130.png]]

![[MCSA/delegation/Pasted image 20260708151303.png]]

![[MCSA/delegation/Pasted image 20260708151339.png]]


---

# Custom Delegation

If the predefined tasks are not sufficient, choose:

```
Create a custom task to delegate
```

This allows administrators to specify:

- Object type
- Permissions
- Property access

---

# Create a Custom MMC Console

A custom MMC allows administrators to manage only the tools they need.

---

Press:

```
Win + R
```

Type:

```
mmc
```

Open it as administrator:

```
Ctrl + Shift + Enter
```


![[MCSA/delegation/Pasted image 20260708153416.png]]

![[MCSA/delegation/Pasted image 20260708153537.png]]

![[MCSA/delegation/Pasted image 20260708153736.png]]

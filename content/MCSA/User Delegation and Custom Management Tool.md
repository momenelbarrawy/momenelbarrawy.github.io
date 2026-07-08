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

## Common Custom Permissions

- Read
- Write
- Create Child Objects
- Delete Child Objects
- Reset Password
- Modify Group Membership
- Read Permissions
- Write Permissions

---

# Verify Delegation

Log in using the delegated account and verify that:

- Allowed tasks can be completed.
- Unauthorized tasks are denied.

---

# Custom Management Tool

The **Active Directory Administrative Center (ADAC)** provides a modern interface for managing Active Directory objects.

It can also be customized using **Taskpads** or **Microsoft Management Console (MMC)**.

---

# Create a Custom MMC Console

A custom MMC allows administrators to manage only the tools they need.

---

## Step 1 — Open MMC

Press:

```
Win + R
```

Type:

```
mmc
```

![[../MCSA/delegation/open_mmc.png]]

---

## Step 2 — Add Snap-ins

Click:

```
File
    → Add/Remove Snap-in
```

![[../MCSA/delegation/add_snapin.png]]

---

## Step 3 — Select Snap-ins

Common snap-ins:

- Active Directory Users and Computers
- DNS
- DHCP
- Group Policy Management
- Event Viewer
- Computer Management

Click:

```
Add
```

![[../MCSA/delegation/select_snapin.png]]

---

## Step 4 — Save the Console

Click:

```
File
    → Save As
```

Example:

```
HelpDesk.msc
```

![[../MCSA/delegation/save_console.png]]

---

# Benefits of Custom MMC

- Easier administration
- Faster access to management tools
- Can be distributed to administrators
- Reduces configuration mistakes
- Simplifies daily management tasks

---

# Cheat Sheet

| Feature | Purpose |
|---------|---------|
| Delegate Control Wizard | Assign administrative permissions |
| Organizational Unit (OU) | Scope of delegated permissions |
| Principle of Least Privilege | Grant only required permissions |
| Custom Task | Assign specific permissions |
| MMC | Create custom management consoles |
| Snap-in | Administrative tool added to MMC |

---

# Remember

- **Delegation** assigns specific administrative permissions without making users **Domain Admins**.
- Delegation is usually performed on an **Organizational Unit (OU)**.
- Use the **Delegate Control Wizard** for common administrative tasks.
- Use **Custom Tasks** when more granular permissions are required.
- **MMC** can be customized by adding snap-ins and saving the console as an **.msc** file.
- Always follow the **Principle of Least Privilege**.
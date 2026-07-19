# Map Network Drive

> **Objective:** Connect a shared folder on another computer or server so it appears as a local drive (e.g., `Z:`) in **File Explorer**.

---

# What is a Mapped Network Drive?

A **Mapped Network Drive** is a shortcut that assigns a **drive letter** to a shared folder on the network.

Instead of accessing:

```
\\Server01\Shared
```

You can access:

```
Z:\
```

This makes network resources easier to use and allows applications to access shared folders like local drives.

---

# Requirements

Before mapping a network drive:

- The target computer must be powered on.
- The shared folder must already exist.
- File and Printer Sharing must be enabled.
- The user must have the required **Share** and **NTFS** permissions.
- The computers must be connected to the same network (or accessible through routing/VPN).

---

# UNC Path (Universal Naming Convention)

A network share is accessed using a **UNC Path**.

Format:

```text
\\ComputerName\ShareName
```

Example:

```text
\\Server01\Data
```

Using an IP address:

```text
\\192.168.1.10\Data
```

---
![[MCSA/map network drive/Pasted image 20260719124811.png]]
![[MCSA/map network drive/Pasted image 20260719124833.png]]




```powershell
net use z: "\\pdc\New folder (3)"
```

![[MCSA/map network drive/Pasted image 20260719125254.png]]

![[MCSA/map network drive/Pasted image 20260719125409.png]]

![[MCSA/map network drive/Pasted image 20260719125515.png]]

![[MCSA/map network drive/Pasted image 20260719125552.png]]

![[MCSA/map network drive/Pasted image 20260719125626.png]]

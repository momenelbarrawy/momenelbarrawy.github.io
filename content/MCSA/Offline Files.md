---
draft: false
---

# Offline Files (Offline Sharing)

> **Objective:** Allow users to access files from a network share even when the server or network connection is unavailable.

---

# What are Offline Files?

**Offline Files** is a Windows feature that stores a **local cached copy** of files from a network share on the client computer.

This allows users to:

- Access network files without a network connection.
- Continue working while offline.
- Automatically synchronize changes when the connection is restored.

Typical use cases include laptops used outside the office or during temporary network outages.

---

# How Offline Files Works

```text
        Network Connected
               │
               ▼
        Network Share
      \\Server01\Data
               │
               ▼
      Local Offline Cache
      (Client Computer)
               │
               ▼
        User Opens Files
```

When the network becomes unavailable:

```text
Network Disconnected
        │
        ▼
 Local Cached Copy
        │
        ▼
 User Continues Working
        │
Reconnect to Network
        │
        ▼
Automatic Synchronization
```


---

# Enable Offline Files (Client)

1. Open **Control Panel**.
2. Go to **Sync Center**.
3. Click **Manage Offline Files**.
4. Click **Enable Offline Files**.
5. Restart the computer if prompted.

![[MCSA/Offline Files/Pasted image 20260723014049.png]]

![[MCSA/Offline Files/Pasted image 20260723014137.png]]



---

# Make a Shared Folder Available Offline

1. Open **File Explorer**.
2. Browse to the network share.

Example:

```text
\\Server01\Data
```

3. Right-click the shared folder.
4. Select **Always available offline**.
5. Windows copies the files to the local cache.
6. Wait for synchronization to complete.

![[MCSA/Offline Files/Pasted image 20260723014258.png]]

---

# Synchronize Offline Files


![[MCSA/Offline Files/Pasted image 20260731142347.png]]

![[MCSA/Offline Files/Pasted image 20260731142545.png]]

![[MCSA/Offline Files/Pasted image 20260731142617.png]]

---
# Synchronization Conflicts

Example:

```
Server Version
      │
      ├── Edited by User A
      │
Client Cached Version
      ├── Edited by User B
```

![[MCSA/Offline Files/Pasted image 20260731143405.png]]

![[MCSA/Offline Files/Pasted image 20260731143422.png]]

![[MCSA/Offline Files/Pasted image 20260731143813.png]]
![[MCSA/Offline Files/Pasted image 20260731143836.png]]
![[MCSA/Offline Files/Pasted image 20260731143909.png]]
![[MCSA/Offline Files/Pasted image 20260731143929.png]]

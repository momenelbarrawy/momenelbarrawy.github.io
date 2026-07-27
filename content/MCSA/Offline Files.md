---
draft: true
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

Manual synchronization:

1. Open **Sync Center**.
2. Click **Sync**.

Or right-click the shared folder and choose:

```text
Sync
```

---

# Sync Center

Sync Center allows you to:

- View synchronization status.
- Resolve conflicts.
- Start manual synchronization.
- View synchronization partnerships.
- Check synchronization history.

---

# Offline Files Modes

## Online Mode

```text
Client
   │
   ▼
Server
```

- Files open directly from the server.
- Fastest synchronization.
- No cached copy is used unless needed.

---

## Offline Mode

```text
Client
   │
Cached Files
```

Occurs when:

- Server is unavailable.
- Network cable disconnected.
- Wi-Fi disconnected.
- VPN disconnected.

The user continues working with the local cached copy.

---

# Synchronization

When the connection returns:

```text
Client Changes
        │
        ▼
Synchronization
        │
        ▼
Server Updated
```

If both the client and another user modify the same file, Windows reports a **sync conflict**.

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

Sync Center prompts the user to:

- Keep the server version.
- Keep the local version.
- Save both versions (if supported).

---

# Disable Offline Availability

To stop caching a share:

1. Right-click the shared folder.
2. Select:

```text
Always available offline
```

again to remove the offline setting.

Or:

- Open **Sync Center**.
- Remove the synchronization partnership.

---

# Disk Usage

Offline Files consume local disk space.

View or change cache settings:

```
Control Panel
    ↓
Sync Center
    ↓
Manage Offline Files
    ↓
Disk Usage
```

You can:

- View cache usage.
- Delete temporary offline files.
- Change cache size (where supported).

---

# Advantages

- Access files without a network connection.
- Improves availability for laptop users.
- Automatic synchronization.
- Transparent to most applications.
- Reduces downtime during temporary network outages.

---

# Limitations

- Requires local disk space.
- Large files increase synchronization time.
- File conflicts can occur.
- Not suitable for frequently changing shared databases.
- Some applications do not support Offline Files correctly.

---

# Offline Files vs Mapped Network Drive

| Feature | Mapped Drive | Offline Files |
|----------|--------------|---------------|
| Requires Network | Yes | No (after initial sync) |
| Local Copy | No | Yes |
| Works Offline | No | Yes |
| Automatic Sync | No | Yes |
| Uses Drive Letter | Usually Yes | Uses the existing network path or mapped drive |

> **Note:** Offline Files can be used with a mapped network drive or directly with a UNC path.

---

# Practical Example

Server:

```text
Computer Name : Server01
Share Name    : Data
UNC Path      : \\Server01\Data
```

Client:

1. Map the share (optional):

```cmd
net use Z: \\Server01\Data
```

2. Right-click **Z:** (or `\\Server01\Data`).
3. Select **Always available offline**.
4. Disconnect the network.
5. Open the files successfully from the local cache.
6. Reconnect to the network.
7. Sync Center uploads any changes to the server.


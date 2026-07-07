# WinRM (Windows Remote Management)

> Allows administrators to execute commands and manage remote Windows computers from the command line.

---

## Default Ports

- **5985/TCP** → HTTP
- **5986/TCP** → HTTPS

---

## Requirements

- Network connectivity
- Administrator credentials
- WinRM service enabled
- Firewall allows WinRM traffic

---

## Enable WinRM

```cmd
winrm qc
```

or

```cmd
winrm quickconfig
```

This command:

- Starts the WinRM service
- Sets the service startup type to **Automatic**
- Creates a WinRM listener
- Configures Windows Firewall

---

## Execute a Remote Command

```cmd
winrs -r:Server01 hostname
```

### Syntax

```cmd
winrs -r:<ComputerName> <Command>
```

### Examples

Run `hostname`:

```cmd
winrs -r:Server01 hostname
```

Run `ipconfig`:

```cmd
winrs -r:Server01 ipconfig
```

Open a remote Command Prompt:

```cmd
winrs -r:Server01 cmd
```

---

# WinRM Cheat Sheet

| Command | Purpose |
|----------|---------|
| `winrm qc` | Configure and enable WinRM |
| `winrs -r:Server01 hostname` | Execute a remote command |
| `winrs -r:Server01 cmd` | Open a remote Command Prompt |

---

# Remember

- **WinRM = Windows Remote Management**
- **Protocol:** WS-Man
- **Ports:** 5985 (HTTP), 5986 (HTTPS)
- `winrm qc` → Enables and configures WinRM
- `winrs` → Runs commands on a remote Windows computer

---

# Remote Desktop (RDP)

> Allows users to remotely access and control another Windows computer through its graphical interface (GUI).

---

## Default Port

- **3389/TCP**

---

## Requirements

- Server and client have network connectivity.
- Remote Desktop is enabled on the server.
- Windows Firewall allows Remote Desktop.
- The user has permission to log on through Remote Desktop.
- The client uses **Remote Desktop Connection (mstsc)**.

---

# Lab Topology

| Device | Role |
|---------|------|
| Server01 | Remote Desktop Host |
| Client01 | Remote Desktop Client |

---

# Server Side

## Step 1 — Enable Remote Desktop

![[../MCSA/remote/local_server.png]]

---

## Step 2 — Allow Remote Desktop

Select:

```
Allow remote connections to this computer
```


![[../MCSA/remote/enable_rdp.png]]

> Windows automatically enables the required Firewall rules.

---

# Allow a Standard User to Use RDP

By default, **Administrators** can connect using Remote Desktop.

To allow a normal user:

---

## Step 1 — Open Group Policy Management

```

Tools
    → GP Management
```

![[../MCSA/remote/computer_management.png]]

---

## Step 2 — Group Policy Management

![[../MCSA/remote/gp_man.png]]

---

## Step 3 — Edit Policy

Double-click:

```
Remote Desktop Users
```

![[../MCSA/remote/edit_policy.png]]

---

## Step 4 — Update Group Policy

Click:

```cmd
gpupdate /force
```

![[../MCSA/remote/Update_Policy.png]]


---

<!-- # Client Side

## Step 1 — Open Remote Desktop Connection

Press:

```
Win + R
```

Type:

```
mstsc
```

Press **Enter**.

![[../MCSA/remote/open_mstsc.png]]

---

## Step 2 — Enter Computer Name

Type either:

```
Server01
```

or

```
192.168.1.10
```

Click:

```
Connect
```

![[../MCSA/remote/connect_server.png]]

---

## Step 3 — Enter Credentials

Provide:

- Username
- Password

Example:

```
Administrator
```

or

```
Domain\User
```

![[../MCSA/remote/login.png]]

---

## Step 4 — Accept Certificate (If Prompted)

Click:

```
Yes
```

![[../MCSA/remote/certificate_warning.png]]

---

## Step 5 — Remote Desktop Session

The desktop of the remote server appears.

![[../MCSA/remote/connected.png]]

---

# Disconnect the Session

Click the **X** on the Remote Desktop window.

or

From the remote machine:

```
Start
    → Sign out
```

or

```
Start
    → Disconnect
```

![[../MCSA/remote/disconnect.png]]

---

# Useful Commands

Open Remote Desktop:

```cmd
mstsc
```

Connect directly:

```cmd
mstsc /v:Server01
```

Administrative session:

```cmd
mstsc /admin
```

---

# CMD Method (Optional)

Enable Remote Desktop:

```cmd
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f
```

Enable Firewall:

```cmd
netsh advfirewall firewall set rule group="Remote Desktop" new enable=Yes
```

Add a user:

```cmd
net localgroup "Remote Desktop Users" Ahmed /add
```

---

# Cheat Sheet

| Task | Action |
|------|--------|
| Enable Remote Desktop | Server Manager → Local Server → Remote Desktop |
| Allow User | Remote Desktop Users group |
| Group Policy | Allow log on through Remote Desktop Services |
| Client | `mstsc` |
| Port | 3389/TCP |

---

# Remember

- Administrators can connect by default.
- Standard users must be granted permission.
- The permission can be assigned:
  - From the **Remote Desktop Users** group.
  - Using **Group Policy**.
- The client connects using **mstsc**.
- Remote Desktop uses **TCP 3389**.

---
# WinRM vs RDP

| Feature | WinRM | RDP |
|---------|-------|-----|
| Interface | CLI / PowerShell | GUI |
| Default Port | 5985 / 5986 | 3389 |
| Protocol | WS-Man | RDP |
| Remote PowerShell | ✅ | ❌ |
| GUI Applications | ❌ | ✅ |
| Automation | ✅ | ❌ |
| Best For | Server Administration | Desktop Administration |

---

# Cheat Sheet

| Feature | WinRM | RDP |
|---------|-------|-----|
| Full Name | Windows Remote Management | Remote Desktop Protocol |
| Default Port | 5985 / 5986 | 3389 |
| Interface | Command Line / PowerShell | Graphical Desktop |
| Secure | HTTPS (5986) | Encrypted |
| Main Use | Remote Administration | Remote Desktop Access |
| Protocol | WS-Man | RDP |
| PowerShell Remoting | ✅ | ❌ |
| GUI Support | ❌ | ✅ |

---

# Remember -->

<!-- ### WinRM

- WS-Man protocol
- 5985 → HTTP
- 5986 → HTTPS
- Used for PowerShell Remoting
- `winrm quickconfig` enables WinRM
- `Test-WSMan` tests connectivity

### RDP

- Port **3389**
- Uses **mstsc**
- Provides a full GUI
- `fDenyTSConnections`
  - **0** → Enabled
  - **1** → Disabled
- Non-administrators must be members of **Remote Desktop Users** -->
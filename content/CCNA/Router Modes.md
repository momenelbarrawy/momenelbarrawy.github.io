---
draft: true
---

# Rollover Cable (Console) 


![[CCNA/Router Modes/Pasted image 20260728213230.png]]

---

# What is a Rollover (Console) Cable?

A **Rollover Cable** (also called a **Console Cable**) is used to establish a **local management connection** between a computer and a Cisco router or switch.

Unlike Ethernet cables, a rollover cable **does not carry normal network traffic**. It is used only for **device configuration and troubleshooting**.

### Common Uses

- Initial device configuration
- Password recovery
- Troubleshooting
- Device management when no network connectivity exists


---

# Required Software

A terminal emulator is required to access the Cisco CLI.

Common programs:

- PuTTY
- Tera Term
- SecureCRT
- Cisco Packet Tracer Terminal
- HyperTerminal (Legacy)

---

# IOS (Internetwork Operating System)

> **IOS (Internetwork Operating System)** is Cisco's operating system that runs on most Cisco routers and many Cisco switches.

IOS is responsible for:

- Routing packets
- Switching frames
- Managing interfaces
- Security
- Access Control Lists (ACLs)
- VLANs
- Routing protocols
- Network services

---

# Cisco IOS CLI

The **Command-Line Interface (CLI)** is where administrators configure and monitor Cisco devices.

Example:

```text
Router>
```

---

# Router Modes

Cisco devices have different operating modes.

Each mode provides a different level of access.

```text
User EXEC
     │
     ▼
Privilege EXEC
     │
     ▼
Global Configuration
     │
     ▼
Subconfiguration Modes
```

---

# 1. User EXEC Mode

Prompt:

```text
Router>
```

### Purpose

Basic monitoring mode with limited commands.

### Allowed Tasks

- Basic connectivity tests
- View limited information
- Connect to another device

### Common Commands

```cisco
enable
logout
exit
ping
traceroute
show version
```

> Most configuration commands are **not available** in User EXEC mode.

---

# 2. Privileged EXEC Mode (Enable Mode)

Prompt:

```text
Router#
```

Enter from User EXEC:

```cisco
Router> enable
```

Return to User EXEC:

```cisco
Router# disable
```

### Purpose

Administrative mode with access to advanced monitoring and configuration.

### Allowed Tasks

- View full configuration
- Save configuration
- Reload device
- Enter configuration mode
- Run debugging commands

### Common Commands

```cisco
show running-config
show startup-config
show ip interface brief
show interfaces
show version
show vlan brief
copy running-config startup-config
reload
configure terminal
```

---

# 3. Global Configuration Mode

Prompt:

```text
Router(config)#
```

Enter:

```cisco
Router# configure terminal
```

Shortcut:

```cisco
Router# conf t
```

Exit:

```cisco
Router(config)# end
```

or

```cisco
Ctrl + Z
```

### Purpose

Configure settings that affect the entire device.

### Common Commands

```cisco
hostname R1
enable secret Cisco123
banner motd #Unauthorized Access Prohibited#
ip domain-name lab.local
service password-encryption
```

---

# 4. Subconfiguration Modes

Subconfiguration modes configure a specific feature or component.

Examples:

| Mode | Prompt |
|-------|--------|
| Interface | `(config-if)#` |
| Line Console | `(config-line)#` |
| VTY Lines | `(config-line)#` |
| Router Protocol | `(config-router)#` |
| VLAN | `(config-vlan)#` |

---

## Interface Configuration Mode

Enter:

```cisco
Router(config)# interface GigabitEthernet0/0
```

Prompt:

```text
Router(config-if)#
```

Example:

```cisco
ip address 192.168.1.1 255.255.255.0
no shutdown
description LAN Interface
```

Exit:

```cisco
exit
```

---

## Console Line Configuration

Enter:

```cisco
Router(config)# line console 0
```

Prompt:

```text
Router(config-line)#
```

Example:

```cisco
password Cisco123
login
logging synchronous
```

---

## VTY Configuration

Used for Telnet or SSH access.

```cisco
Router(config)# line vty 0 4
```

Prompt:

```text
Router(config-line)#
```

Example:

```cisco
password Cisco123
login
transport input ssh
```

---

## Routing Protocol Configuration

Example:

```cisco
Router(config)# router ospf 1
```

Prompt:

```text
Router(config-router)#
```

Example:

```cisco
network 192.168.1.0 0.0.0.255 area 0
```

---

# Navigation Between Modes

```text
                 enable
User EXEC --------------------> Privileged EXEC
 Router>                         Router#

                                   |
                      configure terminal
                                   |
                                   ▼
                          Global Configuration
                           Router(config)#

                                   |
                    interface g0/0 | line console 0
                    router ospf 1  | line vty 0 4
                                   ▼
                         Subconfiguration Modes
```

---

# Useful Navigation Commands

| Command | Description |
|----------|-------------|
| `enable` | Enter Privileged EXEC mode |
| `disable` | Return to User EXEC mode |
| `configure terminal` | Enter Global Configuration mode |
| `exit` | Return one level up |
| `end` | Return directly to Privileged EXEC mode |
| `Ctrl + Z` | Return directly to Privileged EXEC mode |
| `logout` | End the session |
| `?` | Display context-sensitive help |
| `Tab` | Auto-complete commands |

---

# Command Abbreviations

Cisco IOS allows abbreviated commands as long as they are unique.

Examples:

```cisco
configure terminal
conf t

show running-config
show run

show ip interface brief
show ip int br

copy running-config startup-config
copy run start
```

---

# Running Configuration vs Startup Configuration

| Running Configuration | Startup Configuration |
|------------------------|-----------------------|
| Stored in RAM | Stored in NVRAM |
| Active configuration | Used after reboot |
| Lost after reboot if not saved | Persistent after reboot |

Save the running configuration:

```cisco
copy running-config startup-config
```

Shortcut:

```cisco
write memory
```

---

# MCSA... ❌ CCNA Exam Tips

- **Console (Rollover) Cable** is used for **local device management**, not Ethernet communication.
- Default console settings are **9600, 8, N, 1**.
- `>` = **User EXEC Mode**.
- `#` = **Privileged EXEC Mode**.
- `(config)#` = **Global Configuration Mode**.
- `(config-if)#`, `(config-line)#`, `(config-router)#`, etc. are **Subconfiguration Modes**.
- Use `enable` to enter Privileged EXEC mode.
- Use `configure terminal` (`conf t`) to enter Global Configuration mode.
- Use `exit` to move back one level, and `end` or **Ctrl + Z** to return directly to Privileged EXEC mode.
- Always save your configuration with:

```cisco
copy running-config startup-config
```
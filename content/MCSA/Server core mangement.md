# Windows Server Administration Using CMD & PowerShell

> [!info]
> This section covers common Windows Server administration tasks using **Command Prompt (CMD)** and **PowerShell**, including network configuration, firewall management, computer renaming, domain joining, and remote IIS installation on Server Core.

---

# Using Command Prompt (CMD)

## Configure a Static IPv4 Address

### Syntax

```cmd
netsh interface ipv4 set address name="<InterfaceName>" static <IP_Address> <SubnetMask> <DefaultGateway>
```

### Example

```cmd
netsh interface ipv4 set address name="ethernet0" static 192.168.1.10 255.255.255.0 192.168.1.1
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `name` | Network adapter name |
| `static` | Configure a static IP |
| `IP_Address` | Device IP address |
| `SubnetMask` | Network subnet mask |
| `DefaultGateway` | Gateway address |

---

## Configure DNS Servers

### Add Primary DNS

```cmd
netsh interface ipv4 set dns name="ethernet0" static 8.8.8.8
```

### Add Secondary DNS

```cmd
netsh interface ipv4 add dns name="ethernet0" 8.8.4.4 index=2
```

> [!note]
> - `set dns` configures the preferred (primary) DNS server.
> - `add dns` adds an alternate (secondary) DNS server.
> - `index=2` places the server in the second position.

---

## Disable Windows Firewall

```cmd
netsh advfirewall set allprofiles state off
```

To enable it again:

```cmd
netsh advfirewall set allprofiles state on
```

> [!warning]
> Disabling the firewall should only be done in lab environments or temporarily for troubleshooting.

---

## Display Computer Name

```cmd
hostname
```

---

## Rename the Computer

```cmd
netdom renamecomputer %computername% /newname:ABEER-PC
```

**Explanation**

| Parameter | Description |
|-----------|-------------|
| `%computername%` | Current computer name |
| `/newname` | New hostname |

> [!important]
> Restart the server after renaming.

---

## Join an Active Directory Domain

```cmd
netdom join %computername% /domain:tshoot.com /userd:administrator /passwordd:asd@123
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `/domain` | Domain to join |
| `/userd` | Domain account |
| `/passwordd` | Password |

Restart immediately:

```cmd
shutdown /r /t 0 /c "Joining Domain"
```

---

# Using PowerShell

PowerShell provides object-oriented administration and is the preferred management tool for modern Windows Server.

---

## View Network Adapters

```powershell
Get-NetAdapter
```

Displays all available network adapters.

---

## View Network Configuration

```powershell
Get-NetIPConfiguration
```

Equivalent to:

```cmd
ipconfig
```

---

## Discover Available Networking Commands

List commands in the **NetAdapter** module:

```powershell
Get-Command -Module NetAdapter
```

Search commands containing "net":

```powershell
Get-Command *net*
```

Commands starting with "net":

```powershell
Get-Command net*
```

Commands whose noun is "Net":

```powershell
Get-Command -Noun net*
```

---

## Configure a Static IP Address

```powershell
New-NetIPAddress `
-InterfaceIndex 4 `
-IPAddress 192.168.1.10 `
-PrefixLength 24 `
-DefaultGateway 192.168.1.1
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `InterfaceIndex` | Adapter index |
| `IPAddress` | Static IP |
| `PrefixLength` | CIDR subnet mask (24 = 255.255.255.0) |
| `DefaultGateway` | Gateway |

---

## Remove Existing IP Address

```powershell
Get-NetAdapter Ethernet0 | Remove-NetIPAddress
```

---

## Remove Default Gateway

```powershell
Remove-NetRoute -InterfaceAlias "ethernet0"
```

---

## Configure DNS Servers

Using Interface Index:

```powershell
Set-DnsClientServerAddress `
-InterfaceIndex 4 `
-ServerAddresses ("8.8.8.8","8.8.4.4")
```

Using Interface Alias:

```powershell
Set-DnsClientServerAddress `
-InterfaceAlias Ethernet0 `
-ServerAddresses ("8.8.8.8","8.8.4.4")
```

---

## View Firewall Profiles

```powershell
Get-NetFirewallProfile
```

---

## Enable Windows Firewall

```powershell
Set-NetFirewallProfile `
-Profile Domain,Public,Private `
-Enabled True
```

---

## Disable Windows Firewall

```powershell
Set-NetFirewallProfile `
-Profile Domain,Public,Private `
-Enabled False
```

---

## Discover Computer Management Cmdlets

```powershell
Get-Command *computer*
```

---

## View Help

Basic help:

```powershell
Get-Help Rename-Computer
```

Detailed help:

```powershell
Get-Help Rename-Computer -Full
```

Update PowerShell help files:

```powershell
Update-Help
```

---

## Display Computer Name

```powershell
$env:COMPUTERNAME
```

---

## Rename the Computer

```powershell
Rename-Computer -NewName ABEER-PC -Restart
```

The server will automatically restart.

---

## Join a Domain

Prompt for credentials:

```powershell
Add-Computer -DomainName tshoot.com
```

Specify credentials:

```powershell
Add-Computer -DomainName tshoot.com -DomainCredential administrator
```

Restart after joining:

```powershell
Restart-Computer
```

---

# Remotely Install IIS on a Server Core Machine

> [!info]
> PowerShell Remoting (WinRM) must already be configured between both servers.

---

## Step 1 — Connect to the Server Core

```powershell
Enter-PSSession -ComputerName core
```

---

## Step 2 — View Available Roles

```powershell
Get-WindowsFeature
```

Installed roles only:

```powershell
Get-WindowsFeature | Where-Object Installed -eq $true
```

Search IIS features:

```powershell
Get-WindowsFeature -Name Web*
```

---

## Step 3 — Install IIS

```powershell
Install-WindowsFeature `
-Name Web-Server,Web-Mgmt-Service
```

This installs:

- IIS Web Server
- Web Management Service

---

## Step 4 — Install IIS Management Console

Run on the **management server**, not the Server Core machine.

```powershell
Install-WindowsFeature Web-Mgmt-Console
```

---

## Step 5 — Enable Remote IIS Management

```powershell
Set-ItemProperty `
-Path "HKLM:\Software\Microsoft\WebManagement\Server" `
-Name EnableRemoteManagement `
-Value 1
```

---

## Step 6 — Configure the IIS Management Service

```powershell
Set-Service WMSVC -StartupType Automatic
```

Restart the Server Core machine.

---

## Step 7 — Exit the Remote Session

```powershell
Exit-PSSession
```

---

## Step 8 — Verify IIS Services Remotely

```powershell
Invoke-Command `
-ComputerName core `
-ScriptBlock {
    Get-Service W3SVC, WMSVC
}
```

**Services**

| Service | Description |
|----------|-------------|
| `W3SVC` | World Wide Web Publishing Service |
| `WMSVC` | Web Management Service |

If both services are **Running**, IIS has been installed and configured successfully.

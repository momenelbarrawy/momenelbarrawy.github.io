# Operation Master Roles
## Domain naming master role

![[MCSA/Operation/Pasted image 20260709143742.png]]

![[MCSA/Operation/Pasted image 20260709144131.png]]

![[MCSA/Operation/Pasted image 20260709144215.png]]


![[MCSA/Operation/Pasted image 20260709143959.png]]

![[MCSA/Operation/Pasted image 20260709144251.png]]



## Schema master role

from mmc add schema 

![[MCSA/Operation/Pasted image 20260709144843.png]]

## PDC emulator 
![[MCSA/Operation/Pasted image 20260709145633.png]]

![[MCSA/Operation/Pasted image 20260709145707.png]]
## RID 

![[MCSA/Operation/Pasted image 20260709145637.png]]

![[MCSA/Operation/Pasted image 20260709145711.png]]
## Infrastructure

![[MCSA/Operation/Pasted image 20260709145640.png]]

![[MCSA/Operation/Pasted image 20260709145714.png]]



# Active Directory Operation Master Roles (FSMO Roles)

> [!info]
> Although Active Directory is a **multi-master** system (where every Domain Controller can accept changes), some operations **must be performed by only one Domain Controller**. These special responsibilities are called **Flexible Single Master Operations (FSMO) Roles** or **Operation Master Roles**.

---

# FSMO Roles Overview

There are **5 FSMO Roles**:

| Role | Scope | Purpose |
|------|-------|---------|
| Schema Master | Forest | Controls all schema modifications |
| Domain Naming Master | Forest | Manages adding or removing domains from the forest |
| RID Master | Domain | Allocates RID pools to Domain Controllers |
| PDC Emulator | Domain | Handles password changes, time synchronization, and legacy compatibility |
| Infrastructure Master | Domain | Updates references to objects from other domains |

---

# Forest Roles vs Domain Roles

## Forest-wide Roles (One per Forest)

- Schema Master
- Domain Naming Master

These roles exist **only once** in the entire forest.

---

## Domain-wide Roles (One per Domain)

- RID Master
- PDC Emulator
- Infrastructure Master

Each domain has its own set of these three roles.

Example:

```
Forest
│
├── sales.com
│     ├── RID
│     ├── PDC
│     └── Infrastructure
│
└── hr.com
      ├── RID
      ├── PDC
      └── Infrastructure
```

---

# 1. Domain Naming Master

## Purpose

The **Domain Naming Master** controls changes to the Active Directory forest structure.

It is responsible for:

- Adding new domains
- Removing domains
- Adding application partitions
- Removing application partitions

---

## Example

You create:

```
sales.company.com
```

The Domain Naming Master verifies that:

- The domain name is unique.
- The new domain can be added to the forest.

Without this role, you **cannot add or remove domains**.

---

## Scope

**Forest**

Only **one Domain Naming Master** exists in the entire forest.

---

# 2. Schema Master

## Purpose

The **Schema Master** manages changes to the Active Directory Schema.

The schema defines:

- Object classes
- Attributes
- Data types

---

## Example

Installing applications like:

- Microsoft Exchange
- Microsoft Lync / Skype for Business
- Microsoft SCCM

may extend the Active Directory schema.

Only the Schema Master can make these changes.

---

## Scope

**Forest**

Only **one Schema Master** exists per forest.

---

## Important Notes

> [!warning]
> Schema changes replicate to every Domain Controller and are generally permanent.

---

# 3. PDC Emulator

The **Primary Domain Controller (PDC) Emulator** is the busiest FSMO role.

It performs several important functions.

---

## Password Changes

When a user's password changes:

- The password is immediately updated on the PDC Emulator.
- Other Domain Controllers replicate the change later.

If a user logs into another DC before replication, that DC contacts the PDC Emulator to verify the new password.

---

## Account Lockout

The PDC Emulator processes:

- Account lockouts
- Bad password attempts

This ensures consistent authentication across the domain.

---

## Time Synchronization

The PDC Emulator is the **authoritative time source** for the domain.

Time hierarchy:

```
External NTP
      │
      ▼
PDC Emulator
      │
      ▼
Other Domain Controllers
      │
      ▼
Domain Computers
```

> [!important]
> Kerberos authentication requires clocks to be synchronized (default maximum skew is 5 minutes).

---

## Legacy Compatibility

Older Windows clients (Windows NT) communicate with the PDC Emulator for compatibility.

---

## Group Policy Updates

The PDC Emulator is commonly used when editing Group Policy Objects (GPOs) to help prevent version conflicts.

---

## Scope

**Domain**

One PDC Emulator per domain.

---

# 4. RID Master

## What is a RID?

A Security Identifier (SID) uniquely identifies every security principal.

Example SID:

```
S-1-5-21-3623811015-3361044348-30300820-1105
```

The last number (**1105**) is the **Relative Identifier (RID)**.

---

## Purpose

The RID Master distributes **RID pools** to Domain Controllers.

Each Domain Controller uses its assigned pool when creating:

- Users
- Groups
- Computers

---

## Example

RID Master assigns:

```
DC1 → 1000–1499

DC2 → 1500–1999
```

When DC1 creates a new user:

```
User SID

S-1-5-21-xxxx-xxxx-xxxx-1001
```

The RID comes from DC1's allocated pool.

When the pool runs low, the DC requests another block from the RID Master.

---

## Without the RID Master

Existing users continue working.

However:

- New users cannot be created.
- New groups cannot be created.
- New computers cannot be joined after RID pools are exhausted.

---

## Scope

**Domain**

One RID Master per domain.

---

# 5. Infrastructure Master

## Purpose

The Infrastructure Master updates references to objects located in **other domains**.

It maintains accurate cross-domain object information.

---

## Example

Domain:

```
sales.com
```

contains a group.

A user from:

```
hr.com
```

is added to that group.

If the HR user changes:

- Name
- Display Name
- Other referenced attributes

The Infrastructure Master updates the information stored in the Sales domain.

---

## Scope

**Domain**

One Infrastructure Master per domain.

---

## Important Note

> [!note]
> If every Domain Controller is also a **Global Catalog (GC)** server, the Infrastructure Master has little or no work to perform because the Global Catalog already contains updated cross-domain information.

---

# View FSMO Roles

## Command Prompt

```cmd
netdom query fsmo
```

Example output:

```
Schema master               DC1.company.com
Domain naming master        DC1.company.com
PDC                         DC2.company.com
RID pool manager            DC2.company.com
Infrastructure master       DC2.company.com
```

---

## PowerShell

```powershell
Get-ADForest
```

Shows:

- Schema Master
- Domain Naming Master

```powershell
Get-ADDomain
```

Shows:

- RID Master
- PDC Emulator
- Infrastructure Master

---

# FSMO Role Summary

| Role | Scope | Main Responsibility |
|------|-------|---------------------|
| Schema Master | Forest | Schema modifications |
| Domain Naming Master | Forest | Add/remove domains |
| PDC Emulator | Domain | Passwords, authentication, time sync, GPO editing |
| RID Master | Domain | Allocates RID pools for SID creation |
| Infrastructure Master | Domain | Updates cross-domain object references |



# Transferring and Seizing FSMO Roles

> [!info]
> FSMO roles can be moved from one Domain Controller to another using either a **Transfer** or a **Seize** operation.

---

# Transfer vs Seize

| Operation | When to Use | Requires Old FSMO Holder? | Recommended |
|-----------|-------------|---------------------------|-------------|
| **Transfer** | The current FSMO holder is online and healthy | ✅ Yes | ✅ Yes |
| **Seize** | The current FSMO holder has permanently failed | ❌ No | Only in disaster recovery |

> [!warning]
> Always perform a **Transfer** if the original FSMO holder is available. Use **Seize** only when the original server cannot be recovered.

---

# Check Current FSMO Holders

```cmd
netdom query fsmo
```

Example output:

```text
Schema master               DC1.contoso.com
Domain naming master        DC1.contoso.com
PDC                         DC2.contoso.com
RID pool manager            DC2.contoso.com
Infrastructure master       DC2.contoso.com
```

---

# Transfer FSMO Roles (Command Prompt)

There is **no direct CMD command** to transfer FSMO roles.

Microsoft recommends using:

- **PowerShell**
- **NTDSUtil**

### PowerShell Example

```powershell
Move-ADDirectoryServerOperationMasterRole `
-Identity DC2 `
-OperationMasterRole SchemaMaster,DomainNamingMaster,PDCEmulator,RIDMaster,InfrastructureMaster
```

---

# Transfer FSMO Roles Using NTDSUtil (CMD)

Open Command Prompt as Administrator:

```cmd
ntdsutil
```

Enter:

```text
roles
```

Connect to the target Domain Controller:

```text
connections
connect to server DC2
quit
```

Transfer a role:

```text
transfer schema master
```

Other transfer commands:

```text
transfer naming master

transfer RID master

transfer PDC

transfer infrastructure master
```

Type:

```text
quit
quit
```

Verify:

```cmd
netdom query fsmo
```

---

# Seize FSMO Roles (Emergency)

> [!danger]
> Only seize a role if the original FSMO holder is **permanently offline** and will **never** return to the domain.

If the original server comes back online after a role has been seized, it can cause serious Active Directory inconsistencies.

---

## Steps

Open Command Prompt:

```cmd
ntdsutil
```

Enter:

```text
roles
```

Connect to the new Domain Controller:

```text
connections

connect to server DC2

quit
```

Seize the required role.

### Schema Master

```text
seize schema master
```

### Domain Naming Master

```text
seize naming master
```

### RID Master

```text
seize RID master
```

### PDC Emulator

```text
seize PDC
```

### Infrastructure Master

```text
seize infrastructure master
```

Exit:

```text
quit
quit
```

Verify:

```cmd
netdom query fsmo
```

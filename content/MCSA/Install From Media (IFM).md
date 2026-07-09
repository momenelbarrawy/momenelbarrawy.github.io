# Install From Media (IFM)

> [!info]
> **Install From Media (IFM)** allows you to promote a new **Domain Controller** using a backup of an existing Domain Controller instead of replicating the entire Active Directory database over the network.
>
> This significantly reduces network traffic and speeds up Domain Controller deployment, especially in branch offices or locations with slow WAN links.

---

# Benefits of IFM

- Reduces Active Directory replication traffic.
- Faster Domain Controller installation.
- Ideal for remote or branch offices.
- Can be stored on removable media or a shared network folder.

---

# IFM Media Types

| Command | Description |
|---------|-------------|
| `create full` | Creates installation media for a writable Domain Controller (without SYSVOL). |
| `create sysvol full` | Creates installation media for a writable Domain Controller including SYSVOL. |
| `create rodc` | Creates installation media for a Read-Only Domain Controller (RODC). |
| `create sysvol rodc` | Creates installation media for an RODC including SYSVOL. |

> [!important]
> In most MCSA lab scenarios, **`create sysvol full`** is the commonly used option.

---

# Prerequisites

Before creating IFM media:

- Existing Domain Controller is healthy.
- Active Directory replication is functioning correctly.
- Sufficient free disk space.
- Run Command Prompt as **Administrator**.

---

# Create IFM Installation Media

## Step 1 — Open Command Prompt

Open **Command Prompt** as **Administrator**.

---

## Step 2 — Start NTDSUtil

```cmd
ntdsutil
```

---

## Step 3 — Activate the NTDS Instance

```text
activate instance ntds
```

This tells NTDSUtil to work with the Active Directory database.

---

## Step 4 — Enter IFM Mode

```text
ifm
```

The prompt changes to:

```text
ifm:
```

---

## Step 5 — Create the Installation Media

To create media for a writable Domain Controller including SYSVOL:

```text
create sysvol full C:\IFM
```

Where:

- `D:` = Destination drive
- `IFM` = Folder where the installation media will be created

Example:

```text
create sysvol full E:\InstallMedia
```

NTDSUtil will:

- Create a snapshot of the Active Directory database.
- Copy the database files.
- Copy SYSVOL.
- Prepare the installation media.

---

# Complete Command Sequence

```cmd
ntdsutil
```

```text
activate instance ntds
```

```text
ifm
```

```text
create sysvol full C:\IFM
```

After completion:

```text
quit
quit
```

---

# Result

The destination folder contains the files required to install a new Domain Controller using IFM.

Example:

```
D:\IFM
│
├── Active Directory Database
├── SYSVOL
├── Registry Files
└── Installation Metadata
```

This folder can be:

- Copied to a USB drive.
- Stored on a shared network folder.
- Used during Domain Controller promotion.

---

# Verify IFM Creation

After the process completes, verify that the destination folder contains the generated installation files.

Example:

```cmd
dir D:\IFM
```

---

# When to Use IFM

Use IFM when:

- Deploying a Domain Controller in a remote office.
- WAN bandwidth is limited.
- You want to reduce initial replication traffic.
- Installing multiple Domain Controllers.

---

# Limitations

> [!warning]
> - IFM **does not eliminate replication**. After installation, the new Domain Controller still performs normal replication for recent changes.
> - The installation media should be generated from a healthy and up-to-date Domain Controller.
> - The media should be protected because it contains a copy of the Active Directory database.


# Disk Management

> **Objective:** Learn how Windows manages disks, partitions, and volumes using both the GUI and the `diskpart` command-line tool.

---

# Basic Disks

A **Basic Disk** is the default storage type in Windows. It stores data using **partitions**.

### Features

- Supported by all Windows versions.
- Compatible with most operating systems.
- Uses **MBR** or **GPT** partition styles.
- Easy to manage.
- Best for single-disk systems.

---

## Primary Partition

A **Primary Partition** is a partition that can contain an operating system and be marked as **Active** for booting.

### Characteristics

- Can store files and folders.
- Can host Windows.
- Can be marked as **Active** (MBR only).
- Receives a drive letter.

### MBR Limits

- Maximum **4 Primary Partitions**
- Or **3 Primary + 1 Extended Partition**

### GPT Limits

- Up to **128 Primary Partitions**
- No Extended Partition needed.

---

## Extended Partition (Logical Drives)

An **Extended Partition** is a special partition used only on **MBR** disks.

It cannot store files directly.

Instead, it contains one or more **Logical Drives**.

```
MBR Example

Disk
├── Primary (C:)
├── Primary (D:)
├── Primary
└── Extended
      ├── Logical (E:)
      ├── Logical (F:)
      └── Logical (G:)
```

### Why use it?

MBR only allows **4 partitions**, so Microsoft introduced the Extended Partition to create many Logical Drives.

### Notes

- Only one Extended Partition per disk.
- Cannot be Active.
- Only exists on MBR.
- GPT does not use Extended or Logical partitions.

---

# MBR vs GPT

| Feature | MBR | GPT |
|----------|-----|-----|
| Full Name | Master Boot Record | GUID Partition Table |
| Maximum Disk Size | 2 TB | 9.4 ZB (practical limit much larger than today's disks) |
| Maximum Partitions | 4 Primary | 128 Primary (Windows) |
| Extended Partition | Yes | No |
| Logical Drives | Yes | No |
| UEFI Support | Limited | Yes |
| BIOS Support | Yes | Legacy BIOS |
| Boot Mode | BIOS | UEFI |
| Partition Table Copies | One | Multiple (Backup) |
| Error Recovery | Poor | Better |

---

## MBR Structure

```
+----------------------+
| Boot Code            |
+----------------------+
| Partition Table      |
+----------------------+
| Boot Signature       |
+----------------------+
```

---

## GPT Structure

```
Protective MBR
↓

GPT Header

↓

Partition Table

↓

Partitions

↓

Backup Partition Table

↓

Backup GPT Header
```

---

## Which should you use?

Choose **GPT** if:

- Disk larger than 2 TB
- UEFI firmware
- Modern systems
- Better reliability

Choose **MBR** if:

- Legacy BIOS
- Older operating systems

---

# Disk Management Tool (GUI)

Windows provides a graphical tool for managing disks.

Open it:

```
diskmgmt.msc
```

or

```
Computer Management
    → Storage
        → Disk Management
```

---

## Tasks

- Initialize disk
- Convert MBR/GPT
- Create partition
- Delete partition
- Format partition
- Change drive letter
- Shrink volume
- Extend volume
- Convert Basic ↔ Dynamic
- Create RAID volumes

---

## Disk Status

Possible states:

- Online
- Offline
- Healthy
- Unallocated
- Not Initialized
- Foreign (Dynamic Disk)
- Failed

---

## Partition Colors

| Color | Meaning |
|--------|----------|
| Blue | Primary Partition |
| Green | Extended Partition |
| Black | Unallocated Space |

---

# DiskPart

`diskpart` is the command-line tool for managing disks.

Start:

```cmd
diskpart
```

---

## View Disks

```cmd
list disk
```

---

## Select Disk

```cmd
select disk 0
```

---

## View Partitions

```cmd
list partition
```

---

## View Volumes

```cmd
list volume
```

---

## Create Primary Partition

```cmd
create partition primary
```

Specify size (MB):

```cmd
create partition primary size=10240
```

---

## Create Extended Partition

```cmd
create partition extended
```

---

## Create Logical Drive

```cmd
create partition logical
```

---

## Delete Partition

```cmd
delete partition
```

Force delete:

```cmd
delete partition override
```

---

## Format Volume

Quick NTFS:

```cmd
format fs=ntfs quick
```

FAT32:

```cmd
format fs=fat32 quick
```

exFAT:

```cmd
format fs=exfat quick
```

---

## Assign Drive Letter

```cmd
assign letter=E
```

---

## Remove Drive Letter

```cmd
remove letter=E
```

---

## Clean Disk

Deletes partition table.

```cmd
clean
```

---

## Clean All

Securely writes zeros across the disk.

```cmd
clean all
```

---

## Convert Disk Style

To GPT:

```cmd
convert gpt
```

To MBR:

```cmd
convert mbr
```

---

## Convert Dynamic

```cmd
convert dynamic
```

---

## Convert Basic

Requires deleting dynamic volumes first.

```cmd
convert basic
```

---

# File System (Format Types)

Formatting prepares a partition for storing files.

---

## NTFS

Recommended for Windows.

### Features

- Permissions (ACL)
- Compression
- Encryption (EFS)
- Disk Quotas
- Large files
- Journaling

Maximum file:

- 16 TB (Windows implementation)

Best for:

- Windows OS
- Servers
- Internal drives

---

## FAT32

Older file system.

### Limitations

- Maximum file size: **4 GB**
- Maximum partition: **2 TB** (Windows GUI typically limits creation to 32 GB)

Compatible with almost every operating system.

Best for:

- USB drives
- Older devices

---

## exFAT

Designed for flash storage.

### Advantages

- Supports files larger than 4 GB
- Cross-platform compatibility
- Lightweight

Best for:

- USB
- SD cards
- External drives

---

## ReFS (Resilient File System)

Enterprise file system.

### Features

- Data integrity
- Error correction
- Large storage
- High availability

Used mainly on:

- Windows Server
- Storage Spaces

---

# Dynamic Disks

A **Dynamic Disk** stores data using **Volumes** instead of traditional partitions.

Advantages:

- Extend volumes across disks
- Software RAID
- Better flexibility

Supported on:

- Windows Server
- Windows Professional editions

---

## Dynamic Volume Types

| Volume | Disks Required | Fault Tolerance |
|----------|---------------|----------------|
| Simple | 1 | No |
| Spanned | 2–32 | No |
| Striped (RAID 0) | 2–32 | No |
| Mirrored (RAID 1) | 2 | Yes |
| RAID-5 | 3–32 | Yes |

---

# Simple Volume

Uses **one physical disk**.

```
Disk 1

+----------------------+
|      Volume C:       |
+----------------------+
```

### Features

- One disk only
- Can be extended (if free space exists)
- No fault tolerance

Best for:

- General storage

---

# Spanned Volume

Combines **2–32 disks** into one large volume.

```
Disk 1        Disk 2

+--------+    +--------+
| Part 1 | -> | Part 2 |
+--------+    +--------+

One Large Volume
```

### Features

- Uses free space from multiple disks
- Data fills one disk, then continues onto the next
- Easy capacity expansion

### Advantages

- Increases storage size

### Disadvantages

- No performance improvement
- No fault tolerance
- If one disk fails, the entire volume is lost

---

# Striped Volume (RAID 0)

Uses **2–32 disks**.

Data is split evenly across all disks.

```
File

A1 A2 A3 A4

↓

Disk1   Disk2

A1       A2
A3       A4
```

### Advantages

- Fastest performance
- Simultaneous read/write

### Disadvantages

- No redundancy
- One disk failure destroys all data

Best for:

- Temporary high-speed storage
- Video editing
- Scratch disks

---

# Mirrored Volume (RAID 1)

Uses **2 disks**.

Each disk stores an identical copy.

```
Disk1

DATA

↓

Disk2

DATA
```

### Advantages

- Fault tolerant
- Survives one disk failure
- Fast read operations

### Disadvantages

- Uses 50% of total capacity
- Higher cost

Example:

```
Disk1 = 500 GB

Disk2 = 500 GB

Usable = 500 GB
```

---

# RAID-5 Volume

Requires **3–32 disks**.

Uses **striping with distributed parity**.

```
Disk1   Disk2   Disk3

A1      A2      P

B1      P       B2

P       C1      C2
```

P = Parity

### Advantages

- Fault tolerant
- Good read performance
- Efficient storage usage

### Disadvantages

- Slower writes (parity calculations)
- Requires at least 3 disks

Usable capacity:

```
(Number of disks - 1) × Smallest disk size
```

Example:

```
3 × 1 TB

Usable:

(3 - 1) × 1 TB

= 2 TB
```

---

# RAID Comparison

| RAID | Min Disks | Performance | Fault Tolerance | Capacity |
|------|-----------|-------------|-----------------|-----------|
| RAID 0 (Striped) | 2 | Excellent | ❌ No | 100% |
| RAID 1 (Mirror) | 2 | Good | ✅ Yes | 50% |
| RAID 5 | 3 | Good Read | ✅ Yes | (N-1) |

---

# Basic vs Dynamic

| Feature | Basic | Dynamic |
|----------|--------|---------|
| Storage Unit | Partitions | Volumes |
| Maximum Flexibility | Low | High |
| Software RAID | No | Yes |
| Spanned Volume | No | Yes |
| RAID 0 | No | Yes |
| RAID 1 | No | Yes |
| RAID 5 | No | Yes (Windows Server) |
| Compatibility | High | Lower |


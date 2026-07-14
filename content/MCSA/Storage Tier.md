# Storage Tier

**Storage Tiering** automatically stores data on different types of drives based on how frequently it is accessed.

## How It Works

- **SSD Tier** → Stores frequently accessed ("hot") data for high performance.
- **HDD Tier** → Stores infrequently accessed ("cold") data for larger, lower-cost storage.
- Windows automatically moves data between SSD and HDD based on usage.

## Benefits

- Improves performance.
- Reduces storage cost.
- Maximizes SSD speed while utilizing HDD capacity.
- Automatic data optimization with minimal administration.

![[MCSA/Storage Tier/Pasted image 20260714160822.png]]

# Lab: Simulate SSD and HDD

In a virtual lab, all disks usually appear as **Unspecified**. You can manually assign a media type to simulate SSD and HDD.

![[MCSA/Storage Tier/Pasted image 20260714161110.png]]
## 1. View Physical Disks

```powershell
Get-PhysicalDisk
```

Or display only important properties:

```powershell
Get-PhysicalDisk | Format-Table FriendlyName, Size, MediaType
```

---

## 2. View Storage Pools

```powershell
Get-StoragePool
```

Example:

```powershell
Get-StoragePool Storage_Test | Get-PhysicalDisk
```

Where **Storage_Test** is the name of the storage pool.

---

## 3. Select a Specific Disk

Example (64 GB disk):

```powershell
Get-StoragePool Storage_Test | Get-PhysicalDisk | Where-Object Size -EQ 64424509440
```

---

## 4. Change the Media Type

Set the disk as an **HDD**:

```powershell
Get-StoragePool Storage_Test | Get-PhysicalDisk | Where-Object Size -EQ 64424509440 | Set-PhysicalDisk -MediaType HDD
```

Or set it as an **SSD**:

```powershell
Get-StoragePool Storage_Test | Get-PhysicalDisk | Where-Object Size -EQ 64424509440 | Set-PhysicalDisk -MediaType SSD
```

---

## 5. Verify

```powershell
Get-PhysicalDisk | Format-Table FriendlyName, Size, MediaType
```

The **MediaType** column should now display **SSD** or **HDD**.

---

# Creating a Tiered Virtual Disk



![[MCSA/Storage Tier/Pasted image 20260714161457.png]]

![[MCSA/Storage Tier/Pasted image 20260714161541.png]]

![[MCSA/Storage Tier/Pasted image 20260714161648.png]]

![[MCSA/Storage Tier/Pasted image 20260714161814.png]]

![[MCSA/Storage Tier/Pasted image 20260714161825.png]]

![[MCSA/Storage Tier/Pasted image 20260714161910.png]]![[MCSA/Storage Tier/Pasted image 20260714161959.png]]


---

## Limitations

- ❌ RAID-5 is **not supported** with Storage Tiering.
- ❌ Thin Provisioning is **not supported** with Storage Tiering.
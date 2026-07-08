
# Active Directory Partitions

> [!info]
> Active Directory stores its data in different **directory partitions (naming contexts)**. Each partition has a specific purpose and a different replication scope.

---

# Active Directory Partition Types

| Partition | Purpose | Replicates To |
|-----------|---------|---------------|
| Domain Partition | Stores objects specific to a domain (users, groups, computers, OUs, GPOs). | Domain Controllers in the **same domain** only |
| Configuration Partition | Stores forest-wide configuration information (sites, services, replication topology). | All Domain Controllers in the **forest** |
| Schema Partition | Stores definitions of all object classes and attributes in Active Directory. | All Domain Controllers in the **forest** |
| Application Partition | Stores application-specific data (such as DNS zones) with customizable replication. | Selected Domain Controllers |

---

# 1. Domain Partition

The **Domain Partition** contains all objects that belong to a particular domain.

## Stores

- Users
- Groups
- Computers
- Organizational Units (OUs)
- Group Policy Objects (GPOs)
- Shared folders
- Security principals


> [!tip]
> Each domain has its own Domain Partition.

---

# 2. Configuration Partition

The **Configuration Partition** stores information about how the Active Directory forest is configured.

## Stores

- Active Directory Sites
- Site Links
- Replication Topology
- Services
- Partitions
- Global Configuration

### Replication 
- Replicates to **every Domain Controller** in the forest. 
- In same site Replication in no time max 7s
- In different site Replication in every 3h 
Example: 
If a new **Active Directory Site** is created, every Domain Controller in every domain receives this information.


![[MCSA/partitions/Pasted image 20260709000037.png]]


> [!important]
> There is only **one Configuration Partition per forest**.

---

# 3. Schema Partition

The **Schema Partition** defines what types of objects can exist in Active Directory.

Think of it as the **database blueprint**.

It specifies:

- Object classes
- Object attributes
- Attribute data types
- Object relationships

---

## Access AD Schema

### In CMD
```cmd
regsvr32 schmmgmt.dll
```

![[MCSA/partitions/Pasted image 20260709001149.png]]

### In MMC

![[MCSA/partitions/Pasted image 20260709001329.png]]

### Example 
> add for user class birthday attributes 

![[MCSA/partitions/Pasted image 20260709001543.png]]

![[MCSA/partitions/Pasted image 20260709002216.png]]


#### Generate OID
> https://learn.microsoft.com/en-us/windows/win32/ad/obtaining-an-object-identifier-from-microsoft


```vb
' oidgen.vbs 
'  
' THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED  
' OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR  
' FITNESS FOR A PARTICULAR PURPOSE. 
' 
' Copyright (c) Microsoft Corporation. All rights reserved 
' Improvements made by Ryein C. Goddard
' 
' This script is not supported under any Microsoft standard support program or service.  
' The script is provided AS IS without warranty of any kind. Microsoft further disclaims all 
' implied warranties including, without limitation, any implied warranties of merchantability 
' or of fitness for a particular purpose. The entire risk arising out of the use or performance 
' of the scripts and documentation remains with you. In no event shall Microsoft, its authors, 
' or anyone else involved in the creation, production, or delivery of the script be liable for  
' any damages whatsoever (including, without limitation, damages for loss of business profits,  
' business interruption, loss of business information, or other pecuniary loss) arising out of  
' the use of or inability to use the script or documentation, even if Microsoft has been advised  
' of the possibility of such damages. 
' ---------------------------------------------------------------------- 
Function GenerateOID() 
    'Initializing Variables 
    Dim guidString, oidPrefix 
    Dim guidPart0, guidPart1, guidPart2, guidPart3, guidPart4, guidPart5, guidPart6 
    Dim oidPart0, oidPart1, oidPart2, oidPart3, oidPart4, oidPart5, oidPart6 
    On Error Resume Next 
    'Generate GUID 
    Set TypeLib = CreateObject("Scriptlet.TypeLib") 
    guidString = TypeLib.Guid 
    'If no network card is available on the machine then generating GUID can result with an error. 
    If Err.Number <> 0 Then 
        Wscript.Echo "ERROR: Guid could not be generated, please ensure machine has a network card." 
        Err.Clear 
        WScript.Quit 
    End If 
    'Stop Error Resume Next 
    On Error GoTo 0 
    'The Microsoft OID Prefix used for the automated OID Generator 
    oidPrefix = "1.2.840.113556.1.8000.2554" 
    'Split GUID into 6 hexadecimal numbers 
    guidPart0 = Trim(Mid(guidString, 2, 4)) 
    guidPart1 = Trim(Mid(guidString, 6, 4)) 
    guidPart2 = Trim(Mid(guidString, 11, 4)) 
    guidPart3 = Trim(Mid(guidString, 16, 4)) 
    guidPart4 = Trim(Mid(guidString, 21, 4)) 
    guidPart5 = Trim(Mid(guidString, 26, 6)) 
    guidPart6 = Trim(Mid(guidString, 32, 6)) 
    'Convert the hexadecimal to decimal 
    oidPart0 = CLng("&H" & guidPart0) 
    oidPart1 = CLng("&H" & guidPart1) 
    oidPart2 = CLng("&H" & guidPart2) 
    oidPart3 = CLng("&H" & guidPart3) 
    oidPart4 = CLng("&H" & guidPart4) 
    oidPart5 = CLng("&H" & guidPart5) 
    oidPart6 = CLng("&H" & guidPart6) 
    'Concatenate all the generated OIDs together with the assigned Microsoft prefix and return 
    GenerateOID = oidPrefix & "." & oidPart0 & "." & oidPart1 & "." & oidPart2 & "." & oidPart3 & _ 
        "." & oidPart4 & "." & oidPart5 & "." & oidPart6 
End Function 

Set oShell = WScript.CreateObject ("WScript.Shell")
oShell.run "cmd /c Regsvr32 Schmmgmt.dll"

Set objFSO=CreateObject("Scripting.FileSystemObject")
outFile="C:\Users\Administrator\Desktop\oidInfo.txt"
Set objFile = objFSO.CreateTextFile(outFile,True)

'Output the resulted OID with best practice info 
oidText = "Your root OID is: " & VBCRLF & GenerateOID & VBCRLF & VBCRLF & VBCRLF & _ 
    "This prefix should be used to name your schema attributes and classes. For example: " & _ 
    "if your prefix is ""Microsoft"", you should name schema elements like ""microsoft-Employee-ShoeSize"". " & _ 
    "For more information on the prefix, view the Schema Naming Rules in the server " & _  
    "Application Specification (http://www.microsoft.com/windowsserver2003/partners/isvs/appspec.mspx)." & _ 
    VBCRLF & VBCRLF & _ 
    "You can create subsequent OIDs for new schema classes and attributes by appending a .X to the OID where X may " & _ 
    "be any number that you choose.  A common schema extension scheme generally uses the following structure:" & VBCRLF & _ 
    "If your assigned OID was: 1.2.840.113556.1.8000.2554.999999" & VBCRLF & VBCRLF & _ 
    "then classes could be under: 1.2.840.113556.1.8000.2554.999999.1 " & VBCRLF & _  
    "which makes the first class OID: 1.2.840.113556.1.8000.2554.999999.1.1" & VBCRLF & _ 
    "the second class OID: 1.2.840.113556.1.8000.2554.999999.1.2     etc..." & VBCRLF & VBCRLF & _ 
    "Using this example attributes could be under: 1.2.840.113556.1.8000.2554.999999.2 " & VBCRLF & _ 
    "which makes the first attribute OID: 1.2.840.113556.1.8000.2554.999999.2.1 " & VBCRLF & _ 
    "the second attribute OID: 1.2.840.113556.1.8000.2554.999999.2.2     etc..." & VBCRLF & VBCRLF & _ 
     "Here are some other useful links regarding AD schema:" & VBCRLF & _ 
    "Understanding AD Schema" & VBCRLF & _ 
    "http://technet2.microsoft.com/WindowsServer/en/Library/b7b5b74f-e6df-42f6-a928-e52979a512011033.mspx " & _ 
    VBCRLF & VBCRLF & _ 
    "Developer documentation on AD Schema:" & VBCRLF & _ 
    "http://msdn2.microsoft.com/en-us/library/ms675085.aspx " & VBCRLF & VBCRLF & _ 
    "Extending the Schema" & VBCRLF & _ 
    "http://msdn2.microsoft.com/en-us/library/ms676900.aspx " & VBCRLF & VBCRLF & _ 
    "Step-by-Step Guide to Using Active Directory Schema and Display Specifiers " & VBCRLF & _ 
    "http://www.microsoft.com/technet/prodtechnol/windows2000serv/technologies/activedirectory/howto/adschema.mspx " & _ 
    VBCRLF & VBCRLF & _ 
    "Troubleshooting AD Schema " & VBCR & _ 
    "http://technet2.microsoft.com/WindowsServer/en/Library/6008f7bf-80de-4fc0-ae3e-51eda0d7ab651033.mspx  " & _ 
    VBCRLF & VBCRLF 

objFile.Write oidText
objFile.Close
```


#### add attribute for the class 
![[MCSA/partitions/Pasted image 20260709002645.png]]

![[MCSA/partitions/Pasted image 20260709012044.png]]

#### restart domain controller 
![[MCSA/partitions/Pasted image 20260709012356.png]]
![[MCSA/partitions/Pasted image 20260709012532.png]]

![[MCSA/partitions/Pasted image 20260709012727.png]]


### Replication

- Replicates to every Domain Controller in the forest.

> [!warning]
> Schema changes are permanent and affect the entire forest.

---

# 4. Application Partition

The **Application Partition** stores application-specific data.

Unlike the other partitions, administrators can choose which Domain Controllers receive the replication.

## Common Uses

- Active Directory Integrated DNS
- DNS Zone Data
- Other Microsoft applications

### Replication

Can replicate to:

- All Domain Controllers
- Only Domain Controllers running DNS
- A custom set of Domain Controllers

Example:

DNS zone:

```
company.local
```

can replicate only to DNS servers instead of every Domain Controller.

> [!note]
> Application Partitions provide flexible replication and help reduce unnecessary replication traffic.

---

# Replication Summary

| Partition | Scope | Replication |
|-----------|-------|-------------|
| Domain | Domain | Domain Controllers in the same domain |
| Configuration | Forest | All Domain Controllers |
| Schema | Forest | All Domain Controllers |
| Application | Custom | Selected Domain Controllers |

---

# Easy Way to Remember

| Partition | Remember It As |
|-----------|----------------|
| Domain | **Your domain's objects** |
| Configuration | **Forest settings** |
| Schema | **Blueprint of Active Directory** |
| Application | **Application data (mainly DNS)** |

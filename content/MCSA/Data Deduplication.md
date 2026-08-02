# Setup Role

![[MCSA/Data Deduplication/Pasted image 20260802173744.png]]
![[MCSA/Data Deduplication/Pasted image 20260802173824.png]]

# Example 

![[MCSA/Data Deduplication/Pasted image 20260802174413.png]]
![[MCSA/Data Deduplication/Pasted image 20260802174502.png]]
![[MCSA/Data Deduplication/Pasted image 20260802174816.png]]
![[MCSA/Data Deduplication/Pasted image 20260802174841.png]]

![[MCSA/Data Deduplication/Pasted image 20260802175826.png]]

![[MCSA/Data Deduplication/Pasted image 20260802180520.png]]
![[MCSA/Data Deduplication/Pasted image 20260802180554.png]]

```powershell
Start-DedupJob -Volume d: -Type Optimization

Get-DedupJob -Volume e: -Type Optimization
```
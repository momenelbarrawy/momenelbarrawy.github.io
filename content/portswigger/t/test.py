#carlos
#carlos
#wiener

#pass
#pass
#peter

import os
# for i in range(150):
#     if i % 3:
#         print("carlos")
#     else :
#         print("wiener")

with open("pass.txt", "r") as f:
    lines = f.readlines()

for pwd in lines:
    print(pwd.strip('\n'))
# for x in range(150):
#     if x % 3 :
#         print()
#     else:
#         print("peter") 
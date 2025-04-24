```mermaid
---
title: Create Adherent State
---

flowchart TD
    A[
        Idle

Status: idle
Error: null

Notifications: n

List Adherents Data: n
]

B[
Loading

Status: loading
Error: null

Notifications: n

List Adherents Data: n
]

C[
Error

Status: error
Error: error message

Notification: n + 1 error

List Adherents Data: n
]

D[
Success

Status: success
Error: null

Notification: n + 1 success
]


E[
List Adherents Success

...
Data: n + created Adherent
]

subgraph Create Adherent
A -->|Adherent creation Started|B
B -->|Adherent creation failed|C
B -->|Adherent Created|D
end

subgraph List Adherents
D -->|...|E
end

```

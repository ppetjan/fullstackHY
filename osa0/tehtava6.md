```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Lähettää datan JSON-muodossa

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Statuskoodi "201 Created"
    deactivate server
```

PS D:\hadi\.git\SKH-TRADERS> Start-Sleep -Seconds 2; Invoke-WebRequest -Uri http://127.0.0.1:3000 -UseBasicParsing -ErrorAction SilentlyContinue | Select-Object StatusCode, StatusDescription
Invoke-WebRequest: No connection could be made because the target machine actively refused it.
PS D:\hadi\.git\SKH-TRADERS> npx http-server -p 3000 -c-1
Starting up http-server, serving ./

http-server version: 14.1.1

http-server settings:
CORS: disabled
Cache: -1 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://192.168.10.9:3000
  http://127.0.0.1:3000
  http://172.26.16.1:3000
Hit CTRL-C to stop the server

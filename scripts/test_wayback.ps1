$ErrorActionPreference = 'Stop'
$url = 'http://web.archive.org/web/20241001id_/https://www.kiwlmachine.com/about-us/index.html'
$r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 90
Write-Host "Status: $($r.StatusCode) Len: $($r.Content.Length)"
if ($r.Content -match 'id="header"') { Write-Host 'HAS HEADER' } else { Write-Host 'NO HEADER' }

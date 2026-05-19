$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$broken = 0
$ok = 0
Get-ChildItem -LiteralPath $root -Filter '*.html' -Recurse -File | ForEach-Object {
    if ($_.FullName -match 'neirongtuisong') { return }
    $c = [System.IO.File]::ReadAllText($_.FullName)
    if ($c.Contains('id="header"')) { $ok++ } else { $broken++ }
}
Write-Host "Root: $root"
Write-Host "OK: $ok Broken: $broken"

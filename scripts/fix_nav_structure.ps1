# Move #nav / #nav_Mask outside #header (fixes banner overlap).
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$utf8 = New-Object System.Text.UTF8Encoding $false
$fixed = 0
Get-ChildItem -LiteralPath $root -Filter '*.html' -Recurse -File | Where-Object { $_.FullName -notmatch 'neirongtuisong' } | ForEach-Object {
    $c = [IO.File]::ReadAllText($_.FullName, $utf8)
    if ($c -notmatch '<nav id="nav">') { return }
    if ($c -match '(?is)</div>\s*</div>\s*</div>\s*<nav id="nav">') { return }
    if ($c -notmatch '(?is)<div id="header">[\s\S]*?<nav id="nav">') { return }
    $n = $c
    $n = [regex]::Replace($n, '(?is)(</div>\s*</motion>\s*</motion>)\s*(<nav id="nav">)', '$1</div>$2', 1)
    $n = [regex]::Replace($n, '(?is)(</div>\s*</div>)\s*(<nav id="nav">)', '$1</div>$2', 1)
    $n = [regex]::Replace($n, '(?is)(<div id="nav_Mask"></div>)\s*</div>\s*(<!-- banner -->|<div class="indx_banner"|<motion id="main"|<div id="main"|<div id="neiye_bx"|<div class="mid_cont")', '$1$2', 1)
    if ($n -ne $c) {
        [IO.File]::WriteAllText($_.FullName, $n, $utf8)
        $script:fixed++
    }
}
Write-Host "Fixed nav structure on $fixed pages"

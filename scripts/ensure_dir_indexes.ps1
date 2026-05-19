$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$backup = 'D:\aa\kiwlmachine.com'
$utf8 = New-Object System.Text.UTF8Encoding $false
$created = 0
Get-ChildItem -LiteralPath $root -Directory -Recurse | Where-Object { $_.FullName -notmatch 'neirongtuisong|statics|uploadfile|scripts' } | ForEach-Object {
    $idx = Join-Path $_.FullName 'index.html'
    if (Test-Path -LiteralPath $idx) { return }
    $rel = $_.FullName.Substring($root.Length).TrimStart('\', '/')
    $bakIdx = Join-Path (Join-Path $backup $rel) 'index.html'
    if (Test-Path -LiteralPath $bakIdx) {
        $html = [IO.File]::ReadAllText($bakIdx, $utf8)
        if ($html.Contains('id="header"') -and $html -match 'jquery-1\.10\.2') {
            [IO.File]::WriteAllText($idx, $html, $utf8)
            $script:created++
            Write-Host "Copied backup index: $rel"
            return
        }
    }
    $parentIdx = Join-Path $_.Parent.FullName 'index.html'
    if (-not (Test-Path -LiteralPath $parentIdx)) { return }
    $depth = ([regex]::Matches($rel, '[\\/]')).Count
    $up = if ($depth -le 0) { 'index.html' } else { ('../' * $depth) + 'index.html' }
    $html = @"
<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=$up">
<title>Redirect</title>
</head><body><p><a href="$up">Continue</a></p></body></html>
"@
    [IO.File]::WriteAllText($idx, $html, $utf8)
    $script:created++
    Write-Host "Redirect index: $rel -> $up"
}
Write-Host "Created or copied: $created"

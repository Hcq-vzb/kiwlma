$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$out = Join-Path $root 'broken_pages_list.txt'
$lines = New-Object System.Collections.Generic.List[string]
Get-ChildItem -LiteralPath $root -Filter '*.html' -Recurse -File | ForEach-Object {
    if ($_.FullName -match 'neirongtuisong') { return }
    $c = [System.IO.File]::ReadAllText($_.FullName)
    if (-not $c.Contains('id="header"')) {
        $rel = $_.FullName.Substring($root.Length).TrimStart('\', '/')
        [void]$lines.Add($rel)
    }
}
[System.IO.File]::WriteAllLines($out, $lines, (New-Object System.Text.UTF8Encoding $false))
Write-Host "Broken pages: $($lines.Count) -> $out"

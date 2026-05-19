# Fix 17 legacy CMS pages.
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$utf8 = New-Object System.Text.UTF8Encoding $false
$langSwitch = '<div class="lang-switch" role="group" aria-label="Language selection"><button type="button" class="lang-btn is-active" data-lang="en" title="English" aria-pressed="true">EN</button><button type="button" class="lang-btn" data-lang="fr" title="Fran&ccedil;ais" aria-pressed="false">FR</button></div>'
$linkPattern = '(?is)<a\s+href="[^"]*"\s+title="chinase"\s*>(?:\s*<div\s+class="Language">\s*<img[^>]*>\s*</div>\s*)</a>'

function Patch-Page([string]$html, [string]$prefix) {
    $c = $html
    if ($c -match $linkPattern) { $c = [regex]::Replace($c, $linkPattern, $langSwitch, 1) }
    if ($c -notmatch 'i18n\.js') {
        $c = [regex]::Replace($c, '(?is)</body>', "<script src=`"${prefix}statics/js/jss/i18n.js`"></script>`n</body>", 1)
    }
    return $c
}

function Copy-TemplatePage([string]$templateRel, [string]$targetRel) {
    $tpl = Join-Path $root $templateRel
    $tgt = Join-Path $root $targetRel
    if (-not (Test-Path -LiteralPath $tpl)) { Write-Warning "No template: $templateRel"; return $false }
    $depth = ([regex]::Matches((Split-Path $targetRel -Parent), '[\\/]')).Count + 1
    $prefix = if ($depth -eq 0) { './' } else { '../' * $depth }
    $html = Patch-Page ([IO.File]::ReadAllText($tpl, $utf8)) $prefix
    [IO.File]::WriteAllText($tgt, $html, $utf8)
    return $true
}

function Write-Redirect([string]$targetRel, [string]$url) {
    $tgt = Join-Path $root $targetRel
    $html = @"
<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=$url">
<link rel="canonical" href="$url">
<title>Redirect</title>
</head><body><p><a href="$url">Continue</a></p></body></html>
"@
    [IO.File]::WriteAllText($tgt, $html, $utf8)
}

$fixed = 0
Write-Redirect 'about-us\qi-ye-jian-jie\index.html' '../../about-us/index.html#we'
$fixed++

$schemeMap = @{
    'Industrial-applications\Juice-filling-scheme' = 'Industrial-applications\Juice-filling-line-solution\index.html'
    'Industrial-applications\Wine-filling-scheme' = 'Industrial-applications\glass-bottle-wine-filling-line-solution\index.html'
    'Industrial-applications\Seasoning-filling-scheme' = 'Industrial-applications\auec-jam-production-line-souution\index.html'
    'Industrial-applications\Filling-scheme-with-steam-and-water' = 'Industrial-applications\water-filling-line-solution\index.html'
}

foreach ($folder in $schemeMap.Keys) {
    $tplRel = $schemeMap[$folder]
    $idxRel = "$folder\index.html"
    if (Copy-TemplatePage $tplRel $idxRel) { $fixed++; Write-Host "Fixed: $idxRel" }
    foreach ($n in 2..5) {
        Write-Redirect "$folder\$n.html" 'index.html'
        $fixed++
    }
}

Write-Host "Fixed orphan pages: $fixed"

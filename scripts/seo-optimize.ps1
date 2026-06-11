# SEO optimization: canonical, domain cleanup, meta, schema, sitemaps
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$utf8 = New-Object System.Text.UTF8Encoding $false
$siteBase = 'https://www.kiwlmachine.com'
$genericDesc = 'CHING KING WHALE MACHINE GROUP .J S is a professional manufacturer with over 20 years of experience in beverage machinery manufacturing. It can provide you with satisfactory solutions for filling products such as water, fruit juice, wine, oil, etc.'

$pathMap = [ordered]@{
    'Products/'          = 'products/index.html'
    'Contacts/'          = 'contact-us/index.html'
    'Contact-Us/'        = 'contact-us/index.html'
    'video/'             = 'Video-News/index.html'
    'Video-News/'        = 'Video-News/index.html'
    'sitemap.html'       = 'sitemap.html'
    'index.html'         = 'index.html'
    'index.php'          = 'index.html'
}

function Get-RootPrefix([string]$relPath) {
    $dir = Split-Path $relPath -Parent
    if ([string]::IsNullOrEmpty($dir)) { return './' }
    $depth = ([regex]::Matches($dir, '[\\/]')).Count + 1
    return ('../' * $depth)
}

function Get-CanonicalUrl([string]$relPath) {
    $urlPath = ($relPath -replace '\\', '/')
    if ($urlPath -eq 'index.html') { return "$siteBase/" }
    return "$siteBase/$urlPath"
}

function Convert-AbsoluteToRelative([string]$html, [string]$prefix) {
    $c = $html
    $c = $c -replace 'https?://xzj\.rfkjcs\.com/statics/', ($prefix + 'statics/')
    $c = $c -replace 'https?://xzj\.rfkjcs\.com/uploadfile/', ($prefix + 'uploadfile/')
    $c = $c -replace 'https?://www\.kiwlmachine\.com/statics/', ($prefix + 'statics/')
    $c = $c -replace 'https?://www\.kiwlmachine\.com/uploadfile/', ($prefix + 'uploadfile/')

    foreach ($key in $pathMap.Keys) {
        $target = $pathMap[$key]
        $c = $c -replace [regex]::Escape("http://xzj.rfkjcs.com/$key"), ($prefix + $target)
        $c = $c -replace [regex]::Escape("https://xzj.rfkjcs.com/$key"), ($prefix + $target)
        $c = $c -replace [regex]::Escape("https://www.kiwlmachine.com/$key"), ($prefix + $target)
        $c = $c -replace [regex]::Escape("http://www.kiwlmachine.com/$key"), ($prefix + $target)
    }

    $c = $c -replace 'https?://xzj\.rfkjcs\.com/', $prefix
    $c = $c -replace 'https?://www\.kiwlmachine\.com/', $prefix
  # Fix accidental double-prefix from nested replacements
    $c = $c -replace [regex]::Escape($prefix + $prefix), $prefix
    return $c
}

function Get-ProductName([string]$relPath, [string]$title) {
    if ($title -match '^(.+?)\s*-\s*can filling machine') {
        return $Matches[1].Trim()
    }
    $parts = ($relPath -replace '\\', '/') -split '/'
    $segment = ($parts | Where-Object { $_ -and $_ -ne 'index.html' -and $_ -notmatch '^\d+\.html$' } | Select-Object -Last 1)
    if ($segment) {
        return (Get-Culture).TextInfo.ToTitleCase(($segment -replace '-', ' ').ToLower())
    }
    return 'Beverage Machinery'
}

function Get-UniqueDescription([string]$relPath, [string]$title, [string]$currentDesc) {
    $norm = $relPath -replace '\\', '/'
    if ($norm -match '^products/' -and ($currentDesc -eq $genericDesc -or [string]::IsNullOrWhiteSpace($currentDesc))) {
        $name = Get-ProductName $relPath $title
        return "Professional $name from CHING KING WHALE MACHINE GROUP - 20+ years beverage machinery manufacturing. Custom filling line solutions for water, juice, wine, oil and more. Contact us for a quote."
    }
    if ($norm -match '^Industrial-applications/' -and ($currentDesc -eq $genericDesc -or [string]::IsNullOrWhiteSpace($currentDesc))) {
        $name = Get-ProductName $relPath $title
        return "Complete $name for beverage production plants. CHING KING WHALE provides turnkey filling line design, installation and commissioning worldwide."
    }
    return $null
}

function Set-OrAddCanonical([string]$html, [string]$canonicalUrl) {
    $tag = "<link rel=`"canonical`" href=`"$canonicalUrl`">"
    if ($html -match '<link\s+rel="canonical"') {
        return [regex]::Replace($html, '<link\s+rel="canonical"\s+href="[^"]*"\s*/?>', $tag, 1)
    }
    if ($html -match '<meta\s+name="viewport"[^>]*>') {
        return [regex]::Replace($html, '(<meta\s+name="viewport"[^>]*>)', "`$1`n$tag", 1)
    }
    return [regex]::Replace($html, '(<head[^>]*>)', "`$1`n$tag", 1)
}

function Set-OrAddMetaDescription([string]$html, [string]$desc) {
    $escaped = [System.Security.SecurityElement]::Escape($desc) -replace '&quot;', '"'
    $tag = "<meta name=`"description`" content=`"$desc`">"
    if ($html -match '<meta\s+name="description"') {
        return [regex]::Replace($html, '<meta\s+name="description"\s+content="[^"]*"\s*/?>', $tag, 1)
    }
    return [regex]::Replace($html, '(<meta\s+name="keywords"[^>]*>)', "`$1`n$tag", 1)
}

function Remove-ExistingSchema([string]$html) {
    return [regex]::Replace($html, '\s*<script\s+type="application/ld\+json"[^>]*>.*?</script>', '', 'Singleline')
}

function Get-OrganizationSchema() {
    return @'
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CHING KING WHALE MACHINE GROUP .J S",
  "url": "https://www.kiwlmachine.com",
  "logo": "https://www.kiwlmachine.com/statics/images/inc_tp_tel1.png",
  "description": "Professional beverage machinery manufacturer with 20+ years experience in filling lines for water, juice, wine, oil and more.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+86-18551189248",
    "contactType": "sales",
    "email": "cathy@kiwlmachine.com",
    "availableLanguage": ["English", "French"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Building 4, Xingyuan Road, Nanfeng Town",
    "addressLocality": "Zhangjiagang City",
    "addressRegion": "Jiangsu Province",
    "addressCountry": "CN"
  }
}
</script>
'@
}

function Get-ProductSchema([string]$name, [string]$desc, [string]$canonicalUrl) {
    $nameJson = ($name -replace '\\', '\\\\' -replace '"', '\"')
    $descJson = ($desc -replace '\\', '\\\\' -replace '"', '\"')
    return @"
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "$nameJson",
  "description": "$descJson",
  "url": "$canonicalUrl",
  "brand": {
    "@type": "Brand",
    "name": "CHING KING WHALE"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "CHING KING WHALE MACHINE GROUP .J S",
    "url": "https://www.kiwlmachine.com"
  }
}
</script>
"@
}

function Get-SitemapPriority([string]$relPath) {
    $p = $relPath -replace '\\', '/'
    if ($p -eq 'index.html') { return '1.0' }
    if ($p -in @('products/index.html', 'contact-us/index.html', 'about-us/index.html')) { return '0.9' }
    if ($p -match '^products/[^/]+/index\.html$') { return '0.8' }
    if ($p -match '^products/.+/index\.html$') { return '0.7' }
    if ($p -match '^Industrial-applications/.+/index\.html$') { return '0.7' }
    if ($p -match '/(2|3|4|5)\.html$') { return '0.4' }
    if ($p -match '^202[3-5]/') { return '0.5' }
    return '0.6'
}

function Test-IncludeInSitemap([string]$html, [string]$relPath) {
    if ($relPath -match 'neirongtuisong') { return $false }
    if ($html -notmatch 'id="header"' -and $html -match 'http-equiv="refresh"') { return $false }
    return $true
}

# --- Process HTML pages ---
$stats = @{ domain = 0; canonical = 0; meta = 0; schema = 0 }
$sitemapUrls = New-Object System.Collections.Generic.List[object]

Get-ChildItem -LiteralPath $root -Filter '*.html' -Recurse -File | ForEach-Object {
    if ($_.FullName -match 'neirongtuisong|\\scripts\\') { return }

    $rel = $_.FullName.Substring($root.Length).TrimStart('\', '/')
    $html = [IO.File]::ReadAllText($_.FullName, $utf8)
    $orig = $html
    $prefix = Get-RootPrefix $rel
    $canonical = Get-CanonicalUrl $rel

    if ($html -match 'xzj\.rfkjcs\.com|https?://www\.kiwlmachine\.com') {
        $html = Convert-AbsoluteToRelative $html $prefix
        $stats.domain++
    }

    $html = Set-OrAddCanonical $html $canonical
    if ($html -notmatch [regex]::Escape($orig) -or $orig -notmatch 'rel="canonical"') { $stats.canonical++ }

    $title = ''
    if ($html -match '<title>([^<]*)</title>') { $title = $Matches[1].Trim() }
    $curDesc = ''
    if ($html -match '<meta\s+name="description"\s+content="([^"]*)"') { $curDesc = $Matches[1] }
    $newDesc = Get-UniqueDescription $rel $title $curDesc
    if ($newDesc) {
        $html = Set-OrAddMetaDescription $html $newDesc
        $stats.meta++
        $curDesc = $newDesc
    }

    $html = Remove-ExistingSchema $html
    $norm = $rel -replace '\\', '/'
    if ($norm -eq 'index.html') {
        $html = [regex]::Replace($html, '(</head>)', (Get-OrganizationSchema) + "`n`$1", 1)
        $stats.schema++
    }
    elseif ($norm -match '^products/.+/index\.html$' -and $norm -ne 'products/index.html') {
        $pname = Get-ProductName $rel $title
        $pdesc = if ($curDesc) { $curDesc } else { $genericDesc }
        $schema = Get-ProductSchema $pname $pdesc $canonical
        $html = [regex]::Replace($html, '(</head>)', $schema + "`n`$1", 1)
        $stats.schema++
    }

    if ($html -ne $orig) {
        [IO.File]::WriteAllText($_.FullName, $html, $utf8)
    }

    if (Test-IncludeInSitemap $html $rel) {
        $sitemapUrls.Add([pscustomobject]@{
            loc      = $canonical
            priority = Get-SitemapPriority $rel
            rel      = $rel
        })
    }
}

# --- sitemap.xml ---
$today = Get-Date -Format 'yyyy-MM-dd'
$xml = New-Object System.Text.StringBuilder
[void]$xml.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
[void]$xml.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($u in ($sitemapUrls | Sort-Object loc)) {
    [void]$xml.AppendLine('  <url>')
    [void]$xml.AppendLine("    <loc>$($u.loc)</loc>")
    [void]$xml.AppendLine("    <lastmod>$today</lastmod>")
    [void]$xml.AppendLine("    <changefreq>monthly</changefreq>")
    [void]$xml.AppendLine("    <priority>$($u.priority)</priority>")
    [void]$xml.AppendLine('  </url>')
}
[void]$xml.AppendLine('</urlset>')
[IO.File]::WriteAllText((Join-Path $root 'sitemap.xml'), $xml.ToString(), $utf8)

# --- sitemap.html ---
$sections = [ordered]@{
    'Main' = @('index.html', 'about-us/index.html', 'products/index.html', 'contact-us/index.html')
    'Products' = @()
    'Industry Solutions' = @()
    'News & Media' = @('News/index.html', 'Video-News/index.html', 'Customer-Case/index.html')
}

Get-ChildItem -LiteralPath (Join-Path $root 'products') -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $idx = Join-Path $_.FullName 'index.html'
    if (Test-Path $idx) {
        $r = $idx.Substring($root.Length).TrimStart('\', '/').Replace('\', '/')
        $sections['Products'] += $r
    }
}
Get-ChildItem -LiteralPath (Join-Path $root 'Industrial-applications') -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $idx = Join-Path $_.FullName 'index.html'
    if (Test-Path $idx) {
        $r = $idx.Substring($root.Length).TrimStart('\', '/').Replace('\', '/')
        $sections['Industry Solutions'] += $r
    }
}

$sitemapHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Sitemap - CHING KING WHALE MACHINE GROUP</title>
<meta name="description" content="Complete sitemap of CHING KING WHALE MACHINE GROUP website - beverage filling machines, packaging equipment and industry solutions.">
<link rel="canonical" href="$siteBase/sitemap.html">
<style>
body{font-family:Arial,sans-serif;max-width:960px;margin:40px auto;padding:0 20px;color:#333;line-height:1.6}
h1{color:#1a5276;border-bottom:2px solid #1a5276;padding-bottom:10px}
h2{color:#2874a6;margin-top:30px}
ul{column-count:2;column-gap:40px}
a{color:#1a5276;text-decoration:none}
a:hover{text-decoration:underline}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:14px;color:#666}
</style>
</head>
<body>
<h1>Site Map</h1>
<p>Browse all main sections of CHING KING WHALE MACHINE GROUP. Full XML sitemap: <a href="sitemap.xml">sitemap.xml</a> ($($sitemapUrls.Count) pages).</p>
"@

foreach ($sec in $sections.Keys) {
    $links = $sections[$sec]
    if ($links.Count -eq 0) { continue }
    $sitemapHtml += "`n<h2>$sec</h2>`n<ul>`n"
    foreach ($l in $links) {
        $label = (Get-ProductName $l '')
        $sitemapHtml += "  <li><a href=`"$l`">$label</a></li>`n"
    }
    $sitemapHtml += "</ul>`n"
}

$sitemapHtml += @"
<div class="footer">
  <a href="index.html">Home</a> |
  <a href="products/index.html">Products</a> |
  <a href="contact-us/index.html">Contact Us</a>
</div>
</body>
</html>
"@
[IO.File]::WriteAllText((Join-Path $root 'sitemap.html'), $sitemapHtml, $utf8)

Write-Host "SEO optimization complete:"
Write-Host "  Domain links fixed: $($stats.domain) files"
Write-Host "  Canonical tags: $($stats.canonical) updates"
Write-Host "  Unique meta descriptions: $($stats.meta) product pages"
Write-Host "  Schema.org markup: $($stats.schema) pages"
Write-Host "  Sitemap URLs: $($sitemapUrls.Count)"
Write-Host "  Output: sitemap.xml, sitemap.html, robots.txt"

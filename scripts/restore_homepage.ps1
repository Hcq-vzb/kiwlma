# Restore index.html from D:\aa backup; preserve lang-switch, webp banner, i18n.
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$backup = 'D:\aa\kiwlmachine.com'
$utf8 = New-Object System.Text.UTF8Encoding $false
$indexPath = Join-Path $root 'index.html'
$bakPath = Join-Path $backup 'index.html'

$langSwitch = '<div class="lang-switch" role="group" aria-label="Language selection"><button type="button" class="lang-btn is-active" data-lang="en" title="English" aria-pressed="true">EN</button><button type="button" class="lang-btn" data-lang="fr" title="Fran&ccedil;ais" aria-pressed="false">FR</button></div>'
$linkPattern = '(?is)<a\s+href="[^"]*"\s+title="chinase"\s*>(?:\s*<div\s+class="Language">\s*<img[^>]*>\s*</div>\s*)</a>'
$bannerSlide = '<div class="swiper-slide slide1" style="background-image:url(./statics/images/8275b3c31397beaddbbf.webp);"><img src="./statics/images/8275b3c31397beaddbbf.webp" alt="Beverage Filling Machine Production Line" class="indx-banner-img" /></div>'

$html = [IO.File]::ReadAllText($bakPath, $utf8)
$html = [regex]::Replace($html, $linkPattern, $langSwitch, 1)
$html = [regex]::Replace($html, '(?is)<div class="swiper-slide slide1" style="background-image:url\(\./statics/images/ind_banner_1\.jpg\);"></div>', $bannerSlide, 1)
if ($html -notmatch 'i18n\.js') {
    $html = [regex]::Replace($html, '(?is)</body>', "<script src=`"./statics/js/jss/i18n.js`"></script>`n</body>", 1)
}
$html = $html -replace '<!--[^\x00-\x7F][^>]*-->', ''
[IO.File]::WriteAllText($indexPath, $html, $utf8)
Write-Host 'Restored index.html from backup with EN/FR + webp banner'

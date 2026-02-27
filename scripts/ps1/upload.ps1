param (
    [Parameter(Mandatory=$true)]
    [string]$Tag
)

Write-Host "Iniciando Upload de Binários para GitHub Release $Tag..." -ForegroundColor Cyan

$releaseDir = Join-Path $PSScriptRoot "../releases"
if (!(Test-Path $releaseDir)) {
    Write-Error "Pasta /releases não encontrada. Execute a compilação primeiro."
    exit 1
}

$files = Get-ChildItem -Path $releaseDir -File
if ($files.Count -eq 0) {
    Write-Warning "Nenhum arquivo encontrado em /releases para upload."
    exit 0
}

if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host "Verificando se a release $Tag já existe..." -ForegroundColor Yellow
    $releaseExists = $false
    gh release view $Tag --json tagName > $null 2>&1
    if ($LASTEXITCODE -eq 0) { $releaseExists = $true }

    if ($releaseExists) {
        Write-Host "Release $Tag já existe. Realizando upload dos assets..." -ForegroundColor Yellow
        gh release upload $Tag ($files.FullName) --clobber
    } else {
        Write-Host "Gerando notas baseadas nas modificações..." -ForegroundColor Yellow
        $previousTag = git describe --tags --abbrev=0 "$Tag^" 2>$null
        if (-not $previousTag) {
            $commitNotes = git log --no-merges --pretty=format:"- %s (%h)" -n 20
        } else {
            $commitNotes = git log "$previousTag..$Tag" --no-merges --pretty=format:"- %s (%h)"
        }

        $releaseNotes = "### Modificações na versão $Tag`n`n$commitNotes`n`n> Arquivos executáveis da versão $Tag"
        $tempNotesPath = Join-Path $PSScriptRoot "temp_release_notes.md"
        [System.IO.File]::WriteAllText($tempNotesPath, $releaseNotes, [System.Text.Encoding]::UTF8)

        Write-Host "Criando nova release $Tag e realizando upload dos assets..." -ForegroundColor Yellow
        gh release create $Tag ($files.FullName) --title "Release $Tag" --notes-file $tempNotesPath
        Remove-Item -Path $tempNotesPath -ErrorAction SilentlyContinue
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Upload concluído com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "Erro durante o upload via GitHub CLI." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "GitHub CLI (gh) não encontrado." -ForegroundColor Red
    Write-Host "Por favor, faça o upload manual dos arquivos em /releases para a release $Tag no GitHub." -ForegroundColor Yellow
    Write-Host "Arquivos prontos para upload:"

    $files | ForEach-Object { Write-Host " - $($_.Name)" }
}

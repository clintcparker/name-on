# name-on CLI installer for Windows
# Usage: irm https://raw.githubusercontent.com/clintcparker/name-on/main/install/install.ps1 | iex
#
# Environment variables:
#   INSTALL_DIR  - Installation directory (default: $env:LOCALAPPDATA\name-on)
#   VERSION      - Specific version to install (default: latest)

$ErrorActionPreference = 'Stop'

$Repo = "clintcparker/name-on"
$InstallDir = if ($env:INSTALL_DIR) { $env:INSTALL_DIR } else { Join-Path $env:LOCALAPPDATA "name-on" }

# Detect architecture
$Arch = if ([Environment]::Is64BitOperatingSystem) { "x64" } else {
    Write-Error "32-bit Windows is not supported"
    exit 1
}
$RID = "win-$Arch"

# Determine version
$Version = $env:VERSION
if (-not $Version) {
    Write-Host "Fetching latest release..."
    try {
        $Release = Invoke-RestMethod "https://api.github.com/repos/$Repo/releases/latest"
        $Version = $Release.tag_name
    }
    catch {
        Write-Error "Could not determine latest release. Check https://github.com/$Repo/releases"
        exit 1
    }
}

Write-Host "Installing name-on $Version ($RID)..."

# Download
$Url = "https://github.com/$Repo/releases/download/$Version/name-on-$RID.zip"
$TmpDir = Join-Path $env:TEMP "name-on-install-$(Get-Random)"
New-Item -ItemType Directory -Force -Path $TmpDir | Out-Null

try {
    Write-Host "Downloading $Url..."
    $ZipPath = Join-Path $TmpDir "name-on.zip"
    Invoke-WebRequest -Uri $Url -OutFile $ZipPath -UseBasicParsing

    # Extract
    Expand-Archive -Path $ZipPath -DestinationPath $TmpDir -Force

    $ExePath = Join-Path $TmpDir "name-on.exe"
    if (-not (Test-Path $ExePath)) {
        Write-Error "Binary not found in archive"
        exit 1
    }

    # Install
    New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
    Copy-Item $ExePath (Join-Path $InstallDir "name-on.exe") -Force

    # Add to PATH if not already there
    $CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($CurrentPath -notlike "*$InstallDir*") {
        [Environment]::SetEnvironmentVariable("Path", "$CurrentPath;$InstallDir", "User")
        $env:Path = "$env:Path;$InstallDir"
        Write-Host "Added $InstallDir to user PATH"
    }

    Write-Host ""
    Write-Host "Installed name-on to $InstallDir\name-on.exe"

    # Verify
    $NameOnPath = Join-Path $InstallDir "name-on.exe"
    if (Test-Path $NameOnPath) {
        $ver = & $NameOnPath --version
        Write-Host "Version: $ver"
    }

    Write-Host ""
    Write-Host "Setup shell completions (optional):"
    Write-Host "  powershell: name-on completions powershell >> `$PROFILE"
    Write-Host ""
    Write-Host "Try it:  name-on"
    Write-Host ""
    Write-Host "Note: Restart your terminal for PATH changes to take effect."
}
finally {
    Remove-Item -Recurse -Force $TmpDir -ErrorAction SilentlyContinue
}

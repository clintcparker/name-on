#!/bin/sh
# name-on CLI installer
# Usage: curl -fsSL https://raw.githubusercontent.com/clintcparker/name-on/main/install/install.sh | sh
#
# Environment variables:
#   INSTALL_DIR  - Installation directory (default: /usr/local/bin)
#   VERSION      - Specific version to install (default: latest)

set -e

REPO="clintcparker/name-on"
INSTALL_DIR="${INSTALL_DIR:-/usr/local/bin}"

# Detect OS
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
case "$OS" in
    linux)  OS_NAME="linux" ;;
    darwin) OS_NAME="osx" ;;
    *)
        echo "Error: Unsupported OS: $OS"
        echo "Supported: Linux, macOS"
        echo "For Windows, use: irm https://raw.githubusercontent.com/clintcparker/name-on/main/install/install.ps1 | iex"
        exit 1
        ;;
esac

# Detect architecture
ARCH=$(uname -m)
case "$ARCH" in
    x86_64|amd64)  ARCH_NAME="x64" ;;
    aarch64|arm64) ARCH_NAME="arm64" ;;
    *)
        echo "Error: Unsupported architecture: $ARCH"
        echo "Supported: x86_64/amd64, aarch64/arm64"
        exit 1
        ;;
esac

RID="${OS_NAME}-${ARCH_NAME}"

# Determine version
if [ -z "$VERSION" ]; then
    echo "Fetching latest release..."
    VERSION=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" \
        | grep '"tag_name"' \
        | sed -E 's/.*"([^"]+)".*/\1/')
    if [ -z "$VERSION" ]; then
        echo "Error: Could not determine latest release."
        echo "Check https://github.com/${REPO}/releases for available versions."
        exit 1
    fi
fi

echo "Installing name-on ${VERSION} (${RID})..."

# Download
URL="https://github.com/${REPO}/releases/download/${VERSION}/name-on-${RID}.tar.gz"
TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

echo "Downloading ${URL}..."
HTTP_CODE=$(curl -fsSL -w '%{http_code}' -o "${TMP_DIR}/name-on.tar.gz" "$URL" 2>/dev/null) || true

if [ ! -f "${TMP_DIR}/name-on.tar.gz" ] || [ "$HTTP_CODE" = "404" ]; then
    echo "Error: Binary not found for ${RID} at version ${VERSION}"
    echo "Available at: https://github.com/${REPO}/releases"
    exit 1
fi

# Extract
tar -xzf "${TMP_DIR}/name-on.tar.gz" -C "${TMP_DIR}"

if [ ! -f "${TMP_DIR}/name-on" ]; then
    echo "Error: Binary not found in archive"
    exit 1
fi

# Install
if [ -w "$INSTALL_DIR" ]; then
    cp "${TMP_DIR}/name-on" "$INSTALL_DIR/name-on"
    chmod +x "$INSTALL_DIR/name-on"
else
    echo "Installing to $INSTALL_DIR requires elevated permissions..."
    sudo cp "${TMP_DIR}/name-on" "$INSTALL_DIR/name-on"
    sudo chmod +x "$INSTALL_DIR/name-on"
fi

echo ""
echo "Installed name-on to ${INSTALL_DIR}/name-on"

# Verify
if command -v name-on >/dev/null 2>&1; then
    echo "Version: $(name-on --version)"
else
    echo ""
    echo "Note: ${INSTALL_DIR} may not be in your PATH."
    echo "Add it with:"
    echo "  export PATH=\"${INSTALL_DIR}:\$PATH\""
fi

echo ""
echo "Setup shell completions (optional):"
echo "  bash:       name-on completions bash >> ~/.bashrc"
echo "  zsh:        name-on completions zsh >> ~/.zshrc"
echo "  fish:       name-on completions fish > ~/.config/fish/completions/name-on.fish"
echo "  powershell: name-on completions powershell >> \$PROFILE"
echo ""
echo "Try it:  name-on"

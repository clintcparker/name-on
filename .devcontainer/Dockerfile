# Blazor WASM DevContainer with latest stable and preview .NET SDKs, and fish shell
FROM mcr.microsoft.com/devcontainers/dotnet:1-8.0

# Install latest preview .NET SDK
RUN wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh \
    && chmod +x dotnet-install.sh \
    && ./dotnet-install.sh --channel Current --quality preview \
    && rm dotnet-install.sh

# Install fish shell
RUN apt-get update && apt-get install -y fish && rm -rf /var/lib/apt/lists/*

# Set fish as default shell for vscode user
RUN chsh -s /usr/bin/fish vscode || true

# Display .NET SDKs for verification
RUN dotnet --list-sdks

# Set working directory
WORKDIR /workspace

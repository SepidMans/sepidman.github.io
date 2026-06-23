# Devcontainer Dockerfile: Node 20 + common dev tools
FROM mcr.microsoft.com/devcontainers/javascript-node:0-20

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    ca-certificates \
    gnupg \
    lsb-release \
    python3 \
    python3-pip \
    unzip \
    openssh-client \
    apt-transport-https \
    sudo \
    ripgrep \
    jq \
  && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
  && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" > /etc/apt/sources.list.d/github-cli.list \
  && apt-get update \
  && apt-get install -y gh \
  && rm -rf /var/lib/apt/lists/*

# Give the vscode user passwordless sudo (convenience)
RUN if id -u vscode >/dev/null 2>&1; then usermod -aG sudo vscode; echo 'vscode ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/99_vscode-nopasswd; fi

USER vscode

# Homebrew formula for name-on
# To use: brew install clintcparker/tap/name-on
#
# This formula is a template. The release workflow should update
# VERSION and SHA256 values when publishing a new release.
# To create the tap repository:
#   1. Create repo: github.com/clintcparker/homebrew-tap
#   2. Copy this file to Formula/name-on.rb in that repo
#   3. Update VERSION and SHA256 hashes for each release

class NameOn < Formula
  desc "Generate unique, human-readable names (adjective-noun-number)"
  homepage "https://github.com/clintcparker/name-on"
  license "MIT"
  version "VERSION"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/clintcparker/name-on/releases/download/vVERSION/name-on-osx-arm64.tar.gz"
      sha256 "SHA256_OSX_ARM64"
    else
      url "https://github.com/clintcparker/name-on/releases/download/vVERSION/name-on-osx-x64.tar.gz"
      sha256 "SHA256_OSX_X64"
    end
  end

  on_linux do
    if Hardware::CPU.arm?
      url "https://github.com/clintcparker/name-on/releases/download/vVERSION/name-on-linux-arm64.tar.gz"
      sha256 "SHA256_LINUX_ARM64"
    else
      url "https://github.com/clintcparker/name-on/releases/download/vVERSION/name-on-linux-x64.tar.gz"
      sha256 "SHA256_LINUX_X64"
    end
  end

  def install
    bin.install "name-on"
  end

  def post_install
    (bash_completion/"name-on").write Utils.safe_popen_read(bin/"name-on", "completions", "bash")
    (zsh_completion/"_name-on").write Utils.safe_popen_read(bin/"name-on", "completions", "zsh")
    (fish_completion/"name-on.fish").write Utils.safe_popen_read(bin/"name-on", "completions", "fish")
  end

  test do
    output = shell_output("#{bin}/name-on")
    assert_match(/^[a-zA-Z]+-[a-zA-Z]+-\d+$/, output.strip)
  end
end

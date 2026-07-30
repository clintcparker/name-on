# Homebrew formula TEMPLATE for name-on — do not copy to the tap by hand.
# To use: brew install clintcparker/tap/name-on
#
# The "homebrew" job in .github/workflows/release-cli.yml renders this file on
# every release: it substitutes the version and per-platform sha256
# placeholders below (computed from the assets attached to the GitHub Release)
# and commits the result to clintcparker/homebrew-tap as Formula/name-on.rb.
# The render step fails the release if any placeholder is missing here or
# survives into the rendered output.

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

# Makefile for ClipChronicle monorepo
# ===================================
# Top-level targets for install, build, test, lint, run, package, deploy, clean.

# Directories
DIR_LANDING := clipchronicle-landing
DIR_ELECTRON := electron-app
DIR_EXTENSION := extension

# Package manager
PM := pnpm

# AWS / deployment settings (override via env)
AWS_LANDING_BUCKET ?= your-landing-s3-bucket
AWS_CF_ID           ?= your-cloudfront-id
AWS_RELEASE_BUCKET ?= your-electron-release-bucket

# Version (for packaging)
VERSION ?= $(shell git describe --tags --abbrev=0 2>/dev/null || echo "0.0.0")

.PHONY: help all install build test lint run clean deploy deploy-landing deploy-electron deploy-extension

help:
	@echo "Usage: make [target]"
	@echo
	@echo "Targets:"
	@echo "  install              Install dependencies in all packages"
	@echo "  build                Build landing, electron app, and extension"
	@echo "  test                 Run all tests (unit & e2e)"
	@echo "  lint                 Lint all code"
	@echo "  run-landing          Start landing site dev server"
	@echo "  run-electron         Start electron app in dev mode"
	@echo "  run-extension        Build & serve extension (for dev)"
	@echo "  package-electron     Build & package electron installers"
	@echo "  deploy               Deploy landing, electron, and extension"
	@echo "  clean                Remove build artifacts"
	@echo

# -------------------------------------------------------------------
# Install
# -------------------------------------------------------------------
install: install-landing install-electron install-extension

install-landing:
	@echo "🔧 Installing landing site dependencies..."
	cd $(DIR_LANDING) && $(PM) install

install-electron:
	@echo "🔧 Installing electron app dependencies..."
	cd $(DIR_ELECTRON) && $(PM) install

install-extension:
	@echo "🔧 Installing extension dependencies..."
	cd $(DIR_EXTENSION) && $(PM) install

# -------------------------------------------------------------------
# Build
# -------------------------------------------------------------------
build: build-landing build-electron build-extension

build-landing:
	@echo "📦 Building landing site..."
	cd $(DIR_LANDING) && $(PM) build

build-electron:
	@echo "📦 Building native clipboard module..."
	cd $(DIR_ELECTRON)/native-clipboard && cargo build --release
	@echo "📦 Building electron app..."
	cd $(DIR_ELECTRON) && $(PM) make

build-extension:
	@echo "📦 Building browser extension..."
	cd $(DIR_EXTENSION) && $(PM) build

# -------------------------------------------------------------------
# Test & Lint
# -------------------------------------------------------------------
test: test-landing test-electron test-extension

test-landing:
	@echo "✅ Running landing site tests..."
	cd $(DIR_LANDING) && $(PM) test

test-electron:
	@echo "✅ Running electron app tests..."
	cd $(DIR_ELECTRON) && $(PM) test

test-extension:
	@echo "✅ Running extension tests..."
	cd $(DIR_EXTENSION) && $(PM) test

lint:
	@echo "🔍 Linting all code..."
	$(PM) lint

# -------------------------------------------------------------------
# Run / Dev servers
# -------------------------------------------------------------------
run-landing:
	@echo "🚀 Starting landing site dev server..."
	cd $(DIR_LANDING) && $(PM) dev

run-electron:
	@echo "🚀 Starting electron app in dev mode..."
	cd $(DIR_ELECTRON) && $(PM) dev

run-extension:
	@echo "🚀 Building & serving extension for local dev..."
	cd $(DIR_EXTENSION) && $(PM) dev

# -------------------------------------------------------------------
# Packaging & Deployment
# -------------------------------------------------------------------
package-electron: build-electron
	@echo "📦 Packaging electron installers for version $(VERSION)..."
	cd $(DIR_ELECTRON) && $(PM) make
	@echo "✅ Electron builds in $(DIR_ELECTRON)/out/"

deploy: deploy-landing deploy-electron deploy-extension

deploy-landing: build-landing
	@echo "🚀 Deploying landing to S3://${AWS_LANDING_BUCKET} and invalidating CF ${AWS_CF_ID}..."
	cd $(DIR_LANDING) && \
	aws s3 sync out/ s3://${AWS_LANDING_BUCKET}/ --delete --cache-control "max-age=0,public,must-revalidate" && \
	aws cloudfront create-invalidation --distribution-id ${AWS_CF_ID} --paths "/*"
	@echo "✅ Landing deployed."

deploy-electron: package-electron
	@echo "🚀 Uploading electron artifacts to S3://${AWS_RELEASE_BUCKET}/releases/$(VERSION)/"
	aws s3 cp $(DIR_ELECTRON)/out/ s3://${AWS_RELEASE_BUCKET}/releases/$(VERSION)/ --recursive --acl public-read
	@echo "✅ Electron artifacts uploaded."

deploy-extension: build-extension
	@echo "🚀 Deploying extension bundle (you'll need to upload to Chrome Web Store manually)..."
	@echo "   Built extension in $(DIR_EXTENSION)/dist/"
	@echo "✅ Extension built."

# -------------------------------------------------------------------
# Clean
# -------------------------------------------------------------------
clean:
	@echo "🧹 Cleaning all build artifacts..."
	rm -rf $(DIR_LANDING)/.next $(DIR_LANDING)/out
	rm -rf $(DIR_ELECTRON)/out $(DIR_ELECTRON)/dist $(DIR_ELECTRON)/native-clipboard/target
	rm -rf $(DIR_EXTENSION)/dist
	@echo "✅ Clean complete."

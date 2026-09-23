set shell := ["bash", "-euo", "pipefail", "-c"]
set dotenv-load

image := "flakeforge-website"
site_url := env("NEXT_PUBLIC_SITE_URL", "https://flakeforge.com")

[doc("List every recipe")]
default:
    @just --list --unsorted

[doc("Install dependencies; lefthook installs the git hooks")]
[group("setup")]
install:
    pnpm install

[doc("Reinstall the git hooks from lefthook.yml")]
[group("setup")]
hooks:
    pnpm exec lefthook install

[doc("Start the dev server on localhost:3000")]
[group("dev")]
dev:
    pnpm dev

[doc("Production build; prerenders every page in every locale")]
[group("dev")]
build:
    pnpm build

[doc("Serve the production build on port 8080")]
[group("dev")]
start: build
    pnpm start

[doc("Format every file with oxfmt")]
[group("quality")]
fmt:
    pnpm exec oxfmt

[doc("Fail if any file is not formatted")]
[group("quality")]
fmt-check:
    pnpm exec oxfmt --check

[doc("Lint with oxlint, including type-aware rules")]
[group("quality")]
lint:
    pnpm exec oxlint

[doc("Lint and apply safe fixes")]
[group("quality")]
lint-fix:
    pnpm exec oxlint --fix

[doc("Generate route types and run tsc")]
[group("quality")]
typecheck:
    pnpm typecheck

[doc("Find unused files, exports, and dependencies")]
[group("quality")]
knip:
    pnpm exec knip

[doc("Scan React code with react-doctor (telemetry off)")]
[group("quality")]
doctor:
    pnpm exec react-doctor --no-telemetry --verbose -y

[doc("Everything a commit should pass: format, lint, types, dead code")]
[group("quality")]
check: fmt-check lint typecheck knip

[doc("Full pipeline for CI: check, react-doctor, and a production build")]
[group("quality")]
ci: check doctor build

[doc("Build with a localhost origin, then run Lighthouse CI on the key pages")]
[group("performance")]
lighthouse:
    NEXT_PUBLIC_SITE_URL=http://localhost:3100 pnpm build
    pnpm exec lhci autorun

[doc("Open the Turbopack bundle analyzer")]
[group("performance")]
analyze:
    pnpm analyze

[doc("Create a draft blog post: just post my-slug")]
[group("content")]
post slug:
    #!/usr/bin/env bash
    set -euo pipefail
    dir="content/blog/{{ slug }}"
    if [ -e "$dir" ]; then echo "$dir already exists" >&2; exit 1; fi
    mkdir -p "$dir"
    printf -- '---\ntitle: TODO\ndescription: TODO\ndate: %s\ntags: []\ndraft: true\n---\n\nTODO\n' "$(date +%F)" > "$dir/en.mdx"
    echo "Created $dir/en.mdx"

[doc("Create a case study: just project my-slug")]
[group("content")]
project slug:
    #!/usr/bin/env bash
    set -euo pipefail
    dir="content/work/{{ slug }}"
    if [ -e "$dir" ]; then echo "$dir already exists" >&2; exit 1; fi
    mkdir -p "$dir"
    printf -- '---\ntitle: TODO\nsummary: TODO\nyear: %s\norder: 99\nkind: client\nstatus: in-progress\nservices: [web]\nstack: []\n---\n\nTODO\n' "$(date +%Y)" > "$dir/en.mdx"
    echo "Created $dir/en.mdx"

[doc("Build the production image")]
[group("docker")]
docker-build:
    docker build -t {{ image }} --build-arg NEXT_PUBLIC_SITE_URL={{ site_url }} .

[doc("Run the image on localhost:8080, passing .env when it exists")]
[group("docker")]
docker-run: docker-build
    #!/usr/bin/env bash
    set -euo pipefail
    args=(--rm -p 8080:8080)
    if [ -f .env ]; then args+=(--env-file .env); fi
    docker run "${args[@]}" {{ image }}

[doc("Remove build output and reports")]
[group("maintenance")]
clean:
    rm -rf .next .lighthouseci

[doc("Remove node_modules and build output, then reinstall")]
[group("maintenance")]
reset: clean
    rm -rf node_modules
    pnpm install

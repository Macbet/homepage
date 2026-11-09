import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";

type Shot = { src: string; alt: string; width: number; height: number };

const shotWidths = (name: string) => (name.startsWith("workspaces") ? [768, 1152, 2304] : [700, 1000, 1400]);
const srcSet = (name: string, ext: string) =>
  shotWidths(name)
    .map((w) => `/img/${name}-${w}.${ext} ${w}w`)
    .join(", ");

/**
 * A product screenshot captured in both application themes, pre-rendered as AVIF and WebP by
 * scripts/optimize-images.mjs. The dark capture is served to dark-scheme visitors.
 */
function ThemedShot({ shot, sizes, priority }: { shot: Shot; sizes: string; priority?: boolean }) {
  const name = shot.src.replace(/^\//, "").replace(/\.png$/, "");
  const dark = `${name}-dark`;
  const largest = shotWidths(name).at(-1);
  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" type="image/avif" srcSet={srcSet(dark, "avif")} sizes={sizes} />
      <source media="(prefers-color-scheme: dark)" type="image/webp" srcSet={srcSet(dark, "webp")} sizes={sizes} />
      <source type="image/avif" srcSet={srcSet(name, "avif")} sizes={sizes} />
      <img
        src={`/img/${name}-${largest}.webp`}
        srcSet={srcSet(name, "webp")}
        sizes={sizes}
        width={shot.width}
        height={shot.height}
        alt={shot.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}

const DOCS = "https://docs.terrakube.io";
const GITHUB = "https://github.com/terrakube-io/terrakube";
const SLACK = "https://join.slack.com/t/terrakubeworkspace/shared_invite/zt-2cx6yn95t-2CTBGvsQhBQJ5bfbG4peFg";

const navLinks = [
  { href: DOCS, icon: "/img/gitbooklogo.webp", text: "Documentation" },
  { href: GITHUB, icon: "/github-mark-white.svg", text: "GitHub" },
  { href: SLACK, icon: "/img/slack.webp", text: "Slack" },
];

type Feature = {
  title: string;
  description: string;
  link: { href: string; text: string };
  image?: Shot;
  extra?: { description?: string; link: { href: string; text: string } };
};

type TagGroup = { label: string; items: string[] };
type Compact = { title: string; description: string; link: { href: string; text: string }; tags?: TagGroup[] };

type Group = { title: string; intro: string; features: Feature[]; compact?: Compact[] };

const groups: Group[] = [
  {
    title: "Run",
    intro: "Plan, review and apply from one place, with the tools your teams already use.",
    features: [
      {
        title: "Runs you can read before you apply",
        description: "Every run shows the plan as a list of resource changes, with the console one click away. Approve it in the same view.",
        link: { href: `${DOCS}/user-guide/workspaces/creating-workspaces`, text: "Workspaces and runs" },
        image: { src: "/run.png", alt: "A completed run showing three resources to create, two to change and one to destroy", width: 1400, height: 760 },
      },
      {
        title: "Terraform and OpenTofu",
        description: "Pick the tool and the version per workspace. Both run against any cloud or on-premises configuration.",
        link: { href: `${DOCS}/user-guide/workspaces/creating-workspaces`, text: "Creating workspaces" },
        image: { src: "/create-workspace.png", alt: "Choosing between Terraform and OpenTofu when creating a workspace", width: 1400, height: 709 },
      },
      {
        title: "Visual state",
        description: "Every resource in the state as a dependency diagram. Inspect attributes, compare versions, roll back.",
        link: { href: `${DOCS}/user-guide/workspaces/terraform-state#visual-state`, text: "Terraform state" },
        image: { src: "/visual-state.png", alt: "State version shown as a diagram of VPC, subnets, gateway, instance and database", width: 1400, height: 874 },
      },
      {
        title: "Templates and schedules",
        description: "Templates define the steps a run executes, from plan and apply to custom workflows that call external tools. Schedules run them without anyone clicking.",
        link: { href: `${DOCS}/user-guide/organizations/templates`, text: "Templates" },
        image: { src: "/templates.png", alt: "Organization templates: Plan, Plan and Apply, Destroy and CLI variants", width: 1400, height: 671 },
        extra: { link: { href: `${DOCS}/user-guide/workspaces/workspace-scheduler`, text: "Workspace scheduler" } },
      },
    ],
  },
  {
    title: "Secure",
    intro: "Identity comes from the provider you already run. Permissions follow the team, not the person.",
    features: [
      {
        title: "Access control",
        description: "A team maps an identity provider group to a role in the organization, so people only see what their job requires.",
        link: { href: `${DOCS}/user-guide/organizations/team-management`, text: "Team management" },
        image: { src: "/teams.png", alt: "Teams settings with an admin team and a developers team", width: 1400, height: 481 },
      },
    ],
    compact: [
      {
        title: "Single sign-on",
        description: "Authenticate with the identity provider your organization already uses.",
        tags: [
          { label: "Providers", items: ["Azure Entra ID", "Google Cloud Identity", "Amazon Cognito", "GitHub", "Keycloak"] },
          { label: "Protocols", items: ["OIDC", "SAML"] },
        ],
        link: { href: `${DOCS}/getting-started/user-management`, text: "User management" },
      },
      {
        title: "Dynamic credentials",
        description: "Cloud credentials issued at run time, nothing long-lived stored in the workspace.",
        tags: [
          { label: "Clouds", items: ["Amazon Web Services", "Azure", "Google Cloud"] },
          { label: "Secret stores", items: ["Vault", "OpenBao"] },
        ],
        link: { href: `${DOCS}/user-guide/workspaces/dynamic-provider-credentials`, text: "Dynamic provider credentials" },
      },
    ],
  },
  {
    title: "Host",
    intro: "Your cluster, your registry, your agents. Nothing leaves the network you choose.",
    features: [
      {
        title: "Private registry",
        description: "Publish, version and reuse internal modules and providers, with the usage snippet and README next to inputs and outputs.",
        link: { href: `${DOCS}/user-guide/private-registry`, text: "Private registry" },
        image: { src: "/registry.png", alt: "A private module page with the usage block, version, source and inputs", width: 1400, height: 697 },
      },
      {
        title: "Self-hosted anywhere",
        description: "A Kubernetes cluster on any cloud or on-premises, or the whole platform with Docker Compose.",
        link: { href: `${DOCS}/getting-started/deployment`, text: "Deployment" },
      },
    ],
    compact: [
      {
        title: "Private agents",
        description: "Run jobs on self-hosted or ephemeral agents, in an environment you control.",
        link: { href: `${DOCS}/getting-started/deployment/ephemeral-agents`, text: "Ephemeral agents" },
      },
      {
        title: "Open source",
        description: "Read the code, extend the platform, and start a development environment from the dev container in minutes.",
        link: { href: `${DOCS}/getting-started/development/dev-container`, text: "Development environment" },
      },
    ],
  },
];

const install = `helm repo add terrakube-repo https://helm.terrakube.io
helm install terrakube terrakube-repo/terrakube \\
  -n terrakube --create-namespace -f values.yaml`;

const sponsors = [
  { src: "/img/jetbrains.webp", alt: "JetBrains", width: 261, height: 56 },
  { src: "/img/gitbook.webp", alt: "GitBook", width: 261, height: 56 },
  { src: "/img/docker.webp", alt: "Docker", width: 222, height: 56 },
  { src: "/img/tuta.webp", alt: "Tuta", width: 156, height: 56 },
];

const support = [
  { href: "https://github.com/sponsors/terrakube-io", title: "GitHub Sponsors", text: "Recurring or one-time sponsorship through GitHub.", link: "Sponsor on GitHub" },
  { href: "https://opencollective.com/terrakube", title: "Open Collective", text: "Transparent funding for the project's infrastructure.", link: "Open Collective" },
  { href: "mailto:sponsor@terrakube.io", title: "Partnerships", text: "Talk to us about licenses or services for the project.", link: "sponsor@terrakube.io" },
];

const involved = [
  { href: `${GITHUB}/discussions`, text: "Join GitHub discussions to share ideas" },
  { href: `${GITHUB}/issues`, text: "Open issues for bugs or feature suggestions" },
  { href: `${DOCS}/getting-started/deployment`, text: "Test deployments on different cloud providers" },
];

const rowSizes = "(min-width: 1248px) 660px, (min-width: 768px) 58vw, calc(100vw - 32px)";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link className="brand" href="/">
            <Image src="/img/terrakube.webp" alt="" width={25} height={28} priority />
            Terrakube
          </Link>
          <nav className="site-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.href} className="nav-link" href={link.href}>
                <Image src={link.icon} alt="" width={16} height={16} />
                {link.text}
              </a>
            ))}
          </nav>
          <HamburgerMenu links={navLinks} />
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-cluster" aria-hidden="true" />
          <div className="container">
            <div className="hero-copy">
              <h1>Infrastructure as code automation for Terraform and OpenTofu</h1>
              <p className="lede">
                The open source platform that helps teams run, review and manage their infrastructure at scale. No
                vendor lock-in, no licensing headache, self-hosted anywhere.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href={`${DOCS}/getting-started/deployment`}>
                  Get started
                </a>
                <a className="btn btn-lg" href={GITHUB}>
                  <Image src="/github-mark-white.svg" alt="" width={16} height={16} className="invert-on-light" />
                  View on GitHub
                </a>
              </div>
              <p className="hero-meta">Apache 2.0 licensed. Runs on Kubernetes or Docker Compose.</p>
            </div>
            <div className="hero-shot">
              <div className="frame">
                <ThemedShot
                  shot={{
                    src: "/workspaces.png",
                    alt: "Workspace list with completed, running, waiting approval and failed runs and their policy status",
                    width: 2304,
                    height: 1440,
                  }}
                  sizes="(min-width: 1248px) 1152px, calc(100vw - 32px)"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <h2 className="section-title">Everything you need to run infrastructure as code</h2>

            {groups.map((group) => (
              <div className="group" key={group.title} id={group.title.toLowerCase()}>
                <div className="group-head">
                  <h3 className="group-title">{group.title}</h3>
                  <p className="group-intro">{group.intro}</p>
                </div>

                {group.features.map((feature) => (
                  <article className="feature" key={feature.title}>
                    <div className="feature-copy">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                      <a className="doc-link" href={feature.link.href}>
                        {feature.link.text} ↗
                      </a>
                      {feature.extra && (
                        <>
                          {feature.extra.description && <p>{feature.extra.description}</p>}
                          <a className="doc-link" href={feature.extra.link.href}>
                            {feature.extra.link.text} ↗
                          </a>
                        </>
                      )}
                    </div>
                    {feature.image ? (
                      <div className="frame">
                        <ThemedShot shot={feature.image} sizes={rowSizes} />
                      </div>
                    ) : (
                      <pre className="code frame" aria-label="Helm install command">
                        <code>{install}</code>
                      </pre>
                    )}
                  </article>
                ))}

                {group.compact && (
                  <div className="cards compact">
                    {group.compact.map((item) => (
                      <div className="card" key={item.title}>
                        <strong>{item.title}</strong>
                        <span>{item.description}</span>
                        {item.tags && (
                          <dl className="tag-groups">
                            {item.tags.map((group) => (
                              <div className="tag-group" key={group.label}>
                                <dt>{group.label}</dt>
                                <dd>
                                  <ul className="tags">
                                    {group.items.map((tag) => (
                                      <li key={tag}>{tag}</li>
                                    ))}
                                  </ul>
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        <a className="doc-link" href={item.link.href}>
                          {item.link.text} ↗
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="cta">
              <h3>Ready to run it yourself?</h3>
              <p>The deployment guide takes you from an empty cluster to your first run.</p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href={`${DOCS}/getting-started/deployment`}>
                  Get started
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="sponsors">
          <div className="container">
            <h2 className="section-title">Supported by</h2>
            <p className="section-intro">These organizations support the project with free licenses and services.</p>
            <div className="sponsors">
              {sponsors.map((sponsor) => (
                <Image key={sponsor.src} src={sponsor.src} alt={sponsor.alt} width={sponsor.width} height={sponsor.height} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="support">
          <div className="container">
            <h2 className="section-title">Support the project</h2>
            <div className="cards">
              {support.map((item) => (
                <a className="card card-link" key={item.href} href={item.href}>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                  <span className="doc-link">{item.link} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="community" id="community">
          <div className="container">
            <div>
              <h2>Join the community</h2>
              <p>
                Whether you are fixing bugs, adding features, improving the docs or sharing feedback, your input makes a
                difference.
              </p>
              <a className="btn btn-lg" href={SLACK}>
                <Image src="/img/slack.webp" alt="" width={16} height={16} />
                Join us on Slack
              </a>
            </div>
            <div>
              <h3>Get involved</h3>
              <ul>
                {involved.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <span>
            Terrakube is an open source project licensed under{" "}
            <a href={`${GITHUB}/blob/main/LICENSE`}>Apache 2.0</a>.
          </span>
          <nav aria-label="Footer">
            <a href={`${GITHUB}/releases`}>Releases</a>
            <a href={`${GITHUB}/blob/main/SECURITY.md`}>Security policy</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

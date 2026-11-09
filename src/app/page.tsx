import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";

const DOCS = "https://docs.terrakube.io";
const GITHUB = "https://github.com/terrakube-io/terrakube";
const SLACK = "https://join.slack.com/t/terrakubeworkspace/shared_invite/zt-2cx6yn95t-2CTBGvsQhBQJ5bfbG4peFg";

const navLinks = [
  { href: DOCS, icon: "/gitbooklogo.svg", text: "Documentation" },
  { href: GITHUB, icon: "/github-mark-white.svg", text: "GitHub" },
  { href: SLACK, icon: "/slack.png", text: "Slack" },
];

type Feature = {
  title: string;
  description: string;
  link: { href: string; text: string };
  image?: { src: string; alt: string; width: number; height: number };
  extra?: { description: string; link: { href: string; text: string } };
};

type Compact = { title: string; description: string; link: { href: string; text: string }; tags?: string[] };

type Group = { title: string; intro: string; features: Feature[]; compact?: Compact[] };

const groups: Group[] = [
  {
    title: "Run",
    intro: "Plan, review and apply from one place, with the tools your teams already use.",
    features: [
      {
        title: "Runs you can read before you apply",
        description:
          "Every run shows the plan as a list of resource changes, with the console output one click away. Approvals happen in the same view.",
        link: { href: `${DOCS}/user-guide/workspaces/creating-workspaces`, text: "Workspaces and runs" },
        image: { src: "/run.png", alt: "A completed run showing three resources to create, two to change and one to destroy", width: 1400, height: 760 },
      },
      {
        title: "Terraform and OpenTofu",
        description:
          "Pick the tool and the version per workspace. Both run against any cloud or on-premises configuration, with multiple teams collaborating in one place.",
        link: { href: `${DOCS}/user-guide/workspaces/creating-workspaces`, text: "Creating workspaces" },
        image: { src: "/terraform-tofu.png", alt: "Choosing between Terraform and OpenTofu when creating a workspace", width: 1540, height: 780 },
      },
      {
        title: "Visual state",
        description: "See every resource in the state as a dependency diagram, inspect its attributes, and roll back to an earlier version when you need to.",
        link: { href: `${DOCS}/user-guide/workspaces/terraform-state#visual-state`, text: "Terraform state" },
        image: { src: "/visual-state.png", alt: "State version shown as a diagram of VPC, subnets, gateway, instance and database", width: 1400, height: 874 },
      },
      {
        title: "Templates and schedules",
        description: "Templates define the steps a run executes, from plain plan and apply to custom workflows that call external tools.",
        link: { href: `${DOCS}/user-guide/organizations/templates`, text: "Templates" },
        image: { src: "/templates.png", alt: "Organization templates: Plan, Plan and Apply, Destroy and CLI variants", width: 1400, height: 671 },
        extra: {
          description: "Schedules run a template automatically, without manual intervention.",
          link: { href: `${DOCS}/user-guide/workspaces/workspace-scheduler`, text: "Workspace scheduler" },
        },
      },
    ],
  },
  {
    title: "Secure",
    intro: "Identity comes from the provider you already run. Permissions follow the team, not the person.",
    features: [
      {
        title: "Access control",
        description:
          "A team maps an identity provider group to a role in the organization, so people only see what their job requires. Teams and users manage their own tokens.",
        link: { href: `${DOCS}/user-guide/organizations/team-management`, text: "Team management" },
        image: { src: "/teams.png", alt: "Teams settings with an admin team and a developers team", width: 1400, height: 481 },
      },
    ],
    compact: [
      {
        title: "Single sign-on",
        description: "Authenticate with the identity provider your organization already uses.",
        tags: ["Azure Entra ID", "Google Cloud Identity", "Amazon Cognito", "GitHub", "Keycloak", "OIDC", "SAML"],
        link: { href: `${DOCS}/getting-started/user-management`, text: "User management" },
      },
      {
        title: "Dynamic credentials",
        description: "Authenticate with cloud providers at run time instead of storing long-lived credentials in workspaces.",
        tags: ["Amazon Web Services", "Azure", "Google Cloud", "Vault", "OpenBao"],
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
        description: "Publish, version and reuse internal modules and providers, with usage snippets and the README right next to the inputs and outputs.",
        link: { href: `${DOCS}/user-guide/private-registry`, text: "Private registry" },
        image: { src: "/registry.png", alt: "A private module page with the usage block, version, source and inputs", width: 1400, height: 697 },
      },
      {
        title: "Self-hosted anywhere",
        description: "Install it in a Kubernetes cluster on any cloud provider or on-premises, or run the whole platform with Docker Compose.",
        link: { href: `${DOCS}/getting-started/deployment`, text: "Deployment" },
      },
    ],
    compact: [
      {
        title: "Private agents",
        description: "Run jobs on self-hosted or ephemeral agents in an isolated environment you control, close to your infrastructure.",
        link: { href: `${DOCS}/getting-started/deployment/ephemeral-agents`, text: "Ephemeral agents" },
      },
      {
        title: "Open source",
        description: "Apache 2.0 licensed. Read the code, extend the platform, and get a working development environment from the dev container in minutes.",
        link: { href: `${DOCS}/getting-started/development/dev-container`, text: "Development environment" },
      },
    ],
  },
];

const install = `helm repo add terrakube-repo https://helm.terrakube.io
helm install terrakube terrakube-repo/terrakube -n terrakube --create-namespace -f values.yaml`;

const sponsors = [
  { src: "/jetbrains.png", alt: "JetBrains", width: 155, height: 33 },
  { src: "/gitbook.png", alt: "GitBook", width: 155, height: 33 },
  { src: "/docker.png", alt: "Docker", width: 155, height: 33 },
  { src: "/tuta.png", alt: "Tuta", width: 120, height: 31 },
];

const support = [
  { href: "https://github.com/sponsors/terrakube-io", title: "GitHub Sponsors", text: "Recurring or one-time sponsorship through GitHub.", link: "Sponsor on GitHub" },
  { href: "https://opencollective.com/terrakube", title: "Open Collective", text: "Transparent funding for the project's infrastructure and services.", link: "Open Collective" },
  { href: "mailto:sponsor@terrakube.io", title: "Partnerships", text: "Talk to us about supporting Terrakube with licenses or services.", link: "sponsor@terrakube.io" },
];

const involved = [
  { href: `${GITHUB}/discussions`, text: "Join GitHub discussions to share ideas" },
  { href: `${GITHUB}/issues`, text: "Open issues for bugs or feature suggestions" },
  { href: SLACK, text: "Help other users in the Slack community" },
  { href: `${DOCS}/getting-started/deployment`, text: "Test deployments on different cloud providers" },
];

const rowSizes = "(min-width: 1248px) 660px, (min-width: 768px) 58vw, calc(100vw - 32px)";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link className="brand" href="/">
            <Image src="/terrakube.png" alt="" width={28} height={28} priority />
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
                <Image
                  src="/workspaces.png"
                  alt="Workspace list with completed, running, waiting approval and failed runs and their policy status"
                  width={2304}
                  height={1440}
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
            <p className="section-intro">
              Automate, collaborate on and manage your infrastructure from one place, with the same tools your teams use
              today.
            </p>

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
                          <p>{feature.extra.description}</p>
                          <a className="doc-link" href={feature.extra.link.href}>
                            {feature.extra.link.text} ↗
                          </a>
                        </>
                      )}
                    </div>
                    {feature.image ? (
                      <div className="frame">
                        <Image
                          src={feature.image.src}
                          alt={feature.image.alt}
                          width={feature.image.width}
                          height={feature.image.height}
                          sizes={rowSizes}
                        />
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
                          <ul className="tags" aria-label={`${item.title} providers`}>
                            {item.tags.map((tag) => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
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
              <p>Deploy Terrakube with Helm or Docker Compose and connect your first repository in an afternoon.</p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href={`${DOCS}/getting-started/deployment`}>
                  Get started
                </a>
                <a className="btn btn-lg" href={DOCS}>
                  Read the documentation
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="sponsors">
          <div className="container">
            <h2 className="section-title">Supported by</h2>
            <p className="section-intro">
              Thanks to the following organizations for supporting the project with free licenses and services.
            </p>
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
            <p className="section-intro">Terrakube is built and funded by its community.</p>
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
                <Image src="/slack.png" alt="" width={16} height={16} />
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
          <span>Terrakube is an open source project licensed under Apache 2.0.</span>
          <nav aria-label="Footer">
            <a href={DOCS}>Documentation</a>
            <a href={GITHUB}>GitHub</a>
            <a href={SLACK}>Slack</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";

const DOCS = "https://docs.terrakube.io";
const GITHUB = "https://github.com/terrakube-io/terrakube";
const SLACK = "https://join.slack.com/t/terrakubeworkspace/shared_invite/zt-2cx6yn95t-2CTBGvsQhBQJ5bfbG4peFg";

const navLinks = [
  { href: DOCS, icon: "/gitbooklogo.svg", alt: "", text: "Documentation" },
  { href: GITHUB, icon: "/github-mark-white.svg", alt: "", text: "GitHub" },
  { href: SLACK, icon: "/slack.png", alt: "", text: "Slack" },
];

type Feature = {
  title: string;
  description: string;
  items?: string[];
  link: { href: string; text: string };
  image: { src: string; alt: string };
};

const features: Feature[] = [
  {
    title: "Open source",
    description:
      "Complete access to the source code, and the ability to customize and extend the platform to fit your organization. A dev container gets you a working environment in minutes.",
    link: { href: `${DOCS}/getting-started/development/dev-container`, text: "Set up a development environment" },
    image: { src: "/workspace-data.png", alt: "Workspace overview in Terrakube" },
  },
  {
    title: "Terraform and OpenTofu",
    description:
      "Run the major infrastructure as code tools against any cloud or on-premises configuration from a single place, with multiple teams collaborating together.",
    link: { href: `${DOCS}/user-guide/workspaces/creating-workspaces`, text: "Creating workspaces" },
    image: { src: "/terraform-tofu.png", alt: "Terraform and OpenTofu version selection" },
  },
  {
    title: "Single sign-on",
    description: "Authenticate with the identity provider your organization already uses:",
    items: ["Azure Entra ID", "Google Cloud Identity", "Amazon Cognito", "GitHub", "Keycloak", "OIDC and SAML"],
    link: { href: `${DOCS}/getting-started/user-management`, text: "User management" },
    image: { src: "/login.png", alt: "Terrakube login page" },
  },
  {
    title: "Access control",
    description:
      "Permissions follow the roles a user holds in an organization, so people only see what their job requires. Teams and users manage their own tokens:",
    items: ["Personal access tokens", "Team tokens"],
    link: { href: `${DOCS}/user-guide/organizations/team-management`, text: "Team management" },
    image: { src: "/rbac.png", alt: "Team permissions in Terrakube" },
  },
  {
    title: "Private registry",
    description: "Publish, reuse and manage internal modules and providers privately, shared across your teams.",
    link: { href: `${DOCS}/user-guide/private-registry`, text: "Private registry" },
    image: { src: "/registry.png", alt: "Module in the private registry" },
  },
  {
    title: "Private agents",
    description:
      "Create as many self-hosted or ephemeral agents as you need. Workflows run in an isolated environment you control, close to your infrastructure.",
    link: { href: `${DOCS}/getting-started/deployment/ephemeral-agents`, text: "Ephemeral agents" },
    image: { src: "/agents.png", alt: "Agent configuration in Terrakube" },
  },
  {
    title: "Dynamic credentials",
    description:
      "Authenticate with cloud providers at run time instead of storing long-lived credentials in workspaces. Supported today:",
    items: ["Amazon Web Services", "Azure", "Google Cloud", "Vault", "OpenBao"],
    link: { href: `${DOCS}/user-guide/workspaces/dynamic-provider-credentials`, text: "Dynamic provider credentials" },
    image: { src: "/execution.png", alt: "Run output in Terrakube" },
  },
  {
    title: "Visual state",
    description: "See every resource in your infrastructure and inspect the state file with a single click.",
    link: { href: `${DOCS}/user-guide/workspaces/terraform-state#visual-state`, text: "Terraform state" },
    image: { src: "/visual-state.png", alt: "Visual state diagram of a workspace" },
  },
  {
    title: "Custom workflows",
    description: "Compose simple or complex templates that automate infrastructure management with external tools.",
    link: { href: `${DOCS}/user-guide/organizations/templates`, text: "Templates" },
    image: { src: "/custom-integration.png", alt: "Custom workflow template" },
  },
  {
    title: "Scheduled jobs",
    description: "Define schedules that run workflow operations automatically, without manual intervention.",
    link: { href: `${DOCS}/user-guide/workspaces/workspace-scheduler`, text: "Workspace scheduler" },
    image: { src: "/schedules.png", alt: "Workspace schedules" },
  },
  {
    title: "Self-hosted anywhere",
    description:
      "Install it in a Kubernetes cluster on any cloud provider or on-premises, or run the whole platform with Docker Compose.",
    link: { href: `${DOCS}/getting-started/deployment/minikube-+-https`, text: "Deployment" },
    image: { src: "/workspaces.png", alt: "Workspace list in Terrakube" },
  },
];

const sponsors = [
  { src: "/jetbrains.png", alt: "JetBrains", width: 155, height: 33 },
  { src: "/gitbook.png", alt: "GitBook", width: 155, height: 33 },
  { src: "/docker.png", alt: "Docker", width: 155, height: 33 },
  { src: "/tuta.png", alt: "Tuta", width: 120, height: 31 },
];

const support = [
  {
    href: "https://github.com/sponsors/terrakube-io",
    title: "GitHub Sponsors",
    text: "Recurring or one-time sponsorship through GitHub.",
    link: "Sponsor on GitHub",
  },
  {
    href: "https://opencollective.com/terrakube",
    title: "Open Collective",
    text: "Transparent funding for the project's infrastructure and services.",
    link: "Open Collective",
  },
  {
    href: "mailto:sponsor@terrakube.io",
    title: "Partnerships",
    text: "Talk to us about supporting Terrakube with licenses or services.",
    link: "sponsor@terrakube.io",
  },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

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
              <a key={link.href} className="nav-link" href={link.href} {...external}>
                <Image src={link.icon} alt={link.alt} width={16} height={16} />
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
                The open source platform that helps teams run, review and manage their infrastructure at scale.
                No vendor lock-in, no licensing headache, self-hosted anywhere.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href={`${DOCS}/getting-started/deployment`} {...external}>
                  Get started
                </a>
                <a className="btn btn-lg" href={GITHUB} {...external}>
                  <Image src="/github-mark-white.svg" alt="" width={16} height={16} className="invert-on-light" />
                  View on GitHub
                </a>
              </div>
              <p className="hero-meta">Apache 2.0 licensed. Runs on Kubernetes or Docker Compose.</p>
            </div>
            <div className="hero-shot">
              <div className="frame">
                <Image src="/workspaces.png" alt="Workspace list in Terrakube" width={1920} height={963} priority />
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
            <div className="features">
              {features.map((feature) => (
                <article className="feature" key={feature.title}>
                  <div className="feature-copy">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    {feature.items && (
                      <ul>
                        {feature.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    <a className="doc-link" href={feature.link.href} {...external}>
                      {feature.link.text} ↗
                    </a>
                  </div>
                  <div className="frame">
                    <Image src={feature.image.src} alt={feature.image.alt} width={800} height={450} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="sponsors">
          <div className="container">
            <h2 className="section-title">Trusted by open source supporters</h2>
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
                <a className="card" key={item.href} href={item.href} {...external}>
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
              <a className="btn" href={SLACK} {...external}>
                <Image src="/slack.png" alt="" width={16} height={16} />
                Join us on Slack
              </a>
            </div>
            <div>
              <h3>Get involved</h3>
              <ul>
                <li>Join GitHub discussions to share ideas</li>
                <li>Open issues for bugs or feature suggestions</li>
                <li>Help other users in the Slack community</li>
                <li>Test deployments on different cloud providers</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <span>Terrakube is an open source project licensed under Apache 2.0.</span>
          <span>
            <a href={DOCS} {...external}>
              Documentation
            </a>
            {" · "}
            <a href={GITHUB} {...external}>
              GitHub
            </a>
            {" · "}
            <a href={SLACK} {...external}>
              Slack
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

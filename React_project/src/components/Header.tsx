import logo from "../assets/picture.svg"

type Props = {
  logoSrc?: string;
  logoAlt?: string;
  title?: string;
};

export default function Header({
  logoAlt = "Logo",
  title = "Projet",
}: Props) {
  return (
    <header className="site-header" role="banner">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="logo-link" href="/">
          <img src={logo} alt={logoAlt} width={50} height={50} />
        </a>
        <a className="project-link" href="/">
          {title}
        </a>
      </nav>
    </header>
  );
}

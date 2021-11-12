import * as React from "react"
import LOGO_URL from "../images/logo.png"

interface Link {
  pageName: string
  url: string
}

interface Props {
  links: [Link]
}

function Logo() {
  return (
    <a href="/">
      <img src={LOGO_URL} alt="logo" />
    </a>
  )
}

const Links: React.FC<Props> = ({ links }) => (
  <div className="header__links">
    {links.map(({ url, pageName }) => (
      <a href={url} className="header__link" key={pageName}>
        {pageName}
      </a>
    ))}
  </div>
)

const Header: React.FC<Props> = ({ links }) => (
  <div className="header__wrapper">
    <Logo />
    <Links links={links} />
  </div>
)

export default Header

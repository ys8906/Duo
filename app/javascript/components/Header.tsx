import * as React from "react"
import LOGO_URL from "../images/logo.png"

interface Props {
  currentUser: object | null
}

function Logo() {
  return (
    <a href="/">
      <img src={LOGO_URL} alt="logo" />
    </a>
  )
}

function AccountLinks({ currentUser }: Props) {
  if (currentUser) {
    const authenticityToken = document
      .querySelector("meta[name=csrf-token]")
      .getAttribute("content")
    return (
      <form method="post" action="/users/sign_out">
        <input type="hidden" name="_method" value="DELETE" />
        <input
          type="hidden"
          name="authenticity_token"
          value={authenticityToken}
        />
        <input type="submit" value="ログアウト" className="header__link" />
      </form>
    )
  }
  return (
    <>
      <a href="/users/sign_up" className="header__link">
        ユーザー登録
      </a>
      <a href="/users/sign_in" className="header__link">
        ログイン
      </a>
    </>
  )
}

function Links({ currentUser }: Props) {
  return (
    <div className="header__links">
      <a href="/" className="header__link">
        ホーム
      </a>
      <AccountLinks currentUser={currentUser} />
    </div>
  )
}

const Header: React.FC<Props> = ({ currentUser }) => (
  <div className="header__wrapper">
    <Logo />
    <Links currentUser={currentUser} />
  </div>
)

export default Header

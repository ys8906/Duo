import React from "react"

interface Props {
  handleAttributes: React.ChangeEventHandler
  sectionIdMin: string
  sectionIdMax: string
  idMin: string
  idMax: string
  keywords: string
  fetchSentences: React.MouseEventHandler
}

const SearchBox: React.FC<Props> = ({
  handleAttributes,
  sectionIdMin,
  sectionIdMax,
  idMin,
  idMax,
  keywords,
  fetchSentences,
}) => {
  const searchOnEnter = (e) => {
    if (e.key === "Enter" && e.keyCode === 13) {
      fetchSentences(e)
    }
  }

  return (
    <div className="search-box">
      <div className="search-box__row">
        <div className="search-box__label">セクションNo.</div>
        <div className="search-box__input">
          <input
            type="number"
            name="sectionIdMin"
            id="sectionIdMin"
            className="search-box__input--short"
            value={sectionIdMin}
            onChange={handleAttributes}
            onKeyDown={searchOnEnter}
          />
          <div className="search-box__input--separater">〜</div>
          <input
            type="number"
            name="sectionIdMax"
            id="sectionIdMax"
            className="search-box__input--short"
            value={sectionIdMax}
            onChange={handleAttributes}
            onKeyDown={searchOnEnter}
          />
        </div>
      </div>
      <div className="search-box__row">
        <div className="search-box__label">例文No.</div>
        <div className="search-box__input">
          <input
            type="number"
            name="idMin"
            id="idMin"
            className="search-box__input--short"
            value={idMin}
            onChange={handleAttributes}
            onKeyDown={searchOnEnter}
          />
          <div className="search-box__input--separater">〜</div>
          <input
            type="number"
            name="idMax"
            id="idMax"
            className="search-box__input--short"
            value={idMax}
            onChange={handleAttributes}
            onKeyDown={searchOnEnter}
          />
        </div>
      </div>
      <div className="search-box__row">
        <div className="search-box__label">キーワード</div>
        <div className="search-box__input">
          <input
            type="text"
            name="keywords"
            id="keywords"
            className="search-box__input--long"
            value={keywords}
            onChange={handleAttributes}
            onKeyDown={searchOnEnter}
          />
        </div>
      </div>
      <div className="search-box__row justify-end">
        <button
          type="button"
          className="search-box__button submit"
          onClick={fetchSentences}
        >
          検索する
        </button>
        <button
          type="button"
          className="search-box__button reset"
          value="true"
          onClick={(e) => fetchSentences(e)}
        >
          リセット
        </button>
      </div>
    </div>
  )
}

export default SearchBox

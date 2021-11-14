import React from "react"

interface Props {
  handleAttributes: (e: any) => void
  sectionIdMin: number
  sectionIdMax: number
  idMin: number
  idMax: number
  keywords: string
}

const SearchBox: React.FC<Props> = ({
  handleAttributes,
  sectionIdMin,
  sectionIdMax,
  idMin,
  idMax,
  keywords,
}) => (
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
          min={1}
          max={45}
          onChange={handleAttributes}
        />
        <div className="search-box__input--separater">〜</div>
        <input
          type="number"
          name="sectionIdMax"
          id="sectionIdMax"
          className="search-box__input--short"
          value={sectionIdMax}
          min={1}
          max={45}
          onChange={handleAttributes}
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
          min={1}
          max={560}
          onChange={handleAttributes}
        />
        <div className="search-box__input--separater">〜</div>
        <input
          type="number"
          name="idMax"
          id="idMax"
          className="search-box__input--short"
          value={idMax}
          min={1}
          max={560}
          onChange={handleAttributes}
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
          placeholder="English / 日本語"
        />
      </div>
    </div>
    <div className="search-box__row justify-end">
      <button
        type="button"
        className="search-box__button reset"
        name="reset"
        onClick={handleAttributes}
      >
        リセット
      </button>
    </div>
  </div>
)

export default SearchBox

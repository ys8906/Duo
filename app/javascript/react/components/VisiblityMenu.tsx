import React from "react"

interface buttonLabel {
  name: string
  label: string
}

interface Props {
  buttonLabels: buttonLabel[]
  visibilities: object
  toggleVisibility: React.ChangeEventHandler
}

const VisibilityMenu: React.FC<Props> = ({
  buttonLabels,
  visibilities,
  toggleVisibility,
}) => (
  <div className="visibility-menu">
    {buttonLabels.map(({ name, label }) => (
      <div className="visibility-menu__button" key={name}>
        <label htmlFor={name}>
          <input
            type="checkbox"
            name={name}
            id={name}
            className="visibility-menu__checkbox"
            checked={visibilities[name]}
            onChange={toggleVisibility}
          />
          {label}
        </label>
      </div>
    ))}
  </div>
)

export default VisibilityMenu

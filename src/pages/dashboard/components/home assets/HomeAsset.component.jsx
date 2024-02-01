import React from "react"
import "./HomeAsset.styles.scss"
import "@styles/react/libs/swiper/swiper.scss"

const HomeAsset = ({ displayName, img, pdf }) => (
  <a href={pdf} target="_blank" className="asset-container">
    <img src={img} className="asset-img" />
    <h3 className="asset-display-name">{displayName}</h3>
  </a>
)

export default HomeAsset

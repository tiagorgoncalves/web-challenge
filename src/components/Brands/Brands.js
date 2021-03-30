import React from "react";
import Brand from "./Brand/Brand";
import classes from "./Brands.module.css";
const Brands = (props) => {
  const brandArray = [
    "almay",
    "alva",
    "anna sui",
    "annabelle",
    "benefit",
    "boosh",
    "burt's bees",
    "butter london",
    "c'est moi",
    "cargo cosmetics",
    "china glaze",
    "clinique",
    "coastal classic creation",
    "colourpop",
    "covergirl",
    "dalish",
    "deciem",
    "dior",
    "dr. hauschka",
    "e.l.f.",
    "essie",
    "fenty",
    "glossier",
    "green people",
    "iman",
    "l'oreal",
    "lotus cosmetics usa",
    "maia's mineral galaxy",
    "marcelle",
    "marienatie",
    "maybelline",
    "milani",
    "mineral fusion",
    "misa",
    "mistura",
    "moov",
    "nudus",
    "nyx",
    "orly",
    "pacifica",
    "penny lane organics",
    "physicians formula",
    "piggy paint",
    "pure anada",
    "rejuva minerals",
    "revlon",
    "sally b's skin yummies",
    "salon perfect",
    "sante",
    "sinful colours",
    "smashbox",
    "stila",
    "suncoat",
    "w3llpeople",
    "wet n wild",
    "zorah",
    "zorah biocosmetiques",
  ];
  let letters = [];
  brandArray.map((brand) => {
    return letters.push(brand.charAt(0));
  });

  const uniqueSet = new Set(letters);
  const Letters = [...uniqueSet];

  let list = [];
  let label = null;
  // eslint-disable-next-line
  Letters.map((letter) => {
    let brandList = [];
    // eslint-disable-next-line
    brandArray.map((brand) => {
      if (brand.charAt(0) === letter) {
        brandList.push(brand);
      }
    });

    label = (
      <Brand key={letter} brands={brandList} letter={letter.toUpperCase()} />
    );
    list.push(label);
  });

  return (
    <div>
      <h1 className={classes.PageTitle}>Brands</h1>
      <div className={classes.Brands}>{list}</div>
    </div>
  );
};
export default Brands;

import React from "react";
import { Helmet } from "react-helmet";
import { MetaDecoratedPageProps } from "./types";

const MetaDecoratedPage: React.FC<MetaDecoratedPageProps> = ({
  title,
  description,
  element,
}) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <title>{title} | shyphen-web</title>
      </Helmet>
      {element}
    </>
  );
};

export default MetaDecoratedPage;

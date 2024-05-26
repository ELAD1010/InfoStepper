import { FieldValues } from "react-hook-form";

import "./index.css";

type Props<T> = {
  info: T;
};

const InfoReview = <T extends FieldValues>({ info }: Props<T>) => {
  return (
    <div className="review-layout">
      {Object.entries(info).map((entry) => (
        <label key={entry[0]}>
          {entry[0]}: {entry[1]}
        </label>
      ))}
    </div>
  );
};

export default InfoReview;

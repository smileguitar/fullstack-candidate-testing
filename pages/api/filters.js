// @ts-ignore
import filters from "../../data/filters";

export default (req, res) => {
  res.statusCode = 200;
  res.json(filters);
};

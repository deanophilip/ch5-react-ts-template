import { Analog } from "./Analog";
import { Digital } from "./Digital";
import { Serial } from "./Serial";

export const ReservedJoin = {
    Digital,
    Analog,
    Serial,
} as const;

export default ReservedJoin;
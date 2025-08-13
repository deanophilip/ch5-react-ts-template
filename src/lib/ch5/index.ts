import { ReservedJoin } from "./ReservedJoin";

const CrestronCH5 = {
    ReservedJoin,
} as const;

export type { AnalogEvent } from "./ReservedJoin/Analog/Event";
export type { AnalogState } from "./ReservedJoin/Analog/State";
export type { DigitalEvent } from "./ReservedJoin/Digital/Event";
export type { DigitalState } from "./ReservedJoin/Digital/State";
export type { SerialEvent } from "./ReservedJoin/Serial/Event";
export type { SerialState } from "./ReservedJoin/Serial/State";

export default CrestronCH5;

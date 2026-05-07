export interface ConfigurationObject {
    socketAddress: string
}

export interface RotationChangeEvent {
    value: number,
    part: string
}

export const GRIPPER_MIN_RANGE = 0;
export const GRIPPER_MAX_RANGE = 45;
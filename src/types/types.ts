export interface Meeting {
    access_key:   string;
    ready:        boolean;
    locked:       boolean;
    room:         Room;
    team:         Team;
    user:         User;
    links:        Links;
    options:      MeetingOptions;
    presentation: null;
    broadcasts:   any[];
    recording:    null;
    snapshots:    any[];
    waiting_list: any[];
    signaling:    Signaling;
}

export interface Links {
    self:       string;
    gui:        string;
    guest_join: string;
    websocket:  string;
}

export interface MeetingOptions {
    show_names:          boolean;
    show_label:          boolean;
    exit_url:            null;
    recording_available: boolean;
    broadcast_available: boolean;
    layout_available:    boolean;
    layout:              string;
    reaction_available:  boolean;
    suggest_guest_names: boolean;
    lock_available:      boolean;
    kick_available:      boolean;
    sfu_mode:            string;
    layout_users:        null;
    layout_name:         null;
    layout_map:          null;
    voice_activation:    boolean;
    custom_fields:       CustomFields;
    widescreen:          boolean;
    background_color:    string;
}

export interface CustomFields {
}

export interface Room {
    id:          string;
    name:        string;
    ready:       boolean;
    started_at:  Date;
    shutdown:    boolean;
    guest_token: string;
}

export interface Signaling {
    type:    string;
    options: SignalingOptions;
}

export interface SignalingOptions {
    client_id:    string;
    conf_id:      string;
    auth_token:   string;
    endpoint:     string;
    stun_servers: string[];
    turn_servers: TurnServer[];
}

export interface TurnServer {
    urls:     string[];
    username: string;
    password: string;
}

export interface Team {
    name: string;
}

export interface User {
    id:      string;
    room_id: string;
    name:    string;
    avatar:  null;
    guest:   boolean;
    blocked: boolean;
    ready:   boolean;
}

export type MediaOptionsType = {
    value: string
    label: string
}
export interface Alert {
    // | -> or
    type: 'success' | 'info' | 'warning' | 'danger';
    message : string;
}

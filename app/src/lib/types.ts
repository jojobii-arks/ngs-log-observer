export enum CHANNELS {
  ACTION_NEW = 'ACTION_NEW',
  ALERT = 'ALERT',
  GET_GAME_DIR = 'GET_GAME_DIR',
  SET_IS_ALWAYS_ON_TOP = 'TOGGLE_ALWAYS_ON_TOP',
}

export type ActionLogItem = {
  log_time: string;
  action_id: string;
  action_type: string;
  player_id: string;
  player_name: string;
  item_name?: string;
  item_num?: string;
  current_meseta?: string;
};

export type PushData = {
  path: string;
  startTime: Date;
  endTime: Date;
  data: ActionLogItem[];
};

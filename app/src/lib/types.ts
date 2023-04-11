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

import { PlayerExecute } from "@/client/structures/ServiceExecute";
import { UsingClient } from 'seyfert';
import { Player, Track } from "sonatica";

const TrackError: PlayerExecute = {
	name: "trackError",
	type: "player",
	execute(client: UsingClient, player: Player, track: Track, error: { exception }): Promise<void> {
		return Promise.resolve().then(()=> client.logger.error(`Track ${track.title} error on ${player.guild}: ${error.exception.message} node: ${player.node.options.identifier}`));
	},
};

export default TrackError;
import { ErrorRequest } from "@/client/structures/utils/Client";
import { Declare, Command, type CommandContext, Options, createStringOption, AutocompleteInteraction } from "seyfert";

export const PlayCommandOptions = {
	search: createStringOption({
		description: "[EN]: The song you want to play | [TH]: เพลงที่คุณต้องการเล่น",
		required: true,
		// autocomplete: async (interaction: AutocompleteInteraction) => {
		// 	const { client } = interaction;
		// 	const song = interaction.getInput();
		// 	const res = await client.sakulink.search({
		// 		query: song,
		// 	});

		// 	const songs: {
		// 		name: string;
		// 		value: string;
		// 	}[] = [];
		// 	switch (res.loadType) {
		// 		case "playlist": {
		// 			for (const track of res.tracks) {
		// 				songs.push({
		// 					name: track.title,
		// 					value: track.uri,
		// 				});
		// 			}
		// 			break;
		// 		}
		// 		case "track": {
		// 			for (let i = 0; i < res.tracks.length; i++) {
		// 				const track = res.tracks[i];
		// 				songs.push({
		// 					name: track.title,
		// 					value: track.track,
		// 				});
		// 			}
		// 			break;
		// 		}
		// 		case "search": {
		// 			for (let i = 0; i < res.tracks.length; i++) {
		// 				const track = res.tracks[i];
		// 				songs.push({
		// 					name: track.title,
		// 					value: track.track,
		// 				});
		// 			}
		// 			break;
		// 		}
		// 		default:
		// 			break
		// 	}

		// 	if (songs.length > 0) {
		// 		await interaction
		// 			.respond(songs.map((song) => song))
		// 			.then(() => client.logger.info(`Responded with ${songs.length} songs for ${song}`))
		// 			.catch(() => { });
		// 		return songs.pop();
		// 	} else {
		// 		await interaction
		// 			.respond([
		// 				{
		// 					name: "No results found",
		// 					value: song
		// 				}
		// 			])
		// 			.then(() => client.logger.info(`Responded with no results found for ${song}`))
		// 			.catch(() => { });
		// 		return
		// 	}
		// },
	}),
	node: createStringOption({
		description: "[EN]: The node you want to play the song | [TH]: โหนดที่คุณต้องการเล่นเพลง",
		required: false,
		autocomplete: async (interaction: AutocompleteInteraction) => {
			const nodes: {
				name: string;
				value: string;
			}[] = interaction.client.sakulink.nodes.map((node) => ({
				name: `${node.options.identifier} - ${node.stats.players} Players`,
				value: node.options.identifier,
			}));
			return await interaction.respond(nodes).catch(() => { });
		},
	}),
};
@Declare({
	name: "play",
	description: "[EN]: Play a song | [TH]: เล่นเพลง",
	contexts: ["Guild"],
})
@Options(PlayCommandOptions)
export default class PlayCommand extends Command {
	async run(ctx: CommandContext) {
		try {
			return await ctx.client.services.execute("MusicPlay", ctx);
		} catch (error) {
			return ErrorRequest(ctx, error as Error);
		}
	}
}

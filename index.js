import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import { initDatabase, closeDatabase } from './database/database.js';
import { loadCommands } from './utils/commandLoader.js';
import { handleEventBooking, handleEventCancel, handleEventWaitlist, handleLeaveWaitlist } from './events/interactionHandler.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

async function main() {
  console.log('💜 J0X EVENT SYSTEM - Starting...');

  await initDatabase();
  await loadCommands(client);

  client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`🎮 Serving ${client.guilds.cache.size} guilds`);
  });

  client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error('Error executing command:', error);
        const errorReply = { content: '❌ Errore durante l\'esecuzione del comando.', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorReply);
        } else {
          await interaction.reply(errorReply);
        }
      }
    } else if (interaction.isButton()) {
      const customId = interaction.customId;

      if (customId.startsWith('event_book_')) {
        await handleEventBooking(interaction);
      } else if (customId.startsWith('event_cancel_')) {
        await handleEventCancel(interaction);
      } else if (customId.startsWith('event_waitlist_')) {
        await handleEventWaitlist(interaction);
      } else if (customId.startsWith('event_leave_waitlist_')) {
        await handleLeaveWaitlist(interaction);
      }
    }
  });

  client.on('error', error => {
    console.error('Discord client error:', error);
  });

  process.on('SIGINT', async () => {
    console.log('💜 Shutting down gracefully...');
    await closeDatabase();
    client.destroy();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('💜 Shutting down gracefully...');
    await closeDatabase();
    client.destroy();
    process.exit(0);
  });

  await client.login(process.env.DISCORD_TOKEN);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

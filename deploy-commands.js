import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const commands = [];
const commandsPath = join(__dirname, 'commands');

async function loadCommands() {
  const commandFolders = await readdir(commandsPath);

  for (const folder of commandFolders) {
    const folderPath = join(commandsPath, folder);
    const commandFiles = await readdir(folderPath);
    
    for (const file of commandFiles) {
      if (!file.endsWith('.js')) continue;
      
      const filePath = join(folderPath, file);
      const { default: command } = await import(filePath);
      
      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`✅ Loaded command: ${command.data.name}`);
      }
    }
  }
}

async function deployCommands() {
  try {
    console.log('💜 Started refreshing application (/) commands.');

    await loadCommands();

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    if (process.env.GUILD_ID) {
      // Deploy to specific guild (faster for development)
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log(`✅ Successfully reloaded ${commands.length} application (/) commands for guild.`);
    } else {
      // Deploy globally
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      );
      console.log(`✅ Successfully reloaded ${commands.length} application (/) commands globally.`);
    }
  } catch (error) {
    console.error('Error deploying commands:', error);
  }
}

deployCommands();

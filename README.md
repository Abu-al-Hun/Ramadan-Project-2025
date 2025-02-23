# Wick® Studio

Copyright © 2025 Wick® Studio. All Rights Reserved.

Welcome to the Wick® Studio Script! Below you'll find a list of features, installation instructions, and usage details.

## Features:

- **Quran Radio**: Listen to the Quran with different reciters.
- **Azkar**: Access various Azkar (remembrances).
- **Religious Question Game**: Test your knowledge with a religious questions game.
- **Mushaf Al-Murattal**: More than one version of the recited Quran.
- **Prayer Timings**: View prayer times for Arab countries.

## Installation Requirements:

- **Node.js version 18+** (Ensure you have at least Node.js version 18 or higher)
- **JavaScript**
- Ensure you have a valid token and server details for the bot.

## Required Dependencies:

- **@discordjs/voice**: `^0.18.0`
- **better-sqlite3**: `^11.8.1`
- **canvas**: `^3.1.0`
- **discord.js**: `^14.17.3`
- **iimdb.js**: `^2.1.1`
- **node-fetch**: `^3.3.2`
- **wick.db**: `^2.0.3`

## New Libraries (npm packages):

- **iimdb.js**: A library that uses a database to store Hadiths.
- **wick.db**: A local database library for storing users' data.

## Steps to Install:

1. Extract the script files to your desired directory.
2. In the extracted folder, you will find two files:
   - **install.bat**: This file will automatically install all necessary dependencies when you double-click it. No need for manual input.
   - **start.bat**: After the installation is complete, you can double-click **start.bat** to start the bot.
3. The **install.bat** and **start.bat** files will handle the entire process, including installing dependencies and running the bot, so no need for you to open a terminal or type any commands.

Once the script is installed and configured, you can start using it for the following features:

- **Quran Radio**
- **Azkar**
- **Religious Question Game**
- **Prayer Timings**

## License

This script is provided for free to everyone and must remain free, with all rights reserved by Wick® Studio.

## Contact

For questions, suggestions, or bug reports, feel free to reach out to us through the official communication channels.

## Configuration (verify.js)

In the `verify.js` file, configure the following settings:

```javascript
module.exports = {
  Code: "discord.gg/witon",
  Token: "Token",
  guildId: "Server_ID",
  clientId: "Bot_ID",
  roleid: "Role_ID",
};
```

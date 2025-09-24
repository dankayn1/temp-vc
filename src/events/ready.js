const { connectToDatabase } = require('../utils/database');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    // Connect to MongoDB
    await connectToDatabase();
    
    console.log(`✅ Ready! Logged in as ${client.user.tag}`);
    
    // Deploy commands
    try {
      await require('../deploy-commands');
      console.log('✅ Slash commands registered');
    } catch (err) {
      console.error('❌ Failed to register commands:', err);
    }

    // Set bot status
    client.user.setPresence({
      activities: [{ name: '.gg/saucy', type: 2 }],
      status: 'online'
    });
  }
};

const embed = require('../../embeds/embeds');


module.exports = {
    name: 'shopadmin',
    aliases: ['sha'],
    description: 'Admin shop management',
    showHelp: false,
    usage: 'shopAdmin add <name> <emoji> <price> <messageOnUse="You have used this item!">',
    category: 'Admin',
    options: [
        {
            name: 'add',
            description: 'Add a new item to the shop',
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'Name of the item',
                    type: 3,
                    required: true,
                },
                {
                    name: 'emoji',
                    description: 'Emoji for the item',
                    type: 3,
                    required: true,
                },
                {
                    name: 'price',
                    description: 'Price of the item',
                    type: 4,
                    required: true,
                },
                {
                    name: 'messageonuse',
                    description: 'Message to show when the item is used',
                    type: 3,
                    required: false,
                },
            ],
        },
        {
            name: 'remove',
            description: 'Remove an item from the shop',
            type: 1,
            options: [
                {
                    name: 'id',
                    description: 'ID of the item',
                    type: 4,
                    required: true,
                },
            ],
        },
        {
            name: 'edit',
            description: 'Edit an item in the shop',
            type: 1,
            options: [
                {
                    name: 'id',
                    description: 'ID of the item',
                    type: 4,
                    required: true,
                },
                {
                    name: 'property',
                    description: 'Property to edit',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'description',
                            value: 'description',
                        },
                        {
                            name: 'price',
                            value: 'price',
                        },
                        {
                            name: 'name',
                            value: 'name',
                        },
                        {
                            name: 'message',
                            value: 'message',
                        },
                        {
                            name: 'maxamount',
                            value: 'maxAmount',
                        },
                        {
                            name: 'role',
                            value: 'role',
                        },
                    ],
                },
                {
                    name: 'value',
                    description: 'New value for the property',
                    type: 3,
                    required: true,
                },
            ],
        }
        // You can add more subcommands here
    ],

    execute(client, message, args) {
        const shop = client.eco.shop.get('global') || []
        const guild = client.eco.guilds.get('global')

        const [subcommand, ...subargs] = args

        if (!subcommand) {
            return message.reply({ content: 'Please provide a subcommand.', allowedMentions: { repliedUser: false } })
        }

        if (subcommand === 'add') {
            const [name, emoji, priceString] = subargs

            const price = parseInt(priceString)
            const messageOnUse = subargs.slice(3).join(' ')

            // message on use is optional and defaults to `You have used this item!`

            // supports choosing a random string from a specified strings list with following syntax:
            // [random="str", "str1", "str2"]

            // for example, if specifying `What a [random="wonderful", "great", "sunny"] day!` as message on use
            // then in returned message, `[random="wonderful", "great", "sunny"]` will be replaced with either
            // "wonderful", "great" or "sunny".

            if (!name) {
                return message.reply({ content: 'Please provide a name for the item.', allowedMentions: { repliedUser: false } })
            }

            if (!emoji) {
                return message.reply({ content: 'Please provide an emoji for the item.', allowedMentions: { repliedUser: false } })
            }

            if (!price) {
                return message.reply({ content: 'Please provide a price for the item.', allowedMentions: { repliedUser: false } })
            }

            const newItem = guild.shop.addItem({
                name,
                price,
                message: messageOnUse || '',

                custom: {
                    emoji,
                    hidden: false,
                    locked: false,
                    hiddenSince: null,
                    lockedSince: null
                }
            })

            message.reply({ content: `Successfully added the item ${name} for ${price}`, allowedMentions: { repliedUser: false } })
        } else if (subcommand === 'remove') {
            const [itemID] = subargs

            const item = shop.find(item => item.id == parseInt(itemID) || item.name == itemID)

            if (!item) {
                return message.reply({ content: 'Please provide a valid item ID or name.', allowedMentions: { repliedUser: false } })
            }

            item.delete()

            message.reply({ content: `Successfully removed the item ${item.name}`, allowedMentions: { repliedUser: false } })

        } else if (subcommand === 'edit') {
            const itemProperties = ['description', 'price', 'name', 'message', 'maxAmount', 'role']

            const [itemID, itemProperty] = subargs
            const newValue = subargs.slice(2).join(' ')
    
            const item = shop.find(item => item.id == parseInt(itemID) || item.name == itemID)
    
            if (!itemID) {
                return message.channel.send(`${message.author}, please provide an item ID.`)
            }
    
            if (!item) {
                return message.channel.send(`${message.author}, item not found.`)
            }
    
            if (!itemProperty) {
                return message.channel.send(
                    `${message.author}, please provide an item property to change. ` +
                    `Valid item properties are: ${itemProperties.map(prop => `\`${prop}\``).join(', ')}`
                )
            }
    
            if (!itemProperties.includes(itemProperty)) {
                return message.channel.send(
                    `${message.author}, item property you specified is not valid. ` +
                    `Valid item properties are: ${itemProperties.map(prop => `\`${prop}\``).join(', ')}`
                )
            }
    
            if (!newValue) {
                return message.channel.send(`${message.author}, please provide a new value for the item property.`)
            }
    
            item.edit(itemProperty, newValue)
    
            message.channel.send(
                `${message.author}, you changed **${item.name}**'s **${itemProperty}** to **${newValue}**.`
            )
        }
    },

    slashExecute(client, interaction) {
        const guild = client.eco.guilds.get('global')
        const shop = client.eco.shop.get('global') || []

        const subcommand = interaction.options.getSubcommand()

        if (subcommand === 'add') {
            const name = interaction.options.getString('name')
            const emoji = interaction.options.getString('emoji')
            const price = interaction.options.getInteger('price')
            const messageOnUse = interaction.options.getString('messageonusese')
            if (!name) {
                return interaction.reply({ content: 'Please provide a name for the item.', allowedMentions: { repliedUser: false } })
            }

            if (!emoji) {
                return interaction.reply({ content: 'Please provide an emoji for the item.', allowedMentions: { repliedUser: false } })
            }

            if (!price) {
                return interaction.reply({ content: 'Please provide a price for the item.', allowedMentions: { repliedUser: false } })
            }

            const newItem = guild.shop.addItem({
                name,
                price,
                message: messageOnUse || '',

                custom: {
                    emoji,
                    hidden: false,
                    locked: false,
                    hiddenSince: null,
                    lockedSince: null
                }
            })

            interaction.reply({ content: `Successfully added the item ${name} for ${price}`, allowedMentions: { repliedUser: false } })
        } else if (subcommand === 'remove') {
            const itemID = interaction.options.getInteger('id')

            const item = shop.find(item => item.id == parseInt(itemID) || item.name == itemID)

            if (!item) {
                return interaction.reply({ content: 'Please provide a valid item ID or name.', allowedMentions: { repliedUser: false } })
            }

            item.delete()

            interaction.reply({ content: `Successfully removed the item ${item.name}`, allowedMentions: { repliedUser: false } })

        } else if (subcommand === 'edit') {
            const itemProperties = ['description', 'price', 'name', 'message', 'maxAmount', 'role']

            const itemID = interaction.options.getInteger('id')
            const itemProperty = interaction.options.getString('property')
            const newValue = interaction.options.getString('value')
    
            const item = shop.find(item => item.id == parseInt(itemID) || item.name == itemID)
    
            if (!itemID) {
                return interaction.reply({ content: 'Please provide an item ID.', allowedMentions: { repliedUser: false } })
            }
    
            if (!item) {
                return interaction.reply({ content: 'Item not found.', allowedMentions: { repliedUser: false } })
            }
    
            if (!itemProperty) {
                return interaction.reply(
                    `Please provide an item property to change. ` +
                    `Valid item properties are: ${itemProperties.map(prop => `\`${prop}\``).join(', ')}`
                )
            }
    
            if (!itemProperties.includes(itemProperty)) {
                return interaction.reply(
                    `Item property you specified is not valid. ` +
                    `Valid item properties are: ${itemProperties.map(prop => `\`${prop}\``).join(', ')}`
                )
            }
    
            if (!newValue) {
                return interaction.reply({ content: 'Please provide a new value for the item property.', allowedMentions: { repliedUser: false } })
            }
    
            item.edit(itemProperty, newValue)
    
            interaction.reply(
                `You changed **${item.name}**'s **${itemProperty}** to **${newValue}**.`
            )
        }
    },
};

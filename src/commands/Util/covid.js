module.exports = {
	name: 'covid',
    description: 'View COVID-19 stats for a country',
	cooldown: 2,

	execute: async (msg, args) => {

    const api = require('novelcovid');
    moment = require('moment');

        api.settings({
            baseUrl: 'https://corona.lmao.ninja'
        })

            const corona = await api.countries({country: args[0]});
            await msg.channel.createMessage({
                embed: {
                    title: `COVID-19 Stats for ${corona.country}`,
                    color: 13182464,
                    thumbnail: {
                        url: 'https://soda.is-for.me/i/qmuo.png',
                    },
                    fields: [
                        {
                            name: 'Total Confirmed',
                            value: corona.cases,
                            inline: true,
                        },
                        {
                            name: 'Total Deaths',
                            value: corona.deaths,
                            inline: true,
                        },
                        {
                            name: 'Total Recovered',
                            value: corona.recovered,
                            inline: true,
                        },
                        {
                            name: 'Today\'s Cases',
                            value: corona.todayCases,
                            inline: true,
                        },
                        {
                            name: 'Today\'s Deaths',
                            value: corona.todayDeaths,
                            inline: true,
                        },
                        {
                            name: 'Active Cases',
                            value: corona.active,
                            inline: true,
                        },
                        {
                            name: 'Critical Cases',
                            value: corona.critical,
                            inline: true,
                        }]
                    }
                })
            }
        }




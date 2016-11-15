// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'default e2e tests': function (browser) {
        // http://nightwatchjs.org/api
        const devServer = browser.globals.devServerURL

        browser.url(devServer)
            .waitForElementVisible('#app', 10000)
            .waitForElementVisible('button', 2000)
            .click('button')
            .pause(3000)

        browser.expect.element('p').text.to.match(/共[ ]?[1-9][ ]?条数据/)
        browser.expect.element('ul li').to.be.visible
        browser.end()
    }
}

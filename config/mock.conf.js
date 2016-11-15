module.exports = [
    // template example
    {
        // url
        url: '/city',
        // Mock template
        data: {
            "citys|1-10": {
                "310000": "上海市",
                "320000": "江苏省",
                "330000": "浙江省",
                "340000": "安徽省"
            }
        }
    },
    // function example
    // 适用于需要动态切换数据的场景
    {
        url: '/bbb/:type',
        // Mock function
        // 根据参数动态切换数据
        // @req: Express request
        data: function (req) {
            var type = req.param('type')
            if(type === 'array') {
                return {
                    "citys|1-10": [
                        "Mock.js"
                    ]
                }
            }
            return {
                "name" : "Mock.js"
            }
        }
    },
    // method example
    // 请求协议：get、post、put、delete，小写
    // 省略协议时为 get 请求
    {
        url: '/aaa',
        // default method is get
        method: 'post',
        data: {
            "citys|2": {
                "310000": "上海市",
                "320000": "江苏省",
                "330000": "浙江省",
                "340000": "安徽省"
            }
        }
    }
]

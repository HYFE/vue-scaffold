import Ajax, { GET } from './ajax'

// 通过 Ajax 类实例化拥有基础的 QRUD 能力
const CityApi = new Ajax('./city')

// 如果需要额外的个性化请求，借助 GET、POST、PUT、DELETE 工具方法添加
CityApi.paging = GET('/city')

export default CityApi

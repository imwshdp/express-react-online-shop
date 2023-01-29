const uuid = require('uuid')
const path = require('path')

const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, typeId, brandId, info } = req.body

      // saving image to local storage
      const { img } = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const device = await Device.create({ name, price, brandId, typeId, img: fileName })

      if (info) {
        info = JSON.parse(info)
        info.forEach(element =>
          DeviceInfo.create({
            title: element.title,
            description: element.description,
            deviceId: device.id
          })
        )
      }

      return res.json(device)

    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query

    // trying to get limit and page query parameters
    limit = limit || 9
    page = page || 1

    // variables declaration and offset calculation
    let devices, offset = page * limit - limit;

    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset })
    }

    // filter by brand
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
    }

    // filter by type
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
    }

    // filter by brand and type
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
    }

    return res.json(devices)
  }

  async getOne(req, res) {
    const { id } = req.params
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }]
    })
    return res.json(device)
  }
}

module.exports = new DeviceController();
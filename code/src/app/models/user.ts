export interface IUser{
  id: number
  name: string
  phone: number
  roleId: number
  specialityId: number | null
}

[
  {
    "order": {
      "id": 0,
      "user_id": 0,
      "creation_date": "string",
      "delivery_date": "string",
      "sum_price": 0,
      "items": [
        {
          "id": 0,
          "name": "string",
          "price": 0,
          "manufacturer": "string",
          "picture_url": "string",
          "type": {
            "id": 0,
            "name": "string"
          },
          "speciality": {
            "id": 0,
            "name": "string"
          }
        }
      ],
      "pharmacy": {
        "id": 0,
        "name": "string",
        "address": "string",
        "work_time": "string",
        "phone": "string"
      }
    },
    "item": {
      "id": 0,
      "name": "string",
      "price": 0,
      "manufacturer": "string",
      "picture_url": "string",
      "type": {
        "id": 0,
        "name": "string"
      },
      "speciality": {
        "id": 0,
        "name": "string"
      }
    },
    "quantity": 0
  }
]
